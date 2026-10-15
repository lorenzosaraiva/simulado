const {_electron:electron}=require('playwright-core'),fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
let app;
(async()=>{
 const profile=await fs.mkdtemp(path.join(os.tmpdir(),'visual-questions-')),env=Object.fromEntries(Object.entries(process.env).filter(([k])=>k!=='ELECTRON_RUN_AS_NODE'));
 app=await electron.launch({args:[path.resolve('.'),`--user-data-dir=${profile}`],env});const page=await app.firstWindow(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route(/^https?:\/\//,r=>r.abort());await page.waitForFunction(()=>!!window.CEP_APP);
 const invalid=await page.evaluate(()=>Object.entries(CHALLENGE_VISUALS).filter(([,html])=>html.startsWith('<svg')).filter(([,html])=>new DOMParser().parseFromString(html,'image/svg+xml').querySelector('parsererror')).map(([key])=>key));assert.deepEqual(invalid,[]);
 // Keep the real CPM draw; swap in a known charge while retaining the matrix.
 await page.evaluate(()=>{const select=CPM_PRACTICE.select;CPM_PRACTICE.select=(bank,...args)=>{const qs=select(bank,...args),q=bank.portugues.find(q=>q.collection==='visuais'&&q.visual==='v_park'),at=qs.findIndex(x=>x.id===q.id);if(at>=0)[qs[0],qs[at]]=[qs[at],qs[0]];else qs[0]=q;return qs;};});
 await page.getByRole('button',{name:/Criar simulado/}).first().click();await page.getByRole('button',{name:'Gerar simulado',exact:true}).click();assert.equal(await page.locator('.challenge-visual svg').count(),1);
 const cpm=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('rumoCpm.current.v1')));const first=await cpm();assert.equal(first.questions[0].visual,'v_park');await page.locator('.option').nth(first.questions[0].correct).click();
 await page.getByRole('button',{name:'Ampliar imagem',exact:true}).click();assert.equal(await page.locator('dialog.question-zoom svg').count(),1);await page.keyboard.press(String((first.questions[0].correct+1)%4+1));assert.equal((await cpm()).answers[0],first.questions[0].correct);await page.getByRole('button',{name:'Fechar ampliação',exact:true}).click();
 await page.getByRole('button',{name:'Checar resposta',exact:true}).click();assert.equal(await page.locator('.option:disabled').count(),4);assert.equal((await cpm()).answers[0],first.questions[0].correct);
 await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1));await page.screenshot({path:'artifacts/visual-cpm-mobile.png',fullPage:true});
 await page.getByRole('button',{name:'CEP · 2027',exact:true}).click();await page.evaluate(()=>{const select=CEP_ENGINE.select;CEP_ENGINE.select=(pool,...args)=>select(pool.filter(q=>q.collection==='visuais'&&q.visual===window.__visualTarget).slice(0,1),...args);});
 for(const key of ['v_park','v_library','v_net','v_web','v_brazil','v_timeline']){
  await page.evaluate(key=>window.__visualTarget=key,key);await page.getByRole('button',{name:'Treinar',exact:true}).click();await page.getByRole('button',{name:'Começar treino',exact:true}).click();
  assert.equal(await page.locator('.cep-visual svg,.cep-visual img').count(),1);if(key==='v_brazil')await page.waitForFunction(()=>{const img=document.querySelector('.cep-visual img');return img?.complete&&img.naturalWidth>0;});
  const q=await page.evaluate(()=>JSON.parse(localStorage.getItem('rumoCep.v1')).session.questions[0]);await page.locator(`[data-c="answer"][data-value="${q.correctId}"]`).click();await page.getByRole('button',{name:'Conferir minha resposta',exact:true}).click();assert.equal(await page.locator('.cep-option:disabled').count(),4);
  await page.getByRole('button',{name:'Ampliar imagem',exact:true}).click();assert.equal(await page.locator('dialog.cep-zoom svg,dialog.cep-zoom img').count(),1);await page.getByRole('button',{name:'Fechar ampliação',exact:true}).click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1));
  if(key==='v_net')await page.screenshot({path:'artifacts/visual-cep-mobile.png',fullPage:true});page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Descartar simulado',exact:true}).click();
 }
 assert.deepEqual(errors,[]);
 const graphics=await page.evaluate(()=>CHALLENGE_VISUALS);await page.setViewportSize({width:1600,height:1000});
 const preview=keys=>`<html lang="pt-BR"><style>body{margin:20px;background:#ede9df;font-family:Arial}main{display:grid;grid-template-columns:repeat(2,760px);gap:20px}figure{margin:0;background:white}svg{width:760px;height:auto}figcaption{padding:10px}</style><main>${keys.map(key=>`<figure>${graphics[key]}<figcaption>${key} · ilustração autoral</figcaption></figure>`).join('')}</main></html>`;
 await page.setContent(preview(['v_park','v_steps','v_wrapping','v_crop']));await page.screenshot({path:'artifacts/charges-preview.png',fullPage:true});
 await page.setContent(preview(['v_library','v_floor','v_net','v_halves','v_spinner','v_scales']));await page.screenshot({path:'artifacts/diagrams-preview.png',fullPage:true});
 await page.setContent(preview(['v_water','v_experiment','v_blood','v_web','v_moon','v_matter']));await page.screenshot({path:'artifacts/science-preview.png',fullPage:true});
 await page.setContent(preview(['v_timeline','v_documents','v_contact','v_artifact','v_museum','v_cube8']));await page.screenshot({path:'artifacts/history-preview.png',fullPage:true});await app.close();app=null;
 console.log('Questões visuais: SVGs válidos, charges e diagramas nos dois preparatórios, zoom, fontes offline, celular e respostas bloqueadas validados.');
})().catch(async e=>{console.error(e);if(app)await app.close();process.exitCode=1;});
