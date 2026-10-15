const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(){const c={window:{},Math,Date,JSON};vm.createContext(c);for(const f of ['challenge-bank','challenge-math','challenge-world','challenge-londrina-cmpa','challenge-londrina-math','challenge-londrina-world','challenge-visuals','challenge-exam','challenge-exam-math','challenge-exam-world','challenge-exam-history','challenge-review','extra-questions','questions','practice','cep/coverage','cep/bank-v2','cep/math-v2','cep/world-v2','cep/regional','cep/challenges','cep/visuals','cep/regional-visuals','cep/engine'])vm.runInContext(fs.readFileSync(`web/${f}.js`,'utf8'),c);return c.window;}
const seed=()=>{let x=1389;return()=>((x=Math.imul(x,1664525)+1013904223)>>>0)/4294967296;};
test('312 desafios têm estímulos distintos, quatro justificativas e entram em CPM e CEP',()=>{
 const w=load(),q=w.CHALLENGE_BANK.questions.filter(q=>!q.examStyle),bank=w.CPM_DATA.buildQuestionBank();assert.equal(q.length,312);
 for(const [s,n]of Object.entries({portugues:98,matematica:90,ciencias:42,geografia:41,historia:41}))assert.equal(q.filter(q=>q.subject===s).length,n);
 assert.equal(new Set(q.map(q=>q.base+'|'+q.prompt)).size,312);
 assert.equal(new Set(q.filter(q=>q.subject==='portugues').map(q=>q.base)).size,49);
 for(const shared of q){const cep=w.CEP_BANK.find(q=>q.id===`cep3-${shared.id}`),cpm=bank[shared.subject].find(q=>q.id===shared.id);assert.ok(cep&&cpm);assert.deepEqual(Array.from(w.CEP_ENGINE.validate(cep)),[]);assert.equal(cpm.options[cpm.correct],cep.options.find(o=>o.id===cep.correctId).text);assert.match(cpm.origin,/Criada por IA/);for(const o of cep.options)assert.ok(o.explanation.length>20,shared.id);}
});
test('oito simulados CEP difíceis consecutivos sem repetir questões, incluindo sessões abandonadas',()=>{
 const w=load(),E=w.CEP_ENGINE,draws=[],seen=new Set(),random=seed();
 for(let n=0;n<8;n++){const qs=E.select(w.CEP_BANK,'simulado',{},[],draws,random);assert.equal(qs.length,30);assert.ok(qs.every(q=>q.difficulty==='difícil'));for(const q of qs){assert.ok(!seen.has(q.id),`${n}: ${q.id}`);seen.add(q.id);}draws.push(qs.map(q=>q.id));}
});
test('CEP não força habilidade já vista quando ainda existem perguntas novas do mesmo nível',()=>{
 const w=load(),E=w.CEP_ENGINE;w.CEP_COVERAGE.distribution={portugues:3};
 const make=(id,item)=>({...w.CEP_BANK[0],id,items:[item],family:id,difficulty:'difícil'});
 const seen=make('visto','p01'),pool=[seen,...Array.from({length:6},(_,i)=>make(`novo${i}`,'p03'))];
 const qs=E.select(pool,'simulado',{},[],[['visto']],()=>0);
 assert.ok(qs.every(q=>q.id!=='visto'));assert.equal(new Set(qs.map(q=>q.id)).size,3);
});
test('CEP repete só após esgotar filtro; contabiliza sorteios antigos e limita ao banco disponível',()=>{
 const w=load(),E=w.CEP_ENGINE,pool=w.CEP_BANK.filter(q=>q.id.startsWith('cep3-desafio-m')).slice(0,4),draws=[];
 const first=E.select(pool,'treino',{count:2},[],draws,()=>0);draws.push(first.map(q=>q.id));
 const second=E.select(pool,'treino',{count:2},[],draws,()=>0);assert.ok(second.every(q=>!first.some(old=>old.id===q.id)));draws.push(second.map(q=>q.id));
 const exhausted=E.select(pool,'treino',{count:10},[],draws,()=>0);assert.equal(exhausted.length,4);assert.equal(new Set(exhausted.map(q=>q.id)).size,4);
 // Old abandoned sessions outside the last-three window still count as exposure.
 const recent=[first.map(q=>q.id),[],[],[]];const rotated=E.select(pool,'treino',{count:2},[],recent,()=>0);assert.ok(rotated.every(q=>!first.some(old=>old.id===q.id)));
});
test('CPM prioriza desafio inédito e diversifica textos e famílias de problemas',()=>{
 const w=load(),E=w.CPM_PRACTICE,bank=w.CPM_DATA.buildQuestionBank(),draws=[],random=seed(),seen=new Set();
 for(let run=0;run<3;run++){const qs=E.select(bank,w.CPM_DATA.DISTRIBUTION,'new',draws,random);assert.equal(qs.length,35);for(const q of qs){assert.ok(!seen.has(E.fingerprint(q)));seen.add(E.fingerprint(q));}if(run===0){assert.ok(qs.every(q=>q.difficulty==='difícil'));assert.equal(new Set(qs.filter(q=>q.subject==='portugues').map(E.family)).size,15);assert.equal(new Set(qs.filter(q=>q.subject==='matematica').map(E.family)).size,10);}draws.unshift({keys:qs.map(E.fingerprint),families:qs.map(E.family)});}
});
test('32 gabaritos matemáticos conferidos com contas e enumerações independentes',()=>{
 const w=load(),byFamily=new Map(w.CHALLENGE_BANK.questions.filter(q=>q.subject==='matematica').map(q=>[q.family,q.options.find(o=>o.id===q.correctId).text]));
 const gcd=(a,b)=>b?gcd(b,a%b):a;
 let min=Infinity;for(let packs=0;packs<=10;packs++)min=Math.min(min,packs*120+Math.max(0,93-10*packs)*14);
 let painted=0;for(let x=0;x<3;x++)for(let y=0;y<3;y++)for(let z=0;z<3;z++)if([x,y,z].filter(v=>v===0||v===2).length===2)painted++;
 let passwords=0;for(const a of [1,2,3,4])for(const b of [1,2,3,4])for(const c of [2,4])if(new Set([a,b,c]).size===3)passwords++;
 let workdays=0;for(let day=1;day<=30;day++)if((day-1)%7<5&&![12,22].includes(day))workdays++;
 let seq=2;for(let i=1;i<6;i++)seq+=2*i+1;
 const money=n=>'R$ '+n.toLocaleString('pt-BR')+'.';
 const checks={
 'ingressos-pacotes':money(min), 'fracao-inversa':`${54/(3/4*3/5)} peças.`,
 'descontos-sucessivos':`Na segunda loja, por R$ ${250*.8*.9-175}.`, 'torneiras-vazamento':`${96/(18/3+20/5-2)} minutos.`,
 'sinais-encontro':'Às 10h24.', 'kits-maximos':`${gcd(gcd(84,126),210)} kits: 2 lápis, 3 borrachas e 5 folhas.`,
 'cerca-composta':`${2*(16+5)-2} m.`, 'piso-recorte':`${Math.ceil((7*6-2*3)*1.1/4)} caixas.`, 'cubos-pintados':`${painted} cubinhos.`,
 'percurso-voltas':`Entre C e D, a ${2150%(2*(180+120))-180-120} m de C.`, 'horarios-intervalos':`${(17*60-(13*60+45))-4*35-3*10} minutos.`,
 'media-ponderada':`${(12*8+18*3)/(12+18)} livros por aluno.`, 'sorteio-sem-reposicao':'3/7.', 'contagem-restricao':`${passwords} senhas.`,
 'sequencia-crescimentos':`${seq}.`, 'ordens-decimais':`${(37040-34070).toLocaleString('pt-BR')}.`, 'massa-embalagem':`${(1860-6*250)/6} g.`,
 'escala-maquete':'7,2 m.', 'vans-lotacao':`${Math.ceil((53+8)/12)*12-53-8} lugares.`, 'meta-coletiva':`${(200*.3+300*.2+500*.1)/(200+300+500)*100}%.`,
 'balanca-caixas':`${(900-200)/(3-1)} g.`, 'tabela-total-unico':`${60-(38+27-16)} alunos.`, 'quadrado-moldura':`${10**2-(10-2)**2} cm².`,
 'mistura-fracoes':'1/5.', 'calendario-coleta':`${workdays*2} toneladas.`, 'paridade-fichas':'17 faces pretas.',
 'tarifas-comparadas':`A, economizando R$ ${(6+5*8)-(18+3*8)}.`, 'dobras-simetria':`${2*(12/2+8)} cm.`,
 'idades-diferenca':`${(14+4)/2-4} anos.`, 'ordenacao-distancias':'Ana, Caio, Beto; Ana está 4 m à frente de Caio.',
 'palitos-quadrados':`${(61-1)/3} quadrados.`, 'volume-transferencia':`${Math.floor(40*25*20/750)} frascos cheios e ${40*25*20%750} mL.`};
 assert.equal(Object.keys(checks).length,32);for(const [family,expected]of Object.entries(checks))assert.equal(byFamily.get(family),expected,family);
});
