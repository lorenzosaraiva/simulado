const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
function load(){const c={window:{},Math,Date,JSON};vm.createContext(c);for(const f of ['challenge-bank','challenge-math','challenge-world','challenge-londrina-cmpa','challenge-londrina-math','challenge-londrina-world','challenge-visuals','challenge-exam','challenge-exam-math','challenge-exam-world','challenge-exam-history','challenge-review','archive','cep/coverage','cep/bank-v2','cep/math-v2','cep/world-v2','cep/regional','cep/challenges','cep/visuals','cep/engine'])vm.runInContext(fs.readFileSync(`web/${f}.js`,'utf8'),c);return c.window;}
test('160 questões adicionais usam os dois acervos, cobrem cinco matérias e conservam IDs anteriores',()=>{
 const w=load(),q=w.CHALLENGE_BANK.questions.filter(q=>q.collection==='londrina-cmpa');
 assert.equal(q.length,160);assert.equal(w.LONDRINA_CMPA_BANK.count,160);
 for(const [s,n]of Object.entries({portugues:50,matematica:50,ciencias:20,geografia:20,historia:20}))assert.equal(q.filter(q=>q.subject===s).length,n);
 assert.equal(new Set(q.filter(q=>q.subject==='portugues').map(q=>q.base)).size,25);
 assert.equal(new Set(q.filter(q=>q.subject==='matematica').map(q=>q.family)).size,50);
 assert.equal(w.CHALLENGE_BANK.questions[119].id,'desafio-h016');
 for(const question of q){assert.equal(question.difficulty,'difícil');assert.equal(question.references.length,1);const source=question.references[0];assert.ok(source.name&&source.note);if(source.url.startsWith('documents/'))assert.ok(w.CPM_ARCHIVE.some(entry=>entry.pdf===source.url));assert.equal(new Set(question.options.map(o=>o.text)).size,4);}
 assert.ok(q.some(q=>q.references[0].name.startsWith('CMPA')));assert.ok(q.some(q=>q.references[0].name.startsWith('CPM Curitiba')));
});
test('PDFs fornecidos e gabaritos correspondentes são preservados, com anos lidos no conteúdo',()=>{
 const archive=load().CPM_ARCHIVE;
 for(const [year,fileyear]of [[2020,2021],[2022,2022],[2023,2023],[2024,2024],[2025,2025]]){
  const entry=archive.find(e=>e.id===`pr-${year}`),name=`prova curitiba londrina ${fileyear}.pdf`;
  assert.equal(entry.pdf,`documents/${name}`);assert.ok(fs.readFileSync(name).equals(fs.readFileSync(`web/${entry.pdf}`)));
  const key=entry.answerKey.original;assert.ok(fs.readFileSync(`web/${key}`).equals(fs.readFileSync(key.replace('documents/',''))));
 }
 assert.match(archive.find(e=>e.id==='pr-2019').answerKey.original,/2020 gabarito/);
 assert.match(archive.find(e=>e.id==='pr-2021').answerKey.original,/2021 - Ensino Fundamental - Gabarito\.docx/);
 const rs=archive.filter(e=>e.region==='RS');assert.equal(rs.length,2);assert.deepEqual(Array.from(rs.map(e=>e.pages.length)),[35,33]);
 for(const e of rs){assert.equal(crypto.createHash('sha256').update(fs.readFileSync(`web/${e.pdf}`)).digest('hex'),e.sha256);assert.ok(e.answerKey.pages.length);}
});
test('50 novos resultados matemáticos conferidos por cálculo, enumeração e geometria',()=>{
 const math=load().CHALLENGE_BANK.questions.filter(q=>q.collection==='londrina-cmpa'&&q.subject==='matematica'),actual=new Map(math.map(q=>[q.family.slice(3),q.options[0].text]));
 const gcd=(a,b)=>b?gcd(b,a%b):a,lcm=(a,b)=>a*b/gcd(a,b);
 const checks={},set=(family,text)=>{checks[family]=text;},money=n=>'R$ '+n.toLocaleString('pt-BR')+'.';
 set('ritmo',`${(1/2+3/8+2/16)*32} partes.`);
 set('impressoras-atraso',`${(282-24*5-18*4)/3} páginas por minuto.`);
 set('piscina-rampa',`${((8*5*(1+3)/2-72)/(8*5))*100} cm.`);
 // Count each touching pair twice, since both faces are hidden.
 let hidden=0;for(let x=0;x<2;x++)for(let y=0;y<2;y++)for(let z=0;z<2;z++)for(const [dx,dy,dz]of [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]])if([x+dx,y+dy,z+dz].every(v=>v>=0&&v<2))hidden++;
 set('faces-internas',`${hidden*4} cm².`);set('pace',`${(60/(6*.8)).toLocaleString('pt-BR')} km/h.`);
 const seconds=14*3600+7*60+20+2*lcm(lcm(18,24),30);set('repeticao-tripla',`${Math.floor(seconds/3600)}h${String(Math.floor(seconds/60)%60).padStart(2,'0')}min${seconds%60}s.`);
 set('media-semana',`${(90*7-[70,110,80,95,85].reduce((a,b)=>a+b,0))/2} minutos por dia.`);
 set('concentracao',`${(24/400*150)/(15/500)-150} mL.`);
 const heights=[[1,3,2],[2,1,4]];set('pilha-alturas',`${heights.flat().reduce((a,b)=>a+b,0)} cubos; alturas ${heights[0].map((v,i)=>Math.max(v,heights[1][i])).join(', ').replace(', 4',' e 4')}.`);
 set('notas-distribuidas',`${((10+15*2+5*3+10*4)/40).toLocaleString('pt-BR')}.`);
 function permutations(a){if(!a.length)return [[]];return a.flatMap((x,i)=>permutations(a.filter((_,j)=>i!==j)).map(rest=>[x,...rest]));}
 const smallest=permutations([0,2,4,5,8]).filter(a=>a[0]!==0&&a[4]===5).map(a=>Number(a.join(''))).sort((a,b)=>a-b)[0];set('digitos-restritos',`${Math.floor(smallest/100)%10*100}.`);
 const types=[['cubo',6],['tetraedro',4],['prisma triangular',5],['pirâmide quadrangular',5],['prisma hexagonal',8]],pairs=[];for(let a=0;a<types.length;a++)for(let b=a;b<types.length;b++)if(types[a][1]+types[b][1]===39-2*6-2*4-5)pairs.push([types[a][0],types[b][0]]);assert.deepEqual(pairs,[['cubo','prisma hexagonal']]);set('solidos-restantes','Um cubo e um prisma hexagonal.');
 const union=40-8,overlap=22+18-union;const num=18-overlap,den=union,d=gcd(num,den);set('conjuntos-condicional',`${num/d}/${den/d}.`);
 const shopA=4*8+2*8,shopB=7*8*.85;assert.ok(shopB<shopA);set('promocao-real',`Loja B, por R$ ${shopB.toFixed(2).replace('.',',')}.`);
 set('resto-vertice',`${3*5*8%7}.`);set('medalhas-materiais',`${3*2+((42-3*4)/6)*5} g.`);set('cordas-area',`${(Math.sqrt(64)*4*3/6/4)**2} m².`);
 let values=0;for(let n=0;n<1000;n++)if(n>407&&n<412)values++;set('decimais-intervalo',`${values} valores.`);
 const outline=[[0,0],[4,0],[4,1],[6,1],[6,4],[0,4]],perimeter=outline.reduce((sum,a,i)=>{const b=outline[(i+1)%outline.length];return sum+Math.hypot(a[0]-b[0],a[1]-b[1]);},0);set('quarto-recortado',`${6*4-2*1} m² e ${perimeter} m.`);
 set('expressao-decimal',`${(0.02+0.03*6+0.8)/.04}.`);set('caixas-iguais',`${144/gcd(144,216)+216/gcd(144,216)} caixas.`);set('porcentagem-inversa',money(220/.88));set('percentual-populacao',`${(80*.25+20)/(80+20)*100}%.`);
 set('fracoes-restante','1/2.');assert.equal(5/6*(1-2/5),.5);set('fracao-sobra-inversa',`${45/((1-1/3)*(1-1/4))} livros.`);
 set('trabalho-pausas','3 horas e 30 minutos.');assert.equal(900/(600/(4*3)*6)+.5,3.5);set('embalagens-retornadas',`${(9-20*.075).toLocaleString('pt-BR')} kg.`);
 const arrival=(22*60+45+5*60+35+40)%(24*60);set('horario-pernoite',`${Math.floor(arrival/60)}h${String(arrival%60).padStart(2,'0')}.`);
 set('portoes-cerca',`${(2*(24+15)-3-2)*3} m.`);set('ladrilhos-borda',`${9*7-(9-2)*(7-2)} m².`);set('volume-derramado',`${(30*20*15-1800)/(30*20)} cm.`);
 set('diagonal-poligono','Losango, mas não quadrado.');set('prisma-arestas',`${2*5} vértices e ${3*5} arestas.`);set('vista-lateral',`Frontal: altura ${Math.max(2,4,3)}; lateral: três colunas de alturas 2, 4 e 3.`);
 let direction=0,x=0,y=0;const vectors=[[0,1],[1,0],[0,-1],[-1,0]];for(const [turn,steps]of [[1,4],[2,1],[-1,2]]){direction=(direction+turn+4)%4;x+=vectors[direction][0]*steps;y+=vectors[direction][1]*steps;}set('robo-orientacao',`${x} m a leste e ${-y} m ao sul.`);
 set('bolas-duas','1/10.');assert.equal((2*1)/(5*4),.1);set('senhas-zero',`${permutations([0,1,2]).length} senhas.`);set('figuras-triangulares',`${6*7/2} pontos.`);set('igualdade-balanca',`${(850-150)/(3-1)} g.`);set('grafico-escala',`${120-(4+7+5)*6} livros.`);set('media-retirada',`${(5*18-26)/4} peças.`);set('troco-peso',money(50-(1.25*8+.75*12)));set('parcelas-entrada',money(180+6*145-960));set('divisao-decimal',`${720/45} partes.`);
 assert.equal(3/5,.6);assert.ok(.59<.6&&.6<5/8);set('ordenacao-racionais','0,59 < 0,6 = 3/5 < 5/8.');for(let n=0;n<100;n++)assert.equal((n+n+1+n+2+n+3)%4,2);set('paridade-soma','É par, mas não é múltipla de 4.');
 const nums=[];for(let n=400;n<500;n++)if(n%10===5&&n%9===0)nums.push(n);set('divisibilidade-menor',`${Math.min(...nums)}.`);set('soma-diferenca',`${(154-28)/2} fichas.`);
 const rabbits=[];for(let r=0;r<=17;r++)if(r*4+(17-r)*2===48)rabbits.push(r);assert.equal(rabbits.length,1);set('pes-agricola',`${rabbits[0]} coelhos.`);set('temperatura-diferenca',`${3+9-5} °C; superou a inicial em ${9-5} °C.`);
 assert.equal(Object.keys(checks).length,50);for(const [family,expected]of Object.entries(checks))assert.equal(actual.get(family),expected,family);
});
