(function () {
  'use strict';
  const E=window.CEP_ENGINE, DAY=86400000;
  function analyze(bank, history, now=Date.now(), availableBank=bank) {
    const latest=new Map(), skills=new Map(), available=E.active(availableBank);
    for(const item of window.CEP_COVERAGE.coverage)skills.set(item.id,{item,attempts:[],latest:new Map(),available:available.filter(q=>q.items.includes(item.id))});
    for(const session of [...history].sort((a,b)=>(a.finished||a.started)-(b.finished||b.started))) {
      const rows=E.score(session,bank).rows;
      rows.forEach((row,index)=>{
        if(row.suspended)return;
        const hasFirst=session.firstAnswers?.[index]!==undefined&&session.firstAnswers[index]!==null;
        const firstAnswer=hasFirst?session.firstAnswers[index]:row.answer;
        const assisted=!!session.revealed?.[index]||Number(session.tries?.[index]||0)>0;
        // A first answer captured before feedback remains independent evidence.
        const observable=hasFirst||!assisted;
        const correct=observable&&firstAnswer===row.q.correctId;
        const confidence=hasFirst&&Array.isArray(session.firstConfidence)?session.firstConfidence[index]:row.confidence;
        const secure=correct&&confidence==='certeza';
        const outcome=firstAnswer==null?'pulada':observable&&!correct?'erro':correct&&['dúvida','chute'].includes(confidence)?'inseguro':!observable?'com-ajuda':secure?'seguro':'sem-confiança';
        const entry={...row,answer:firstAnswer,confidence,correct,secure,observable,assisted,outcome,sessionId:session.id,index,when:session.finished||session.started,rival:session.rivals?.[index]||null};
        latest.set(row.q.id,entry);
        for(const id of row.q.items){const stat=skills.get(id);if(stat){stat.attempts.push(entry);stat.latest.set(row.q.id,entry);}}
      });
    }
    const pending=[...latest.values()].filter(r=>['erro','pulada','inseguro','com-ajuda'].includes(r.outcome));
    for(const stat of skills.values()) {
      const records=[...stat.latest.values()].sort((a,b)=>a.when-b.when), recent=records.slice(-5), observations=recent.filter(r=>r.observable);
      stat.questions=records.length;stat.seen=new Set(records.map(r=>r.q.id));stat.newCount=stat.available.filter(q=>!stat.seen.has(q.id)).length;
      stat.errors=records.filter(r=>r.outcome==='erro').length;stat.skipped=records.filter(r=>r.outcome==='pulada').length;stat.uncertain=records.filter(r=>r.outcome==='inseguro').length;stat.assisted=records.filter(r=>r.outcome==='com-ajuda').length;
      stat.secure=observations.filter(r=>r.secure).length;stat.observations=observations.length;
      const sessions=new Set(observations.map(r=>r.sessionId));
      stat.confirmed=observations.length>=4&&stat.secure>=4&&sessions.size>=2&&!recent.some(r=>['erro','pulada','inseguro','com-ajuda'].includes(r.outcome));
      stat.recurring=stat.attempts.filter(r=>r.outcome==='erro').length>=2&&(stat.errors>0||stat.assisted>0);
      stat.last=records.at(-1)?.when||null;
      stat.status=stat.recurring?'Retomar conteúdo':stat.errors||stat.skipped?'Praticar com atenção':stat.uncertain||stat.assisted?'Confirmar sem ajuda':stat.confirmed?'Revisão de manutenção':stat.questions?'Mais evidências necessárias':'Ainda não praticado';
      const interval=stat.confirmed?7:stat.errors||stat.skipped?1:3;
      stat.due=stat.last?stat.last+interval*DAY:null;stat.overdue=!!stat.due&&stat.due<=now;
      stat.priority=stat.errors*4+stat.skipped*3+stat.uncertain*2+stat.assisted*2+(stat.recurring?5:0)+(stat.overdue?2:0);
    }
    const ordered=[...skills.values()].sort((a,b)=>b.priority-a.priority||(a.last||0)-(b.last||0)||a.item.id.localeCompare(b.item.id));
    return {skills,ordered,pending,latest};
  }
  function pick(bank,mode,filters={},history=[],draws=[],random=Math.random) {
    const report=analyze(bank,history), active=E.active(bank);
    let pool=active.filter(q=>(!filters.subject||q.subject===filters.subject)&&(!filters.item||q.items.includes(filters.item))&&(!filters.difficulty||q.difficulty===filters.difficulty));
    if(mode==='revisão') {
      const pending=report.pending.filter(r=>(!filters.subject||r.q.subject===filters.subject)&&(!filters.kind||r.outcome===filters.kind)&&(!filters.item||r.q.items.includes(filters.item)));
      const skills=new Set(pending.flatMap(r=>r.q.items));
      if(!filters.item)pool=pool.filter(q=>q.items.some(id=>skills.has(id)));
      if(filters.questionId){const source=report.latest.get(filters.questionId);if(!source)throw Error('Questão do histórico não encontrada.');pool=pool.filter(q=>q.items.includes(source.q.items[0]));}
    }
    const ranked=E.priority(pool,history,draws,random), used=new Set(history.flatMap(s=>s.questions.map(q=>q.id))), scores=q=>Math.max(0,...q.items.map(id=>report.skills.get(id)?.priority||0));
    if(mode==='revisão')ranked.sort((a,b)=>scores(b)-scores(a)||Number(used.has(a.id))-Number(used.has(b.id)));
    const chosen=[],focus=new Set();
    if(filters.repeat&&filters.questionId){const exact=pool.find(q=>q.id===filters.questionId);if(exact){chosen.push(exact);exact.items.forEach(id=>focus.add(id));}}
    const count=filters.count||5;
    if(mode==='revisão'&&!filters.item&&!filters.questionId){
      // Spread the first questions across pending skills before filling the set.
      for(const q of ranked)if(chosen.length<count&&!chosen.includes(q)&&!focus.has(q.items[0])){chosen.push(q);focus.add(q.items[0]);}
    }
    for(const q of ranked)if(chosen.length<count&&!chosen.includes(q))chosen.push(q);
    if(!chosen.length)throw Error('Não há questões revisadas para esta revisão. Confira as habilidades no painel.');
    return chosen.map(q=>JSON.parse(JSON.stringify({...q,options:q.preserveOrder?q.options:E.shuffle(q.options,random)})));
  }
  const select=E.select;
  E.select=(bank,mode,filters={},history=[],draws=[],random=Math.random)=>mode==='revisão'?pick(bank,mode,filters,history,draws,random):select(bank,mode,filters,history,draws,random);
  window.CEP_LEARNING={analyze,pick};
})();
