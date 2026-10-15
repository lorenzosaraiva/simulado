const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(){const c={window:{},Math,JSON,Date,Set,Map};vm.createContext(c);for(const f of ['../challenge-bank','../challenge-math','../challenge-world','../challenge-londrina-cmpa','../challenge-londrina-math','../challenge-londrina-world','../challenge-visuals','../challenge-exam','../challenge-exam-math','../challenge-exam-world','../challenge-exam-history','../challenge-review','coverage','bank-v2','math-v2','world-v2','regional','challenges','visuals','regional-visuals','engine','learning','lessons','lessons-portuguese','lessons-math','lessons-world','regional-lessons'])vm.runInContext(fs.readFileSync(`web/cep/${f}.js`,'utf8'),c);return c.window;}
function session(q,id,when,answer=q.correctId,confidence='certeza'){return {id,started:when-1000,finished:when,questions:[q],answers:[answer],confidence:[confidence],times:[20],reasons:[null],revealed:[false],tries:[0]};}
test('CEP: 42 aulas próprias, exemplos e testes completos; livro continua pendente',()=>{
 const w=load(),L=w.CEP_LESSONS;assert.equal(L.lessons.length,42);assert.equal(Object.keys(L.byItem).length,87);assert.equal(L.byItem.p13,undefined);
 assert.equal(new Set(L.lessons.map(l=>l.id)).size,42);
 for(const l of L.lessons){assert.ok(l.concept.join(' ').length>300,l.id);assert.ok(l.method.length>=3);assert.ok(l.example.steps.length>=3);assert.equal(l.compare.length,3);assert.equal(l.check.options.length,4);assert.equal(new Set(l.check.options.map(o=>o.id)).size,4);assert.equal(new Set(l.check.options.map(o=>o.text)).size,4);assert.equal(l.check.options.filter(o=>o.id===l.check.correctId).length,1);assert.ok(l.check.options.every(o=>o.explanation));assert.ok(l.items.every(id=>w.CEP_COVERAGE.coverage.some(i=>i.id===id)));assert.ok(!w.CEP_BANK.some(q=>q.base===l.check.base&&q.prompt===l.check.prompt),l.id);}
});
test('CEP: primeira resposta errada permanece na revisão mesmo após correção assistida',()=>{
 const w=load(),q=w.CEP_BANK[0],s=session(q,'s',1000);s.firstAnswers=['b'];s.firstConfidence=['dúvida'];s.answers=[q.correctId];s.tries=[2];s.revealed=[true];s.rivals=['c'];
 const r=w.CEP_LEARNING.analyze(w.CEP_BANK,[s],2000);assert.equal(r.pending.length,1);assert.equal(r.pending[0].outcome,'erro');assert.equal(r.pending[0].answer,'b');assert.equal(r.pending[0].rival,'c');assert.equal(r.skills.get(q.items[0]).secure,0);
 const next=session(q,'s2',3000);assert.equal(w.CEP_LEARNING.analyze(w.CEP_BANK,[s,next],4000).pending.length,0);
});
test('CEP: assistência antiga sem primeira resposta não vira evidência independente',()=>{
 const w=load(),q=w.CEP_BANK[0],s=session(q,'old',1000);s.tries=[1];s.revealed=[true];
 const r=w.CEP_LEARNING.analyze(w.CEP_BANK,[s],2000);assert.equal(r.pending[0].outcome,'com-ajuda');assert.equal(r.skills.get(q.items[0]).observations,0);
});
test('CEP: repetir um único item não confirma habilidade; exige itens e sessões diferentes',()=>{
 const w=load(),pool=w.CEP_BANK.filter(q=>q.items.includes('p03')),history=Array.from({length:8},(_,i)=>session(pool[0],'s'+i,1000+i));
 assert.equal(w.CEP_LEARNING.analyze(w.CEP_BANK,history,2000).skills.get('p03').confirmed,false);
 const distinct=pool.slice(0,4).map((q,i)=>session(q,'s'+i,1000+i));const stat=w.CEP_LEARNING.analyze(w.CEP_BANK,distinct,2000).skills.get('p03');assert.equal(stat.confirmed,true);assert.equal(stat.questions,4);assert.equal(stat.due,1003+7*86400000);
 const noConfidence=distinct.map(s=>({...s,confidence:[null]}));assert.equal(w.CEP_LEARNING.analyze(w.CEP_BANK,noConfidence,2000).skills.get('p03').confirmed,false);
});
test('CEP: revisão recalcula suspensões e gabaritos; novas questões preservam o foco',()=>{
 const w=load(),q=w.CEP_BANK.find(q=>q.items[0]==='m09'),s=session(q,'s',1000,'b','dúvida');
 const selected=w.CEP_ENGINE.select(w.CEP_BANK,'revisão',{item:'m09',count:5},[s]);assert.ok(selected.every(q=>q.items.includes('m09')));assert.notEqual(selected[0].id,q.id);assert.equal(new Set(selected.map(q=>q.id)).size,selected.length);
 const replay=w.CEP_ENGINE.select(w.CEP_BANK,'revisão',{questionId:q.id,repeat:true,count:5},[s]);assert.equal(replay[0].id,q.id);
 const suspended=w.CEP_BANK.map(x=>x.id===q.id?{...x,status:'suspensa'}:x);assert.equal(w.CEP_LEARNING.analyze(suspended,[s],2000).pending.length,0);
 const corrected=w.CEP_BANK.map(x=>x.id===q.id?{...x,correctId:'b'}:x);const r=w.CEP_LEARNING.analyze(corrected,[s],2000);assert.equal(r.pending[0].outcome,'inseguro');
});
test('CEP: erro recorrente e revisão por prazo; datas calculadas das respostas',()=>{
 const w=load(),q=w.CEP_BANK[0],h=[session(q,'s1',1000,'b'),session(q,'s2',2000,'b')];const stat=w.CEP_LEARNING.analyze(w.CEP_BANK,h,2000+86400000).skills.get(q.items[0]);assert.equal(stat.recurring,true);assert.equal(stat.status,'Retomar conteúdo');assert.equal(stat.overdue,true);assert.equal(stat.due,2000+86400000);
});
test('CEP: refazer questão com item secundário não amplia o treino para assuntos alheios',()=>{
 const w=load(),q=w.CEP_BANK.find(q=>q.items[0]==='m09'&&q.items.includes('m04')),s=session(q,'s',1000,'b');
 const selected=w.CEP_ENGINE.select(w.CEP_BANK,'revisão',{questionId:q.id,repeat:true,count:15},[s]);assert.equal(selected[0].id,q.id);assert.ok(selected.every(q=>q.items.includes('m09')));
});
test('CEP: exemplos matemáticos e testes de aula conferidos sem usar o gabarito do banco',()=>{
 const w=load(),c=id=>w.CEP_LESSONS.lessons.find(l=>l.id===id).check.options[0].text;
 const checks=[['operacoes',String((180*4-36)/9)+'.'],['fracoes','2/5.'],['porcentagens','R$ '+(200-(150*.8+10))+'.'],['padroes',String((2*(2*(2*4-1)-1)-1)-(2*(2*4-1)-1))+'.'],['igualdade',`8 × 30 − 8 × 2 = ${8*(30-2)}.`],['percursos',String(2*(3*6+2*4))+' m.'],['area',String((12-2)*3**2)+' cm².'],['volume',String(5*2*(6-2))+' cm³.'],['dados',String((12+8/2)/40*100)+'%.'],['probabilidade',`${6-2}/${6+4-2+2}.`]];
 for(const [id,expected]of checks)assert.equal(c(id),expected,id);
});
