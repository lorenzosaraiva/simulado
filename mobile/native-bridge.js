import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

const isNative = Capacitor.isNativePlatform();

window.mobile = {
  isNative,
  async openExternal(url) {
    if (!isNative) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    await Browser.open({ url });
  },
  async exportBackup(json) {
    const school = JSON.parse(json).app === 'rumo-cep' ? 'cep' : 'cpm';
    const filename = `rumo-${school}-backup-${new Date().toISOString().slice(0, 10)}.json`;
    const saved = await Filesystem.writeFile({
      path: filename,
      data: json,
      directory: Directory.Cache,
      encoding: Encoding.UTF8
    });
    await Share.share({
      title: `Backup do Rumo ao ${school.toUpperCase()}`,
      text: 'Backup do histórico de simulados.',
      files: [saved.uri],
      dialogTitle: 'Salvar ou compartilhar backup'
    });
  },
  async shareDocument(documentPath) {
    const response = await fetch(new URL(documentPath, window.location.href));
    if (!response.ok) throw new Error('Documento indisponível');
    const blob = await response.blob();
    const encoded = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    const saved = await Filesystem.writeFile({
      path: documentPath.split('/').pop(), data: encoded, directory: Directory.Cache
    });
    await Share.share({ title: 'Prova real · Rumo ao CPM', files: [saved.uri], dialogTitle: 'Abrir ou salvar prova original' });
  },
  onBack(callback) {
    if (!isNative) return;
    App.addListener('backButton', callback);
  },
  exit() {
    if (isNative) App.exitApp();
  }
};
