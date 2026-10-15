const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(){const c={window:{},Math,JSON};vm.createContext(c);for(const f of ['../challenge-bank','../challenge-math','../challenge-world','../challenge-londrina-cmpa','../challenge-londrina-math','../challenge-londrina-world','../challenge-visuals','../challenge-exam','../challenge-exam-math','../challenge-exam-world','../challenge-exam-history','../challenge-review','coverage','bank-v2','math-v2','world-v2','regional','challenges','visuals','regional-visuals','engine'])vm.runInContext(fs.readFileSync(`web/cep/${f}.js`,'utf8'),c);return c.window;}
test('CEP: 616 questões completas e distintas; matriz independente do CPM',()=>{const w=load(),b=w.CEP_BANK,E=w.CEP_ENGINE;assert.equal(b.length,616);assert.equal(new Set(b.map(q=>q.id)).size,616);assert.equal(new Set(b.map(q=>q.base+'|'+q.prompt)).size,616);for(const [s,n]of Object.entries({portugues:177,matematica:165,ciencias:80,geografia:92,historia:102}))assert.equal(b.filter(q=>q.subject===s).length,n);for(const q of b)assert.deepEqual(Array.from(E.validate(q)),[],q.id);assert.equal(w.CEP_COVERAGE.coverage.length,88);assert.equal(b.filter(q=>q.items.includes('p13')).length,0);});
test('CEP: simulados 10/10/4/3/3 sem repetições, difíceis e gabarito estável após embaralhar',()=>{const w=load(),E=w.CEP_ENGINE;let changed=false;for(let run=0;run<50;run++){const questions=E.select(w.CEP_BANK,'simulado',{});assert.equal(questions.length,30);assert.equal(new Set(questions.map(q=>q.id)).size,30);for(const [s,n]of Object.entries(w.CEP_COVERAGE.distribution)){const group=questions.filter(q=>q.subject===s);assert.equal(group.length,n);assert.ok(group.every(q=>q.difficulty==='difícil'));}for(const q of questions){changed ||= q.options[0].id!=='a';const original=w.CEP_BANK.find(x=>x.id===q.id);assert.equal(q.options.find(o=>o.id===q.correctId).text,original.options.find(o=>o.id===original.correctId).text);}}assert.ok(changed);});
test('CEP: recalcula suspensão e correção posterior, com puladas e confiança',()=>{const w=load(),E=w.CEP_ENGINE,questions=E.select(w.CEP_BANK,'diagnóstico',{}),s={questions,answers:questions.map(q=>q.correctId),confidence:questions.map(()=>null),times:questions.map(()=>12),reasons:questions.map(()=>null)};s.answers[0]=null;s.confidence[1]='dúvida';let score=E.score(s,w.CEP_BANK);assert.equal(score.points,29);assert.equal(score.skipped,1);assert.equal(score.uncertain,1);const bank=w.CEP_BANK.map(q=>q.id===questions[1].id?{...q,status:'suspensa'}:q);score=E.score(s,bank);assert.equal(score.total,29);assert.equal(score.points,28);const corrected=bank.map(q=>q.id===questions[1].id?{...q,status:'revisada',correctId:'b'}:q);score=E.score(s,corrected);assert.equal(score.total,30);assert.equal(score.points,28);});
test('CEP: revisão inclui acerto inseguro e prefere questões novas da mesma habilidade',()=>{const w=load(),E=w.CEP_ENGINE,q=w.CEP_BANK.find(x=>x.items[0]==='p03'),s={questions:[q],answers:[q.correctId],confidence:['chute'],times:[1],reasons:[null]};const selected=E.select(w.CEP_BANK,'revisão',{count:5},[s]);assert.ok(selected.every(x=>x.items.includes('p03')));assert.notEqual(selected[0].id,q.id);});
test('CEP: rascunho incompleto de questão usada não destrói a correção histórica',()=>{const w=load(),q=w.CEP_BANK[0],s={questions:[q],answers:[q.correctId],confidence:[null],times:[1],reasons:[null]},bank=[{...q,status:'rascunho',items:null,options:null}],r=w.CEP_ENGINE.score(s,bank);assert.equal(r.total,0);assert.equal(r.rows[0].q.id,q.id);assert.equal(r.rows[0].q.options.length,4);});
test('CEP: problemas de várias etapas têm resultados conferidos independentemente',()=>{
  const w=load(),answer=id=>{const q=w.CEP_BANK.find(q=>q.id===id);return q.options.find(o=>o.id===q.correctId).text;};
  const money=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}).replace(/\s/g,' ')+'.';
  const checks=[
    ['cep2-m006',String((245*6-78)/12)+'.'],
    ['cep2-m007',`${Math.ceil((134+11)/42)} ônibus e ${4*42-134-11} lugares vazios.`],
    ['cep2-m008',String(Math.ceil((73*4-237)/25))+'.'],
    ['cep2-m010',`${12} kits, cada um com ${48/12} lápis e ${36/12} borrachas.`],
    ['cep2-m012','1/2.'],
    ['cep2-m016',money(50-18.4*2.5)],
    ['cep2-m018',money(150-(120*.8+8))],
    ['cep2-m022',String(4+11*3)+'.'],
    ['cep2-m023',(4*(1200-450)).toLocaleString('pt-BR')+' g.'],
    ['cep2-m025',String(600/8*20-900)+' mL.'],
    ['cep2-m032',String(Math.round(1800*(1-3/5)-250))+' m.'],
    ['cep2-m037','R$ '+((2*(12+8)-2)*15)+'.'],
    ['cep2-m038',`${14*2**2} cm² e ${16*2**2} cm².`],
    ['cep2-m043',`${12*1.25+16+20*.8} livros.`],
    ['cep2-m044',`${(12+6/2)/30*100}%.`],
    ['cep2-m045',`${5-2+2}/${10-2+1}.`],
    ['cep2-m046',`${(18+21+19+21+21)/5} °C.`],
    ['cep2-m049',money(90/5*8*.9)],
    ['cep2-m050',`${Math.round(132/(1-(3/4)*(1-2/5)))} L.`]
  ];
  for(const [id,expected]of checks)assert.equal(answer(id),expected,id);
  assert.equal((w.CEP_VISUALS.grid2.match(/fill="#3156a4"/g)||[]).length,14);
  assert.match(w.CEP_VISUALS.grid2,/2 cm/);assert.ok(fs.existsSync('web/cep/brazil.svg'));
});
test('CEP: banco novo prioriza desafio; simulado tem 30 difíceis; diagnóstico varia mais',()=>{
 const w=load(),E=w.CEP_ENGINE;assert.equal(w.CEP_BANK.filter(q=>q.difficulty==='difícil').length,600);
 for(let i=0;i<30;i++){const s=E.select(w.CEP_BANK,'simulado',{});assert.equal(s.filter(q=>q.difficulty==='difícil').length,30);assert.equal(s.filter(q=>q.difficulty==='média').length,0);}
 const d=E.select(w.CEP_BANK,'diagnóstico',{});assert.ok(d.filter(q=>q.difficulty==='média').length>5);
 const challenge=E.select(w.CEP_BANK,'interpretação',{count:15});assert.ok(challenge.every(q=>q.difficulty==='difícil'));
});
test('CEP: reescrita preserva notas de sessões antigas e não seleciona o banco anterior',()=>{
 const w=load(),old={window:{CEP_COVERAGE:w.CEP_COVERAGE},Math,JSON};vm.createContext(old);
 for(const f of ['bank','math','world'])vm.runInContext(fs.readFileSync(`web/cep/${f}.js`,'utf8'),old);
 const q=old.window.CEP_BANK[0],s={questions:[q],answers:[q.correctId],confidence:[null],times:[1],reasons:[null]};
 assert.equal(w.CEP_ENGINE.score(s,w.CEP_BANK).points,1);
 assert.ok(w.CEP_ENGINE.select(w.CEP_BANK,'simulado',{}).every(q=>q.id.startsWith('cep2-')||q.id.startsWith('cep3-')));
 const covered=new Set(w.CEP_BANK.flatMap(q=>q.items));assert.equal(covered.size,87);assert.equal(covered.has('p13'),false);
});

