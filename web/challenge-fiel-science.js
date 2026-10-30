(function () {
  'use strict';
  // Ciências no formato das provas: afirmativas V/F, relações entre sistemas, experimentos e esquemas.
  const F = window.FIEL, { Q, QF, rect, line, text, circle, lines, figure, INK } = F;
  const C = (item, fam, lvl, base, prompt, ok, why, bad, extra = {}) => Q(item, fam, lvl, base, prompt, ok, why, bad, extra);

  // ---------- Desenhos ----------
  (function () { // curva de aquecimento
    const x0 = 70, y0 = 270, W = 560, H = 300, px = t => x0 + t * 34, py = T => y0 - (T + 10) * 1.7;
    let g = text(330, 26, 'Aquecimento de um bloco de gelo', 18, { anchor: 'middle', weight: 'bold' });
    g += line(x0, 40, x0, y0, { sw: 2.5 }) + line(x0, y0, W, y0, { sw: 2.5 }) + text(24, 150, 'Temperatura (°C)', 13, { rotate: -90, anchor: 'middle' }) + text(330, 298, 'Tempo (minutos)', 13, { anchor: 'middle' });
    [0, 100].forEach(T => { g += line(x0 - 5, py(T), W, py(T), { stroke: '#cfd6e0', sw: 1, dash: '4 4' }) + text(x0 - 10, py(T) + 5, String(T), 13, { anchor: 'end' }); });
    const pts = [[0, -10], [2, 0], [5, 0], [8, 100], [12, 100], [14, 120]];
    g += `<polyline points="${pts.map(([t, T]) => `${px(t)},${py(T)}`).join(' ')}" fill="none" stroke="#c8453c" stroke-width="4"/>`;
    [['A', 1, -3], ['B', 3.5, 0], ['C', 6.5, 50], ['D', 10, 100], ['E', 13, 112]].forEach(([l, t, T]) => { g += circle(px(t), py(T) - (l === 'A' || l === 'C' ? -22 : 22), 13, '#fff', { sw: 2 }) + text(px(t), py(T) - (l === 'A' || l === 'C' ? -22 : 22) + 6, l, 16, { anchor: 'middle', weight: 'bold' }); });
    figure('f_curva_aquecimento', 'Gráfico de aquecimento da água', 'Gráfico de temperatura por tempo. Trecho A: o gelo esquenta de −10 °C a 0 °C. Trecho B: temperatura constante em 0 °C. Trecho C: sobe de 0 °C a 100 °C. Trecho D: temperatura constante em 100 °C. Trecho E: sobe acima de 100 °C.', 640, 310, g);
  })();
  (function () { // cadeia alimentar
    const items = ['Capim', 'Gafanhoto', 'Sapo', 'Cobra', 'Gavião'], colors = ['#cfe8bc', '#e6efb5', '#c5dfe9', '#e8cfa8', '#d8c5e0'];
    let g = text(380, 28, 'Cadeia alimentar de uma área rural', 18, { anchor: 'middle', weight: 'bold' });
    items.forEach((n, i) => { const x = 20 + i * 148; g += rect(x, 90, 112, 56, colors[i], { r: 10, sw: 2.5 }) + text(x + 56, 124, n, 17, { anchor: 'middle', weight: 'bold' }); if (i < 4) g += line(x + 114, 118, x + 146, 118, { sw: 3 }) + `<path d="M${x + 138} 110L${x + 148} 118L${x + 138} 126" fill="none" stroke="${INK}" stroke-width="3"/>`; });
    g += text(380, 200, 'As setas indicam quem serve de alimento para quem.', 14, { anchor: 'middle' });
    figure('f_cadeia', 'Cadeia alimentar: capim, gafanhoto, sapo, cobra e gavião', 'Cadeia alimentar com setas: capim → gafanhoto → sapo → cobra → gavião. A seta aponta para o animal que se alimenta do ser anterior.', 760, 230, g);
  })();
  (function () { // fases da Lua (iluminação)
    let g = text(310, 28, 'Quatro aspectos da Lua vistos da Terra', 17, { anchor: 'middle', weight: 'bold' });
    const draw = (cx, l, kind) => {
      let s = circle(cx, 120, 50, kind === 'dark' ? '#2b3040' : '#f4f1d4', { sw: 2.5 });
      if (kind === 'half') s = `<path d="M${cx} 70 A50 50 0 0 1 ${cx} 170Z" fill="#f4f1d4" stroke="${INK}" stroke-width="2.5"/><path d="M${cx} 70 A50 50 0 0 0 ${cx} 170Z" fill="#2b3040" stroke="${INK}" stroke-width="2.5"/>`;
      if (kind === 'crescent') s = circle(cx, 120, 50, '#2b3040', { sw: 2.5 }) + `<path d="M${cx + 8} 72 A50 50 0 0 1 ${cx + 8} 168 A38 50 0 0 0 ${cx + 8} 72Z" fill="#f4f1d4"/>`;
      return s + text(cx, 205, l, 22, { anchor: 'middle', weight: 'bold' });
    };
    g += draw(80, 'A', 'dark') + draw(240, 'B', 'half') + draw(400, 'C', 'full') + draw(560, 'D', 'crescent');
    figure('f_luas', 'Quatro aspectos da Lua', 'A: Lua totalmente escura. B: metade da Lua iluminada. C: Lua totalmente iluminada. D: apenas uma faixa fina da Lua iluminada.', 640, 230, g);
  })();
  (function () { // planta com partes
    let g = text(320, 26, 'Partes de uma planta', 18, { anchor: 'middle', weight: 'bold' });
    g += rect(40, 232, 560, 60, '#cda677', { sw: 0 });
    g += `<path d="M320 232 V110" stroke="#4f8a3d" stroke-width="12"/><path d="M320 190 Q250 170 230 130 Q290 140 320 190Z M320 160 Q390 140 410 105 Q350 105 320 160Z" fill="#6bbd54" stroke="${INK}" stroke-width="2"/>`;
    g += `<circle cx="320" cy="92" r="12" fill="#f2c94c" stroke="${INK}" stroke-width="2"/>${[0, 72, 144, 216, 288].map(a => `<circle cx="${320 + 22 * Math.cos(a * Math.PI / 180)}" cy="${92 + 22 * Math.sin(a * Math.PI / 180)}" r="11" fill="#e9739b" stroke="${INK}" stroke-width="2"/>`).join('')}`;
    g += `<path d="M320 232 Q300 260 270 280M320 232 V282M320 232 Q340 260 372 280" stroke="#7a4a2b" stroke-width="5" fill="none"/>`;
    [['A', 400, 70, 345, 90], ['B', 450, 120, 405, 108], ['C', 380, 180, 328, 180], ['D', 430, 266, 374, 270]].forEach(([l, x, y, ax, ay]) => { g += line(x - 14, y, ax, ay, { sw: 2 }) + circle(x, y, 14, '#fff', { sw: 2 }) + text(x, y + 6, l, 17, { anchor: 'middle', weight: 'bold' }); });
    figure('f_planta', 'Planta com partes indicadas por letras', 'Desenho de uma planta com flor cor-de-rosa no topo (A), uma folha à direita (B), o caule vertical (C) e as raízes sob a terra (D).', 640, 300, g);
  })();
  (function () { // sistema solar (ordem)
    const sizes = [6, 10, 11, 8, 30, 26, 18, 17], names = ['', '', '', '', '', '', '', ''];
    let g = text(380, 26, 'Sistema Solar (tamanhos e distâncias fora de escala)', 17, { anchor: 'middle', weight: 'bold' });
    g += `<circle cx="0" cy="130" r="86" fill="#ffd54a" stroke="#d99b00" stroke-width="3"/>`;
    let x = 130;
    sizes.forEach((r, i) => { x += r + 8; g += circle(x, 130, r, ['#b7b7b7', '#e8c785', '#4a90d9', '#c8553c', '#d9b27c', '#e9d49a', '#9ad7e3', '#4863c6'][i], { sw: 2 }) + text(x, 216, String(i + 1), 20, { anchor: 'middle', weight: 'bold' }); x += r + 8; });
    g += text(40, 130, 'Sol', 18, { anchor: 'middle', weight: 'bold' });
    figure('f_sistema_solar', 'Os oito planetas do Sistema Solar numerados a partir do Sol', 'Sol à esquerda e os oito planetas numerados de 1 a 8, em ordem de distância ao Sol: 1 Mercúrio, 2 Vênus, 3 Terra, 4 Marte, 5 Júpiter, 6 Saturno, 7 Urano, 8 Netuno. Os tamanhos não estão em escala.', 760, 250, g);
  })();

  // ---------- Matéria e água ----------
  C('c01', 'solidificacao', 'fácil', null, 'A mudança do estado líquido para o estado sólido, como a água virando gelo no congelador, chama-se',
    'solidificação.', 'Ao perder calor, o líquido passa para sólido: solidificação.',
    [['fusão.', 'É a passagem do sólido para o líquido.'], ['condensação.', 'É a passagem do vapor para o líquido.'], ['vaporização.', 'É a passagem do líquido para o vapor.']]);
  C('c01', 'secar-roupa', 'fácil', null, 'A roupa molhada seca no varal principalmente porque a água',
    'passa do estado líquido para o gasoso, por evaporação.', 'A água evapora e se mistura ao ar, mesmo sem ferver.',
    [['passa do estado sólido para o líquido, por fusão.', 'A roupa não contém gelo.'], ['é absorvida pelo varal.', 'O varal não absorve a água da roupa.'], ['se transforma em outra substância.', 'A água continua sendo água, em outro estado.']]);
  C('c01', 'copo-gelado', 'média', null, 'Em um dia quente, surgem gotas de água do lado de fora de um copo com água gelada. Isso ocorre porque',
    'o vapor de água do ar se condensa ao tocar a superfície fria do copo.', 'O ar contém vapor de água; ao encontrar uma superfície fria, esfria e passa ao estado líquido (condensação).',
    [['a água gelada atravessa as paredes de vidro.', 'O vidro não é poroso.'], ['o copo produz água ao ser resfriado.', 'A água vem do ar, e não do vidro.'], ['o gelo derrete e escorre para fora pela borda.', 'As gotas aparecem mesmo com o copo cheio e tampado.']]);
  C('c01', 'bolhas-fervura', 'difícil', null, 'Em uma panela com água fervendo, as bolhas que sobem até a superfície são formadas principalmente por',
    'vapor de água.', 'Durante a ebulição, parte da água líquida passa ao estado gasoso no interior do líquido, formando bolhas de vapor.',
    [['gás oxigênio, liberado pela água.', 'A água não “libera” oxigênio ao ferver; as bolhas são de vapor.'], ['gás hidrogênio, que sai da água.', 'A água não se decompõe ao ferver.'], ['ar do fundo da panela.', 'O ar dissolvido é pouco; as bolhas são de vapor.']]);
  C('c01', 'curva-fusao', 'média', null, 'No gráfico, qual trecho corresponde à fusão do gelo (mudança do estado sólido para o líquido)?',
    'B', 'Na fusão, a temperatura fica constante em 0 °C enquanto o gelo derrete.',
    [['A', 'Em A o gelo ainda está sólido e esquentando.'], ['C', 'Em C a água já está líquida e esquentando.'], ['E', 'Em E há vapor esquentando.']], { visual: 'f_curva_aquecimento' });
  C('c01', 'curva-ebulicao', 'difícil', null, 'No trecho D do gráfico, a temperatura permanece em 100 °C mesmo com o aquecimento contínuo. Isso acontece porque',
    'o calor recebido está sendo usado para mudar o estado da água, de líquido para vapor.', 'Durante a mudança de estado, a temperatura permanece constante.',
    [['a água perdeu a capacidade de receber calor.', 'Continua recebendo, mas o calor é usado na mudança de estado.'], ['o termômetro parou de funcionar.', 'Não há essa informação.'], ['a água está congelando.', 'O congelamento ocorre a 0 °C e com perda de calor.']], { visual: 'f_curva_aquecimento' });
  QF('c02', 'ordem-ciclo', 'média', null, 'Observe as etapas do ciclo da água:\nI. A água dos rios, lagos e mares evapora.\nII. As gotículas formam as nuvens.\nIII. A água cai em forma de chuva.\nIV. O vapor sobe e esfria.\nA ordem em que esses fenômenos ocorrem é:',
    [['I, IV, II, III', ''], ['I, II, IV, III', 'O vapor esfria antes de formar as nuvens.'], ['III, I, IV, II', 'A chuva só ocorre depois da formação das nuvens.'], ['IV, I, III, II', 'O vapor só existe depois da evaporação.']], 0, 'A água evapora (I), o vapor sobe e esfria (IV), condensa em nuvens (II) e cai como chuva (III).');
  C('c02', 'transpiracao', 'média', null, 'Além da evaporação de rios e mares, qual processo realizado pelos seres vivos devolve vapor de água para a atmosfera?',
    'A transpiração das plantas.', 'As plantas liberam vapor de água pelas folhas, contribuindo para o ciclo da água.',
    [['A fotossíntese das algas, que consome água.', 'A fotossíntese consome água.'], ['A respiração do solo, que produz chuva.', 'O solo não produz chuva.'], ['A hibernação dos animais.', 'Não é um processo de liberação de vapor.']]);
  C('c02', 'agua-vida', 'média', null, 'Por que a água é essencial para os seres vivos?',
    'Participa de processos vitais, como o transporte de substâncias no corpo.', 'A água integra o corpo dos seres vivos e é meio para reações e transporte de nutrientes.',
    [['Fornece energia, como os alimentos.', 'A água não fornece energia.'], ['Só é usada pelos animais, e não pelas plantas.', 'As plantas também precisam de água.'], ['Só serve para limpeza.', 'Também é indispensável para a vida.']]);
  C('c03', 'torneira', 'fácil', null, 'Qual atitude ajuda a usar a água de modo consciente?',
    'Fechar a torneira enquanto escova os dentes.', 'Evita desperdício de litros de água.',
    [['Lavar a calçada com mangueira todos os dias.', 'Gasta muita água.'], ['Tomar banhos longos.', 'Aumenta o consumo.'], ['Deixar a torneira pingando.', 'Pequenos vazamentos desperdiçam água.']]);
  C('c03', 'cisterna', 'difícil', null, 'Uma escola coleta a água da chuva em uma cisterna. Essa água, sem tratamento, pode ser usada com segurança para',
    'lavar o pátio e regar as plantas.', 'Para beber ou cozinhar, a água precisa de tratamento. Usos não potáveis podem aproveitar a água coletada.',
    [['beber e preparar a merenda.', 'Exige tratamento e análise.'], ['dar banho em bebês.', 'Exige água tratada.'], ['encher o filtro de água de beber.', 'O filtro não substitui o tratamento da água de chuva.']]);
  C('c03', 'esgoto', 'média', null, 'O despejo de esgoto sem tratamento em um rio pode',
    'contaminar a água e causar doenças, como diarreias e verminoses.', 'Microrganismos e parasitas presentes no esgoto contaminam a água.',
    [['purificar a água e aumentar o número de peixes.', 'Prejudica a vida aquática.'], ['reduzir a poluição, pois o rio “se limpa” sozinho.', 'O rio não consegue eliminar toda a poluição.'], ['não afetar as pessoas que usam o rio.', 'Afeta quem usa a água.']]);
  C('c03', 'nao-renovavel', 'média', null, 'Qual dos recursos naturais abaixo NÃO é renovável?',
    'Petróleo.', 'O petróleo leva milhões de anos para se formar.',
    [['Energia do vento.', 'É renovável.'], ['Luz do Sol.', 'É renovável.'], ['Água da chuva.', 'É renovada pelo ciclo da água.']]);

  // ---------- Seres vivos ----------
  C('c04', 'caracteristicas', 'média', null, 'Qual característica é comum a todos os seres vivos?',
    'Reproduzem-se, ou seja, geram descendentes.', 'Todos os seres vivos nascem, crescem, reproduzem-se e morrem.',
    [['Locomovem-se de um lugar a outro.', 'As plantas, por exemplo, não se deslocam.'], ['Realizam fotossíntese.', 'Só plantas e algas.'], ['Têm ossos.', 'Só os vertebrados.']]);
  C('c05', 'reptil', 'média', null, 'Um animal tem pele seca coberta de escamas, respira por pulmões e põe ovos com casca. Esse animal é um',
    'réptil.', 'As características descrevem répteis, como lagartos e serpentes.',
    [['anfíbio.', 'Anfíbios têm pele úmida e fina.'], ['mamífero.', 'Mamíferos têm pelos e amamentam.'], ['peixe.', 'Peixes respiram por brânquias.']]);
  QF('c05', 'vf-vertebrados', 'média', null, 'Marque V para verdadeiro e F para falso:\n( ) Todos os mamíferos nascem de ovos.\n( ) Anfíbios, como os sapos, passam por metamorfose.\n( ) As aves têm penas e bico.\n( ) Os peixes respiram por brânquias.\nA sequência correta, de cima para baixo, é:',
    [['F – V – V – V', ''], ['V – V – F – V', 'Mamíferos, em geral, nascem de úteros; e as aves têm penas.'], ['F – F – V – V', 'Anfíbios passam por metamorfose.'], ['V – F – V – F', 'Contraria os fatos citados.']], 0, 'Quase todos os mamíferos nascem do ventre da mãe (exceções raras). Anfíbios têm metamorfose, aves têm penas e bico, e peixes respiram por brânquias.');
  C('c05', 'morcego', 'média', null, 'O morcego, único mamífero capaz de voar de forma ativa, é classificado assim porque',
    'tem pelos e amamenta os filhotes com leite.', 'Pelos e amamentação são características dos mamíferos.',
    [['voa, como todas as aves.', 'Voar não define uma ave.'], ['tem asas de penas.', 'As asas do morcego são de membrana.'], ['põe ovos com casca.', 'Os filhotes nascem de gestação.']]);
  C('c05', 'inseto', 'média', null, 'Qual alternativa descreve corretamente um inseto?',
    'Seis patas, corpo dividido em cabeça, tórax e abdômen, e um par de antenas.', 'Essa é a organização dos insetos, como formigas, abelhas e moscas.',
    [['Oito patas e corpo dividido em duas partes.', 'Descreve aracnídeos, como as aranhas.'], ['Esqueleto interno formado por ossos.', 'Insetos têm esqueleto externo.'], ['Corpo mole protegido por uma concha.', 'Descreve moluscos, como caracóis.']]);
  C('c05', 'cadeia-produtor', 'média', null, 'Na cadeia alimentar, qual organismo é o produtor?',
    'O capim, que produz seu alimento por fotossíntese.', 'Produtores fabricam matéria orgânica a partir da luz do Sol.',
    [['O gafanhoto, que come o capim.', 'É consumidor primário.'], ['O sapo, que come o gafanhoto.', 'É consumidor secundário.'], ['O gavião, que come a cobra.', 'É consumidor de topo.']], { visual: 'f_cadeia' });
  C('c05', 'cadeia-efeito', 'difícil', null, 'Se os sapos desaparecessem dessa área, é mais provável que',
    'a população de gafanhotos aumente e a de cobras diminua.', 'Sem predador, os gafanhotos tendem a aumentar; as cobras ficam com menos alimento.',
    [['a população de capim aumente e a de gafanhotos diminua.', 'Mais gafanhotos reduzem o capim.'], ['a população de cobras aumente.', 'As cobras perdem uma fonte de alimento.'], ['nada mude no equilíbrio da área.', 'Há consequências em toda a cadeia.']], { visual: 'f_cadeia' });
  QF('c06', 'partes-planta', 'média', null, 'Observe a planta e associe as partes às funções:\n(1) absorve água e sais minerais\n(2) sustenta a planta e conduz a seiva\n(3) realiza a fotossíntese\n(4) participa da reprodução\nA associação correta entre as letras A, B, C e D e as funções é:',
    [['A–4; B–3; C–2; D–1', ''], ['A–3; B–4; C–1; D–2', 'A letra A é a flor, que participa da reprodução.'], ['A–4; B–2; C–3; D–1', 'A folha (B) realiza a fotossíntese.'], ['A–1; B–3; C–2; D–4', 'A raiz (D) absorve água e sais.']], 0, 'A flor (A) participa da reprodução; a folha (B) realiza a fotossíntese; o caule (C) sustenta e conduz a seiva; a raiz (D) absorve água e sais.', { visual: 'f_planta' });
  C('c06', 'fotossintese', 'média', null, 'Durante a fotossíntese, a planta libera para o ambiente',
    'gás oxigênio.', 'Com luz, água e gás carbônico, a planta produz glicose e libera oxigênio.',
    [['gás carbônico.', 'É um dos ingredientes da fotossíntese, absorvido do ar.'], ['gás nitrogênio.', 'Não é produzido na fotossíntese.'], ['gás hidrogênio.', 'Não é produzido na fotossíntese.']]);
  C('c06', 'experimento-vasos', 'difícil', 'Um estudante preparou três vasos com mudas iguais. Vaso A: recebeu luz e água. Vaso B: recebeu água, mas ficou em um armário escuro. Vaso C: recebeu luz, mas não foi regado. Após dez dias, A estava verde e saudável; B, amarelada; C, murcha.',
    'Qual conclusão é compatível com o experimento?', 'As plantas precisam de luz e de água para se manterem saudáveis.', 'Comparando A com B, vê-se o efeito da falta de luz; comparando A com C, o efeito da falta de água.',
    [['A água é desnecessária para as plantas.', 'O vaso C murchou sem água.'], ['O escuro favorece o crescimento saudável.', 'O vaso B ficou amarelado.'], ['Só a luz importa, e a água não faz diferença.', 'O vaso C teve luz e murchou.']]);
  C('c06', 'polinizacao', 'média', null, 'As abelhas, ao visitarem flores em busca de néctar, ajudam a planta porque',
    'transportam pólen de uma flor para outra, o que favorece a formação de frutos e sementes.', 'É a polinização, importante para a reprodução de muitas plantas.',
    [['produzem o néctar da flor.', 'O néctar é produzido pela planta.'], ['retiram a água das raízes.', 'As abelhas não agem nas raízes.'], ['substituem a fotossíntese.', 'Não têm essa função.']]);
  C('c06', 'germinacao', 'difícil', null, 'Para a germinação de uma semente de feijão, qual das condições abaixo NÃO é indispensável?',
    'Luz solar direta.', 'A germinação precisa de água, oxigênio e temperatura adequada; muitas sementes germinam no escuro.',
    [['Água.', 'É indispensável.'], ['Oxigênio.', 'É indispensável.'], ['Temperatura adequada.', 'É indispensável.']]);
  C('c07', 'biodiversidade', 'média', null, 'A perda de biodiversidade em uma floresta é preocupante porque',
    'cada espécie participa de relações com as demais, e a ausência de uma pode afetar todo o ambiente.', 'Cadeias alimentares, polinização e dispersão de sementes dependem da variedade de espécies.',
    [['as plantas passam a crescer mais rápido.', 'Não há essa garantia.'], ['a floresta se torna menos sujeita a queimadas.', 'Não há essa relação.'], ['os animais passam a precisar de menos alimento.', 'Não há essa relação.']]);
  C('c07', 'conservacao', 'média', null, 'Qual medida contribui diretamente para proteger a biodiversidade?',
    'Criar e manter áreas de proteção ambiental, como parques e reservas.', 'Áreas protegidas preservam habitats e espécies.',
    [['Ampliar o desmatamento para criar pastos.', 'Destrói habitats.'], ['Comercializar animais silvestres.', 'Ameaça as espécies.'], ['Queimar o lixo na mata.', 'Polui o ambiente.']]);
  C('c07', 'araucaria', 'difícil', null, 'A Floresta com Araucárias, típica do Sul do Brasil, está ameaçada principalmente por',
    'exploração de madeira e expansão de lavouras e cidades.', 'O corte intenso da araucária e a ocupação das áreas florestais reduziram muito essa floresta.',
    [['excesso de chuvas de granizo.', 'Não é a causa principal.'], ['crescimento natural das espécies da Amazônia.', 'Não tem relação.'], ['excesso de áreas de conservação.', 'Mais proteção ajuda a conservar.']]);

  // ---------- Corpo humano ----------
  QF('c08', 'sistemas-funcoes', 'média', null, 'Associe cada sistema do corpo humano à sua principal função:\n(I) digestório  (II) respiratório  (III) circulatório  (IV) excretor\n(a) transporta sangue, nutrientes e gases  (b) elimina resíduos e controla a água do corpo  (c) fragmenta alimentos e absorve nutrientes  (d) realiza as trocas gasosas\nA associação correta é:',
    [['I–c; II–d; III–a; IV–b', ''], ['I–d; II–c; III–a; IV–b', 'Troca as funções dos sistemas digestório e respiratório.'], ['I–c; II–a; III–d; IV–b', 'Troca as funções dos sistemas respiratório e circulatório.'], ['I–b; II–d; III–a; IV–c', 'Troca as funções dos sistemas digestório e excretor.']], 0, 'Digestório: digere e absorve; respiratório: trocas gasosas; circulatório: transporte; excretor: elimina resíduos.');
  C('c08', 'exercicio', 'difícil', null, 'Durante uma corrida, a respiração e os batimentos do coração ficam mais rápidos. Essa mudança ocorre porque',
    'os músculos precisam de mais oxigênio e energia, e os sistemas respiratório e circulatório trabalham juntos para fornecê-los.', 'O corpo funciona de forma integrada: mais oxigênio no ar inspirado e mais sangue levando gás e nutrientes aos músculos.',
    [['o estômago precisa digerir os alimentos mais depressa.', 'A digestão não é a causa dessa mudança.'], ['os rins deixam de produzir urina.', 'Os rins continuam funcionando.'], ['o cérebro para de coordenar o corpo.', 'O sistema nervoso continua coordenando.']]);
  QF('c09', 'caminho-alimento', 'média', null, 'Um pedaço de pão percorre o sistema digestório. Qual é a ordem correta dos órgãos por onde ele passa?',
    [['boca → esôfago → estômago → intestino delgado → intestino grosso', ''], ['boca → estômago → esôfago → intestino delgado → intestino grosso', 'O esôfago vem antes do estômago.'], ['boca → esôfago → intestino delgado → estômago → intestino grosso', 'O estômago vem antes do intestino delgado.'], ['esôfago → boca → estômago → intestino grosso → intestino delgado', 'A boca é o início do caminho.']], 0, 'O alimento é mastigado na boca, desce pelo esôfago, é processado no estômago e absorvido no intestino delgado; resíduos vão ao intestino grosso.');
  C('c09', 'absorcao', 'difícil', null, 'Em qual órgão ocorre a maior parte da absorção de nutrientes dos alimentos?',
    'Intestino delgado.', 'Suas dobras e vilosidades ampliam a superfície de absorção.',
    [['Estômago.', 'Ali o alimento é misturado ao suco gástrico.'], ['Intestino grosso.', 'Absorve principalmente água e forma as fezes.'], ['Esôfago.', 'Apenas conduz o alimento.']]);
  C('c09', 'alveolos', 'média', null, 'No sistema respiratório, as trocas gasosas (entrada de oxigênio no sangue e saída de gás carbônico) ocorrem',
    'nos alvéolos dos pulmões.', 'Os alvéolos são pequenas bolsas, cercadas por capilares, onde acontece a troca de gases.',
    [['na traqueia.', 'A traqueia só conduz o ar.'], ['no nariz.', 'No nariz o ar é filtrado e aquecido.'], ['na laringe.', 'A laringe abriga as pregas vocais.']]);
  C('c09', 'hemacias', 'média', null, 'Quais células do sangue transportam gás oxigênio dos pulmões para o resto do corpo?',
    'As hemácias.', 'Possuem hemoglobina, que se liga ao oxigênio.',
    [['Os leucócitos.', 'Participam da defesa do organismo.'], ['As plaquetas.', 'Participam da coagulação.'], ['Os neurônios.', 'São células do sistema nervoso.']]);
  C('c09', 'rins', 'média', null, 'Qual é a principal função dos rins?',
    'Filtrar o sangue, retirando resíduos e o excesso de água, que formam a urina.', 'Fazem parte do sistema excretor.',
    [['Bombear sangue por todo o corpo.', 'É função do coração.'], ['Produzir bile para a digestão.', 'A bile é produzida pelo fígado.'], ['Trocar gases com o ar.', 'É função dos pulmões.']]);
  C('c10', 'nutrientes', 'média', null, 'Qual alternativa associa corretamente o nutriente ao seu papel principal e a um alimento-fonte?',
    'Proteínas: construção e reparo do corpo; ovos e feijão.', 'Proteínas formam músculos e tecidos.',
    [['Carboidratos: construção dos músculos; carnes.', 'Carboidratos fornecem principalmente energia.'], ['Vitaminas: fornecem a maior parte da energia; óleos.', 'Vitaminas regulam o corpo; óleos são lipídios.'], ['Fibras: formam o esqueleto; leite.', 'Fibras auxiliam o intestino.']]);
  C('c10', 'rotulo', 'difícil', 'Em uma porção de biscoito de 30 g, o rótulo informa: carboidratos 18 g, proteínas 3 g e gorduras 6 g. Considere que carboidratos e proteínas fornecem 4 kcal por grama e as gorduras, 9 kcal por grama.',
    'Qual é a energia, em kcal, fornecida por uma porção?', '138 kcal.', 'Carboidratos: 18 × 4 = 72. Proteínas: 3 × 4 = 12. Gorduras: 6 × 9 = 54. Total: 138.',
    [['27 kcal.', 'Soma os gramas, e não a energia.'], ['120 kcal.', 'Usa 4 kcal por grama também para as gorduras.'], ['246 kcal.', 'Usa 9 kcal por grama para todos os nutrientes.']]);
  C('c10', 'ultraprocessados', 'média', null, 'O consumo frequente de alimentos ultraprocessados, ricos em açúcar, sal e gordura, pode',
    'aumentar o risco de obesidade e doenças como diabetes e hipertensão.', 'Esses alimentos têm muita energia e pouco valor nutritivo.',
    [['substituir sem prejuízo uma refeição completa.', 'Não oferecem todos os nutrientes necessários.'], ['curar doenças crônicas.', 'Não curam doenças.'], ['reduzir a fome por semanas.', 'Não têm esse efeito.']]);
  C('c11', 'dengue', 'média', null, 'Qual medida ajuda a combater a dengue?',
    'Eliminar recipientes que acumulem água parada.', 'O mosquito Aedes aegypti se reproduz na água parada.',
    [['Acender fogueiras no quintal.', 'Não combate o mosquito.'], ['Tomar banho de rio.', 'Não previne a dengue.'], ['Usar antibióticos preventivamente.', 'A dengue é causada por vírus.']]);
  C('c11', 'vacina', 'difícil', null, 'A vacinação protege contra certas doenças porque',
    'estimula o sistema imunológico a produzir defesas, sem causar a doença grave.', 'Após a vacina, o corpo “aprende” a reconhecer o agente causador.',
    [['elimina os vírus que já estão no corpo.', 'A função é preventiva.'], ['substitui o sistema imunológico.', 'Ela o estimula.'], ['faz o corpo parar de produzir células de defesa.', 'O efeito é o contrário.']]);
  C('c11', 'verminose', 'média', null, 'Qual hábito ajuda a prevenir as verminoses?',
    'Lavar as mãos antes das refeições e lavar bem frutas e verduras.', 'Os ovos de vermes podem estar nas mãos e nos alimentos.',
    [['Beber água direto de rios.', 'Pode conter parasitas.'], ['Andar descalço em áreas com esgoto.', 'Facilita infecções.'], ['Comer alimentos sem lavar.', 'Aumenta o risco.']]);
  C('c11', 'antibiotico', 'difícil', null, 'Sobre os antibióticos, é correto afirmar que',
    'agem contra bactérias, mas não contra vírus como o da gripe.', 'Antibióticos só devem ser usados com orientação médica.',
    [['curam qualquer doença causada por vírus.', 'Não agem sobre vírus.'], ['devem ser tomados sempre que há febre.', 'Febre pode ter várias causas.'], ['podem ser usados à vontade, sem orientação.', 'O uso errado favorece bactérias resistentes.']]);

  // ---------- Terra e Universo ----------
  QF('c12', 'vf-planetas', 'média', null, 'Marque V para verdadeiro e F para falso:\n( ) Mercúrio é o planeta mais próximo do Sol.\n( ) Saturno é um planeta gasoso e possui anéis.\n( ) Marte é um planeta gasoso.\n( ) Júpiter é o maior planeta do Sistema Solar.\nA sequência correta, de cima para baixo, é:',
    [['V – V – F – V', ''], ['V – F – V – V', 'Saturno tem anéis e Marte é rochoso.'], ['F – V – F – V', 'Mercúrio é o mais próximo do Sol.'], ['V – V – V – F', 'Marte não é gasoso e Júpiter é o maior.']], 0, 'Mercúrio é o mais próximo do Sol; Saturno é gasoso e tem anéis; Marte é rochoso; Júpiter é o maior planeta.');
  C('c12', 'ordem-planetas', 'média', null, 'No esquema, que número representa o planeta Terra e que número representa o maior planeta do Sistema Solar?',
    'Terra: 3; maior planeta: 5.', 'Contando a partir do Sol: Mercúrio (1), Vênus (2), Terra (3), Marte (4), Júpiter (5, o maior).',
    [['Terra: 4; maior planeta: 6.', 'Marte é o 4 e Saturno, o 6.'], ['Terra: 2; maior planeta: 5.', 'Vênus é o 2.'], ['Terra: 3; maior planeta: 8.', 'Netuno é o 8, mas Júpiter é maior.']], { visual: 'f_sistema_solar' });
  C('c12', 'luz-propria', 'fácil', null, 'Qual corpo celeste brilha com luz própria?',
    'O Sol, que é uma estrela.', 'Estrelas produzem luz e calor; planetas e luas refletem a luz recebida.',
    [['A Lua, que é um satélite natural.', 'Reflete a luz do Sol.'], ['A Terra, que é um planeta.', 'Não emite luz própria.'], ['Marte, que é um planeta rochoso.', 'Reflete a luz do Sol.']]);
  C('c12', 'cometa', 'difícil', null, 'Os cometas são corpos formados principalmente por gelo e rocha. Quando se aproximam do Sol, formam uma cauda porque',
    'o calor do Sol faz o gelo se transformar em gás e poeira, que são empurrados para longe.', 'A cauda de um cometa aponta, em geral, para longe do Sol.',
    [['eles aceleram até a velocidade da luz.', 'Isso não ocorre.'], ['são planetas gasosos em formação.', 'Cometas não são planetas.'], ['têm motores naturais que expelem fumaça.', 'Não há motores.']]);
  C('c13', 'luas', 'fácil', null, 'Quais letras do esquema representam, respectivamente, a Lua cheia e a Lua nova?',
    'C e A.', 'A Lua cheia aparece totalmente iluminada (C) e a nova, escura (A).',
    [['A e C.', 'Inverte as duas fases.'], ['B e D.', 'B mostra metade iluminada e D, um crescente fino.'], ['C e D.', 'D não é a Lua nova.']], { visual: 'f_luas' });
  C('c13', 'ciclo-lua', 'média', null, 'As fases da Lua se repetem em um ciclo de aproximadamente',
    '29,5 dias, ou cerca de um mês.', 'Uma lunação (de uma Lua nova até a seguinte) dura cerca de 29,5 dias.',
    [['24 horas.', 'É o tempo de rotação da Terra.'], ['365 dias.', 'É o tempo de translação da Terra.'], ['7 dias.', 'É aproximadamente o intervalo entre algumas fases.']]);
  C('c13', 'eclipse', 'difícil', null, 'Um eclipse solar acontece quando',
    'a Lua fica entre o Sol e a Terra, projetando sua sombra sobre parte da Terra.', 'Durante um eclipse solar, a Lua bloqueia, total ou parcialmente, a luz do Sol.',
    [['a Terra fica entre o Sol e a Lua.', 'Isso ocorre no eclipse lunar.'], ['o Sol passa entre a Terra e a Lua.', 'O Sol não se movimenta assim.'], ['a Lua deixa de refletir a luz do Sol por muitos anos.', 'A Lua não deixa de refletir luz.']]);
  C('c14', 'rotacao', 'média', null, 'Qual movimento da Terra explica a sucessão de dias e noites?',
    'A rotação, em torno do próprio eixo, em cerca de 24 horas.', 'Como a Terra gira, a parte voltada para o Sol tem dia; a oposta, noite.',
    [['A translação, em torno do Sol, em cerca de 365 dias.', 'Explica o ano e, junto com a inclinação do eixo, as estações.'], ['A órbita da Lua em torno da Terra.', 'Explica as fases da Lua.'], ['O afastamento do Sol durante a noite.', 'A Terra não se afasta e aproxima assim.']]);
  C('c14', 'estacoes', 'difícil', null, 'As estações do ano ocorrem principalmente porque',
    'o eixo da Terra é inclinado enquanto ela se desloca em torno do Sol.', 'A inclinação faz cada hemisfério receber luz solar de modo diferente ao longo do ano.',
    [['a Terra fica mais perto do Sol no verão e mais longe no inverno.', 'A distância não é a causa principal.'], ['o Sol aumenta e diminui de tamanho.', 'O Sol não muda de tamanho.'], ['a Lua bloqueia a luz do Sol em certas épocas.', 'Isso ocorre nos eclipses.']]);
  C('c14', 'hemisferios', 'média', null, 'Quando é verão no Brasil, que está no hemisfério sul, qual é a estação do ano no Japão, que está no hemisfério norte?',
    'Inverno.', 'As estações são opostas nos dois hemisférios.',
    [['Verão.', 'Seria o mesmo que no Brasil.'], ['Primavera.', 'Seria uma estação intermediária.'], ['Outono.', 'Seria uma estação intermediária.']]);
  C('c14', 'bissexto', 'média', null, 'A Terra leva cerca de 365 dias e 6 horas para dar uma volta em torno do Sol. Por isso, a cada 4 anos, o calendário tem',
    'um dia a mais, e o ano bissexto passa a ter 366 dias.', '4 × 6 horas = 24 horas, ou seja, um dia extra.',
    [['uma hora a mais em cada ano.', 'Os dias acumulados formam um dia inteiro a cada 4 anos.'], ['um mês a menos.', 'Não há tal ajuste.'], ['um dia a menos, com 364 dias.', 'O ajuste acrescenta um dia.']]);
})();
