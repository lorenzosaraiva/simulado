const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),load=require('../scripts/read-bank');
const answer=q=>q.options.find(o=>o.id===q.correctId).text;
test('118 novas questões com referência exata ao acervo; CEP respeita seu escopo',()=>{
 const w=load(),qs=w.CHALLENGE_BANK.questions.filter(q=>q.examStyle),cpm=w.CPM_DATA.buildQuestionBank();assert.equal(qs.length,118);
 for(const [s,n]of Object.entries({portugues:28,matematica:24,ciencias:18,geografia:18,historia:30}))assert.equal(qs.filter(q=>q.subject===s).length,n);
 for(const q of qs){const doc=w.CPM_ARCHIVE.find(d=>d.id===q.examReference.archiveId);assert.equal(q.references[0].url,doc.pdf);assert.ok(fs.existsSync('web/'+doc.pdf));assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.equal(cpm[q.subject].find(x=>x.id===q.id).options[cpm[q.subject].find(x=>x.id===q.id).correct],answer(q));const cep=w.CEP_BANK.find(x=>x.id===`cep3-${q.id}`);if(q.schools.includes('cep')){assert.ok(cep);assert.deepEqual(Array.from(w.CEP_ENGINE.validate(cep)),[]);assert.equal(answer(cep),answer(q));}else assert.equal(cep,undefined);}
 assert.equal(w.CEP_BANK.length,616);assert.equal(w.CEP_REGIONAL.count,64);assert.equal(qs.filter(q=>q.collection==='parana-curitiba').length,28);
});
test('24 resultados matemáticos conferidos por cálculo independente',()=>{
 const qs=load().CHALLENGE_BANK.questions.filter(q=>q.examStyle&&q.subject==='matematica'),gcd=(a,b)=>b?gcd(b,a%b):a,lcm=(a,b)=>a*b/gcd(a,b),checks={};
 checks['volume-garrafas']=`${48*25*30/1000*.75/1.5} garrafas.`;
 checks['tanque-abastecer']='R$ '+(60*.7*6.85).toFixed(2).replace('.',',')+'.';
 checks['piscinas-unidades']=( (8*5*1.2-6*4*.5)*1000).toLocaleString('pt-BR')+' L.';
 checks['voltas-sincronizadas']=`${lcm(lcm(72,90),120)/72} voltas.`;
 const piece=gcd(gcd(144,180),216);checks['cordas-maximo']=`${(144+180+216)/piece} pedaços.`;
 checks['reservatorio-restante']=`${240*(1-3/8)*(1-2/5)} L.`;
 checks['grafico-devolucoes']=`${[18,24,30,36].reduce((a,b)=>a+b,0)*5/6} livros.`;
 checks['receita-proporcao']=`${(750*30/18/1000).toFixed(2).replace('.',',')} kg de farinha e ${450*30/18} mL de leite.`;
 const cells=new Set();for(let x=0;x<6;x++)for(let y=0;y<4;y++)if(!(x>=4&&y<2))cells.add(`${x},${y}`);
 let sides=0;for(const key of cells){const[x,y]=key.split(',').map(Number);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]])if(!cells.has(`${x+dx},${y+dy}`))sides++;}
 checks['piso-area-recorte']=`${cells.size*.5**2} m².`;checks['piso-perimetro-recorte']=`${sides*.5} m.`;
 const n=5;checks['prisma-pentagonal']=`${n+2} faces, ${2*n} vértices e ${3*n} arestas.`;
 checks['dado-opostos']='Ela é adequada: os pares opostos são 1 e 6, 2 e 5, 3 e 4.';
 const scores=[[8,4],[5,6],[11,2],[6,5]].map(([a,b])=>a*2+b*3);assert.deepEqual(scores,[28,28,28,27]);checks['cestas-comparar']=`${scores[3]+2-scores[0]} ponto.`;
 const vals={A:(4.8-1.2)/.6+3,B:4.8-1.2/.6+3,C:9.6-(1.2/.6+3)};checks['expressao-prioridade']=Object.keys(vals).sort((a,b)=>vals[a]-vals[b]).join(', ')+'.';
 const mins=14*60+35+78+102+15;checks['tempo-filmes']=`${Math.floor(mins/60)}h${mins%60}.`;
 const a=6*12*.75,b=6*10+4;checks['promocao-comparar']=`Loja A, por R$ ${b-a}.`;
 checks['decimal-posicao']=(9053-8700)/1000+'';checks['decimal-posicao']=checks['decimal-posicao'].replace('.',',')+'.';
 checks['bolas-restantes']=`${4+1}/${6+4+2-2-1}.`;
 const heights=[[2,3,1],[1,1,2]];checks['pilhas-vista']=heights[0].map((v,i)=>Math.max(v,heights[1][i])).join(', ').replace(', 2',' e 2')+' cubos.';
 checks['pilhas-volume']=`${heights.flat().reduce((a,b)=>a+b,0)*2**3} cm³.`;
 const votes={A:3/8*100,B:35,C:100-3/8*100-35};checks['chapas-fracoes']=Object.keys(votes).sort((a,b)=>votes[b]-votes[a]).join(', ')+`; C recebeu ${String(votes.C).replace('.',',')}%.`;
 checks['triangulos-lados']='I equilátero; II isósceles; III escaleno.';
 checks['passos-paradas']=`${(18-3)*60*2*55/100} m.`;
 checks['lajotas-compra']=`${Math.round(4.8*3/.3**2*1.1)} lajotas.`;
 assert.equal(Object.keys(checks).length,24);for(const q of qs)assert.equal(answer(q),checks[q.family.slice(3)],q.family);
});
test('planificação do dado: oposição obtida por dobra geométrica',()=>{
 const faces=new Map(['1,0:3','0,1:2','1,1:1','2,1:5','1,2:4','1,3:6'].map(s=>{const[k,v]=s.split(':');return[k,+v];}));
 const neg=v=>v.map(x=>-x),folds=new Map([['1,1',[[1,0,0],[0,1,0],[0,0,1]]]]),todo=['1,1'];
 while(todo.length){const key=todo.shift(),[x,y]=key.split(',').map(Number),[u,v,n]=folds.get(key);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const k=`${x+dx},${y+dy}`;if(!faces.has(k)||folds.has(k))continue;folds.set(k,dx===1?[neg(n),v,u]:dx===-1?[n,v,neg(u)]:dy===1?[u,neg(n),v]:[u,n,neg(v)]);todo.push(k);}}
 assert.equal(folds.size,6);for(const[key,[,,n]]of folds){const opposite=[...folds].find(([,b])=>b[2].every((v,i)=>v===-n[i]));assert.equal(faces.get(key)+faces.get(opposite[0]),7);}
});
test('24 revisões preservam IDs e respostas; quatro charges usam leitura compartilhada',()=>{
 const w=load();assert.equal(w.EXAM_PR_BANK.revised.length,24);for(const id of w.EXAM_PR_BANK.revised){const q=w.CHALLENGE_BANK.questions.find(x=>x.id===id);assert.equal(q.correctId,'a');assert.equal(q.contentRevision,4);assert.ok(q.options.every(o=>o.explanation.length>25));}
 const reading=w.CHALLENGE_BANK.questions.filter(q=>q.examStyle&&q.subject==='portugues');assert.equal(new Set(reading.map(q=>w.CPM_PRACTICE.family(q))).size,8);assert.equal(reading.filter(q=>q.visual).length,12);
});
test('sorteios oferecem conteúdos alinhados e preservam prioridade de inéditas',()=>{
 const w=load(),bank=w.CPM_DATA.buildQuestionBank(),cpm=w.CPM_PRACTICE.select(bank,w.CPM_DATA.DISTRIBUTION,'new',[],()=>.4);
 assert.equal(cpm.length,35);assert.equal(cpm.filter(q=>q.subject==='matematica'&&q.examStyle).length,10);assert.ok(cpm.some(q=>q.subject==='historia'&&q.collection==='parana-curitiba'));assert.ok(new Set(cpm.filter(q=>q.subject==='portugues').map(w.CPM_PRACTICE.family)).size>=12);
 const first=w.CEP_ENGINE.select(w.CEP_BANK,'simulado',{},[],[],()=>.4),next=w.CEP_ENGINE.select(w.CEP_BANK,'simulado',{},[],[first.map(q=>q.id)],()=>.4);assert.ok(next.every(q=>!first.some(x=>x.id===q.id)));assert.ok(first.filter(q=>q.examStyle).length>=15);assert.ok(first.every(q=>q.difficulty==='difícil'));
});
