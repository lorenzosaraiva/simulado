const { _electron: electron } = require('playwright-core');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');

let electronApp;

(async () => {
  const root = path.join(__dirname, '..');
  const artifacts = path.join(root, 'artifacts');
  await fs.mkdir(artifacts, { recursive: true });
  const launchEnv = Object.fromEntries(Object.entries(process.env).filter(([key]) => key !== 'ELECTRON_RUN_AS_NODE'));
  const userData = await fs.mkdtemp(path.join(os.tmpdir(), 'cpm-mobile-'));
  electronApp = await electron.launch({ args: [root, `--user-data-dir=${userData}`], env: launchEnv });
  const page = await electronApp.firstWindow();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector('.hero');

  const homeOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (homeOverflow > 1) throw new Error(`A tela inicial excede a largura móvel em ${homeOverflow}px.`);
  await page.screenshot({ path: path.join(artifacts, 'android-home.png'), fullPage: true });

  await page.getByRole('button', { name: /Criar simulado/ }).first().click();
  await page.getByRole('button', { name: /Gerar simulado/ }).click();
  await page.waitForSelector('.question-card');
  const examOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (examOverflow > 1) throw new Error(`A prova excede a largura móvel em ${examOverflow}px.`);
  if (await page.locator('.question-pill').count() !== 35) throw new Error('A versão móvel não exibiu 35 questões.');
  await page.screenshot({ path: path.join(artifacts, 'android-exam.png'), fullPage: true });
  await page.screenshot({ path: path.join(artifacts, 'android-exam-viewport.png') });
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: /Ir para o início/ }).click();
  for (const label of ['Revisão', 'Provas reais']) {
    await page.getByRole('button', { name: label, exact: true }).click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 1) throw new Error(`${label} excede a tela móvel em ${overflow}px.`);
  }
  await page.screenshot({ path: path.join(artifacts, 'android-archive.png'), fullPage: true });
  await page.getByRole('button', { name: /Ler prova completa/ }).first().click();
  await page.waitForSelector('.document-sheet img');
  const readerOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (readerOverflow > 1) throw new Error(`Leitor excede a tela móvel em ${readerOverflow}px.`);
  await page.getByRole('button', { name: /Ampliar para ler/ }).click();
  const zoomOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (zoomOverflow > 1) throw new Error(`Zoom ultrapassa o painel em ${zoomOverflow}px.`);
  await page.screenshot({ path: path.join(artifacts, 'android-reader.png') });
  await page.evaluate(() => localStorage.clear());
  await electronApp.close();
  electronApp = null;
  process.stdout.write('Layout móvel validado em 390 × 844: sem rolagem horizontal e com 35 questões.\n');
})().catch(async (error) => {
  if (electronApp) await electronApp.close().catch(() => {});
  process.stderr.write(`${error.stack}\n`);
  process.exitCode = 1;
});
