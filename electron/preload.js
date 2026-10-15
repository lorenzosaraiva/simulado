const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktop', {
  openEdital: () => ipcRenderer.invoke('open-edital'),
  openDocument: (documentPath) => ipcRenderer.invoke('open-document', documentPath),
  saveBackup: (json) => ipcRenderer.invoke('save-backup', json),
  loadBackup: () => ipcRenderer.invoke('load-backup')
});
