// Treinos não bloqueiam um simulado em andamento, qualquer sessão pode ser descartada e resultados finalizados podem ser excluídos.
const { _electron: electron } = require('playwright-core'), fs = require('node:fs/promises'), path = require('node:path'), os = require('node:os'), assert = require('node:assert/strict');
let app;
(async () => {
  const userData = await fs.mkdtemp(path.join(os.tmpdir(), 'sessions-e2e-')), env = Object.fromEntries(Object.entries(process.env).filter(([k]) => k !== 'ELECTRON_RUN_AS_NODE'));
  app = await electron.launch({ args: [path.resolve('.'), `--user-data-dir=${userData}`], env });
  const page = await app.firstWindow(), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.waitForFunction(() => !!window.CEP_APP);

  // ---------- CEP ----------
  const cep = () => page.evaluate(() => JSON.parse(localStorage.getItem('rumoCep.v1')));
  await page.getByRole('button', { name: 'CEP · 2027', exact: true }).click();
  await page.getByRole('button', { name: 'Simulado de 30 questões', exact: true }).click();
  await page.locator('.cep-option').first().click();
  const simulado = (await cep()).session;
  assert.equal(simulado.mode, 'simulado');
  // Navegar e treinar com um simulado em andamento.
  await page.getByRole('button', { name: 'Treinar', exact: true }).click();
  assert.ok(await page.getByRole('heading', { name: 'Treino por assunto' }).isVisible());
  await page.locator('#cep-subject').selectOption('historia');
  await page.getByRole('button', { name: 'Começar treino', exact: true }).click();
  let data = await cep();
  assert.equal(data.session.mode, 'treino');
  assert.equal(data.parked.length, 1);
  assert.equal(data.parked[0].id, simulado.id);
  assert.equal(data.parked[0].answers.filter(Boolean).length, 1);
  // Mandela e Paraná também abrem durante o simulado.
  await page.getByRole('button', { name: 'Mandela', exact: true }).click();
  assert.ok(await page.getByRole('button', { name: 'Treinar o livro Mandela', exact: true }).first().isVisible());
  await page.getByRole('button', { name: 'Início', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Continuar de onde parei', exact: true }).count(), 2);
  // Descarta só o treino; o simulado continua guardado, com a resposta.
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: 'Descartar treino', exact: true }).click();
  data = await cep();
  assert.equal(data.session, null);
  assert.equal(data.parked.length, 1);
  assert.equal(data.parked[0].id, simulado.id);
  await page.getByRole('button', { name: 'Continuar de onde parei', exact: true }).click();
  assert.equal(await page.locator('.cep-option.chosen').count(), 1);
  // Um treino curto de Mandela e volta ao simulado pelo início.
  await page.getByRole('button', { name: 'Mandela', exact: true }).click();
  await page.getByRole('button', { name: 'Treinar o livro Mandela', exact: true }).first().click();
  data = await cep();
  assert.ok(data.session.questions.length >= 5 && data.session.questions.every(q => q.book));
  assert.equal(data.parked[0].id, simulado.id);
  await page.getByRole('button', { name: 'Salvar e sair', exact: true }).click();
  await page.getByRole('button', { name: 'Continuar de onde parei', exact: true }).nth(1).click();
  data = await cep();
  assert.equal(data.session.id, simulado.id);
  assert.equal(data.parked.length, 1);
  assert.equal(data.parked[0].mode, 'treino');
  await page.getByRole('button', { name: 'Cartão-resposta e entrega', exact: true }).click();
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: 'Entregar agora', exact: true }).click();
  await page.getByRole('heading', { name: /de 30 pontos/ }).waitFor();
  data = await cep();
  assert.equal(data.history.length, 1);
  assert.equal(data.parked.length, 1);
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: 'Excluir este resultado', exact: true }).click();
  data = await cep();
  assert.equal(data.history.length, 0);
  assert.ok(!data.draws.some(d => d.join('|') === data.history.map(x => x.id).join('|')));
  assert.equal(data.parked.length, 1);
  assert.ok(await page.getByRole('heading', { name: 'Painel da responsável' }).isVisible());
  // Um simulado já guardado também pode ser descartado direto do início.
  await page.getByRole('button', { name: 'Início', exact: true }).click();
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: /^Descartar (simulado|treino)$/ }).click();
  data = await cep();
  assert.equal(data.session, null);
  assert.equal(data.parked.length, 0);

  // ---------- CPM ----------
  await page.getByRole('button', { name: 'CPM', exact: true }).click();
  const cpm = k => page.evaluate(key => JSON.parse(localStorage.getItem(key)), k);
  await page.getByRole('button', { name: /Criar simulado/ }).first().click();
  await page.getByRole('button', { name: /Gerar simulado/ }).click();
  await page.waitForSelector('.question-card');
  await page.locator('.option').first().click();
  const first = await cpm('rumoCpm.current.v1');
  assert.equal(first.status, 'active');
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: 'Ir para o início', exact: true }).click();
  await page.getByRole('button', { name: /Criar simulado/ }).first().click();
  assert.match(await page.locator('.replace-warning').innerText(), /fica guardado/);
  await page.getByRole('button', { name: /Gerar simulado/ }).click();
  await page.waitForSelector('.question-card');
  assert.equal((await cpm('rumoCpm.parked.v1')).length, 1);
  assert.equal((await cpm('rumoCpm.parked.v1'))[0].id, first.id);
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: 'Ir para o início', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: /Continuar/ }).count(), 2);
  assert.equal(await page.getByRole('button', { name: 'Descartar', exact: true }).count(), 2);
  await page.locator('.resume-banner').nth(1).getByRole('button', { name: /Continuar/ }).click();
  assert.equal((await cpm('rumoCpm.current.v1')).id, first.id);
  assert.equal((await page.locator('.option.selected').count()), 1);
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: 'Ir para o início', exact: true }).click();
  page.once('dialog', d => d.accept());
  await page.locator('.resume-banner').first().getByRole('button', { name: 'Descartar', exact: true }).click();
  assert.equal(await page.locator('.resume-banner').count(), 1);
  // Finalizar e excluir um resultado do histórico.
  await page.getByRole('button', { name: /Continuar/ }).click();
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: /Revisar e finalizar|Próxima/ }).last().click().catch(() => {});
  await page.evaluate(() => document.querySelector('[data-action="finish"]')?.click());
  await page.waitForSelector('.result-page', { timeout: 15000 });
  const history = await cpm('rumoCpm.history.v1');
  assert.equal(history.length, 1);
  await page.getByRole('button', { name: /Histórico/ }).first().click();
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: /Excluir/ }).first().click();
  assert.equal((await cpm('rumoCpm.history.v1')).length, 0);
  assert.deepEqual(errors, []);
  await app.close(); app = null;
  console.log('Sessões: treino com simulado guardado, descarte individual, retomada e exclusão de resultados no CEP e no CPM validados.');
})().catch(async e => { console.error(e); if (app) await app.close(); process.exitCode = 1; });
