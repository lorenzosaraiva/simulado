const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(){const c={window:{},Math,Date,JSON};vm.createContext(c);for(const f of ['challenge-bank','challenge-math','challenge-world','challenge-londrina-cmpa','challenge-londrina-math','challenge-londrina-world','challenge-visuals','challenge-exam','challenge-exam-math','challenge-exam-world','challenge-exam-history','challenge-review','extra-questions','questions','practice','cep/coverage','cep/bank-v2','cep/math-v2','cep/world-v2','cep/regional','cep/challenges','cep/visuals','cep/regional-visuals','cep/engine'])vm.runInContext(fs.readFileSync(`web/${f}.js`,'utf8'),c);return c.window;}
const rects=(svg,color)=>Array.from(svg.matchAll(/<rect\b[^>]*>/g)).filter(m=>m[0].includes(`fill="${color}"`)).map(m=>Object.fromEntries(Array.from(m[0].matchAll(/\s(x|y|width|height)="([\d.]+)"/g),x=>[x[1],Number(x[2])])));
test('32 novos itens têm imagem real nos dois bancos, em cinco matérias; 11 antigos recebem desenhos sem mudar identidade',()=>{
 const w=load(),visual=w.CHALLENGE_BANK.questions.filter(q=>q.collection==='visuais'),bank=w.CPM_DATA.buildQuestionBank();
 assert.deepEqual({...w.VISUAL_QUESTION_BANK},{added:32,illustrated:43,graphics:37});
 for(const [subject,n]of Object.entries({portugues:8,matematica:8,ciencias:6,geografia:5,historia:5}))assert.equal(visual.filter(q=>q.subject===subject).length,n);
 assert.equal(new Set(visual.filter(q=>q.subject==='portugues').map(q=>q.visual)).size,4);
 for(const q of w.CHALLENGE_BANK.questions.filter(q=>q.visual)){
  assert.match(w.CHALLENGE_VISUALS[q.visual],/^<(svg|img)\b/);assert.ok(q.visualAlt.length>30,q.id);
  const cep=w.CEP_BANK.find(x=>x.id===`cep3-${q.id}`),cpm=bank[q.subject].find(x=>x.id===q.id);
  assert.deepEqual(Array.from(w.CEP_ENGINE.validate(cep)),[],q.id);assert.equal(cep.visual,cpm.visual);assert.equal(w.CEP_VISUALS[cep.visual],w.CHALLENGE_VISUALS[cpm.visual]);
  // Illustration metadata must not change the identity used by saved draws.
  assert.equal(w.CPM_PRACTICE.fingerprint(cpm),w.CPM_PRACTICE.fingerprint({...cpm,visual:null}));
 }
});
test('área, perímetro e frações calculados a partir das células efetivamente desenhadas',()=>{
 const w=load();
 for(const [key,count,side,expectedArea,expectedPerimeter]of [['v_floor',16,1.5,36,27],['v_room',22,1,22,20]]){
  const cells=rects(w.CHALLENGE_VISUALS[key],'#d0e0ee');assert.equal(cells.length,count);
  const size=cells[0].width;assert.ok(cells.every(c=>c.width===size&&c.height===size));
  const occupied=new Set(cells.map(c=>`${c.x},${c.y}`));let exposed=0;
  for(const c of cells)for(const [dx,dy]of [[size,0],[-size,0],[0,size],[0,-size]])if(!occupied.has(`${c.x+dx},${c.y+dy}`))exposed++;
  assert.equal(cells.length*side**2,expectedArea);assert.equal(exposed*side,expectedPerimeter);
 }
 const halves=w.CHALLENGE_VISUALS.v_halves,full=rects(halves,'#3156a4').length,triangles=Array.from(halves.matchAll(/<path\b[^>]*fill="#3156a4"/g)).length;
 assert.equal(full,6);assert.equal(triangles,4);assert.equal((full+triangles/2)*.5**2,2);assert.equal((full+triangles/2)/16,.5);
});
test('planificação desenhada dobra em seis faces; gabarito respeita vértices e pares opostos',()=>{
 const net=load().CHALLENGE_VISUALS.v_net,positions=new Map();
 for(const m of net.matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*>([1-6])<\/text>/g))positions.set(`${(Number(m[1])-187)/85},${(Number(m[2])-126)/85}`,Number(m[3]));
 assert.equal(positions.size,6);const neg=v=>v.map(x=>-x),queue=[[1,1,[1,0,0],[0,1,0],[0,0,1]]],normals=new Map();
 while(queue.length){const [x,y,r,d,n]=queue.shift(),id=positions.get(`${x},${y}`);if(!id||normals.has(id))continue;normals.set(id,n);
  queue.push([x+1,y,neg(n),d,r],[x-1,y,n,d,neg(r)],[x,y+1,r,neg(n),d],[x,y-1,r,n,neg(d)]);
 }
 assert.equal(new Set(Array.from(normals.values(),v=>v.join(','))).size,6);
 const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),canMeet=ids=>ids.every((a,i)=>ids.slice(i+1).every(b=>dot(normals.get(a),normals.get(b))===0));
 assert.equal(canMeet([2,3,5]),true);for(const trio of [[1,2,3],[2,4,5],[3,5,6]])assert.equal(canMeet(trio),false);
});
test('barras e setores exibidos sustentam os gabaritos, com as escalas anunciadas',()=>{
 const V=load().CHALLENGE_VISUALS;
 const bars=['#3156a4','#327767','#96672b'].flatMap(color=>rects(V.v_library,color)).sort((a,b)=>a.x-b.x);
 const values=bars.map(b=>b.height*30/200);assert.deepEqual(values,[18,30,24,12]);assert.ok(bars.every(b=>b.y+b.height===306));
 assert.equal(24*5-values.reduce((a,b)=>a+b,0),36);assert.equal((values[0]+values[2]+values[3])/3,18);
 const sectors=Array.from(V.v_spinner.matchAll(/<path d="M270 215L[^>]*fill="(#[a-f\d]+)"/g));assert.equal(sectors.length,8);const blue=sectors.filter(m=>m[1]==='#3156a4').length;assert.equal(blue,3);assert.equal(blue/8*(8-blue)/8,15/64);
 const cells=color=>rects(V.v_land,color).filter(r=>r.width===60&&r.height===60);assert.equal(cells('#89b695').length,4);assert.equal(cells('#82b8dc').length,2);assert.equal(cells('#b1b6c0').length,10);
});
