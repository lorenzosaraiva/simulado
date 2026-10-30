const {_electron:electron}=require('playwright-core'),fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
let app;
(async()=>{
 const profile=await fs.mkdtemp(path.join(os.tmpdir(),'variety-e2e-'));
 const env=Object.fromEntries(Object.entries(process.env).filter(([k])=>k!=='ELECTRON_RUN_AS_NODE'));
 app=await electron.launch({args:[path.resolve('.'),`--user-data-dir=${profile}`],env});
 const page=await app.firstWindow(),errors=[];page.setDefaultTimeout(15000);page.on('pageerror',e=>errors.push(e.message));
 const cpm=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('rumoCpm.current.v1')));
 const cep=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('rumoCep.v1')));
 await page.getByRole('button',{name:/Criar simulado/}).first().click();await page.getByRole('button',{name:'Gerar simulado',exact:true}).click();
 const initial=await cpm();assert.ok(initial.questions.filter(q=>q.difficulty==='difícil').length>=14);
 // Correct choice survives feedback, keyboard, navigation and reload without a score penalty.
 await page.locator('.option').nth(initial.questions[0].correct).click();await page.getByRole('button',{name:'Checar resposta',exact:true}).click();
 assert.equal(await page.locator('.option:disabled').count(),4);assert.equal((await cpm()).answers[0],initial.questions[0].correct);
 await page.keyboard.press(String((initial.questions[0].correct+1)%4+1));assert.equal((await cpm()).answers[0],initial.questions[0].correct);
 await page.locator('.question-pill').nth(1).click();const wrong=(initial.questions[1].correct+1)%4;
 await page.locator('.option').nth(wrong).click();await page.getByRole('button',{name:'Checar resposta',exact:true}).click();
 assert.equal((await cpm()).answers[1],wrong);assert.equal(await page.locator('.option.selected.wrong').count(),1);
 await page.reload();await page.locator('[data-action="resume"]').first().click();
 assert.equal(await page.locator('.option:disabled').count(),4);assert.equal((await cpm()).answers[1],wrong);
 page.once('dialog',d=>d.accept());await page.locator('[data-action="finish"]').click();await page.locator('.result-page').waitFor();
 const result=await page.evaluate(()=>JSON.parse(localStorage.getItem('rumoCpm.history.v1'))[0]);assert.equal(result.score,1);assert.equal(result.cleanScore,1);assert.equal(result.consultedCount,2);
 await page.getByRole('button',{name:'CEP · 2027',exact:true}).click();await page.getByRole('button',{name:'Treinar',exact:true}).click();
 await page.locator('#cep-subject').selectOption('portugues');await page.getByRole('button',{name:'Começar treino',exact:true}).click();
 const session=(await cep()).session,q=session.questions[0],choice=q.options.find(o=>o.id!==q.correctId).id;
 await page.locator(`[data-c="answer"][data-value="${choice}"]`).click();await page.getByRole('button',{name:'Conferir minha resposta',exact:true}).click();await page.locator('.cep-correction').waitFor();
 assert.equal((await cep()).session.answers[0],choice);assert.equal((await cep()).session.firstAnswers[0],choice);assert.equal(await page.locator('.cep-option.chosen').count(),1);assert.equal(await page.locator('.cep-option:disabled').count(),4);
 await page.keyboard.press('1');assert.equal((await cep()).session.answers[0],choice);
 await page.getByRole('button',{name:'Cartão-resposta e entrega',exact:true}).click();
 assert.equal(await page.locator('[data-c="card-answer"][data-index="0"]:disabled').count(),4);
 // Guard the event handlers too, rather than relying solely on disabled UI controls.
 await page.evaluate(()=>{
  const root=document.getElementById('cep-app');for(const [action,value]of [['card-answer','a'],['card-clear','0']]){const el=document.createElement('button');el.dataset.c=action;el.dataset.index='0';el.dataset.value=value;root.append(el);el.click();el.remove();}
 });assert.equal((await cep()).session.answers[0],choice);
 await page.reload();await page.getByRole('button',{name:'Continuar de onde parei',exact:true}).click();
 assert.equal((await cep()).session.answers[0],choice);assert.equal(await page.locator('.cep-option:disabled').count(),4);
 await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1));await page.screenshot({path:'artifacts/variety-locked-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);await app.close();app=null;
 console.log('Variedade E2E: banco difícil, acerto sem desconto, erro marcado, bloqueio por clique/teclado/cartão e persistência após recarregar validados.');
})().catch(async e=>{console.error(e);if(app)await app.close();process.exitCode=1;});
