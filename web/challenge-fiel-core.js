(function () {
  'use strict';
  // Núcleo do banco "fiel à prova": ilustrações autorais (tirinhas, gráficos, esquemas) e criação de questões.
  // As questões usam o formato de CHALLENGE_BANK e alimentam o CPM e o CEP.
  const B = window.CHALLENGE_BANK, V = window.CHALLENGE_VISUALS || (window.CHALLENGE_VISUALS = {});
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const INK = '#1f2a3c';

  // ---------- Ilustração ----------
  const text = (x, y, s, size = 15, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.anchor || 'start'}" font-family="Arial,sans-serif" font-size="${size}" font-weight="${o.weight || 'normal'}" fill="${o.fill || INK}"${o.rotate ? ` transform="rotate(${o.rotate} ${x} ${y})"` : ''}>${esc(s)}</text>`;
  const lines = (x, y, arr, size = 15, o = {}) => arr.map((s, i) => text(x, y + i * size * 1.3, s, size, o)).join('');
  const rect = (x, y, w, h, fill = '#fff', o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 0}" fill="${fill}" stroke="${o.stroke || INK}" stroke-width="${o.sw ?? 2}"/>`;
  const line = (x1, y1, x2, y2, o = {}) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${o.stroke || INK}" stroke-width="${o.sw || 2}" fill="none" stroke-linecap="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
  const circle = (x, y, r, fill = '#fff', o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${o.stroke || INK}" stroke-width="${o.sw ?? 2}"/>`;

  function char(x, y, o = {}) {
    const { skin = '#f1c9a0', hair = '#3b2a20', shirt = '#3f7bd1', pants = '#34455a', mood = 'happy', style = 'short', arm = 'down', s = 1, flip = false, body = true, glasses = false } = o;
    const eyes = mood === 'surprised' ? `<circle cx="-8" cy="-2" r="4.6" fill="#fff" stroke="${INK}"/><circle cx="8" cy="-2" r="4.6" fill="#fff" stroke="${INK}"/><circle cx="-8" cy="-2" r="1.8" fill="${INK}"/><circle cx="8" cy="-2" r="1.8" fill="${INK}"/>`
      : mood === 'smug' ? `<path d="M-12 -2 q4 -4 8 0M4 -2 q4 -4 8 0" stroke="${INK}" stroke-width="2" fill="none"/>` : `<circle cx="-8" cy="-2" r="2.5" fill="${INK}"/><circle cx="8" cy="-2" r="2.5" fill="${INK}"/>`;
    const brows = { angry: `<path d="M-14 -10 L-4 -6M14 -10 L4 -6" stroke="${INK}" stroke-width="2.4"/>`, sad: `<path d="M-14 -7 L-4 -11M14 -7 L4 -11" stroke="${INK}" stroke-width="2"/>`, worried: `<path d="M-14 -7 L-4 -11M14 -7 L4 -11" stroke="${INK}" stroke-width="2"/>`, surprised: `<path d="M-13 -12 q5 -4 10 0M3 -12 q5 -4 10 0" stroke="${INK}" stroke-width="2" fill="none"/>` }[mood] || '';
    const mouth = { happy: `<path d="M-8 8 Q0 16 8 8" stroke="${INK}" stroke-width="2.2" fill="none"/>`, sad: `<path d="M-7 13 Q0 6 7 13" stroke="${INK}" stroke-width="2.2" fill="none"/>`, neutral: `<path d="M-6 10 H6" stroke="${INK}" stroke-width="2.2"/>`, surprised: `<ellipse cx="0" cy="11" rx="4" ry="5" fill="#7a3030" stroke="${INK}"/>`, angry: `<path d="M-7 13 Q0 7 7 13" stroke="${INK}" stroke-width="2.2" fill="none"/>`, smug: `<path d="M-6 9 Q3 14 9 6" stroke="${INK}" stroke-width="2.2" fill="none"/>`, worried: `<path d="M-7 11 Q-3 7 0 11 Q3 15 7 11" stroke="${INK}" stroke-width="2" fill="none"/>`, laugh: `<path d="M-9 7 Q0 20 9 7 Z" fill="#7a3030" stroke="${INK}" stroke-width="1.8"/>` }[mood] || '';
    const hairs = {
      short: `<path d="M-23 -2 Q-24 -28 0 -28 Q24 -28 23 -2 Q12 -15 -23 -2Z" fill="${hair}"/>`,
      long: `<path d="M-23 -2 Q-24 -28 0 -28 Q24 -28 23 -2 Q12 -15 -23 -2Z" fill="${hair}"/><path d="M-23 -4 V24 H-15 V-2Z M23 -4 V24 H15 V-2Z" fill="${hair}"/>`,
      bun: `<path d="M-23 -2 Q-24 -28 0 -28 Q24 -28 23 -2 Q12 -15 -23 -2Z" fill="${hair}"/><circle cx="0" cy="-32" r="9" fill="${hair}"/>`,
      cap: `<path d="M-24 -6 Q-24 -30 0 -30 Q24 -30 24 -6Z" fill="#c8453c"/><path d="M-4 -8 H34 Q34 -2 26 -2 H-4Z" fill="#c8453c"/>`,
      curly: [-16, -6, 4, 14, 22].map((cx, i) => `<circle cx="${cx - 3}" cy="${-22 + (i % 2) * 3}" r="9" fill="${hair}"/>`).join(''),
      bald: '', pigtails: `<path d="M-23 -2 Q-24 -28 0 -28 Q24 -28 23 -2 Q12 -15 -23 -2Z" fill="${hair}"/><circle cx="-28" cy="2" r="7" fill="${hair}"/><circle cx="28" cy="2" r="7" fill="${hair}"/>`,
      gray: `<path d="M-23 -2 Q-24 -28 0 -28 Q24 -28 23 -2 Q12 -15 -23 -2Z" fill="#c9ced6"/>`
    };
    const arms = {
      down: `<path d="M-18 30 L-27 58M18 30 L27 58" stroke="${shirt}" stroke-width="8" stroke-linecap="round"/><circle cx="-27" cy="60" r="4.5" fill="${skin}"/><circle cx="27" cy="60" r="4.5" fill="${skin}"/>`,
      point: `<path d="M-18 30 L-27 58M18 32 L50 26" stroke="${shirt}" stroke-width="8" stroke-linecap="round"/><circle cx="-27" cy="60" r="4.5" fill="${skin}"/><circle cx="52" cy="25" r="4.5" fill="${skin}"/>`,
      up: `<path d="M-18 30 L-27 58M18 30 L32 4" stroke="${shirt}" stroke-width="8" stroke-linecap="round"/><circle cx="-27" cy="60" r="4.5" fill="${skin}"/><circle cx="33" cy="1" r="4.5" fill="${skin}"/>`,
      both: `<path d="M-18 32 L-8 54M18 32 L8 54" stroke="${shirt}" stroke-width="8" stroke-linecap="round"/><circle cx="-6" cy="56" r="4.5" fill="${skin}"/><circle cx="6" cy="56" r="4.5" fill="${skin}"/>`,
      hips: `<path d="M-18 30 L-32 44 L-18 56M18 30 L32 44 L18 56" stroke="${shirt}" stroke-width="8" stroke-linecap="round" fill="none"/>`
    };
    const torso = body ? `<path d="M-9 56 V94 M9 56 V94" stroke="${pants}" stroke-width="10" stroke-linecap="round"/><ellipse cx="-11" cy="96" rx="9" ry="4" fill="#2b2b2b"/><ellipse cx="11" cy="96" rx="9" ry="4" fill="#2b2b2b"/><path d="M-19 26 Q0 20 19 26 L17 64 Q0 68 -17 64 Z" fill="${shirt}" stroke="${INK}" stroke-width="1.5"/>${arms[arm] || arms.down}` : `<path d="M-19 26 Q0 20 19 26 L19 40 H-19Z" fill="${shirt}"/>`;
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${torso}<circle r="22" fill="${skin}" stroke="${INK}" stroke-width="1.8"/>${hairs[style] ?? hairs.short}${eyes}${brows}${mouth}${glasses ? `<circle cx="-8" cy="-2" r="7" fill="none" stroke="${INK}" stroke-width="1.6"/><circle cx="8" cy="-2" r="7" fill="none" stroke="${INK}" stroke-width="1.6"/><path d="M-1 -2 H1" stroke="${INK}"/>` : ''}</g>`;
  }

  function bubble(x, y, arr, o = {}) {
    const size = o.size || 14.5, w = o.w || Math.ceil(Math.max(...arr.map(s => s.length)) * size * 0.52 + 22), h = Math.round(arr.length * size * 1.28 + 14);
    let tail = '';
    if (o.tail) {
      const [tx, ty] = o.tail, bx = Math.max(x + 16, Math.min(x + w - 16, tx));
      tail = `<path d="M${bx - 8} ${y + h - 1} L${tx} ${ty} L${bx + 9} ${y + h - 1}" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
    }
    const r = rect(x, y, w, h, o.fill || '#fff', { r: o.shape === 'box' ? 2 : 14, sw: 2 });
    const cover = o.tail ? `<path d="M${Math.max(x + 16, Math.min(x + w - 16, o.tail[0])) - 7} ${y + h} h16" stroke="#fff" stroke-width="3.5"/>` : '';
    return tail + r + cover + lines(x + w / 2, y + size + 5, arr, size, { anchor: 'middle' });
  }
  const narrator = (x, y, arr, o = {}) => bubble(x, y, arr, { fill: '#fff2c4', shape: 'box', size: 14, ...o });
  const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="0" width="12" height="40" fill="#8a6038"/><circle cx="0" cy="-8" r="26" fill="#4f9a5c" stroke="${INK}" stroke-width="1.5"/><circle cx="-16" cy="8" r="17" fill="#4f9a5c"/><circle cx="16" cy="8" r="17" fill="#4f9a5c"/></g>`;
  const sun = (x, y, r = 20) => `<g>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M${x + Math.cos(a * Math.PI / 180) * (r + 5)} ${y + Math.sin(a * Math.PI / 180) * (r + 5)}L${x + Math.cos(a * Math.PI / 180) * (r + 14)} ${y + Math.sin(a * Math.PI / 180) * (r + 14)}" stroke="#e9a91c" stroke-width="3"/>`).join('')}<circle cx="${x}" cy="${y}" r="${r}" fill="#ffd54a" stroke="#d99b00" stroke-width="2"/></g>`;
  const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" stroke="#9fb0c4" stroke-width="1.5"><circle cx="0" cy="0" r="14"/><circle cx="16" cy="-6" r="17"/><circle cx="34" cy="0" r="13"/><rect x="-2" y="0" width="38" height="12" stroke="none"/></g>`;
  const ground = (y, w, color = '#9bc78b') => `<rect x="0" y="${y}" width="${w}" height="400" fill="${color}"/>`;
  const house = (x, y, s = 1, wall = '#f0d9b5') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="0" y="0" width="70" height="52" fill="${wall}" stroke="${INK}" stroke-width="2"/><path d="M-6 0 L35 -30 L76 0Z" fill="#b8553f" stroke="${INK}" stroke-width="2"/><rect x="26" y="22" width="18" height="30" fill="#7a5a3a"/><rect x="6" y="12" width="14" height="14" fill="#bfe3f5" stroke="${INK}"/></g>`;
  const pot = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 0 H14 L10 24 H-10Z" fill="#c4683c" stroke="${INK}" stroke-width="1.6"/><path d="M0 0 V-26" stroke="#3d8a4a" stroke-width="3"/><path d="M0 -14 Q-16 -18 -16 -30 Q-2 -28 0 -14Z M0 -20 Q14 -24 16 -36 Q2 -34 0 -20Z" fill="#4faa5c"/></g>`;
  const dog = (x, y, s = 1, c = '#c89560') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="26" ry="14" fill="${c}" stroke="${INK}" stroke-width="1.6"/><circle cx="24" cy="-10" r="12" fill="${c}" stroke="${INK}" stroke-width="1.6"/><path d="M16 -20 L12 -6 L22 -12Z" fill="#7a5233"/><circle cx="28" cy="-12" r="2" fill="${INK}"/><circle cx="35" cy="-8" r="2.4" fill="${INK}"/><path d="M-26 -4 Q-40 -16 -36 -22" stroke="${c}" stroke-width="6" fill="none"/><path d="M-14 10 v14M14 10 v14" stroke="${c}" stroke-width="6"/></g>`;
  const wolf = (x, y, s = 1) => dog(x, y, s, '#8d96a3');
  const sign = (x, y, arr, size = 14, w = null) => { const ww = w || Math.ceil(Math.max(...arr.map(t => t.length)) * size * 0.54 + 20); return `<path d="M${x + ww / 2} ${y} v60" stroke="#6b4a2d" stroke-width="5"/>` + rect(x, y - arr.length * size * 1.3 - 8, ww, arr.length * size * 1.3 + 12, '#fff8e8', { r: 3 }) + lines(x + ww / 2, y - arr.length * size * 1.3 + size - 4, arr, size, { anchor: 'middle' }); };

  function panelSvg(key, title, desc, panels, o = {}) {
    const W = 760, cols = o.cols || Math.min(panels.length, 3), rows = Math.ceil(panels.length / cols), gap = 10, m = 10;
    const pw = (W - 2 * m - (cols - 1) * gap) / cols, ph = o.h || 250, H = 2 * m + rows * ph + (rows - 1) * gap + (o.footer ? 24 : 0);
    const body = panels.map((p, i) => {
      const px = m + (i % cols) * (pw + gap), py = m + Math.floor(i / cols) * (ph + gap), id = `${key}-${i}`;
      return `<defs><clipPath id="cp-${id}"><rect width="${pw}" height="${ph}"/></clipPath></defs><g transform="translate(${px} ${py})"><rect width="${pw}" height="${ph}" fill="${p.bg || '#fdf8ea'}"/><g clip-path="url(#cp-${id})">${typeof p.body === 'function' ? p.body(pw, ph) : p.body}</g><rect width="${pw}" height="${ph}" fill="none" stroke="${INK}" stroke-width="3"/></g>`;
    }).join('');
    V[key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title><desc>${esc(desc)}</desc><rect width="${W}" height="${H}" fill="#fffefa"/>${body}${o.footer ? text(W - m, H - 7, o.footer, 12, { anchor: 'end', fill: '#6b7686' }) : ''}</svg>`;
    return key;
  }
  // Ilustração livre (cena única, cartaz, gráfico etc.)
  function figure(key, title, desc, W, H, body) {
    V[key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title><desc>${esc(desc)}</desc><rect width="${W}" height="${H}" fill="#fffefa"/>${body}</svg>`;
    return key;
  }

  function barChart(key, title, desc, labels, values, o = {}) {
    const W = o.w || 640, H = o.h || 340, L = 60, R = 20, T = 56, Bt = 56, max = o.max || Math.ceil(Math.max(...values) / (o.step || 10)) * (o.step || 10), step = o.step || max / 5;
    const iw = W - L - R, ih = H - T - Bt, bw = iw / values.length * 0.56;
    let g = text(W / 2, 28, o.heading || title, 17, { anchor: 'middle', weight: 'bold' });
    for (let v = 0; v <= max + 0.001; v += step) { const y = T + ih - v / max * ih; g += line(L, y, W - R, y, { stroke: '#d4dae3', sw: 1 }) + text(L - 8, y + 5, String(v).replace('.', ','), 13, { anchor: 'end' }); }
    g += line(L, T, L, T + ih, { sw: 2 }) + line(L, T + ih, W - R, T + ih, { sw: 2 });
    values.forEach((v, i) => {
      const x = L + iw / values.length * (i + 0.5) - bw / 2, h = v / max * ih, y = T + ih - h;
      g += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" fill="${(o.colors || [])[i] || o.color || '#4a7fc4'}" stroke="${INK}" stroke-width="1.5"/>`;
      if (o.showValues !== false) g += text(x + bw / 2, y - 6, String(v).replace('.', ','), 13, { anchor: 'middle', weight: 'bold' });
      g += text(x + bw / 2, T + ih + 20, labels[i], 13, { anchor: 'middle' });
    });
    if (o.yLabel) g += text(14, T + ih / 2, o.yLabel, 13, { anchor: 'middle', rotate: -90 });
    if (o.xLabel) g += text(L + iw / 2, H - 10, o.xLabel, 13, { anchor: 'middle' });
    return figure(key, title, desc, W, H, g);
  }
  function tableFigure(key, title, desc, headers, rows, o = {}) {
    const cw = o.cw || 130, rh = 34, W = o.w || headers.length * cw + 20, H = (rows.length + 1) * rh + 60;
    let g = text(W / 2, 28, o.heading || title, 17, { anchor: 'middle', weight: 'bold' });
    const x0 = (W - headers.length * cw) / 2;
    [headers, ...rows].forEach((r, i) => r.forEach((c, j) => { g += rect(x0 + j * cw, 44 + i * rh, cw, rh, i === 0 ? '#dbe6f6' : (i % 2 ? '#fff' : '#f4f6fa'), { sw: 1.4 }) + text(x0 + j * cw + cw / 2, 44 + i * rh + 22, String(c), 14.5, { anchor: 'middle', weight: i === 0 ? 'bold' : 'normal' }); }));
    return figure(key, title, desc, W, H, g);
  }

  // ---------- Questões ----------
  const REF = {
    mandela: { name: 'Mandela: o africano de todas as cores · Companhia das Letras (Pequena Zahar)', url: 'https://www.companhiadasletras.com.br/livro/9788566642322/mandela', note: 'Ficha e sinopse da obra consultadas. As questões usam apenas fatos conferidos da biografia de Nelson Mandela e informações da ficha da edição; textos e personagens são autorais. Não reproduzem trechos do livro.' },
    pr: { name: 'Agência Estadual de Notícias do Paraná · emancipação política', url: 'https://www.parana.pr.gov.br/aen/Noticia/Estado-do-Parana-completa-nesta-quinta-feira-171-anos-de-emancipacao-politica', note: 'Lei imperial nº 704 (29/08/1853) e instalação da Província em 19/12/1853 conferidas em fonte oficial.' },
    ibge: { name: 'IBGE Educa', url: 'https://educa.ibge.gov.br/', note: 'Conferência de dados territoriais, regionais e cartográficos.' },
    prefCwb: { name: 'Prefeitura de Curitiba · história da cidade', url: 'https://www.curitiba.pr.gov.br/conteudo/historia-fundacao-e-nome-da-cidade/207', note: 'Marcos de 1693 e origem do nome conferidos.' }
  };
  const SUBJ = { p: 'portugues', m: 'matematica', c: 'ciencias', g: 'geografia', h: 'historia' };
  const fix = (q, level, extra) => {
    Object.assign(q, { difficulty: level, fiel: true, schools: extra.schools || ['cpm', 'cep'], collection: extra.regional ? 'parana-curitiba' : 'fiel' });
    if (extra.topic) q.topic = extra.topic;
    q.refs = extra.refs;
    q.references = (extra.refs || []).map(k => typeof k === 'string' ? REF[k] : k);
    if (extra.visual) { q.visual = extra.visual; q.visualAlt = extra.alt || (V[extra.visual]?.match(/<title>(.*?)<\/title>/)?.[1] || ''); }
    if (extra.book) q.book = true;
    if (extra.fixed) q.fixed = true;
    if (q.subject === 'portugues') q.contextFamily = `fiel:${extra.visual || (q.base || '').slice(0, 40) || q.family}`;
    return q;
  };
  // Q: a alternativa correta vem primeiro; o sorteio das posições é feito pelo aplicativo.
  function Q(item, family, level, base, prompt, correct, explanation, wrong, extra = {}) {
    const topic = extra.topic || window.LONDRINA_CMPA_BANK?.topics?.[item] || null;
    B.add(item, 'fiel-' + family, base, prompt, correct, explanation, wrong, null, topic);
    return fix(B.questions.at(-1), level, { ...extra, topic });
  }
  // QF: alternativas na ordem exibida (listas I/II/III, sequências V/F); `right` é o índice da correta.
  let rotation = 0;
  function QF(item, family, level, base, prompt, options, right, explanation, extra = {}) {
    const ids = 'abcd', shift = rotation++ % 4;
    // A posição da resposta correta varia, mas a ordem relativa das demais é preservada.
    options = options.map((_, i) => options[(i - shift + 4) % 4]);
    right = (right + shift) % 4;
    const [correct, ...others] = [options[right], ...options.filter((_, i) => i !== right)];
    const topic = extra.topic || window.LONDRINA_CMPA_BANK?.topics?.[item] || null;
    B.add(item, 'fiel-' + family, base, prompt, correct[0], explanation, others, null, topic);
    const q = B.questions.at(-1);
    q.options = options.map((o, i) => ({ id: ids[i], text: o[0], explanation: i === right ? explanation : o[1] }));
    q.correctId = ids[right];
    return fix(q, level, { ...extra, topic, fixed: true });
  }

  window.FIEL = { B, V, REF, esc, INK, text, lines, rect, line, circle, char, bubble, narrator, tree, sun, cloud, ground, house, pot, dog, wolf, sign, panelSvg, figure, barChart, tableFigure, Q, QF };
})();
