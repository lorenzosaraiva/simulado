const { _electron: electron } = require('playwright-core');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
let electronApp;

(async () => {
  const artifacts = path.join(__dirname, '..', 'artifacts');
  await fs.mkdir(artifacts, { recursive: true });

  const launchEnv = Object.fromEntries(Object.entries(process.env).filter(([key]) => key !== 'ELECTRON_RUN_AS_NODE'));
  const userData = await fs.mkdtemp(path.join(os.tmpdir(), 'cpm-e2e-'));
  electronApp = await electron.launch({ args: [path.join(__dirname, '..'), `--user-data-dir=${userData}`], env: launchEnv });
  const page = await electronApp.firstWindow();
  page.on('console', (message) => {
    if (message.type() === 'error') process.stderr.write(`Browser console: ${message.text()}\n`);
  });
  page.on('pageerror', (error) => process.stderr.write(`Browser error: ${error.message}\n`));

  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector('text=Vamos avançar?');
  await page.screenshot({ path: path.join(artifacts, 'home.png'), fullPage: true });

  await page.getByRole('button', { name: /Criar simulado/ }).first().click();
  await page.locator('#student-name').fill('Estudante teste');
  await page.getByRole('button', { name: /Gerar simulado/ }).click();
  await page.waitForSelector('.question-card');

  const pills = await page.locator('.question-pill').count();
  if (pills !== 35) throw new Error(`Esperava 35 questões, encontrou ${pills}`);
  if (await page.getByRole('button', { name: /Checar resposta/ }).count()) throw new Error('“Checar resposta” apareceu antes de uma alternativa ser marcada.');
  await page.screenshot({ path: path.join(artifacts, 'exam.png'), fullPage: true });

  const initial = await page.evaluate(() => JSON.parse(localStorage.getItem('rumoCpm.current.v1')));
  await page.locator('.option').nth(initial.questions[0].correct).click();
  await page.getByRole('button', { name: /Checar resposta/ }).click();
  await page.getByRole('button', { name: /Entender/ }).click();
  await page.waitForSelector('.explanation-panel');

  for (let index = 1; index < 35; index += 1) {
    await page.locator('.question-pill').nth(index).click();
    const correct = initial.questions[index].correct;
    await page.locator('.option').nth(index === 15 ? (correct + 1) % 4 : correct).click();
  }
  await page.getByRole('button', { name: /Revisar e finalizar/ }).click();
  await page.waitForSelector('text=Desempenho por matéria');
  await page.waitForSelector('.mistake-analysis');
  if (!await page.getByRole('button', { name: /Treinar meus erros/ }).count()) throw new Error('O treino personalizado dos erros não foi oferecido.');
  await page.screenshot({ path: path.join(artifacts, 'result.png'), fullPage: true });

  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('rumoCpm.history.v1')));
  if (!Array.isArray(stored) || stored.length !== 1) throw new Error('O histórico não salvou o resultado.');
  if (stored[0].questions.length !== 35 || stored[0].answers.length !== 35) throw new Error('O resultado salvo está incompleto.');
  if (stored[0].consultedCount !== 1) throw new Error('A consulta de resposta não foi registrada.');

  await page.getByRole('button', { name: /Treinar meus erros/ }).click();
  await page.waitForSelector('.review-overview');
  if (await page.locator('.review-list .review-item').count() !== 1) throw new Error('A revisão deve mostrar somente o erro específico.');
  if (await page.locator('.review-list .review-explanation').count() !== 1) throw new Error('A explicação do erro não aparece.');
  await page.screenshot({ path: path.join(artifacts, 'review.png'), fullPage: true });
  await page.getByRole('button', { name: /Treinar questões semelhantes/ }).click();
  await page.waitForSelector('.question-card');
  const focused = await page.evaluate(() => JSON.parse(localStorage.getItem('rumoCpm.current.v1')));
  if (focused?.mix !== 'review' || !focused.questions.length || focused.questions.length > 2) throw new Error('Treino precisa ser curto e específico.');
  if (focused.questions.some(q => q.subject !== initial.questions[15].subject)) throw new Error('A revisão incluiu matérias que o aluno não errou.');
  for (let i = 0; i < focused.questions.length; i++) {
    await page.locator('.question-pill').nth(i).click();
    await page.locator('.option').nth(focused.questions[i].correct).click();
  }
  await page.getByRole('button', { name: /Revisar e finalizar/ }).click();
  await page.waitForSelector('.result-page');
  const completed = await page.evaluate(() => JSON.parse(localStorage.getItem('rumoCpm.history.v1'))[0]);
  if (completed.score !== focused.questions.length) throw new Error('Nota da revisão calculada incorretamente.');
  if (await page.locator('.result-page').getByText('de 35', { exact: true }).count()) throw new Error('Revisão usou denominador de 35.');

  await page.getByRole('button', { name: 'Revisão', exact: true }).click();
  // A topic with only one eligible problem legitimately falls back to the
  // original question. Answering that fallback already resolves the error.
  if (!focused.questions.some(q => q.id === initial.questions[15].id)) {
    await page.getByRole('button', { name: /Refazer os erros originais/ }).click();
    const retry = await page.evaluate(() => JSON.parse(localStorage.getItem('rumoCpm.current.v1')));
    if (retry.questions.length !== 1 || retry.questions[0].id !== initial.questions[15].id) throw new Error('Refazer não trouxe o erro original.');
    await page.locator('.option').nth(retry.questions[0].correct).click();
    await page.getByRole('button', { name: /Revisar e finalizar/ }).click();
    await page.getByRole('button', { name: 'Revisão', exact: true }).click();
  }
  await page.waitForSelector('text=Nenhum erro pendente');

  await page.getByRole('button', { name: 'Provas reais', exact: true }).click();
  if (await page.locator('.archive-card').count() !== 13) throw new Error('Acervo incompleto.');
  await page.screenshot({ path: path.join(artifacts, 'archive.png'), fullPage: true });
  await page.getByRole('button', { name: 'Paraná', exact: true }).click();
  if (await page.locator('.archive-card').count() !== 8) throw new Error('Filtro do Paraná incorreto.');
  await page.getByRole('button', { name: /Ler prova completa/ }).first().click();
  await page.waitForSelector('.document-sheet img');
  await page.waitForFunction(() => { const img=document.querySelector('.document-sheet img');return img?.complete && img.naturalWidth>0; });
  await page.locator('.document-page-select').first().selectOption({ value: '2' });
  await page.waitForFunction(() => document.querySelector('.document-sheet img').alt.includes('página 3'));
  await page.screenshot({ path: path.join(artifacts, 'original-exam.png'), fullPage: true });
  await page.getByRole('button', { name: /Consultar gabarito/ }).click();
  await page.waitForSelector('text=Definitivo · PDF fornecido');

  const signatures = [];
  for (let run = 0; run < 3; run++) {
    await page.getByRole('button', { name: 'Criar simulado', exact: true }).first().click();
    await page.getByRole('button', { name: /Gerar simulado/ }).click();
    signatures.push(await page.evaluate(() => JSON.parse(localStorage.getItem('rumoCpm.current.v1')).questions.map(q => q.prompt).sort().join('|')));
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: /Ir para o início/ }).click();
    await page.reload();
  }
  if (new Set(signatures).size !== 3) throw new Error('O mesmo simulado foi repetido após recarregar.');

  await page.evaluate(() => localStorage.clear());
  await electronApp.close();
  electronApp = null;
  process.stdout.write('E2E validado: erros específicos, treino curto, refazer, correção, acervo completo e rotação persistida.\n');
})().catch(async (error) => {
  if (electronApp) await electronApp.close().catch(() => {});
  process.stderr.write(`${error.stack}\n`);
  process.exitCode = 1;
});
