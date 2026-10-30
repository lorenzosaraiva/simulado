(function () {
  'use strict';
  // Segundo lote: mais tirinhas e esquemas, e mais conteúdo de Paraná, Ciências e Geografia.
  const { Q, QF } = window.FIEL;
  const R = (item, fam, lvl, visual, prompt, ok, why, bad, extra = {}) => Q(item, fam, lvl, null, prompt, ok, why, bad, { visual, ...extra });
  const G = (item, fam, lvl, visual, prompt, ok, why, bad, extra = {}) => Q(item, fam, lvl, null, prompt, ok, why, bad, { visual, refs: ['ibge'], ...extra });
  const PR = (item, fam, lvl, visual, prompt, ok, why, bad, extra = {}) => Q(item, fam, lvl, null, prompt, ok, why, bad, { visual, refs: ['pr', 'prefCwb'], regional: true, ...extra });

  // ---------- Português: tirinhas e charges ----------
  R('p09', 'conversa-humor', 'média', 'f_conversa', 'O efeito de humor e de crítica da tirinha decorre do fato de que os dois amigos',
    'estão lado a lado, mas conversam por mensagens em vez de falar um com o outro.', 'A fala “Já estou conversando… no grupo da turma” revela a contradição: estão juntos, mas cada um se comunica com outras pessoas pelo celular.',
    [['estão conversando animadamente enquanto dividem o mesmo celular.', 'Cada um tem o seu próprio celular, e não há animação na conversa.'], ['discutem sobre qual aplicativo é melhor para trocar mensagens.', 'Nenhuma fala trata de aplicativos.'], ['combinam um encontro com o restante da turma na saída da escola.', 'A fala fala em conversar no grupo, e não em marcar um encontro.']]);
  R('p24', 'conversa-longe', 'média', 'f_conversa', 'Na legenda “Ao lado, mas longe”, a palavra “longe” foi empregada em sentido',
    'figurado, para indicar falta de proximidade e de atenção entre os amigos.', 'Os amigos estão fisicamente juntos, mas distantes na atenção e no diálogo.',
    [['literal, para indicar uma distância de vários metros entre os bancos.', 'Os dois estão no mesmo banco.'], ['técnico, para indicar o tempo de viagem entre duas casas.', 'Não há viagem na tirinha.'], ['irônico, para criticar a cor do banco em que estão sentados.', 'O banco não é o foco da crítica.']]);
  R('p05', 'conversa-reticencias', 'difícil', 'f_conversa', 'Na fala “Já estou conversando... no grupo da turma.”, as reticências indicam',
    'uma pausa que antecipa uma justificativa inesperada, criando o efeito de humor.', 'A pausa prepara o leitor para a revelação: a “conversa” é por mensagens.',
    [['que o personagem esqueceu o que ia dizer e vai pedir ajuda.', 'A frase é completada logo depois.'], ['que a fala foi cortada pelo outro personagem, que o interrompeu.', 'Não há interrupção na tirinha.'], ['que a frase é uma pergunta dirigida ao amigo ao lado.', 'A fala é uma afirmação.']]);

  R('p09', 'silencio-ironia', 'média', 'f_silencio', 'A ironia da charge está no fato de que a bibliotecária',
    'pede silêncio por meio de um grito, contrariando o que a própria placa pede.', 'O pedido “silêncio, por favor” é feito aos gritos, o que gera a contradição.',
    [['sussurra para pedir silêncio, o que ninguém consegue ouvir.', 'Ela grita, e não sussurra.'], ['coloca a placa no lugar errado, atrás da estante de livros.', 'A placa está visível na parede.'], ['pede aos leitores que falem mais alto, para conversarem melhor.', 'O pedido é de silêncio.']]);
  R('p19', 'silencio-pontuacao', 'média', 'f_silencio', 'Na fala “SILÊNCIOOO!”, o alongamento da vogal final, as letras maiúsculas e o ponto de exclamação indicam',
    'um grito, ou seja, uma fala em volume muito alto.', 'Os três recursos reforçam a intensidade da voz.',
    [['um sussurro, dito em voz bem baixa.', 'Os recursos reforçam o volume alto.'], ['uma pergunta, feita com dúvida.', 'Perguntas usam interrogação.'], ['um erro de digitação, sem nenhuma função.', 'As escolhas são intencionais, para marcar o grito.']]);
  R('p03', 'silencio-reacao', 'difícil', 'f_silencio', 'Ao tapar os ouvidos, os leitores sugerem que o grito da bibliotecária',
    'incomodou mais do que o barulho que ela queria eliminar.', 'A reação mostra que o remédio se tornou um problema maior que o mal.',
    [['foi bem recebido, e eles aplaudem a atitude dela.', 'Tapar os ouvidos indica incômodo.'], ['os acordou, pois dormiam depois de muita leitura.', 'Nada indica que estivessem dormindo.'], ['os convidou a participar de uma conversa em voz alta.', 'Eles reagem com desconforto.']]);

  // ---------- Matemática com imagens novas ----------
  R('m09', 'pizza-quem', 'média', 'f_pizza', 'Bia comeu 3/8 da pizza e Caio comeu 1/4. Quem comeu mais e que fração da pizza sobrou?',
    'Bia comeu mais; sobrou 3/8 da pizza.', '1/4 = 2/8, e Bia comeu 3/8. Juntos comeram 5/8, e sobrou 3/8.',
    [['Caio comeu mais; sobrou 3/8 da pizza.', '1/4 equivale a 2/8, menor que 3/8.'], ['Bia comeu mais; sobraram 5/8 da pizza.', '5/8 é o que os dois comeram juntos.'], ['Os dois comeram a mesma quantidade; sobrou 1/2.', '3/8 e 1/4 não são iguais.']]);
  R('m12', 'pizza-pct', 'difícil', 'f_pizza', 'Depois do lanche, que porcentagem da pizza ainda sobrou?',
    '37,5%', 'Sobraram 3 de 8 fatias: 3 ÷ 8 = 0,375 = 37,5%.',
    [['62,5%', 'É a porcentagem que foi comida (5/8).'], ['30%', 'Arredonda o valor sem fundamentação.'], ['3,75%', 'Erro na posição da vírgula.']]);
  R('m09', 'pizza-fatias', 'média', 'f_pizza', 'Se 1/4 da pizza equivale ao que Caio comeu, quantas fatias ele comeu e quantas fatias foram comidas por Bia e Caio juntos?',
    'Caio comeu 2 fatias; juntos, comeram 5 fatias.', '1/4 de 8 = 2 fatias. Bia comeu 3. Juntos: 3 + 2 = 5.',
    [['Caio comeu 4 fatias; juntos, comeram 7 fatias.', '1/4 de 8 é 2, e não 4.'], ['Caio comeu 1 fatia; juntos, comeram 4 fatias.', '1/4 de 8 é 2, e não 1.'], ['Caio comeu 2 fatias; juntos, comeram 6 fatias.', '3 + 2 = 5, e não 6.']]);
  R('m25', 'preco-quilo', 'difícil', 'f_precos', 'Qual pacote de arroz tem o menor preço por quilograma?',
    'O pacote B, a R$ 10,00 por quilograma.', 'A: 6 ÷ 0,5 = R$ 12,00/kg. B: 20 ÷ 2 = R$ 10,00/kg. C: R$ 11,00/kg.',
    [['O pacote A, a R$ 6,00 por quilograma.', 'R$ 6,00 é o preço de meio quilograma.'], ['O pacote C, a R$ 11,00 por quilograma.', 'B é mais barato por quilograma.'], ['O pacote B, a R$ 20,00 por quilograma.', 'R$ 20,00 é o preço de 2 kg.']]);
  R('m25', 'preco-economia', 'difícil', 'f_precos', 'Para comprar 2 kg de arroz, Lúcia comparou levar quatro pacotes do tipo A ou um pacote do tipo B. Quanto ela economiza escolhendo o mais barato?',
    'R$ 4,00', 'Quatro pacotes A: 4 × 6 = R$ 24,00. Um pacote B: R$ 20,00. A economia é de R$ 4,00.',
    [['R$ 2,00', 'Compara o pacote C, e não o A.'], ['R$ 6,00', 'Compara com um valor que não está nas etiquetas.'], ['R$ 14,00', 'Subtrai o preço do pacote A, em vez de comparar 2 kg.']]);
  R('m26', 'chuva-maximo', 'média', 'f_graf_chuva', 'No gráfico (dados fictícios), quantos milímetros a mais choveu no mês mais chuvoso do que no mês menos chuvoso?',
    '100 mm', 'Janeiro, o mais chuvoso: 160 mm. Junho, o menos chuvoso: 60 mm. A diferença é 100 mm.',
    [['80 mm', 'É a diferença entre fevereiro e abril, que não são os extremos.'], ['220 mm', 'Soma os dois valores, em vez de subtrair.'], ['160 mm', 'É a chuva do mês mais chuvoso.']]);
  R('m26', 'chuva-trimestre', 'média', 'f_graf_chuva', 'Qual é o total de chuva no primeiro trimestre (janeiro, fevereiro e março) segundo o gráfico?',
    '420 mm', '160 + 140 + 120 = 420 mm.',
    [['400 mm', 'Erra uma das parcelas da soma.'], ['300 mm', 'Considera apenas dois meses do trimestre.'], ['660 mm', 'Soma os seis meses do gráfico.']]);
  G('g06', 'chuva-estacao', 'média', 'f_graf_chuva', 'Considerando que janeiro é verão e junho é início do inverno no hemisfério sul, o gráfico (dados fictícios) indica que, nessa cidade, a chuva é',
    'mais abundante no verão do que no começo do inverno.', 'Em janeiro, 160 mm; em junho, 60 mm.',
    [['mais abundante no inverno do que no verão.', 'Inverte as estações.'], ['igual em todas as estações do ano.', 'Os valores variam bastante.'], ['ausente durante o primeiro semestre.', 'Choveu em todos os meses.']]);

  // ---------- Geografia e História com esquemas ----------
  PR('h09', 'tropeiros-cidades', 'média', 'f_tropeiros', 'No esquema, quais são, de sul para norte, as cidades paranaenses por onde passava o caminho dos tropeiros?',
    'Lapa, Ponta Grossa e Castro.', 'A rota entra no Paraná pela região da Lapa, segue por Ponta Grossa e Castro e sai em direção a São Paulo.',
    [['Castro, Ponta Grossa e Lapa.', 'Inverte a ordem de sul para norte.'], ['Paranaguá, Curitiba e Londrina.', 'Não estão no desenho do caminho.'], ['Foz do Iguaçu, Cascavel e Maringá.', 'Estão no oeste e no norte do estado, fora da rota.']]);
  PR('h09', 'tropeiros-destino', 'média', 'f_tropeiros', 'Segundo o esquema, para onde as tropas de mulas e gado eram levadas?',
    'Para a feira de Sorocaba, em São Paulo.', 'A rota terminava em Sorocaba, onde os animais eram vendidos.',
    [['Para o porto de Paranaguá, no litoral do Paraná.', 'Paranaguá não aparece na rota.'], ['Para Viamão, no Rio Grande do Sul.', 'Viamão é o ponto de partida.'], ['Para Foz do Iguaçu, na fronteira com a Argentina.', 'Não faz parte da rota.']]);
  G('g06', 'perfil-serra', 'média', 'f_perfil_relevo', 'No perfil do relevo do Paraná, qual letra representa a Serra do Mar?',
    'B', 'A Serra do Mar é o trecho mais alto do perfil, logo depois da planície do litoral.',
    [['A', 'A letra A é a planície litorânea.'], ['C', 'A letra C é o Primeiro Planalto.'], ['E', 'A letra E é o Terceiro Planalto.']], { regional: true, refs: ['ibge', 'pr'] });
  G('g06', 'perfil-planicie', 'média', 'f_perfil_relevo', 'O trecho indicado pela letra A, junto ao oceano, é uma',
    'planície litorânea: área baixa e relativamente plana.', 'As planícies são as áreas baixas e planas, como a do litoral paranaense.',
    [['serra: área elevada, com encostas íngremes.', 'A serra é a letra B.'], ['depressão absoluta: área abaixo do nível do mar.', 'O trecho está no nível do mar, e não abaixo.'], ['planalto: área alta e levemente ondulada.', 'Os planaltos são as letras C, D e E.']], { regional: true, refs: ['ibge', 'pr'] });
  G('g06', 'perfil-terceiro', 'difícil', 'f_perfil_relevo', 'O Terceiro Planalto (letra E) apresenta relevo que desce suavemente em direção a',
    'o rio Paraná, no extremo oeste do estado.', 'No oeste, o planalto vai baixando até o vale do rio Paraná.',
    [['o litoral, no extremo leste do estado.', 'O litoral está na outra extremidade do perfil.'], ['a Serra do Mar, que fica logo depois.', 'A Serra do Mar está a leste.'], ['o rio Tibagi, na região de Curitiba.', 'O perfil desce em direção ao rio Paraná.']], { regional: true, refs: ['ibge', 'pr'] });
  R('c09', 'dig-absorcao', 'média', 'f_digestorio', 'No esquema, qual letra indica o órgão em que ocorre a maior parte da absorção de nutrientes?',
    'D (intestino delgado).', 'No intestino delgado, longo e enrolado, os nutrientes passam para o sangue.',
    [['C (estômago).', 'No estômago o alimento é misturado ao suco gástrico.'], ['E (intestino grosso).', 'No intestino grosso absorve-se principalmente água.'], ['B (esôfago).', 'O esôfago apenas conduz o alimento.']]);
  R('c09', 'dig-estomago', 'média', 'f_digestorio', 'Qual afirmação descreve corretamente o que ocorre no órgão indicado pela letra C?',
    'O alimento é misturado ao suco gástrico, que inicia a digestão de proteínas.', 'O estômago é uma bolsa muscular que mistura o alimento ao suco gástrico.',
    [['O alimento é triturado pelos dentes e misturado à saliva.', 'Isso ocorre na boca (letra A).'], ['A água é absorvida e as fezes são formadas.', 'Isso ocorre no intestino grosso (letra E).'], ['O alimento é empurrado, sem sofrer alterações químicas.', 'Essa é a função do esôfago (letra B).']]);
  R('c09', 'dig-grosso', 'difícil', 'f_digestorio', 'O órgão indicado pela letra E é o intestino grosso. Sua função principal é',
    'absorver água e formar as fezes.', 'Ali termina a absorção de água, e os resíduos se compactam.',
    [['produzir bile para a digestão das gorduras.', 'A bile é produzida no fígado.'], ['digerir proteínas por meio do suco gástrico.', 'Isso ocorre no estômago.'], ['absorver a maior parte dos nutrientes dos alimentos.', 'Isso ocorre no intestino delgado.']]);
  R('c01', 'part-gas', 'média', 'f_particulas', 'No esquema, qual quadro representa a matéria no estado gasoso?',
    'Z, porque as partículas estão bem separadas e se espalham pelo espaço.', 'No estado gasoso, as partículas têm muita liberdade de movimento.',
    [['X, porque as partículas estão organizadas em fileiras.', 'X representa o estado sólido.'], ['Y, porque as partículas estão juntas e desorganizadas.', 'Y representa o estado líquido.'], ['X e Z, porque os dois têm partículas pequenas.', 'O tamanho não define o estado da matéria.']]);
  R('c01', 'part-liquido', 'média', 'f_particulas', 'O quadro Y representa a água líquida. Em relação ao quadro X, que representa o gelo, as partículas de Y',
    'continuam próximas, mas se movimentam e escorrem umas sobre as outras.', 'No líquido, as partículas estão juntas, mas não presas em posições fixas.',
    [['ficam muito mais distantes, ocupando todo o espaço.', 'Isso ocorre no estado gasoso.'], ['deixam de existir, pois a água evapora.', 'As partículas não deixam de existir.'], ['permanecem organizadas em fileiras, como no gelo.', 'No gelo, as partículas ficam organizadas.']]);
  R('c01', 'part-fusao', 'difícil', 'f_particulas', 'Se o material do quadro X for aquecido até derreter, a organização de suas partículas passará a se parecer com a do quadro',
    'Y, que representa o estado líquido.', 'A fusão faz o sólido passar a líquido, e as partículas se soltam das posições fixas.',
    [['Z, que representa o estado gasoso.', 'O gás só se forma depois da vaporização.'], ['X, pois a fusão não muda a organização.', 'A organização muda na fusão.'], ['nenhum dos quadros, pois as partículas desaparecem.', 'As partículas se conservam.']]);

  // ---------- Paraná: história ----------
  PR('h09', 'sete-municipios', 'difícil', null, 'Quando a Província do Paraná foi instalada, em 1853, ela tinha poucos municípios. Qual alternativa apresenta alguns deles?',
    'Paranaguá, Curitiba, Antonina, Morretes, Guaratuba, Castro e Lapa.', 'A província nasceu com sete municípios, ligados ao litoral e aos Campos Gerais.',
    [['Londrina, Maringá, Cascavel, Foz do Iguaçu e Guarapuava.', 'Essas cidades surgiram ou cresceram muito depois.'], ['Paranaguá, Curitiba, Londrina, Ponta Grossa e Maringá.', 'Londrina e Maringá surgiram no século XX.'], ['Curitiba, Ponta Grossa, Cascavel, Apucarana e Umuarama.', 'Cascavel, Apucarana e Umuarama surgiram no século XX.']]);
  PR('h09', 'primeiro-presidente', 'média', null, 'Qual personagem foi o primeiro presidente da Província do Paraná, instalada em Curitiba em 19 de dezembro de 1853?',
    'Zacarias de Góis e Vasconcelos.', 'Zacarias de Góis e Vasconcelos assumiu o governo da nova província.',
    [['Tomé de Sousa, que governou o Brasil colonial.', 'Foi o primeiro governador-geral do Brasil, em 1549.'], ['Dom Pedro II, que era o imperador do Brasil.', 'Era o imperador, e não o presidente da província.'], ['Rui Barbosa, que defendia a República.', 'Não foi presidente da Província do Paraná.']]);
  PR('h09', 'graciosa', 'média', null, 'A Estrada da Graciosa, inaugurada em 1873, é importante para a história do Paraná porque',
    'ligou Curitiba, no planalto, ao litoral, atravessando a Serra do Mar.', 'A estrada facilitou o transporte de pessoas e mercadorias, como a erva-mate, em direção ao porto.',
    [['ligou Curitiba a Foz do Iguaçu, na fronteira com a Argentina.', 'Não atravessa o estado até o oeste.'], ['foi a primeira rodovia asfaltada que passou por Londrina.', 'Foi aberta no século XIX, bem antes do asfalto.'], ['ligou Paranaguá à Lapa, passando pelo litoral catarinense.', 'Não passa por Santa Catarina.']]);
  PR('h09', 'alemaes-rio-negro', 'difícil', null, 'Em 1829, um grupo de imigrantes chegou à região de Rio Negro, no Paraná, e ficou conhecido como um dos primeiros núcleos de colonização estrangeira no estado. Esses imigrantes eram',
    'alemães.', 'Os primeiros colonos alemães chegaram a Rio Negro em 1829.',
    [['japoneses.', 'A imigração japonesa começou no século XX.'], ['ucranianos.', 'Os ucranianos chegaram a partir de 1895.'], ['holandeses.', 'Os holandeses chegaram a Carambeí em 1911.']]);
  PR('h09', 'poloneses', 'média', null, 'Em Curitiba, o Memorial da Imigração Polonesa lembra a chegada de poloneses, que se intensificou a partir de 1870. Uma influência polonesa na culinária paranaense é o',
    'pierogi, massa recheada cozida.', 'Os pierogi são pratos de origem polonesa, comuns em festas e restaurantes.',
    [['acarajé, bolinho frito de feijão-fradinho.', 'É prato de origem afro-brasileira, típico da Bahia.'], ['barreado, cozido do litoral paranaense.', 'É de tradição caiçara.'], ['pamonha, doce de milho verde.', 'É de tradição indígena e caipira.']]);
  PR('h09', 'japoneses-norte', 'média', null, 'Na primeira metade do século XX, imigrantes japoneses se estabeleceram em cidades do norte do Paraná, como Assaí e Londrina. Eles contribuíram, principalmente, com',
    'a agricultura, a cultura e a gastronomia locais.', 'Os imigrantes japoneses participaram da ocupação agrícola e deixaram marcas na cultura da região.',
    [['a construção da ferrovia entre Curitiba e Paranaguá.', 'A ferrovia é de 1885, antes da imigração japonesa.'], ['a extração de erva-mate no planalto de Curitiba.', 'O ciclo do mate foi anterior.'], ['a criação das missões jesuíticas no Guairá.', 'As missões são do século XVII.']]);
  PR('h09', 'territorio-iguacu', 'difícil', null, 'Entre 1943 e 1946, parte do oeste do Paraná e do oeste de Santa Catarina formou o Território Federal do Iguaçu. Essa mudança mostra que',
    'as divisas do estado já foram alteradas por decisões do governo federal.', 'O território foi criado e depois extinto, e a região voltou aos dois estados.',
    [['o Paraná sempre teve os mesmos limites desde 1853.', 'Houve alterações, como o Território do Iguaçu e o acordo do Contestado.'], ['o Paraná foi dividido definitivamente em dois estados.', 'O território foi extinto em 1946.'], ['o oeste do estado ainda não era habitado por brasileiros.', 'O território tinha povoamento brasileiro.']]);
  PR('h09', 'maringa-planejada', 'média', null, 'Maringá, fundada em 1947 no norte do Paraná, é conhecida por ser uma cidade',
    'planejada, com ruas, praças e áreas verdes projetadas antes da ocupação.', 'A cidade foi projetada pela companhia colonizadora que ocupou o norte do estado.',
    [['formada por um antigo pouso de tropeiros do século XVIII.', 'Seu surgimento é do século XX.'], ['criada a partir de uma colônia de imigrantes poloneses.', 'Foi uma cidade planejada pela companhia colonizadora.'], ['originada de uma missão jesuíta do século XVII.', 'As missões jesuíticas eram do Guairá.']]);
  PR('h09', 'geada-negra', 'difícil', null, 'Em 1975, uma forte geada, conhecida como geada negra, destruiu cafezais no Paraná. Uma consequência foi',
    'a substituição de parte do café por lavouras como soja e trigo e a saída de muitos trabalhadores do campo.', 'A geada acelerou o fim do ciclo do café no norte e a expansão de lavouras mecanizadas.',
    [['o aumento imediato da área plantada com café em todo o estado.', 'Os cafezais foram reduzidos.'], ['o fim da produção agrícola em todo o estado.', 'A agricultura continuou, com outros produtos.'], ['a transferência do porto de Paranaguá para Londrina.', 'Não há relação com o porto.']]);
  PR('h09', 'londrina-1934', 'média', null, 'Londrina, no norte do Paraná, foi fundada em 1934 pela',
    'Companhia de Terras Norte do Paraná, empresa colonizadora de capital inglês.', 'A companhia vendeu lotes e organizou a ocupação da região.',
    [['Companhia de Jesus, ordem religiosa que fundava missões.', 'A Companhia de Jesus atuou nas missões do século XVII.'], ['família imperial, que escolheu a região para um palácio.', 'A fundação foi de uma empresa privada.'], ['Prefeitura de Curitiba, que ampliou a capital.', 'Londrina fica longe da capital.']]);
  PR('h10', 'cidade-1842', 'média', null, 'Em 1842, a antiga vila de Curitiba foi elevada à categoria de cidade. Antes disso, em 1693, Curitiba havia sido instalada como',
    'vila, com Câmara Municipal própria.', 'A vila foi instalada em 1693 e se tornou cidade em 1842.',
    [['capital do Império do Brasil.', 'A capital era o Rio de Janeiro.'], ['província, com um presidente nomeado.', 'A província só foi criada em 1853.'], ['colônia de imigrantes alemães.', 'A vila é anterior à imigração em massa.']]);
  PR('h10', 'barões-mate', 'média', null, 'No final do século XIX, os chamados barões do mate, enriquecidos com a erva-mate, deixaram marcas em Curitiba, como',
    'casarões e palacetes construídos na cidade.', 'A riqueza do mate financiou construções e o crescimento urbano.',
    [['as primeiras usinas hidrelétricas do rio Paraná.', 'As grandes usinas são do século XX.'], ['as missões jesuíticas do Guairá.', 'As missões são do século XVII.'], ['os quilombos da região de Palmares.', 'Palmares ficava em Alagoas.']]);
  PR('h05', 'nomes-indigenas', 'média', null, 'Muitos nomes de lugares do Paraná têm origem indígena. Qual dos nomes abaixo NÃO tem origem indígena?',
    'Londrina, que lembra a cidade de Londres.', 'O nome foi inspirado em Londres, por causa da companhia inglesa que colonizou a região.',
    [['Curitiba, de origem tupi-guarani.', 'Vem do tupi-guarani.'], ['Paranaguá, de origem indígena.', 'Tem origem indígena.'], ['Tibagi, nome de um rio e de uma cidade.', 'Tem origem indígena.']]);
  PR('h05', 'indigenas-hoje', 'média', null, 'Atualmente, no Paraná, existem terras indígenas habitadas, principalmente, por',
    'povos Kaingang e Guarani, entre outros.', 'Esses povos mantêm língua, cultura e territórios no estado.',
    [['povos Yanomami e Kayapó, vindos da Amazônia.', 'Vivem em outras regiões do Brasil.'], ['povos Inca e Maia, vindos da América Central.', 'São povos antigos de outros continentes.'], ['povos Tupinambá e Potiguara, do litoral nordestino.', 'Vivem em outras regiões do Brasil.']]);
  H1();
  function H1() {
    Q('h03', 'carta-caminha', 'média', null, 'A Carta de Pero Vaz de Caminha, escrita em 1500 ao rei de Portugal, é considerada uma fonte histórica',
      'escrita, pois descreve a chegada dos portugueses e o primeiro contato com os indígenas.', 'É um documento escrito da época, que registra a visão de um português.',
      [['oral, pois foi gravada em áudio por um povo indígena.', 'A carta é um documento escrito.'], ['material, pois é um objeto de cerâmica da época.', 'A carta é um documento de papel.'], ['iconográfica, pois é uma pintura da chegada de Cabral.', 'A carta é um texto escrito.']]);
    Q('h06', 'casa-grande', 'média', null, 'Nos engenhos coloniais, a casa-grande e a senzala representavam, respectivamente,',
      'a moradia do senhor de engenho e de sua família e o alojamento das pessoas escravizadas.', 'Os dois espaços simbolizam a desigualdade da sociedade colonial.',
      [['a moradia dos indígenas livres e a escola dos jesuítas.', 'Não eram espaços de indígenas livres e jesuítas.'], ['o armazém de mercadorias e o local de reuniões da Câmara.', 'Não eram edificações administrativas.'], ['a igreja da fazenda e a moradia dos padres.', 'Eram espaços de moradia, e não religiosos.']]);
  }

  // ---------- Geografia: Brasil e Paraná ----------
  G('g06', 'bioma-pr', 'média', null, 'O bioma original que cobria a maior parte do território do Paraná é a',
    'Mata Atlântica, que inclui a Floresta com Araucárias.', 'No Paraná, a Mata Atlântica apresenta diferentes tipos de floresta e campos.',
    [['Caatinga, de clima semiárido, típica do sertão nordestino.', 'A Caatinga está no Nordeste.'], ['Pantanal, planície alagável do Centro-Oeste.', 'O Pantanal está no Centro-Oeste.'], ['Floresta Amazônica, de clima equatorial.', 'A Amazônia está na Região Norte.']], { regional: true, refs: ['ibge', 'pr'] });
  G('g06', 'bioma-br', 'média', null, 'Qual é o bioma de maior extensão territorial do Brasil?',
    'Amazônia.', 'A Amazônia ocupa cerca de metade do território brasileiro.',
    [['Cerrado.', 'É o segundo em extensão.'], ['Mata Atlântica.', 'Foi muito reduzida pelo desmatamento.'], ['Caatinga.', 'Ocupa parte do Nordeste.']]);
  G('g06', 'pampa', 'fácil', null, 'O bioma Pampa, de campos e clima mais frio, ocorre no Brasil',
    'no Rio Grande do Sul.', 'O Pampa é típico do sul do Brasil, com campos naturais.',
    [['no Amazonas.', 'No Amazonas predomina a Floresta Amazônica.'], ['no Piauí.', 'No Piauí predominam Caatinga e Cerrado.'], ['em Goiás.', 'Em Goiás predomina o Cerrado.']]);
  G('g06', 'amazonas-rio', 'média', null, 'O maior rio do Brasil em volume de água é o',
    'Amazonas.', 'O rio Amazonas é o de maior volume de água do mundo.',
    [['São Francisco.', 'É importante para o Nordeste, mas menor.'], ['Paraná.', 'É importante para o Sul e o Sudeste, mas menor.'], ['Tietê.', 'É um rio paulista.']]);
  G('g06', 'relevo-br', 'média', null, 'No relevo do Brasil, predominam',
    'os planaltos, com altitudes modestas, e as planícies em áreas menores.', 'O território tem poucas montanhas muito altas e grande extensão de planaltos.',
    [['as grandes cordilheiras, como os Andes.', 'Os Andes ficam a oeste da América do Sul.'], ['os desertos e as geleiras permanentes.', 'Não existem no Brasil.'], ['os vulcões ativos e as altas montanhas.', 'Não há vulcões ativos no Brasil.']]);
  G('g03', 'sudeste-populacao', 'média', null, 'A região mais populosa do Brasil é a',
    'Sudeste, onde ficam São Paulo e Rio de Janeiro.', 'Concentra a maior parte da população do país.',
    [['Norte, onde fica Manaus.', 'É a de maior área, mas pouco povoada.'], ['Centro-Oeste, onde fica Brasília.', 'É menos populosa que o Sudeste.'], ['Sul, onde fica Curitiba.', 'É menos populosa que o Sudeste.']]);
  G('g06', 'clima-sul', 'média', null, 'O clima predominante na Região Sul é o subtropical, que se caracteriza por',
    'estações bem definidas, chuvas bem distribuídas e geadas no inverno.', 'As quatro estações são mais marcadas que no resto do país.',
    [['temperaturas altas o ano todo, sem estações definidas.', 'Isso é típico de clima equatorial.'], ['longos períodos de seca, com chuvas só no verão.', 'Isso é típico do clima semiárido.'], ['neve em todo o inverno nas áreas de planície.', 'Neve é rara e pontual.']]);
  PR('g07', 'vila-velha', 'média', null, 'O Parque Estadual de Vila Velha, em Ponta Grossa, é conhecido por',
    'suas formações de arenito esculpidas pela erosão ao longo de milhões de anos.', 'As rochas formam paredões e torres, esculpidos pela ação do vento e da água.',
    [['suas praias de água salgada, no litoral.', 'Ponta Grossa fica no interior.'], ['suas grandes quedas-d’água, na divisa com a Argentina.', 'As quedas famosas são as Cataratas do Iguaçu.'], ['sua floresta densa, de clima equatorial.', 'A região tem campos e rochas.']]);
  PR('g04', 'trem-morretes', 'média', null, 'O passeio de trem entre Curitiba e Morretes é conhecido porque o trajeto',
    'atravessa a Serra do Mar, passando por vales, pontes e paisagens de Mata Atlântica.', 'A ferrovia liga o planalto ao litoral.',
    [['atravessa o rio Paraná, na divisa com o Paraguai.', 'Esse trajeto fica no oeste do estado.'], ['percorre o norte do estado, entre cafezais.', 'Esse trajeto não passa pelo norte.'], ['segue pelas dunas de areia do litoral de Santa Catarina.', 'O trajeto fica no Paraná.']]);
  PR('g07', 'ilha-mel', 'média', null, 'A Ilha do Mel, no litoral do Paraná, é uma área de grande interesse ambiental porque',
    'abriga uma estação ecológica e áreas preservadas de restinga e Mata Atlântica.', 'Parte da ilha é unidade de conservação.',
    [['é o principal centro industrial do estado.', 'É uma ilha, em grande parte preservada.'], ['é a principal região agrícola de soja do estado.', 'A soja é cultivada no interior.'], ['fica no rio Iguaçu, perto das Cataratas.', 'Fica no litoral.']]);
  G('g10', 'mapa-oeste', 'média', null, 'No mapa, em relação a Curitiba (A), a cidade de Cascavel (G) fica',
    'a oeste.', 'Cascavel está muito mais a oeste, em latitude semelhante à de Curitiba.',
    [['ao norte.', 'A diferença de latitude é pequena.'], ['ao sul.', 'A diferença de latitude é pequena.'], ['a leste.', 'Cascavel fica a oeste.']], { visual: 'f_mapa_parana_letras', regional: true, refs: ['ibge', 'pr'] });
  G('g09', 'mapa-curitiba-guarapuava', 'difícil', null, 'Pela escala gráfica do mapa, a distância em linha reta entre Curitiba (A) e Guarapuava (H) é de aproximadamente',
    '200 km.', 'No mapa, a distância entre A e H equivale a pouco mais que duas vezes a barra de 100 km.',
    [['50 km.', 'É a metade da barra, menor que a distância real.'], ['100 km.', 'É a barra da escala, menor que a distância entre A e H.'], ['400 km.', 'É maior do que a distância no mapa.']], { visual: 'f_mapa_parana_letras', regional: true, refs: ['ibge', 'pr'] });

  // ---------- Ciências ----------
  Q('c05', 'respiracao-animais', 'média', null, 'Associe cada animal à sua forma de respiração principal: I. Peixe; II. Inseto; III. Minhoca. (a) tubos que levam o ar ao corpo (traqueias); (b) pele úmida; (c) brânquias.',
    'I–c; II–a; III–b.', 'Peixes respiram por brânquias, insetos por traqueias e minhocas pela pele úmida.',
    [['I–a; II–c; III–b.', 'Troca as formas de respiração de peixes e insetos.'], ['I–b; II–a; III–c.', 'Troca as formas de respiração de peixes e minhocas.'], ['I–c; II–b; III–a.', 'Troca as formas de respiração de insetos e minhocas.']], { topic: 'Vertebrados e invertebrados' });
  Q('c07', 'decompositores', 'média', null, 'Os fungos e as bactérias que decompõem folhas e restos de animais mortos têm papel importante no ambiente porque',
    'devolvem nutrientes ao solo, que podem ser reaproveitados pelas plantas.', 'A decomposição recicla a matéria orgânica.',
    [['impedem que as plantas absorvam água pelas raízes.', 'Eles não impedem a absorção.'], ['produzem oxigênio por meio da fotossíntese.', 'Fungos e bactérias decompositoras não fazem fotossíntese.'], ['servem de alimento apenas para os predadores de topo.', 'Não é essa a função principal.']]);
  Q('c11', 'carie', 'média', null, 'Qual conjunto de hábitos ajuda a prevenir a cárie?',
    'Escovar os dentes depois das refeições, usar fio dental e reduzir o consumo de açúcar.', 'A higiene bucal e a redução do açúcar diminuem as bactérias que causam cárie.',
    [['Escovar os dentes uma vez por semana e comer doces à noite.', 'A higiene é insuficiente.'], ['Evitar a escovação para não machucar a gengiva.', 'A escovação é essencial.'], ['Tomar vitaminas e deixar de lavar as mãos.', 'Não previne a cárie.']]);
  Q('c13', 'luz-sol', 'média', null, 'A luz do Sol leva cerca de 8 minutos para chegar à Terra. Isso mostra que',
    'o Sol está muito distante, e a luz precisa de tempo para percorrer essa distância.', 'A luz viaja em alta velocidade, mas a distância é enorme.',
    [['o Sol está a poucos metros da superfície da Terra.', 'Está a cerca de 150 milhões de quilômetros.'], ['a luz do Sol é produzida pela Lua durante o dia.', 'A Lua apenas reflete a luz do Sol.'], ['a luz do Sol só chega à Terra durante a noite.', 'É durante o dia que a luz chega diretamente.']]);
  Q('c13', 'face-lua', 'difícil', null, 'Da Terra, vemos sempre praticamente a mesma face da Lua. Isso ocorre porque',
    'a Lua demora o mesmo tempo para girar em torno de si e para dar uma volta em torno da Terra.', 'A rotação e a translação da Lua têm duração semelhante.',
    [['a Lua não gira em torno de si mesma nem se desloca no espaço.', 'A Lua se move e gira.'], ['o Sol ilumina apenas uma face da Lua, sempre a mesma.', 'A iluminação muda ao longo do mês, formando as fases.'], ['a Terra impede que a luz do Sol alcance o outro lado.', 'O outro lado também é iluminado.']]);
  Q('c12', 'planeta-anao', 'média', null, 'Plutão, antes considerado o nono planeta, hoje é classificado como',
    'planeta-anão.', 'Em 2006, a astronomia passou a classificá-lo como planeta-anão.',
    [['estrela de pequeno brilho.', 'Não é uma estrela.'], ['satélite natural de Netuno.', 'Plutão orbita o Sol.'], ['cometa de longa cauda.', 'Não é um cometa.']]);
  Q('c12', 'asteroides', 'média', null, 'O cinturão de asteroides, formado por milhares de pedaços de rocha, fica entre as órbitas dos planetas',
    'Marte e Júpiter.', 'Esse cinturão se localiza entre o quarto e o quinto planetas.',
    [['Mercúrio e Vênus.', 'Estão perto do Sol, sem cinturão entre eles.'], ['Saturno e Urano.', 'Os asteroides não se concentram ali.'], ['Netuno e Plutão.', 'Ali está o cinturão de Kuiper.']]);
  Q('c03', 'agua-salgada', 'média', null, 'Cerca de 97% da água do planeta é salgada e está nos mares e oceanos. Isso mostra que',
    'a água doce, própria para o consumo, é um recurso limitado e deve ser usada com cuidado.', 'Só uma pequena parte da água é doce, e parte dela está em geleiras.',
    [['a água doce é infinita e não precisa de cuidados.', 'A água doce é limitada.'], ['a água salgada pode ser bebida sem tratamento.', 'A água salgada não é própria para beber.'], ['os rios contêm mais água do que os oceanos.', 'Os oceanos têm quase toda a água do planeta.']]);
  QF('c03', 'tratamento-agua', 'difícil', null, 'Em uma estação de tratamento, a água dos rios passa por etapas. Observe:\nI. Filtração.\nII. Captação da água do rio.\nIII. Adição de cloro (desinfecção).\nIV. Decantação, em que as partículas maiores se depositam no fundo.\nA ordem em que ocorrem é:',
    [['II, IV, I e III', ''], ['II, I, IV e III', 'A decantação ocorre antes da filtração.'], ['II, III, IV e I', 'A desinfecção é a etapa final.'], ['IV, II, I e III', 'A captação é a primeira etapa.']], 0, 'A água é captada, as partículas se depositam (decantação), passa pelo filtro e recebe cloro antes de ser distribuída.');
})();
