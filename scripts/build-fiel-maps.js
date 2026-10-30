// Gera mapas SVG a partir da malha de UFs do IBGE preservada em web/cep/br-uf.geojson.
// Nenhuma fronteira é inventada; as cidades usam coordenadas geográficas conhecidas.
const fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'web/cep/br-uf.geojson'), 'utf8'));
const out = path.join(root, 'web/fiel');
fs.mkdirSync(out, { recursive: true });

const SIGLA = {11:'RO',12:'AC',13:'AM',14:'RR',15:'PA',16:'AP',17:'TO',21:'MA',22:'PI',23:'CE',24:'RN',25:'PB',26:'PE',27:'AL',28:'SE',29:'BA',31:'MG',32:'ES',33:'RJ',35:'SP',41:'PR',42:'SC',43:'RS',50:'MS',51:'MT',52:'GO',53:'DF'};
const REGION = { 1:'Norte', 2:'Nordeste', 3:'Sudeste', 4:'Sul', 5:'Centro-Oeste' };
const COLORS = { Norte:'#8ccf9a', Nordeste:'#f2c36b', Sudeste:'#e08f8f', Sul:'#8fb4e8', 'Centro-Oeste':'#c9a2dd' };
const rings = f => (f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates]).flatMap(poly => poly);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function centroid(f) {
  let sx = 0, sy = 0, n = 0;
  for (const ring of rings(f)) for (const [x, y] of ring) { sx += x; sy += y; n++; }
  return [sx / n, sy / n];
}
function project(box, w, h, pad = 10) {
  const k = Math.cos(((box.minLat + box.maxLat) / 2) * Math.PI / 180);
  const dx = (box.maxLon - box.minLon) * k, dy = box.maxLat - box.minLat;
  const s = Math.min((w - 2 * pad) / dx, (h - 2 * pad) / dy);
  const ox = (w - dx * s) / 2, oy = (h - dy * s) / 2;
  return { s, at: (lon, lat) => [ox + (lon - box.minLon) * k * s, oy + (box.maxLat - lat) * s] };
}
const pathOf = (f, P) => 'M' + rings(f).map(r => r.map(([x, y]) => P.at(x, y).map(v => v.toFixed(1)).join(',')).join(' L') + ' Z').join(' M');
const svg = (w, h, title, desc, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title><desc>${esc(desc)}</desc><rect width="${w}" height="${h}" fill="#fffefa"/>${body}</svg>`;
const text = (x, y, s, size = 14, anchor = 'middle', fill = '#17223a', weight = 'normal') => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" font-family="Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(s)}</text>`;
function compass(x, y) {
  return `<g stroke="#17223a" fill="#17223a"><path d="M${x} ${y-30}L${x-8} ${y}L${x+8} ${y}Z"/><path d="M${x} ${y+30}L${x-8} ${y}L${x+8} ${y}Z" fill="#fffefa"/><path d="M${x-30} ${y}h60" fill="none"/></g>${text(x, y-36, 'N', 16, 'middle', '#17223a', 'bold')}${text(x, y+48, 'S', 14)}${text(x+42, y+5, 'L', 14)}${text(x-42, y+5, 'O', 14)}`;
}

// 1. Brasil por regiões
{
  const W = 560, H = 580, box = { minLon: -74, maxLon: -34, minLat: -34, maxLat: 5.5 }, P = project(box, W, H);
  let body = '';
  for (const f of data.features) {
    const code = f.properties.codarea, reg = REGION[code[0]];
    body += `<path d="${pathOf(f, P)}" fill="${COLORS[reg]}" stroke="#34455a" stroke-width="0.8"/>`;
  }
  for (const f of data.features) {
    const [cx, cy] = P.at(...centroid(f)); const code = f.properties.codarea;
    if (code === '53') continue;
    body += text(cx, cy + 4, SIGLA[code], 11, 'middle', '#17223a', 'bold');
  }
  body += `<g>${Object.entries(COLORS).map(([r, c], i) => `<rect x="14" y="${30 + i * 24}" width="18" height="16" fill="${c}" stroke="#34455a"/>${text(40, 43 + i * 24, r, 14, 'start')}`).join('')}</g>${text(14, 22, 'Regiões do Brasil', 16, 'start', '#17223a', 'bold')}${compass(W - 60, H - 90)}`;
  fs.writeFileSync(path.join(out, 'brasil-regioes.svg'), svg(W, H, 'Mapa do Brasil por regiões', 'Mapa político do Brasil com as cinco regiões em cores diferentes, siglas dos estados, legenda e rosa dos ventos. Geometria do IBGE.', body));
}

// 2. Paraná com vizinhos e cidades
const CITIES = [
  ['Curitiba', -49.27, -25.43], ['Londrina', -51.16, -23.31], ['Maringá', -51.94, -23.42], ['Foz do Iguaçu', -54.59, -25.55],
  ['Paranaguá', -48.51, -25.52], ['Ponta Grossa', -50.16, -25.09], ['Cascavel', -53.46, -24.96], ['Guarapuava', -51.46, -25.39]
];
function parana(file, { labels, markers, title, desc }) {
  const W = 760, H = 520, box = { minLon: -55.2, maxLon: -47.6, minLat: -27.2, maxLat: -22.2 }, P = project(box, W, H);
  let body = '';
  for (const f of data.features) {
    const code = f.properties.codarea; if (!['35', '41', '42', '50'].includes(code)) continue;
    body += `<path d="${pathOf(f, P)}" fill="${code === '41' ? '#b9d3f2' : '#ece7da'}" stroke="#34455a" stroke-width="${code === '41' ? 2 : 1}"/>`;
  }
  const lab = (lon, lat, s) => text(...P.at(lon, lat), s, 15, 'middle', '#5b6674', 'bold');
  body += lab(-49.8, -22.9, 'São Paulo') + lab(-54.0, -22.7, 'Mato Grosso do Sul') + lab(-50.5, -27.0, 'Santa Catarina');
  body += text(...P.at(-54.9, -26.2), 'Argentina', 14, 'middle', '#5b6674', 'normal') + text(...P.at(-54.8, -24.2), 'Paraguai', 14, 'middle', '#5b6674', 'normal') + text(...P.at(-47.9, -25.7), 'Oceano', 13, 'middle', '#5b6674') + text(...P.at(-47.9, -25.9), 'Atlântico', 13, 'middle', '#5b6674');
  CITIES.forEach(([name, lon, lat], i) => {
    const [x, y] = P.at(lon, lat);
    if (markers) {
      body += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="#fff" stroke="#17223a" stroke-width="2"/>${text(x, y + 5, 'ABCDEFGH'[i], 14, 'middle', '#17223a', 'bold')}`;
    } else if (labels) {
      body += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="#17223a"/>${text(x + 7, y - 7, name, 13, 'start')}`;
    }
  });
  const kmPx = 100 / 111 * P.s; // 1 grau de latitude ≈ 111 km
  body += `<g><path d="M30 ${H-34}h${kmPx.toFixed(1)}" stroke="#17223a" stroke-width="3"/><path d="M30 ${H-40}v12m${kmPx.toFixed(1)} -12v12" stroke="#17223a" stroke-width="2"/>${text(30, H-44, 'Escala gráfica: 100 km', 12, 'start')}</g>`;
  body += compass(W - 50, 70) + text(20, 28, 'Paraná e unidades vizinhas', 16, 'start', '#17223a', 'bold');
  fs.writeFileSync(path.join(out, file), svg(W, H, title, desc, body));
}
parana('parana-cidades.svg', { labels: true, markers: false, title: 'Mapa do Paraná com cidades', desc: 'Mapa do Paraná, com São Paulo ao norte, Mato Grosso do Sul a noroeste, Santa Catarina ao sul, Argentina e Paraguai a oeste e o Oceano Atlântico a leste. Marcam-se Curitiba, Londrina, Maringá, Foz do Iguaçu, Paranaguá, Ponta Grossa, Cascavel e Guarapuava. Escala gráfica de 100 km e rosa dos ventos.' });
parana('parana-letras.svg', { labels: false, markers: true, title: 'Mapa do Paraná com cidades identificadas por letras', desc: 'Mapa do Paraná com oito cidades marcadas por letras: A Curitiba, B Londrina, C Maringá, D Foz do Iguaçu, E Paranaguá, F Ponta Grossa, G Cascavel e H Guarapuava. Escala gráfica de 100 km e rosa dos ventos.' });
console.log('mapas gerados em web/fiel');
