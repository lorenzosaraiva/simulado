const {_electron:electron}=require('playwright-core'),fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
let app;
(async()=>{
 const profile=await fs.mkdtemp(path.join(os.tmpdir(),'londrina-cmpa-')),env=Object.fromEntries(Object.entries(process.env).filter(([k])=>k!=='ELECTRON_RUN_AS_NODE'));
 app=await electron.launch({args:[path.resolve('.'),`--user-data-dir=${profile}`],env});const page=await app.firstWindow(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 // All reading below must work with internet requests blocked.
 await page.route(/^https?:\/\//,route=>route.abort());await page.waitForFunction(()=>!!window.CEP_APP);
 const fielN=await page.evaluate(()=>CHALLENGE_BANK.questions.filter(q=>q.fiel).length);assert.deepEqual(await page.evaluate(()=>({cep:CEP_BANK.length,shared:CHALLENGE_BANK.questions.length,new:LONDRINA_CMPA_BANK.count})),{cep:616+fielN,shared:430+fielN,new:160});
 await page.getByRole('button',{name:'Provas reais',exact:true}).click();await page.getByRole('button',{name:'Rio Grande do Sul',exact:true}).click();assert.equal(await page.locator('.archive-card').count(),2);
 await page.locator('.archive-card').filter({hasText:'ingresso 2026'}).getByRole('button',{name:/Ler prova completa/}).click();await page.locator('.document-page-select').first().selectOption({value:'34'});
 await page.waitForFunction(()=>{const img=document.querySelector('.document-sheet img');return img?.alt.includes('página 35')&&img.complete&&img.naturalWidth>0;});
 await page.getByRole('button',{name:'Consultar gabarito',exact:true}).click();await page.waitForFunction(()=>{const img=document.querySelector('.document-sheet img');return img?.alt.includes('gabarito')&&img.complete&&img.naturalWidth>0;});
 await page.getByRole('button',{name:'CEP · 2027',exact:true}).click();await page.getByRole('button',{name:'Fontes',exact:true}).click();
 const local=page.getByRole('button',{name:'CPM Curitiba e Londrina · 2020/2021 · PDF fornecido',exact:true});assert.equal(await local.count(),1);await local.click();
 assert.equal(await page.locator('dialog.cep-zoom img').count(),8);await page.waitForFunction(()=>{const img=document.querySelector('dialog img');return img?.complete&&img.naturalWidth>0;});await page.getByRole('button',{name:'Fechar ampliação',exact:true}).click();
 // Restrict the real selector to one bank item to exercise its local source
 // deterministically. The bank and session code remain unchanged.
 await page.evaluate(()=>{const select=CEP_ENGINE.select;CEP_ENGINE.select=(pool,...args)=>select(pool.filter(q=>q.id==='cep3-desafio-p043'),...args);});
 await page.getByRole('button',{name:'Treinar',exact:true}).click();await page.getByRole('button',{name:'Começar treino',exact:true}).click();
 const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('rumoCep.v1')).session);const q=(await read()).questions[0];assert.equal(q.collection,'londrina-cmpa');const choice=q.options.find(o=>o.id!==q.correctId).id;
 await page.locator(`[data-c="answer"][data-value="${choice}"]`).click();await page.getByRole('button',{name:'Conferir minha resposta',exact:true}).click();await page.locator('.cep-correction').waitFor();
 await page.getByText('Conferir as fontes desta questão autoral',{exact:true}).click();await page.getByRole('button',{name:'CPM Curitiba e Londrina · 2024/2025 · PDF fornecido',exact:true}).click();assert.equal(await page.locator('dialog.cep-zoom img').count(),10);await page.getByRole('button',{name:'Fechar ampliação',exact:true}).click();assert.equal((await read()).answers[0],choice);assert.equal(await page.locator('.cep-option:disabled').count(),4);
 await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1));await page.screenshot({path:'artifacts/londrina-cmpa-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);await app.close();app=null;console.log('Londrina/CMPA: 160 questões integradas, provas e gabaritos offline, fontes locais, seleção preservada e layout móvel validados.');
})().catch(async e=>{console.error(e);if(app)await app.close();process.exitCode=1;});
