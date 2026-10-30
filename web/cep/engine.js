(function () {
  'use strict';
  function shuffle(items, random = Math.random) { const a = [...items]; for (let i=a.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function validate(q) {
    const errors=[];
    if (!q || typeof q !== 'object') return ['Questão inválida.'];
    for (const name of ['id','subject','topic','skill','difficulty','prompt','explanation']) if (typeof q[name] !== 'string' || !q[name].trim()) errors.push(`Falta ${name}.`);
    if (!window.CEP_COVERAGE.subjects[q.subject]) errors.push('Matéria inválida.');
    if (!['fácil','média','difícil'].includes(q.difficulty)) errors.push('Dificuldade inválida.');
    if (!Array.isArray(q.items) || !q.items.length || q.items.some(id=>!window.CEP_COVERAGE.coverage.some(x=>x.id===id && x.subject===q.subject))) errors.push('Associe itens válidos do edital.');
    if (!Array.isArray(q.options) || q.options.length!==4 || q.options.some(o=>!o || !o.id || typeof o.text!=='string' || !o.text.trim() || typeof o.explanation!=='string' || !o.explanation.trim())) errors.push('Preencha quatro alternativas com justificativas.');
    else if (new Set(q.options.map(o=>o.id)).size!==4 || new Set(q.options.map(o=>o.text.trim())).size!==4 || q.options.filter(o=>o.id===q.correctId).length!==1) errors.push('Alternativas devem ser distintas e ter um gabarito único.');
    if (!q.origin || !['autoral','adaptada','original'].includes(q.origin.type) || !q.origin.label) errors.push('Identifique a origem.');
    if (q.origin?.type === 'original' && ['institution','year','number','page','url','keyUrl','version'].some(k=>!q.origin[k])) errors.push('Original exige instituição, ano, questão, página, URL, versão e gabarito definitivo.');
    if (q.origin?.type === 'adaptada' && (!q.origin.url || !q.origin.adaptation)) errors.push('Adaptação exige referência e descrição.');
    if (q.visual && !window.CEP_VISUALS?.[q.visual] && !/^asset:/.test(q.visual)) errors.push('Recurso visual desconhecido.');
    return errors;
  }
  function active(bank) { return bank.filter(q=>q.status==='revisada' && !validate(q).length); }
  function family(q) { return q.contextFamily || q.family || q.base || q.id; }
  function exposure(history, draws) {
    const completed=new Map(), drawn=new Map();
    history.forEach(s=>s.questions.forEach(q=>completed.set(q.id,(completed.get(q.id)||0)+1)));
    draws.flat().forEach(id=>drawn.set(id,(drawn.get(id)||0)+1));
    return new Map([...new Set([...completed.keys(),...drawn.keys()])].map(id=>[id,Math.max(completed.get(id)||0,drawn.get(id)||0)]));
  }
  function priority(bank, history, draws = [], random = Math.random) {
    const usage=exposure(history,draws), recent=new Set(draws.slice(-3).flat()), needs=new Map(), families=new Map();
    bank.forEach(q=>families.set(family(q),(families.get(family(q))||0)+(usage.get(q.id)||0)));
    history.forEach(s=>s.questions.forEach((old,i)=> { if(s.answers[i]!==old.correctId || ['dúvida','chute'].includes(s.confidence[i])) old.items.forEach(id=>needs.set(id,(needs.get(id)||0)+1)); }));
    return bank.map(q=>({q,tie:random()})).sort((a,b)=> Number(!!b.q.fiel)-Number(!!a.q.fiel) || Number(usage.has(a.q.id))-Number(usage.has(b.q.id)) || Number(recent.has(a.q.id))-Number(recent.has(b.q.id)) || (usage.get(a.q.id)||0)-(usage.get(b.q.id)||0) || (families.get(family(a.q))||0)-(families.get(family(b.q))||0) || Math.max(0,...b.q.items.map(id=>needs.get(id)||0))-Math.max(0,...a.q.items.map(id=>needs.get(id)||0)) || a.tie-b.tie).map(x=>x.q);
  }
  function diverse(candidates, count, usage, recent, initial=[]) {
    const picked=[...initial], pending=candidates.filter(q=>!picked.includes(q));
    while(picked.length<count&&pending.length) {
      const families=new Map(),skills=new Map();
      picked.forEach(q=>{families.set(family(q),(families.get(family(q))||0)+1);skills.set(q.items[0],(skills.get(q.items[0])||0)+1);});
      const ranked=pending.map((q,index)=>({q,index})).sort((a,b)=>
        Number(!!b.q.fiel)-Number(!!a.q.fiel) || Number(usage.has(a.q.id))-Number(usage.has(b.q.id)) || Number(recent.has(a.q.id))-Number(recent.has(b.q.id)) ||
        (usage.get(a.q.id)||0)-(usage.get(b.q.id)||0) ||
        (families.get(family(a.q))||0)-(families.get(family(b.q))||0) ||
        (skills.get(a.q.items[0])||0)-(skills.get(b.q.items[0])||0) ||
        Number(!!b.q.examStyle)-Number(!!a.q.examStyle) || a.index-b.index);
      const q=ranked[0].q; picked.push(q);pending.splice(pending.indexOf(q),1);
    }
    return picked;
  }
  function levelQuota(count, mode) {
    // Simulado: cerca de 50% difíceis, 40% médias e 10% fáceis. Diagnóstico: um terço de cada nível.
    const share=mode==='simulado'?{difícil:.5,média:.4,fácil:.1}:{difícil:1/3,média:1/3,fácil:1/3};
    const q={difícil:Math.round(count*share.difícil),fácil:Math.round(count*share.fácil)};
    q.média=Math.max(0,count-q.difícil-q.fácil);return q;
  }
  function select(bank, mode, filters, history=[], draws=[], random=Math.random) {
    filters ||= {};
    let pool=active(bank), chosen=[];
    const usage=exposure(history,draws),recent=new Set(draws.slice(-3).flat());
    if (mode==='simulado' || mode==='diagnóstico') {
      for (const [subject,count] of Object.entries(window.CEP_COVERAGE.distribution)) {
        let candidates=priority(pool.filter(q=>q.subject===subject),history,draws,random);
        // O simulado usa as questões fiéis às provas; sem elas, vale o banco anterior (somente difíceis).
        const fiel=candidates.filter(q=>q.fiel);
        let picked=[];
        if(fiel.length>=count) {
          candidates=fiel;
          const quota=levelQuota(count,mode);
          // Obrigatórios: obra literária em Português e conteúdos do Paraná em História e Geografia.
          const regional=q=>q.collection==='parana-curitiba',image=q=>!!q.visual;
          const must={portugues:[[q=>q.book,mode==='simulado'?2:1],[q=>image(q)&&!q.book&&!usage.has(q.id),2]],matematica:[[q=>image(q)&&!usage.has(q.id),1]],ciencias:[[q=>image(q)&&!usage.has(q.id),1]],geografia:[[regional,1],[q=>image(q)&&!regional(q)&&!usage.has(q.id),1]],historia:[[regional,1]]}[subject]||[];
          for(const [test,n] of must) picked=diverse(candidates.filter(test),Math.min(n,candidates.filter(test).length)+picked.length,usage,recent,picked);
          // Mandela: duas questões por simulado e uma por diagnóstico.
          if(picked.filter(q=>q.book).length>=(mode==='simulado'?2:1)) candidates=candidates.filter(q=>!q.book||picked.includes(q));
          const left={...quota};picked.forEach(q=>{let k=q.difficulty;if(!(left[k]>0))k=Object.keys(left).sort((a,b)=>left[b]-left[a])[0];if(left[k]>0)left[k]--;});
          for(const difficulty of ['difícil','média','fácil']) {
            // Só questões inéditas completam as cotas de nível; as repetidas entram apenas no fim.
            const tier=candidates.filter(q=>q.difficulty===difficulty&&!usage.has(q.id));
            picked=diverse(tier,picked.length+left[difficulty],usage,recent,picked);
          }
          picked=diverse(candidates,count,usage,recent,picked);
        } else {
          // Difficulty is a training choice, not an official CEP quota.
          const mediumTarget=mode==='simulado'?0:Math.max(1,Math.floor(count/3));
          if(mediumTarget) picked=diverse(candidates.filter(q=>q.difficulty==='média'),mediumTarget,usage,recent);
          for(const difficulty of ['difícil','média','fácil']) {
            const tier=candidates.filter(q=>q.difficulty===difficulty);
            picked=diverse(tier,count,usage,recent,picked);
          }
        }
        if(picked.length!==count) throw Error(`Banco insuficiente em ${window.CEP_COVERAGE.subjects[subject]}. Revise questões suspensas.`);
        chosen.push(...shuffle(picked,random));
      }
    } else {
      if(filters.collection) pool=pool.filter(q=>q.collection===filters.collection);
      if(filters.subject) pool=pool.filter(q=>q.subject===filters.subject);
      if(filters.book) pool=pool.filter(q=>q.book);
      if(filters.item) pool=pool.filter(q=>q.items.includes(filters.item));
      if(filters.difficulty) pool=pool.filter(q=>q.difficulty===filters.difficulty);
      if(mode==='interpretação') pool=pool.filter(q=>q.subject==='portugues'&&q.difficulty==='difícil'&&['p03','p04','p05','p06','p07','p08','p09'].some(id=>q.items.includes(id)));
      if(mode==='revisão') {
        const latest=new Map(); history.forEach(s=>s.questions.forEach((q,i)=>latest.set(q.id,{q,answer:s.answers[i],confidence:s.confidence[i]})));
        const pending=[...latest.values()].filter(x=>x.answer!==x.q.correctId||['dúvida','chute'].includes(x.confidence));
        const ids=new Set(pending.map(x=>x.q.id)), skills=new Set(pending.flatMap(x=>x.q.items));
        pool=pool.filter(q=>skills.size&&q.items.some(id=>skills.has(id)));
        pool=priority(pool,history,draws,random).sort((a,b)=>Number(ids.has(a.id))-Number(ids.has(b.id)));
      } else pool=priority(pool,history,draws,random);
      if(filters.progressive)pool.sort((a,b)=>['fácil','média','difícil'].indexOf(a.difficulty)-['fácil','média','difícil'].indexOf(b.difficulty));
      chosen=filters.progressive?pool.slice(0,filters.count||5):diverse(pool,filters.count||5,usage,recent);
      if(!chosen.length) throw Error('Não há questões revisadas para este filtro. Escolha outro assunto ou confira as pendências no painel.');
    }
    return chosen.map(q=>JSON.parse(JSON.stringify({...q,options:q.preserveOrder?q.options:shuffle(q.options,random)})));
  }
  function score(session, bank) {
    const lookup=new Map(bank.map(q=>[q.id,q]));
    const rows=session.questions.map((old,i)=> {const updated=lookup.get(old.id)||old;const invalid=validate(updated).length>0;const q=invalid?old:updated; const suspended=updated.status!=='revisada'||invalid; return {q,answer:session.answers[i],confidence:session.confidence[i],seconds:session.times[i]||0,reason:session.reasons[i],suspended,correct:!suspended&&session.answers[i]===q.correctId,skipped:session.answers[i]==null};});
    return {rows,total:rows.filter(r=>!r.suspended).length,points:rows.filter(r=>r.correct).length,skipped:rows.filter(r=>!r.suspended&&r.skipped).length,uncertain:rows.filter(r=>r.correct&&['dúvida','chute'].includes(r.confidence)).length};
  }
  window.CEP_ENGINE={shuffle,validate,active,priority,select,score,family};
})();
