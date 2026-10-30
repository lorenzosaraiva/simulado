(function () {
  'use strict';
  // Segundo conjunto de imagens autorais: tirinhas, gráficos e esquemas.
  const F = window.FIEL, { char, bubble, narrator, sun, cloud, ground, tree, panelSvg, figure, text, lines, rect, line, circle, INK, V } = F;
  const SKIN = { a: '#f6d3b0', b: '#e0ac7e', c: '#b97a50' };
  const phone = (x, y) => `<rect x="${x}" y="${y}" width="20" height="32" rx="4" fill="#3b4558" stroke="${INK}" stroke-width="2"/><rect x="${x + 3}" y="${y + 4}" width="14" height="20" fill="#9fd0f5"/>`;
  const esc = F.esc;

  // 1. Tirinha: conversa pelo celular
  panelSvg('f_conversa', 'Tirinha: conversa pelo celular', 'Tirinha em três quadros. Quadro 1: dois amigos sentados lado a lado em um banco; um diz: Vamos conversar? Quadro 2: os dois olham para o celular; o outro responde: Já estou conversando... no grupo da turma. Quadro 3: os dois seguem sentados, em silêncio, olhando para o celular; uma legenda diz: Ao lado, mas longe.', [
    { bg: '#eef4e4', body: w => `${ground(190, w, '#c5dfa8')}<rect x="30" y="150" width="190" height="14" rx="4" fill="#8a6038"/>${char(80, 100, { shirt: '#3f7bd1', style: 'short', mood: 'happy', arm: 'both' })}${char(170, 100, { shirt: '#c8453c', skin: SKIN.c, hair: '#2b2118', style: 'pigtails', mood: 'neutral', arm: 'both' })}${bubble(10, 8, ['Vamos', 'conversar?'], { tail: [82, 76] })}` },
    { bg: '#eef4e4', body: w => `${ground(190, w, '#c5dfa8')}<rect x="30" y="150" width="190" height="14" rx="4" fill="#8a6038"/>${char(80, 100, { shirt: '#3f7bd1', mood: 'neutral', arm: 'both' })}${phone(72, 128)}${char(170, 100, { shirt: '#c8453c', skin: SKIN.c, hair: '#2b2118', style: 'pigtails', mood: 'happy', arm: 'both' })}${phone(162, 128)}${bubble(70, 6, ['Já estou conversando...', 'no grupo da turma.'], { tail: [168, 76] })}` },
    { bg: '#eef4e4', body: w => `${ground(190, w, '#c5dfa8')}<rect x="30" y="150" width="190" height="14" rx="4" fill="#8a6038"/>${char(80, 100, { shirt: '#3f7bd1', mood: 'neutral', arm: 'both' })}${phone(72, 128)}${char(170, 100, { shirt: '#c8453c', skin: SKIN.c, hair: '#2b2118', style: 'pigtails', mood: 'neutral', arm: 'both' })}${phone(162, 128)}${narrator(40, 10, ['Ao lado, mas longe.'])}` }
  ]);

  // 2. Charge: biblioteca
  panelSvg('f_silencio', 'Charge: o pedido de silêncio', 'Charge de um quadro. Em uma biblioteca, uma placa na parede diz: SILÊNCIO, POR FAVOR. A bibliotecária, com o dedo na frente da boca, grita em um balão com letras grandes: SILÊNCIOOO! Os leitores tapam os ouvidos.', [{
    bg: '#f6efe0', body: (w, h) => `${rect(0, 200, w, 100, '#c9a77a', { sw: 0 })}<rect x="30" y="30" width="170" height="130" fill="#d9c4a0" stroke="${INK}" stroke-width="3"/>${[0, 1, 2].map(i => `<rect x="40" y="${40 + i * 38}" width="150" height="26" fill="#a97b45"/>${[0, 1, 2, 3, 4, 5, 6].map(j => `<rect x="${44 + j * 20}" y="${44 + i * 38}" width="12" height="18" fill="${['#c8453c', '#3f7bd1', '#e9a91c', '#4f9a5c'][(i + j) % 4]}"/>`).join('')}`).join('')}${rect(250, 20, 190, 50, '#fff8e8', { r: 3 })}${text(345, 42, 'SILÊNCIO,', 18, { anchor: 'middle', weight: 'bold' })}${text(345, 62, 'POR FAVOR', 18, { anchor: 'middle', weight: 'bold' })}${char(300, 140, { shirt: '#9b59b6', style: 'bun', hair: '#5b4a3c', mood: 'angry', arm: 'up', s: 1.1 })}${bubble(340, 100, ['SILÊNCIOOO!'], { size: 26, shape: 'box', fill: '#fff', tail: [330, 140] })}${char(530, 150, { shirt: '#3f7bd1', mood: 'surprised', s: 0.9, arm: 'up' })}${char(620, 150, { shirt: '#4f9a5c', skin: SKIN.c, style: 'curly', hair: '#2b2118', mood: 'worried', s: 0.9, arm: 'up' })}`
  }], { cols: 1, h: 290 });

  // 3. Tirinha: pizza e frações
  const pizza = (cx, cy, r, slices, eaten, label) => {
    let g = '';
    for (let i = 0; i < slices; i++) {
      const a0 = -Math.PI / 2 + i * 2 * Math.PI / slices, a1 = a0 + 2 * Math.PI / slices, e = eaten.includes(i);
      g += `<path d="M${cx} ${cy}L${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)}A${r} ${r} 0 0 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}Z" fill="${e ? '#fffaf0' : '#e8a94c'}" stroke="${INK}" stroke-width="2" ${e ? 'stroke-dasharray="4 3"' : ''}/>`;
    }
    return g + text(cx, cy + r + 24, label, 15, { anchor: 'middle', weight: 'bold' });
  };
  panelSvg('f_pizza', 'Tirinha: a pizza dividida em oito fatias', 'Tirinha em dois quadros. Quadro 1: uma pizza dividida em 8 fatias iguais, ainda inteira; Bia diz: Dividi em 8 fatias iguais. Quadro 2: Bia comeu 3 fatias e Caio comeu 2 fatias; as fatias comidas estão vazias, restam 3 fatias. Bia diz: Eu comi 3/8. Caio diz: E eu, 1/4.', [
    { bg: '#fdf4e0', body: w => `${pizza(125, 140, 62, 8, [], 'Pizza inteira')}${char(40, 70, { shirt: '#c8453c', style: 'pigtails', skin: SKIN.c, hair: '#2b2118', body: false, s: 0.7 })}${bubble(75, 8, ['Dividi em 8', 'fatias iguais.'], { tail: [45, 52] })}` },
    { bg: '#fdf4e0', body: w => `${pizza(125, 140, 62, 8, [0, 1, 2, 3, 4], 'Depois do lanche')}${bubble(8, 8, ['Eu comi 3/8.'], { tail: [60, 60] })}${bubble(130, 8, ['E eu, 1/4.'], { tail: [190, 60] })}` }
  ], { cols: 2, h: 250 });

  // 4. Rótulos de preços de mercado
  figure('f_precos', 'Etiquetas de preço de um mercado', 'Duas etiquetas de preço de arroz. Pacote A: 500 gramas por R$ 6,00. Pacote B: 2 quilogramas por R$ 20,00. Pacote C: 1 quilograma por R$ 11,00.', 700, 250,
    [['A', '500 g', 'R$ 6,00', '#fdf1c9'], ['B', '2 kg', 'R$ 20,00', '#d6ecd2'], ['C', '1 kg', 'R$ 11,00', '#d4e3f6']].map(([l, w, p, c], i) => `${rect(24 + i * 225, 40, 200, 160, c, { r: 10, sw: 3 })}${text(124 + i * 225, 80, 'Arroz · pacote ' + l, 17, { anchor: 'middle', weight: 'bold' })}${text(124 + i * 225, 125, w, 30, { anchor: 'middle' })}${text(124 + i * 225, 175, p, 34, { anchor: 'middle', weight: 'bold' })}`).join('') + text(350, 28, 'Mercado Bom Preço', 16, { anchor: 'middle', weight: 'bold' }));

  // 5. Gráfico: chuva mensal (dados fictícios)
  F.barChart('f_graf_chuva', 'Gráfico: chuva mensal em uma cidade (dados fictícios)', 'Gráfico de barras com a chuva, em milímetros, de janeiro a junho em uma cidade fictícia: janeiro, 160; fevereiro, 140; março, 120; abril, 80; maio, 100; junho, 60.', ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], [160, 140, 120, 80, 100, 60], { heading: 'Chuva mensal (mm) · dados fictícios', step: 40, max: 200, yLabel: 'mm', color: '#4a7fc4' });

  // 6. Esquema: caminho dos tropeiros
  (function () {
    const pts = [['Viamão (RS)', 60, 330, 'start'], ['Lapa', 190, 255, 'end'], ['Ponta Grossa', 280, 190, 'start'], ['Castro', 330, 140, 'start'], ['Itararé (SP)', 400, 70, 'start'], ['Sorocaba (SP)', 520, 40, 'start']];
    let g = text(300, 24, 'Caminho do Viamão (esquema simplificado)', 17, { anchor: 'middle', weight: 'bold' });
    g += `<rect x="130" y="100" width="330" height="190" fill="#e3edf8" opacity=".6"/>` + text(150, 125, 'PARANÁ', 15, { fill: '#6b7686', weight: 'bold' });
    g += `<path d="${pts.map(([, x, y], i) => (i ? 'L' : 'M') + x + ' ' + y).join(' ')}" fill="none" stroke="#a63f2b" stroke-width="5" stroke-dasharray="10 6"/>`;
    pts.forEach(([n, x, y, a], i) => { g += circle(x, y, 8, '#fff', { sw: 3 }) + text(x + (a === 'end' ? -14 : 14), y + 5, n, 15, { anchor: a === 'end' ? 'end' : 'start', weight: i === 0 || i === 5 ? 'bold' : 'normal' }); });
    g += text(300, 360, 'As tropas levavam mulas e gado do Sul para a feira de Sorocaba.', 14, { anchor: 'middle' });
    figure('f_tropeiros', 'Esquema do caminho dos tropeiros', 'Esquema simplificado, sem escala. Uma linha tracejada liga Viamão, no Rio Grande do Sul, a Lapa, Ponta Grossa e Castro, no Paraná, depois a Itararé e Sorocaba, em São Paulo. Legenda: as tropas levavam mulas e gado do Sul para a feira de Sorocaba.', 620, 380, g);
  })();

  // 7. Perfil do relevo do Paraná (esquema)
  (function () {
    let g = text(380, 26, 'Perfil esquemático do relevo do Paraná (leste → oeste, fora de escala)', 16, { anchor: 'middle', weight: 'bold' });
    g += `<path d="M20 280 L20 250 L90 248 L120 120 L150 60 L190 120 L230 190 L300 185 L330 170 L390 168 L420 140 L470 138 L520 160 L560 190 L620 215 L700 235 L740 240 L740 280Z" fill="#d9c18a" stroke="${INK}" stroke-width="3"/>`;
    g += `<rect x="740" y="236" width="1" height="1"/><path d="M20 250 L90 248" stroke="#5aa0d0" stroke-width="4"/>`;
    [['A', 55, 232], ['B', 150, 44], ['C', 260, 172], ['D', 450, 124], ['E', 650, 200]].forEach(([l, x, y]) => { g += circle(x, y, 14, '#fff', { sw: 2 }) + text(x, y + 6, l, 17, { anchor: 'middle', weight: 'bold' }); });
    g += text(380, 312, 'A: planície litorânea · B: Serra do Mar · C: Primeiro Planalto', 13, { anchor: 'middle' }) + text(380, 332, 'D: Segundo Planalto · E: Terceiro Planalto, em declive até o rio Paraná', 13, { anchor: 'middle' });
    figure('f_perfil_relevo', 'Perfil esquemático do relevo do Paraná', 'Esquema do relevo do Paraná, de leste (esquerda) para oeste (direita). A: planície litorânea, baixa e plana, junto ao oceano. B: Serra do Mar, o ponto mais alto do desenho. C: Primeiro Planalto, em altitude elevada. D: Segundo Planalto, um pouco mais alto que o final do perfil. E: Terceiro Planalto, que desce suavemente até o rio Paraná, no extremo oeste.', 760, 345, g);
  })();

  // 8. Esquema: o sistema digestório
  (function () {
    let g = text(260, 26, 'Sistema digestório (esquema)', 17, { anchor: 'middle', weight: 'bold' });
    g += `<ellipse cx="260" cy="64" rx="38" ry="22" fill="#f2c0a8" stroke="${INK}" stroke-width="2.5"/><path d="M260 86 V140" stroke="#d98c7a" stroke-width="14" stroke-linecap="round"/>`;
    g += `<path d="M240 140 Q210 150 215 185 Q230 215 270 205 Q300 190 285 155 Q275 138 260 140Z" fill="#e89a8a" stroke="${INK}" stroke-width="2.5"/>`;
    g += `<path d="M226 245 h96 M226 245 q-10 8 0 16 h96 q10 8 0 16 h-96 q-10 8 0 16 h96 q10 8 0 16 h-96" fill="none" stroke="#e7b04f" stroke-width="14" stroke-linecap="round"/>`;
    g += `<path d="M205 240 V330 H345 V240 H320" fill="none" stroke="#b7835b" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>`;
    [['A', 330, 62], ['B', 320, 118], ['C', 345, 175], ['D', 400, 280], ['E', 150, 290]].forEach(([l, x, y]) => { g += circle(x, y, 14, '#fff', { sw: 2 }) + text(x, y + 6, l, 17, { anchor: 'middle', weight: 'bold' }); });
    g += line(344, 62, 300, 64, { sw: 2 }) + line(307, 118, 262, 112, { sw: 2 }) + line(331, 175, 292, 175, { sw: 2 }) + line(386, 280, 335, 272, { sw: 2 }) + line(164, 290, 205, 290, { sw: 2 });
    figure('f_digestorio', 'Esquema do sistema digestório', 'Esquema com cinco órgãos assinalados por letras: A, a boca; B, o esôfago, um tubo estreito que desce da boca; C, o estômago, em forma de bolsa; D, o intestino delgado, um tubo longo e enrolado, em amarelo; E, o intestino grosso, que contorna o delgado, em marrom.', 520, 360, g);
  })();

  // 9. Esquema: estados físicos (partículas)
  (function () {
    const box = (x, label, dots) => rect(x, 50, 180, 140, '#f7fbff', { r: 6, sw: 2.5 }) + dots.map(([dx, dy]) => circle(x + dx, 50 + dy, 9, '#6aa7e0', { sw: 1.5 })).join('') + text(x + 90, 215, label, 20, { anchor: 'middle', weight: 'bold' });
    const grid = []; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) grid.push([34 + i * 38, 28 + j * 32]);
    const liquid = [[30, 120], [58, 105], [86, 120], [114, 108], [142, 122], [44, 90], [72, 78], [100, 88], [128, 84], [156, 100], [36, 60], [64, 112], [112, 56], [88, 40]].slice(0, 12).map(([x, y], i) => [x, 70 + (y % 70) + (i % 3) * 8]);
    const gas = [[30, 30], [140, 40], [80, 100], [150, 120], [40, 125], [110, 70], [60, 60]];
    let g = text(310, 30, 'Organização das partículas em três estados da matéria', 17, { anchor: 'middle', weight: 'bold' }) + box(20, 'X', grid) + box(220, 'Y', liquid) + box(420, 'Z', gas);
    figure('f_particulas', 'Partículas em três estados da matéria', 'Três quadros com partículas. X: partículas organizadas e muito juntas, em fileiras regulares. Y: partículas juntas, mas desordenadas, escorrendo umas sobre as outras. Z: partículas bem separadas e espalhadas por todo o espaço.', 620, 235, g);
  })();
})();
