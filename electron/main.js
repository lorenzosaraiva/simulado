const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 360,
    minHeight: 680,
    backgroundColor: '#f4f1e9',
    title: 'Rumo ao CPM e CEP',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.loadFile(path.join(__dirname, '..', 'web', 'index.html'));
  win.once('ready-to-show', () => win.show());

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  if (isDev && process.env.CPM_DEVTOOLS === '1') {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

ipcMain.handle('open-edital', async () => {
  const editalPath = app.isPackaged
    ? path.join(process.resourcesPath, 'documentos', 'Edital-CPM-2027.pdf')
    : path.join(__dirname, '..', 'DECProcessoClassificatorio2027Edital001Abertura.pdf');
  return shell.openPath(editalPath);
});

ipcMain.handle('open-document', async (_event, documentPath) => {
  if (typeof documentPath !== 'string' || !documentPath.startsWith('documents/')) return 'Documento inválido';
  const root = path.resolve(__dirname, '..', 'web', 'documents');
  const source = path.resolve(root, documentPath.slice('documents/'.length));
  if (path.dirname(source) !== root || !/\.(docx|pdf)$/i.test(source)) return 'Documento inválido';
  const fs = require('fs/promises');
  try {
    // External applications cannot read inside app.asar; copy the original bytes out.
    const folder = path.join(app.getPath('userData'), 'documentos');
    await fs.mkdir(folder, { recursive: true });
    const destination = path.join(folder, path.basename(source));
    await fs.copyFile(source, destination);
    return shell.openPath(destination);
  } catch (_error) { return 'Arquivo não encontrado'; }
});

ipcMain.handle('save-backup', async (_event, json) => {
  const { dialog } = require('electron');
  const result = await dialog.showSaveDialog({
    title: 'Salvar backup do histórico',
    defaultPath: `rumo-${typeof json === 'string' && json.includes('"rumo-cep"') ? 'cep' : 'cpm'}-backup-${new Date().toISOString().slice(0, 10)}.json`,
    filters: [{ name: 'Arquivo JSON', extensions: ['json'] }]
  });
  if (result.canceled || !result.filePath) return { canceled: true };
  const fs = require('fs/promises');
  await fs.writeFile(result.filePath, json, 'utf8');
  return { canceled: false };
});

ipcMain.handle('load-backup', async () => {
  const { dialog } = require('electron');
  const result = await dialog.showOpenDialog({
    title: 'Restaurar backup do histórico',
    filters: [{ name: 'Arquivo JSON', extensions: ['json'] }],
    properties: ['openFile']
  });
  if (result.canceled || !result.filePaths[0]) return { canceled: true };
  const fs = require('fs/promises');
  const content = await fs.readFile(result.filePaths[0], 'utf8');
  return { canceled: false, content };
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
