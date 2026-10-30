(function () {
  'use strict';
  // Matemática: gráficos, tabelas, malhas, planificações, vistas, sequências figurais e relógio.
  const F = window.FIEL, { Q, QF, rect, line, text, circle, lines, figure, barChart, tableFigure, INK } = F;
  const V = (item, fam, lvl, visual, prompt, ok, why, bad, extra = {}) => Q(item, fam, lvl, null, prompt, ok, why, bad, { visual, ...extra });

  // ---- Gráfico de barras (já criado em comics): livros lidos por turma ----
  V('m26', 'graf-total', 'fácil', 'f_graf_leitura', 'De acordo com o gráfico, quantos livros as quatro turmas leram ao todo no primeiro semestre?',
    '84 livros.', '18 + 24 + 30 + 12 = 84.',
    [['72 livros.', 'Esquece uma das turmas.'], ['30 livros.', 'É o valor da maior barra.'], ['96 livros.', 'Soma a mais.']]);
  V('m26', 'graf-diferenca', 'média', 'f_graf_leitura', 'Quantos livros a turma que mais leu leu a mais do que a turma que menos leu?',
    '18 livros.', 'Maior: 5º C, com 30. Menor: 5º D, com 12. 30 − 12 = 18.',
    [['12 livros.', 'É a diferença entre o 5º C e o 5º A.'], ['6 livros.', 'É a diferença entre o 5º B e o 5º A.'], ['42 livros.', 'Soma os dois valores.']]);
  V('m29', 'graf-media', 'média', 'f_graf_leitura', 'Qual foi o número médio de livros lidos por turma?',
    '21 livros.', '84 ÷ 4 = 21.',
    [['24 livros.', 'É o valor do 5º B.'], ['18 livros.', 'É o valor do 5º A.'], ['84 livros.', 'É o total, sem dividir por 4.']]);

  // ---- Tabela: esporte preferido ----
  tableFigure('f_tab_esportes', 'Tabela: esporte preferido na turma', 'Tabela com o esporte preferido de 40 alunos: futebol, 16; vôlei, 10; natação, 6; basquete, 8.', ['Esporte', 'Alunos'], [['Futebol', 16], ['Vôlei', 10], ['Natação', 6], ['Basquete', 8]], { heading: 'Esporte preferido dos alunos', cw: 150 });
  V('m12', 'tab-pct', 'média', 'f_tab_esportes', 'Na tabela, que porcentagem dos alunos prefere vôlei?',
    '25%', '10 de 40 alunos: 10/40 = 1/4 = 25%.',
    [['10%', 'Usa o número de alunos como se fosse porcentagem.'], ['40%', 'Confunde com o total de alunos.'], ['15%', 'Não corresponde ao dado da tabela.']]);
  V('m28', 'tab-prob', 'média', 'f_tab_esportes', 'Escolhendo um aluno dessa turma ao acaso, qual é a probabilidade de ele preferir futebol?',
    '2/5', '16 de 40 alunos: 16/40 = 2/5.',
    [['16/10', 'Inverte a relação entre a parte e o todo.'], ['1/4', 'É a fração dos que preferem vôlei.'], ['3/5', 'É a fração dos que não preferem futebol.']]);
  V('m27', 'tab-combinada', 'difícil', 'f_tab_esportes', 'Os alunos que preferem natação ou basquete formam que fração da turma?',
    '7/20', '6 + 8 = 14 alunos. 14/40 = 7/20.',
    [['14/20', 'Não simplifica a partir do total correto (40).'], ['3/10', 'Considera apenas a natação.'], ['1/4', 'É a fração dos que preferem vôlei.']]);

  // ---- Gráfico de setores ----
  (function () {
    const data = [['Ônibus', 50, '#4a7fc4'], ['A pé', 25, '#e9a91c'], ['Bicicleta', 15, '#6aa84f'], ['Carro', 10, '#c8453c']];
    let a0 = -Math.PI / 2, g = text(320, 28, 'Como os 200 alunos chegam à escola', 18, { anchor: 'middle', weight: 'bold' });
    const cx = 180, cy = 185, r = 120;
    data.forEach(([label, p, c], i) => {
      const a1 = a0 + p / 100 * 2 * Math.PI, large = p > 50 ? 1 : 0;
      g += `<path d="M${cx} ${cy}L${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)}A${r} ${r} 0 ${large} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}Z" fill="${c}" stroke="#fff" stroke-width="3"/>`;
      g += rect(380, 90 + i * 40, 22, 22, c, { sw: 1.5 }) + text(412, 107 + i * 40, `${label}: ${p}%`, 17);
      a0 = a1;
    });
    figure('f_pizza_transporte', 'Gráfico de setores: transporte dos alunos', 'Gráfico de setores sobre 200 alunos: ônibus, 50%; a pé, 25%; bicicleta, 15%; carro, 10%.', 640, 330, g);
  })();
  V('m26', 'pizza-quantidade', 'média', 'f_pizza_transporte', 'Quantos alunos vão para a escola de bicicleta?',
    '30 alunos.', '15% de 200 = 0,15 × 200 = 30.',
    [['15 alunos.', 'Usa o percentual como número de alunos.'], ['20 alunos.', 'Calcula 10% de 200.'], ['50 alunos.', 'Calcula 25% de 200.']]);
  V('m26', 'pizza-comparacao', 'difícil', 'f_pizza_transporte', 'Quantos alunos a mais vão de ônibus do que a pé e de carro juntos?',
    '30 alunos a mais.', 'Ônibus: 100. A pé + carro: 50 + 20 = 70. Diferença: 30.',
    [['50 alunos a mais.', 'Compara só com os que vão a pé.'], ['70 alunos a mais.', 'É o número dos que vão a pé e de carro.'], ['10 alunos a mais.', 'Erro nos percentuais.']]);

  // ---- Malha com pintura (porcentagem) ----
  (function () {
    let g = text(20, 28, 'Cada quadradinho vale 1% do quadrado grande', 16, { weight: 'bold' }), s = 26;
    for (let i = 0; i < 100; i++) { const x = 20 + (i % 10) * s, y = 44 + Math.floor(i / 10) * s; g += rect(x, y, s, s, i < 35 ? '#4a7fc4' : i < 60 ? '#6aa84f' : '#fff', { sw: 1 }); }
    g += rect(320, 70, 22, 22, '#4a7fc4', { sw: 1.5 }) + text(352, 87, 'azul', 16) + rect(320, 110, 22, 22, '#6aa84f', { sw: 1.5 }) + text(352, 127, 'verde', 16) + rect(320, 150, 22, 22, '#fff', { sw: 1.5 }) + text(352, 167, 'sem pintura', 16);
    figure('f_malha_pct', 'Malha de 100 quadrados com partes pintadas', 'Quadrado dividido em 100 quadradinhos: 35 pintados de azul, 25 de verde e 40 sem pintura.', 480, 320, g);
  })();
  V('m12', 'malha-pct', 'média', 'f_malha_pct', 'A parte pintada (de azul e de verde) corresponde a qual fração do quadrado?',
    '3/5', '35 + 25 = 60 quadradinhos em 100: 60/100 = 3/5.',
    [['3/10', '35/100 não é a parte pintada total.'], ['1/4', 'É a fração da parte verde.'], ['2/5', 'É a fração da parte sem pintura.']]);

  // ---- Figura em L: área e perímetro ----
  (function () {
    const u = 26, x0 = 60, y0 = 50, P = [[0, 0], [6, 0], [6, 3], [10, 3], [10, 8], [0, 8]].map(([a, b]) => `${x0 + a * u},${y0 + b * u}`).join(' ');
    let g = `<polygon points="${P}" fill="#cfe0f6" stroke="${INK}" stroke-width="3"/>`;
    g += text(x0 + 3 * u, y0 - 8, '6 cm', 15, { anchor: 'middle' }) + text(x0 + 6 * u + 8, y0 + 1.5 * u + 5, '3 cm', 15) + text(x0 + 8 * u, y0 + 3 * u - 8, '4 cm', 15, { anchor: 'middle' }) + text(x0 + 10 * u + 8, y0 + 5.5 * u, '5 cm', 15) + text(x0 + 5 * u, y0 + 8 * u + 22, '10 cm', 15, { anchor: 'middle' }) + text(x0 - 10, y0 + 4 * u, '8 cm', 15, { anchor: 'end' });
    figure('f_figura_l', 'Figura em L com medidas', 'Figura em forma de L, com ângulos retos. Lados, a partir do canto superior esquerdo: 6 cm; 3 cm; 4 cm; 5 cm; 10 cm; 8 cm.', 440, 320, g);
  })();
  V('m23', 'l-area', 'média', 'f_figura_l', 'Qual é a área da figura, cujos ângulos são todos retos?',
    '68 cm²', 'Retângulo de 10 × 8 = 80 cm² menos o recorte de 4 × 3 = 12 cm². 80 − 12 = 68 cm².',
    [['80 cm²', 'Ignora o recorte.'], ['36 cm²', 'É o perímetro, não a área.'], ['92 cm²', 'Soma o recorte, em vez de retirá-lo.']]);
  V('m22', 'l-perimetro', 'difícil', 'f_figura_l', 'Qual é o perímetro da figura?',
    '36 cm', '6 + 3 + 4 + 5 + 10 + 8 = 36 cm. Igual ao perímetro do retângulo 10 × 8, pois o recorte no canto não altera o contorno.',
    [['68 cm', 'É a área da figura.'], ['32 cm', 'Esquece um dos lados.'], ['44 cm', 'Soma lados a mais.']]);

  // ---- Reta numérica decimal ----
  (function () {
    let g = text(380, 30, 'Reta numérica', 17, { anchor: 'middle', weight: 'bold' }), x0 = 40, w = 600;
    g += line(x0, 110, x0 + w, 110, { sw: 3 });
    for (let i = 0; i <= 10; i++) { const x = x0 + i * w / 10; g += line(x, 98, x, 122, { sw: i % 5 === 0 ? 3 : 2 }); if (i === 0 || i === 5 || i === 10) g += text(x, 150, i === 0 ? '2' : i === 5 ? '2,5' : '3', 16, { anchor: 'middle', weight: 'bold' }); }
    [['A', 3], ['B', 7], ['C', 9]].forEach(([l, t]) => { const x = x0 + t * w / 10; g += circle(x, 110, 7, '#e9a91c') + text(x, 82, l, 18, { anchor: 'middle', weight: 'bold' }); });
    figure('f_reta_decimal', 'Reta numérica de 2 a 3 dividida em dez partes', 'Reta numérica entre 2 e 3, dividida em dez partes iguais. O ponto A está no terceiro traço depois do 2; o ponto B, no sétimo; o ponto C, no nono. O número 2,5 está marcado no meio.', 700, 180, g);
  })();
  V('m10', 'reta-ponto', 'média', 'f_reta_decimal', 'Na reta numérica, o ponto B representa o número',
    '2,7', 'Entre 2 e 3 há dez partes de 0,1. B está no sétimo traço: 2 + 7 × 0,1 = 2,7.',
    [['2,07', 'Confunde sétimo traço com sete centésimos.'], ['2,17', 'Não corresponde à posição de B.'], ['2,3', 'É a posição do ponto A.']]);
  V('m11', 'reta-soma', 'difícil', 'f_reta_decimal', 'Quanto vale a diferença entre os números representados por C e por A?',
    '0,6', 'C = 2,9 e A = 2,3. 2,9 − 2,3 = 0,6.',
    [['6', 'Erro na posição da vírgula.'], ['0,06', 'Erro na posição da vírgula.'], ['5,2', 'É a soma de C e A.']]);

  // ---- Planificação do cubo ----
  (function () {
    const s = 64, x0 = 30, y0 = 20, faces = [[1, 0, 2], [0, 1, 4], [1, 1, 1], [2, 1, 6], [3, 1, 3], [1, 2, 5]];
    let g = '';
    faces.forEach(([cx, cy, n]) => { g += rect(x0 + cx * s, y0 + cy * s, s, s, '#f2e3b8', { sw: 2.5 }) + text(x0 + cx * s + s / 2, y0 + cy * s + s / 2 + 9, String(n), 26, { anchor: 'middle', weight: 'bold' }); });
    figure('f_planificacao', 'Planificação de um cubo numerado', 'Planificação em cruz: uma linha de quatro quadrados com os números 4, 1, 6 e 3, da esquerda para a direita; acima do quadrado 1, o número 2; abaixo do quadrado 1, o número 5.', 340, 230, g);
  })();
  V('m19', 'plan-oposta', 'média', 'f_planificacao', 'A figura é a planificação de um cubo. Quando o cubo for montado, qual número ficará na face oposta à face de número 6?',
    '4', 'Na linha de quatro quadrados, faces separadas por uma face (4 e 6; 1 e 3) ficam opostas. O quadrado 2, acima, fica oposto ao 5.',
    [['1', 'O 1 é vizinho do 6 na planificação.'], ['3', 'O 3 é vizinho do 6.'], ['5', 'O 5 fica oposto ao 2.']]);
  V('m19', 'plan-dado', 'difícil', 'f_planificacao', 'Essa planificação NÃO pode formar um dado comum, no qual as faces opostas somam 7. Qual é a explicação correta?',
    'As faces opostas 4 e 6 somam 10, e não 7.', 'Pares opostos: 4 e 6 (soma 10), 1 e 3 (soma 4) e 2 e 5 (soma 7). Só um par soma 7.',
    [['O número 6 não pode estar em uma planificação.', 'Qualquer número pode estar.'], ['Faltam quadrados na figura.', 'A figura tem as 6 faces.'], ['Os números 2 e 5 somam 10.', '2 + 5 = 7.']]);

  // ---- Vista superior com alturas ----
  (function () {
    const s = 70, x0 = 125, y0 = 60, h = [[2, 1, 3], [1, 3, 1]];
    let g = text(230, 28, 'Vista de cima (número = cubos empilhados)', 16, { anchor: 'middle', weight: 'bold' });
    h.forEach((row, r) => row.forEach((n, c) => { g += rect(x0 + c * s, y0 + r * s, s, s, '#dbe9d3', { sw: 2.5 }) + text(x0 + c * s + s / 2, y0 + r * s + s / 2 + 9, String(n), 28, { anchor: 'middle', weight: 'bold' }); }));
    g += text(x0 + 1.5 * s, y0 + 2 * s + 26, 'A linha de baixo é a mais próxima do observador.', 14, { anchor: 'middle' });
    figure('f_vista_cubos', 'Vista superior de pilhas de cubos', 'Vista de cima de pilhas de cubos em duas filas de três. Fila de cima: 2, 1 e 3 cubos. Fila de baixo, mais próxima do observador: 1, 3 e 1 cubos.', 460, 290, g);
  })();
  V('m20', 'vista-total', 'fácil', 'f_vista_cubos', 'Quantos cubos há, ao todo, nas pilhas?',
    '11 cubos.', '2 + 1 + 3 + 1 + 3 + 1 = 11.',
    [['6 cubos.', 'Conta os quadrados, e não os cubos empilhados.'], ['9 cubos.', 'Soma errada.'], ['12 cubos.', 'Soma a mais.']]);
  V('m20', 'vista-frontal', 'difícil', 'f_vista_cubos', 'Olhando as pilhas de frente (da fila mais próxima), qual é a altura, em cubos, que se vê em cada coluna, da esquerda para a direita?',
    '2, 3, 3', 'Em cada coluna, aparece a maior altura entre as duas filas: máx(2,1) = 2; máx(1,3) = 3; máx(3,1) = 3.',
    [['1, 3, 1', 'Considera apenas a fila da frente.'], ['2, 1, 3', 'Considera apenas a fila de trás.'], ['3, 3, 3', 'Considera sempre a maior altura do conjunto.']]);

  // ---- Sequência de figuras (palitos) ----
  (function () {
    let g = text(300, 26, 'Quadrados formados com palitos', 17, { anchor: 'middle', weight: 'bold' }), x = 30;
    [1, 2, 3].forEach(n => {
      const s = 40, y = 70;
      for (let i = 0; i < n; i++) g += rect(x + i * s, y, s, s, 'none', { sw: 4 });
      g += text(x + n * s / 2, y + s + 28, `Figura ${n}`, 15, { anchor: 'middle' });
      x += n * s + 50;
    });
    figure('f_palitos', 'Sequência de figuras com palitos', 'Figura 1: um quadrado, com 4 palitos. Figura 2: dois quadrados lado a lado, com 7 palitos. Figura 3: três quadrados lado a lado, com 10 palitos.', 600, 180, g);
  })();
  V('m13', 'palitos-fig10', 'difícil', 'f_palitos', 'Mantendo o padrão, quantos palitos serão necessários para montar a Figura 10?',
    '31 palitos.', 'Cada quadrado a mais acrescenta 3 palitos: 4, 7, 10... Número de palitos = 3 × n + 1; para n = 10, 31.',
    [['40 palitos.', 'Multiplica 4 por 10, sem considerar que os quadrados dividem palitos.'], ['30 palitos.', 'Multiplica 3 por 10 e esquece o palito inicial.'], ['34 palitos.', 'Soma 3 a cada figura a partir de 4, com um passo a mais.']]);
  V('m13', 'palitos-inverso', 'difícil', 'f_palitos', 'Com 100 palitos, quantos quadrados lado a lado, seguindo esse padrão, podem ser montados?',
    '33 quadrados.', '3n + 1 = 100 → n = 33. Com 33 quadrados usam-se exatamente 100 palitos.',
    [['25 quadrados.', 'Divide 100 por 4, sem considerar o compartilhamento de palitos.'], ['34 quadrados.', '34 quadrados exigiriam 103 palitos.'], ['32 quadrados.', '32 quadrados usam 97 palitos e sobrariam 3.']]);

  // ---- Relógio ----
  (function () {
    const cx = 130, cy = 130, r = 100;
    let g = circle(cx, cy, r, '#fff', { sw: 4 });
    for (let i = 1; i <= 12; i++) { const a = i * Math.PI / 6 - Math.PI / 2; g += text(cx + 80 * Math.cos(a), cy + 80 * Math.sin(a) + 7, String(i), 20, { anchor: 'middle', weight: 'bold' }); }
    for (let i = 0; i < 60; i++) { const a = i * Math.PI / 30 - Math.PI / 2, l = i % 5 ? 4 : 8; g += line(cx + (r - l) * Math.cos(a), cy + (r - l) * Math.sin(a), cx + r * Math.cos(a), cy + r * Math.sin(a), { sw: i % 5 ? 1 : 2 }); }
    const hour = (4 + 35 / 60) * 30 - 90, min = 35 * 6 - 90, pt = (a, l) => [cx + l * Math.cos(a * Math.PI / 180), cy + l * Math.sin(a * Math.PI / 180)];
    g += line(cx, cy, ...pt(hour, 48), { sw: 7 }) + line(cx, cy, ...pt(min, 72), { sw: 4 }) + circle(cx, cy, 6, INK);
    figure('f_relogio', 'Relógio analógico', 'Relógio analógico com o ponteiro das horas entre o 4 e o 5, e o ponteiro dos minutos apontando para o 7.', 260, 260, g);
  })();
  V('m21', 'relogio-leitura', 'média', 'f_relogio', 'Que horas o relógio marca?',
    '4h35min', 'O ponteiro maior aponta para o 7 (35 minutos) e o menor está entre o 4 e o 5.',
    [['7h20min', 'Troca o ponteiro das horas pelo dos minutos.'], ['4h07min', 'Lê o número 7 como 7 minutos.'], ['5h35min', 'O ponteiro das horas ainda não passou do 5.']]);
  V('m21', 'relogio-duracao', 'difícil', 'f_relogio', 'Daqui a quanto tempo o relógio marcará 6h?',
    '1h25min', 'De 4h35min até 6h faltam 25 minutos para as 5h e mais 1 hora: 1h25min.',
    [['1h35min', 'Considera 35 minutos até as 5h.'], ['1h15min', 'Erra a conta dos minutos.'], ['2h25min', 'Considera uma hora a mais.']]);

  // ---- Fração em malha ----
  (function () {
    const s = 44, x0 = 30, y0 = 30, on = new Set([0, 2, 5, 7, 8, 13]);
    let g = '';
    for (let i = 0; i < 16; i++) g += rect(x0 + (i % 4) * s, y0 + Math.floor(i / 4) * s, s, s, on.has(i) ? '#e9a91c' : '#fff', { sw: 2 });
    figure('f_fracao_malha', 'Malha com partes pintadas', 'Quadrado dividido em 16 quadradinhos iguais, com 6 deles pintados de amarelo, em posições não vizinhas.', 240, 240, g);
  })();
  V('m09', 'fracao-malha', 'média', 'f_fracao_malha', 'A parte pintada de amarelo corresponde a qual fração do quadrado, na forma mais simples?',
    '3/8', '6 de 16 quadradinhos: 6/16 = 3/8.',
    [['6/10', 'Usa 10 como total, mas o quadrado tem 16 partes.'], ['3/16', 'Divide só o numerador por 2.'], ['5/8', 'É a fração que não está pintada (10/16).']]);

  // ---- Anúncio e infográfico (imagens definidas em comics) ----
  V('m12', 'anuncio-total', 'difícil', 'f_anuncio_liquida', 'Carla comprou dois pares de tênis, na mesma compra, seguindo as condições do anúncio. Quanto ela pagou no total?',
    'R$ 300,00', 'O primeiro par custa R$ 200,00 e o segundo, com 50% de desconto, R$ 100,00. Total: R$ 300,00.',
    [['R$ 200,00', 'Considera 50% de desconto sobre o total de R$ 400,00 em um par.'], ['R$ 400,00', 'Ignora o desconto.'], ['R$ 250,00', 'Aplica 50% sobre o segundo par com valor errado.']]);
  V('m12', 'anuncio-pct', 'difícil', 'f_anuncio_liquida', 'Qual é a porcentagem de desconto sobre o valor total da compra de dois pares, nas condições do anúncio?',
    '25%', 'Sem desconto: R$ 400,00. Com desconto: R$ 300,00. A economia de R$ 100,00 é 100/400 = 25%.',
    [['50%', 'É o desconto apenas sobre o segundo par.'], ['75%', 'É o percentual pago, e não o de desconto.'], ['10%', 'Não corresponde ao cálculo.']]);
  V('m26', 'info-agua-mes', 'média', 'f_info_agua', 'Uma família lava o carro 2 vezes por mês. Se trocar a mangueira pelo balde, quantos litros de água economizará em um mês, segundo o infográfico?',
    '352 litros.', 'Em cada lavagem, a economia é 216 − 40 = 176 L. Em duas lavagens: 352 L.',
    [['176 litros.', 'Considera só uma lavagem.'], ['432 litros.', 'É o gasto de duas lavagens com mangueira.'], ['80 litros.', 'É o gasto de duas lavagens com balde.']]);
})();
