const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(){const c={window:{},Math,JSON,Date,Set,Map};vm.createContext(c);for(const f of ['../challenge-bank','../challenge-math','../challenge-world','../challenge-londrina-cmpa','../challenge-londrina-math','../challenge-londrina-world','../challenge-visuals','../challenge-exam','../challenge-exam-math','../challenge-exam-world','../challenge-exam-history','../challenge-review','coverage','bank-v2','math-v2','world-v2','regional','challenges','visuals','regional-visuals','engine','learning','lessons','lessons-portuguese','lessons-math','lessons-world','regional-lessons'])vm.runInContext(fs.readFileSync(`web/cep/${f}.js`,'utf8'),c);return c.window;}
test('CEP regional: 36 questões autorais difíceis, referências individuais e aulas preservadas',()=>{
 const w=load(),b=w.CEP_BANK.filter(q=>q.collection===w.CEP_REGIONAL.collection&&!q.examStyle);
 assert.equal(b.length,36);for(const subject of ['historia','geografia'])assert.equal(b.filter(q=>q.subject===subject).length,18);
 for(const q of b){assert.equal(q.difficulty,'difícil');assert.equal(q.origin.type,'autoral');assert.equal(q.origin.page,null);assert.ok(q.origin.references.length);assert.ok(q.origin.references.every(r=>(r.url.startsWith('https://')||r.url.startsWith('documents/'))&&r.note.length>30&&r.name));assert.deepEqual(Array.from(w.CEP_ENGINE.validate(q)),[]);}
 assert.equal(w.CEP_LESSONS.lessons.length,42);assert.equal(w.CEP_LESSONS.byItem.h09.id,'historia-local');assert.equal(w.CEP_LESSONS.byItem.h09.check.id,'historia-local-check');assert.ok(w.CEP_LESSONS.byItem.h09.regional);assert.ok(w.CEP_LESSONS.byItem.g06.regional);
});
test('CEP regional: filtro respeita coleção, matéria e quantidade, evita repetição e prioriza itens ainda não vistos',()=>{
 const w=load(),E=w.CEP_ENGINE,f={collection:w.CEP_REGIONAL.collection,subject:'geografia',difficulty:'difícil',count:15},a=E.select(w.CEP_BANK,'treino',f);
 assert.equal(a.length,15);assert.equal(new Set(a.map(q=>q.id)).size,15);assert.ok(a.every(q=>q.subject==='geografia'&&q.collection===f.collection));
 const h={questions:a,answers:a.map(q=>q.correctId),confidence:a.map(()=> 'certeza'),times:a.map(()=>1),reasons:a.map(()=>null)},b=E.select(w.CEP_BANK,'treino',{...f,count:3},[h],[a.map(q=>q.id)]);
 assert.ok(b.every(q=>!a.some(x=>x.id===q.id)));
});
test('CEP regional: resultados numéricos conferidos fora do gabarito e desenhos coerentes com dados',()=>{
 const w=load(),b=w.CEP_BANK.filter(q=>q.collection),answer=needle=>{const q=b.find(q=>q.prompt.includes(needle));assert.ok(q,needle);return q.options.find(o=>o.id===q.correctId).text;};
 assert.ok(answer('dois intervalos').includes(String(1853-1693)));assert.ok(answer('dois intervalos').includes(String((1853-1693)-(1889-1853))));
 assert.ok(answer('legenda relaciona').includes(String(1693-1648)));assert.ok(answer('idade do marco').includes(String(2027-1693)));assert.ok(answer('idade do marco').includes(String(2027-1853)));
 assert.equal(answer('quantifica uma alteração'),`O escoamento aumenta ${80-30} L e a infiltração diminui ${55-10} L.`);
 assert.equal(answer('mantém o total da chuva'),`O escoamento total passa de ${30+80} L a ${30+30} L, recebendo os mesmos ${100*2} L.`);
 assert.ok(answer('percentual de araucárias').includes((100/(400-80)*100).toLocaleString('pt-BR')+'%'));
 assert.ok(answer('orientação e distância').includes('1.000 m'));
 assert.match(w.CEP_VISUALS.regionalRoute,/M200 280H320V100/);assert.equal((320-200)/(280-100),400/600);
 assert.match(w.CEP_VISUALS.regionalRain,/width="198"/);assert.equal(198/288,55/80);
 assert.ok(b.filter(q=>q.visual).every(q=>/<(?:svg|img)\b/.test(w.CEP_VISUALS[q.visual])));
});
test('CEP regional: erro permanece após ajuda e revisão encontra outras questões da habilidade',()=>{
 const w=load(),q=w.CEP_BANK.find(q=>q.collection&&q.items[0]==='h09'),s={id:'regional',finished:1000,questions:[q],answers:[q.correctId],firstAnswers:['b'],firstConfidence:['dúvida'],confidence:['certeza'],revealed:[true],tries:[2],times:[5],reasons:[null]};
 assert.equal(w.CEP_LEARNING.analyze(w.CEP_BANK,[s],2000).pending[0].outcome,'erro');const next=w.CEP_ENGINE.select(w.CEP_BANK,'revisão',{questionId:q.id,repeat:true,count:5},[s]);assert.equal(next[0].id,q.id);assert.ok(next.every(x=>x.items.includes('h09')));assert.ok(next.some(x=>x.id!==q.id&&x.collection));
});
