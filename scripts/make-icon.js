const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico').default;

(async () => {
  const root = path.join(__dirname, '..');
  const svg = path.join(root, 'build', 'icon.svg');
  const png = path.join(root, 'build', 'icon.png');
  const ico = path.join(root, 'build', 'icon.ico');
  const assets = path.join(root, 'assets');
  const mobileIcon = path.join(assets, 'icon-only.png');
  const splash = path.join(assets, 'splash.png');
  await fs.mkdir(assets, { recursive: true });
  await sharp(svg).resize(256, 256).png().toFile(png);
  const buffer = await pngToIco(png);
  await fs.writeFile(ico, buffer);
  await sharp(svg).resize(1024, 1024).png().toFile(mobileIcon);
  const splashLogo = await sharp(svg).resize(760, 760).png().toBuffer();
  await sharp({ create: { width: 2732, height: 2732, channels: 4, background: '#f4f1e9' } })
    .composite([{ input: splashLogo, gravity: 'centre' }])
    .png()
    .toFile(splash);
  process.stdout.write('Ícones de Windows e Android criados.\n');
})().catch((error) => {
  process.stderr.write(`${error.stack}\n`);
  process.exitCode = 1;
});
