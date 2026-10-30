(function () {
  'use strict';
  // História: tempo e fontes, povos indígenas e africanos, colonização, Paraná e Curitiba.
  const F = window.FIEL, { Q, QF, figure, text, line, circle, lines, rect, INK } = F;
  const H = (item, fam, lvl, base, prompt, ok, why, bad, extra = {}) => Q(item, fam, lvl, base, prompt, ok, why, bad, extra);
  const HR = (item, fam, lvl, base, prompt, ok, why, bad, extra = {}) => Q(item, fam, lvl, base, prompt, ok, why, bad, { refs: ['pr', 'prefCwb'], regional: true, ...extra });

  // Linha do tempo do Paraná
  (function () {
    const ev = [[1693, 'Vila de Curitiba'], [1853, 'Província do Paraná'], [1885, 'Ferrovia Paranaguá–Curitiba'], [1889, 'Proclamação da República'], [1912, 'Início da Guerra do Contestado'], [1934, 'Fundação de Londrina'], [1984, 'Inauguração de Itaipu']];
    let g = text(380, 28, 'Alguns marcos da história do Paraná', 19, { anchor: 'middle', weight: 'bold' }) + line(30, 150, 730, 150, { sw: 4 });
    ev.forEach(([y, l], i) => { const x = 60 + i * 107, up = i % 2 === 0, w = l.split(' '), arr = l.length > 16 ? [w.slice(0, Math.ceil(w.length / 2)).join(' '), w.slice(Math.ceil(w.length / 2)).join(' ')] : [l]; g += circle(x, 150, 7, '#e9a91c') + text(x, up ? 128 : 182, String(y), 16, { anchor: 'middle', weight: 'bold' }) + lines(x, up ? 112 - arr.length * 16 : 206, arr, 12.5, { anchor: 'middle' }); });
    figure('f_linha_parana', 'Linha do tempo: marcos da história do Paraná', 'Linha do tempo com 1693, Vila de Curitiba; 1853, Província do Paraná; 1885, Ferrovia Paranaguá–Curitiba; 1889, Proclamação da República; 1912, início da Guerra do Contestado; 1934, fundação de Londrina; 1984, inauguração de Itaipu.', 760, 260, g);
  })();

  // ---------- Tempo histórico ----------
  H('h01', 'seculos', 'fácil', null, 'A fundação da Vila de Curitiba, em 1693, ocorreu em qual século?',
    'Século XVII.', 'O século XVII vai de 1601 a 1700.',
    [['Século XVI.', 'Vai de 1501 a 1600.'], ['Século XVIII.', 'Vai de 1701 a 1800.'], ['Século XIX.', 'Vai de 1801 a 1900.']]);
  H('h01', 'seculo-1853', 'média', null, 'Em qual século se encontra o ano de 1853, em que o Paraná se tornou província?',
    'Século XIX.', 'O século XIX vai de 1801 a 1900.',
    [['Século XVIII.', 'Vai de 1701 a 1800.'], ['Século XX.', 'Vai de 1901 a 2000.'], ['Século XVII.', 'Vai de 1601 a 1700.']]);
  H('h01', 'duracao-republica', 'média', null, 'O Paraná tornou-se província em 1853, e o Brasil virou república em 1889. Quantos anos se passaram entre esses dois acontecimentos?',
    '36 anos.', '1889 − 1853 = 36.',
    [['26 anos.', 'Erro de subtração.'], ['46 anos.', 'Erro de subtração.'], ['136 anos.', 'Erro de subtração.']]);
  H('h02', 'linha-parana', 'média', null, 'Pela linha do tempo, quantos anos se passaram entre a criação da Província do Paraná e a inauguração da ferrovia Paranaguá–Curitiba?',
    '32 anos.', '1885 − 1853 = 32.',
    [['22 anos.', 'Erro de subtração.'], ['36 anos.', 'É a diferença até 1889.'], ['132 anos.', 'Erro de subtração.']], { visual: 'f_linha_parana' });
  QF('h02', 'ordem-colonia', 'média', null, 'Observe os acontecimentos:\nI. Criação do Governo-Geral (1549).\nII. Chegada de Cabral ao Brasil (1500).\nIII. Independência do Brasil (1822).\nIV. Criação das capitanias hereditárias (1534).\nA ordem cronológica correta é:',
    [['II, IV, I e III', ''], ['II, I, IV e III', 'As capitanias (1534) vêm antes do Governo-Geral (1549).'], ['IV, II, I e III', 'A chegada de Cabral vem antes das capitanias.'], ['I, II, IV e III', 'O Governo-Geral só ocorre depois de 1500 e 1534.']], 0, '1500, 1534, 1549 e 1822.');
  QF('h02', 'ordem-parana', 'difícil', null, 'Observe os acontecimentos da história do Paraná:\nI. Criação da Província do Paraná.\nII. Fundação da Vila de Curitiba.\nIII. Início da Guerra do Contestado.\nIV. Inauguração da Usina de Itaipu.\nA ordem cronológica correta é:',
    [['II, I, III e IV', ''], ['I, II, III e IV', 'A vila de Curitiba (1693) é anterior à província (1853).'], ['II, III, I e IV', 'O Contestado (1912) ocorreu depois da província (1853).'], ['II, I, IV e III', 'Itaipu (1984) é posterior ao Contestado (1912).']], 0, 'Vila de Curitiba (1693), Província (1853), Contestado (1912) e Itaipu (1984).', { visual: 'f_linha_parana', regional: true });
  H('h03', 'fontes-tipos', 'média', null, 'Um relato oral de uma moradora antiga do bairro, gravado em áudio, é classificado como uma fonte histórica',
    'oral.', 'Fontes orais são memórias e depoimentos transmitidos pela fala.',
    [['escrita.', 'Fonte escrita é um documento, carta ou livro.'], ['material.', 'Fonte material é um objeto, como uma cerâmica ou um prédio.'], ['iconográfica.', 'Fonte iconográfica é uma imagem, como pintura ou foto.']]);
  H('h03', 'fontes-material', 'média', null, 'Qual destes itens é uma fonte histórica material?',
    'Um fragmento de cerâmica encontrado em uma escavação.', 'Fontes materiais são objetos e construções produzidos por pessoas do passado.',
    [['Uma carta escrita em 1853.', 'É fonte escrita.'], ['Um depoimento gravado de um morador.', 'É fonte oral.'], ['Uma pintura do século XIX.', 'É fonte iconográfica.']]);
  H('h03', 'fontes-divergencia', 'difícil', 'Dois documentos descrevem uma mesma festa de 1890. O primeiro, escrito pelo prefeito, diz que “toda a cidade” compareceu. O segundo, escrito por um trabalhador, diz que “a maioria dos operários não pôde ir”.',
    'O que o historiador deve fazer ao analisar essas fontes?', 'Comparar os dois relatos, considerando quem os escreveu e por quê, e buscar outras evidências.', 'Fontes refletem o ponto de vista e os interesses de quem as produziu.',
    [['Aceitar só o do prefeito, pois é uma autoridade.', 'Uma autoridade não é necessariamente imparcial.'], ['Descartar os dois, pois são diferentes.', 'As diferenças também ajudam a entender o passado.'], ['Escolher o que for mais curto.', 'O tamanho do texto não importa.']]);

  // ---------- Povos indígenas ----------
  H('h05', 'antes-1500', 'fácil', null, 'Quando os portugueses chegaram, em 1500, o território que hoje é o Brasil',
    'já era habitado por muitos povos indígenas, com línguas e culturas diferentes.', 'Os povos indígenas já viviam aqui havia milhares de anos.',
    [['estava desabitado.', 'Havia milhões de pessoas vivendo nele.'], ['era habitado por um só povo, com uma única língua.', 'Havia grande diversidade.'], ['era formado apenas por cidades europeias.', 'As cidades europeias vieram depois.']]);
  H('h05', 'povos-pr', 'média', null, 'Quais povos indígenas habitam o território do atual Paraná desde antes da chegada dos europeus?',
    'Kaingang e Guarani, entre outros.', 'Kaingang (planaltos, pinhais) e Guarani (vales e rios) são os mais conhecidos; os Xetá também viveram na região.',
    [['Tupinambá e Charrua.', 'Não são os povos característicos do Paraná.'], ['Yanomami e Kayapó.', 'Vivem na Amazônia e no Brasil central.'], ['Maias e Astecas.', 'São povos da América Central.']], { regional: true, refs: ['pr'] });
  H('h05', 'pinhao-kaingang', 'média', null, 'O pinhão, semente da araucária, foi (e ainda é) um alimento muito importante para qual povo indígena do Paraná?',
    'Kaingang.', 'Os Kaingang viviam nas regiões de Floresta com Araucária e coletavam pinhão.',
    [['Yanomami.', 'Vivem na Amazônia, longe das araucárias.'], ['Marajoara.', 'É um povo antigo da Ilha de Marajó.'], ['Inca.', 'Não viveu no Brasil.']], { regional: true, refs: ['pr'] });
  H('h05', 'nomes-tupi', 'média', null, 'Os nomes “Iguaçu” e “Paraná” têm origem em línguas indígenas. Em tupi-guarani, “Iguaçu” significa',
    '“água grande”.', 'Y (água) + guaçu (grande) = Iguaçu, “rio grande”, “água grande”.',
    [['“pedra branca”.', 'Não é o significado.'], ['“terra vermelha”.', 'Não é o significado.'], ['“floresta fechada”.', 'Não é o significado.']], { regional: true, refs: ['pr'] });
  H('h05', 'escambo', 'média', null, 'O escambo, praticado pelos portugueses com os indígenas no início da colonização, consistia em',
    'trocar mercadorias, como pau-brasil por machados, espelhos e tecidos, sem uso de dinheiro.', 'O escambo é uma troca de mercadorias sem moeda.',
    [['pagar os indígenas com moedas de ouro.', 'Não havia pagamento em moeda.'], ['vender produtos europeus por preços fixos.', 'Não era comércio com moeda.'], ['doar terras aos indígenas.', 'Não era doação.']]);
  H('h05', 'vida-tupi', 'média', null, 'Os povos tupi, que habitavam o litoral brasileiro em 1500, viviam principalmente',
    'em aldeias com ocas, cultivando mandioca e milho, e praticando caça, pesca e coleta.', 'Era uma sociedade organizada em aldeias, com divisão de tarefas.',
    [['em grandes cidades muradas, comerciando com a Europa.', 'Não havia cidades muradas como as europeias.'], ['em navios, passando a vida no mar.', 'Viviam em aldeias.'], ['em castelos de pedra nas montanhas.', 'Esse não era o modo de vida.']]);
  H('h08', 'consequencias-conquista', 'difícil', null, 'Com a chegada dos europeus, muitos povos indígenas sofreram grandes perdas. Qual alternativa apresenta corretamente algumas dessas consequências?',
    'Epidemias de doenças trazidas pelos europeus, escravização e perda de terras.', 'Doenças como varíola e sarampo e a violência da colonização reduziram muito a população indígena.',
    [['Aumento da população indígena e ampliação de seus territórios.', 'Ocorreu o contrário.'], ['Fim de todas as guerras entre povos indígenas.', 'Os conflitos continuaram ou se intensificaram.'], ['Adoção da língua portuguesa por todos os povos indígenas.', 'Muitas línguas indígenas ainda existem.']]);
  H('h08', 'resistencia-indigena', 'difícil', null, 'Os povos indígenas resistiram à colonização de diversas formas. Qual alternativa apresenta um exemplo de resistência?',
    'A Confederação dos Tamoios, aliança de povos indígenas contra os portugueses, no século XVI.', 'A Confederação dos Tamoios (1554–1567) reuniu vários povos contra a colonização portuguesa no litoral.',
    [['A Proclamação da República, em 1889.', 'Não foi uma resistência indígena.'], ['A criação das capitanias hereditárias.', 'Foi uma medida da Coroa portuguesa.'], ['A abolição da escravidão, em 1888.', 'Não foi um movimento indígena.']]);

  // ---------- Colonização ----------
  H('h06', 'cabral', 'fácil', null, 'Em 1500, a esquadra comandada por Pedro Álvares Cabral chegou a qual local do atual Brasil?',
    'Porto Seguro, na Bahia.', 'A chegada de Cabral é considerada marco da chegada dos portugueses ao Brasil.',
    [['Curitiba, no Paraná.', 'A cidade só foi fundada muito depois.'], ['Manaus, no Amazonas.', 'Não foi o ponto de chegada.'], ['Brasília, no Distrito Federal.', 'Foi fundada no século XX.']]);
  H('h06', 'tordesilhas', 'média', null, 'O Tratado de Tordesilhas, assinado em 1494,',
    'dividiu as terras descobertas e por descobrir entre Portugal e Espanha.', 'O tratado traçou uma linha imaginária e definiu a parte de cada reino.',
    [['proclamou a independência do Brasil.', 'A independência foi em 1822.'], ['aboliu a escravidão.', 'A abolição foi em 1888.'], ['criou o Governo-Geral.', 'O Governo-Geral foi criado em 1549.']]);
  QF('h06', 'vf-paubrasil', 'média', 'Os portugueses exploraram o pau-brasil, árvore da Mata Atlântica, no início da colonização.',
    'Marque V para verdadeiro e F para falso:\n( ) A exploração do pau-brasil foi a primeira atividade econômica da colonização.\n( ) Os portugueses construíram feitorias no litoral para armazenar a madeira.\n( ) O trabalho na extração do pau-brasil era realizado só por pessoas livres e assalariadas, sem participação indígena.\n( ) O pau-brasil atraiu a atenção de outros países europeus, como a França.\nA sequência correta, de cima para baixo, é:',
    [['V – V – F – V', ''], ['V – F – V – V', 'Os portugueses construíram feitorias.'], ['F – V – F – V', 'O pau-brasil foi a primeira atividade econômica.'], ['V – V – V – F', 'Outros países, como a França, também exploraram o pau-brasil.']], 0, 'Os indígenas realizavam grande parte do trabalho por escambo; outros europeus também cobiçavam o pau-brasil.');
  H('h06', 'capitanias', 'média', null, 'No sistema de capitanias hereditárias, criado em 1534, o rei de Portugal',
    'dividiu o território em lotes e os entregou a donatários, que deveriam administrá-los e povoá-los.', 'Os donatários recebiam grandes poderes sobre as terras.',
    [['dividiu a colônia em estados iguais, governados por eleição.', 'Não havia eleições.'], ['doou todo o território aos indígenas.', 'Não foi doado aos indígenas.'], ['transferiu a capital do reino para o Brasil.', 'Isso ocorreu em 1808.']]);
  H('h06', 'governo-geral', 'média', null, 'O Governo-Geral, criado em 1549, teve como primeiro governador-geral Tomé de Sousa. Sua capital era',
    'Salvador, na Bahia.', 'Salvador foi fundada em 1549 para ser a sede do Governo-Geral.',
    [['Rio de Janeiro.', 'Tornou-se capital em 1763.'], ['São Paulo.', 'Foi fundada em 1554 pelos jesuítas.'], ['Curitiba.', 'Era um povoado.']]);
  H('h06', 'engenho', 'média', null, 'Os engenhos de açúcar do período colonial tinham, em geral, as seguintes características:',
    'grandes propriedades, produção para exportação e trabalho de pessoas escravizadas.', 'Era a economia principal da colônia nos séculos XVI e XVII.',
    [['pequenas propriedades, com trabalho assalariado.', 'O trabalho era escravizado.'], ['produção apenas para o consumo familiar.', 'Produziam para exportação.'], ['uso de máquinas movidas por eletricidade.', 'A eletricidade não existia.']]);
  H('h06', 'sociedade-colonial', 'difícil', null, 'Na sociedade colonial açucareira, qual alternativa descreve corretamente sua organização?',
    'Era hierarquizada: senhores de engenho no topo, homens livres e pobres no meio e pessoas escravizadas na base.', 'A sociedade era escravista e patriarcal, com enorme concentração de poder nas mãos dos senhores.',
    [['Todos eram iguais perante a lei.', 'Havia grande desigualdade.'], ['As pessoas escravizadas eram donas dos engenhos.', 'Eram forçadas a trabalhar para os senhores.'], ['Os indígenas governavam a colônia.', 'O governo era da Coroa portuguesa.']]);
  H('h06', 'jesuitas', 'média', null, 'Os jesuítas, como Manuel da Nóbrega e José de Anchieta, tiveram papel importante na colonização porque',
    'catequizaram os indígenas, criaram escolas e participaram da fundação de povoados, como São Paulo (1554).', 'A Companhia de Jesus uniu evangelização, educação e ocupação do território.',
    [['proibiram o uso de línguas europeias.', 'Ensinavam também o português e o latim.'], ['organizaram a abolição da escravidão.', 'Não aboliram a escravidão.'], ['governaram a colônia como reis.', 'O governo era da Coroa.']]);
  H('h06', 'bandeirantes', 'difícil', null, 'As bandeiras, expedições organizadas principalmente a partir de São Paulo nos séculos XVI e XVII, tinham como objetivos',
    'capturar indígenas para escravizá-los, buscar metais preciosos e ampliar as áreas ocupadas.', 'As bandeiras ultrapassaram a linha de Tordesilhas e atingiram regiões do atual Paraná.',
    [['proteger as aldeias indígenas da escravização.', 'Muitas bandeiras atacaram aldeias.'], ['criar escolas para as comunidades indígenas.', 'Essa foi uma atividade dos jesuítas.'], ['abolir a escravidão na colônia.', 'Reforçaram a escravidão.']]);

  // ---------- Africanos ----------
  H('h07', 'trafico', 'média', null, 'Os navios que transportavam pessoas africanas escravizadas para o Brasil eram chamados de',
    'tumbeiros, pelas condições terríveis em que as pessoas viajavam.', 'Muitas pessoas morriam durante a travessia do Atlântico.',
    [['caravelas, usadas para a exploração do pau-brasil.', 'Caravelas eram navios de exploração, não eram os tumbeiros.'], ['jangadas, usadas por pescadores.', 'Jangadas são pequenas embarcações.'], ['balsas, usadas para atravessar rios.', 'Não eram usadas na travessia do Atlântico.']]);
  H('h07', 'povos-africanos', 'média', null, 'As pessoas africanas escravizadas trazidas ao Brasil',
    'pertenciam a povos diferentes, com línguas, religiões e costumes diversos.', 'Vinham de regiões como a África Central e Ocidental, com culturas variadas.',
    [['formavam um único povo, com a mesma língua.', 'Havia muitos povos.'], ['chegaram ao Brasil por vontade própria.', 'Foram trazidas à força.'], ['vieram apenas para trabalhar como assalariadas.', 'Foram escravizadas.']]);
  H('h07', 'herancas', 'média', null, 'Qual alternativa apresenta heranças africanas presentes na cultura brasileira?',
    'Capoeira, samba e palavras como “cafuné” e “quilombo”.', 'Música, dança, culinária, religiões e vocabulário mostram a influência africana.',
    [['Chimarrão, tereré e tapioca.', 'São de origem indígena.'], ['Pizza, macarrão e polenta.', 'Têm influência da imigração italiana.'], ['Pierogi, borscht e salsichas.', 'Têm influência de imigrantes do leste europeu.']]);
  QF('h07', 'ordem-abolicao', 'difícil', null, 'Observe as leis relacionadas ao fim da escravidão no Brasil:\nI. Lei Áurea (1888).\nII. Lei do Ventre Livre (1871).\nIII. Lei Eusébio de Queirós, que proibiu o tráfico de africanos (1850).\nIV. Lei dos Sexagenários (1885).\nA ordem cronológica correta é:',
    [['III, II, IV e I', ''], ['II, III, IV e I', 'A lei que proibiu o tráfico (1850) veio antes do Ventre Livre (1871).'], ['III, IV, II e I', 'O Ventre Livre (1871) vem antes dos Sexagenários (1885).'], ['I, II, III e IV', 'A Lei Áurea (1888) foi a última.']], 0, '1850, 1871, 1885 e 1888.');
  H('h07', 'escravizados-pr', 'média', null, 'No Paraná, durante os séculos XVIII e XIX, pessoas africanas e afrodescendentes escravizadas trabalhavam principalmente',
    'em fazendas de gado dos Campos Gerais, na mineração, nos portos e nos serviços das cidades.', 'A escravidão também existiu no território paranaense.',
    [['em fábricas de automóveis.', 'Elas só surgiram no século XX.'], ['em usinas hidrelétricas.', 'Não existiam.'], ['apenas em colônias de imigrantes europeus.', 'As colônias de imigrantes surgiram depois.']], { regional: true, refs: ['pr'] });
  H('h08', 'quilombo', 'média', null, 'Os quilombos, como o de Palmares, eram',
    'comunidades formadas por pessoas que fugiram da escravidão e organizaram novas formas de viver e de se defender.', 'Palmares, liderado por Zumbi, resistiu por quase todo o século XVII.',
    [['fazendas de senhores de engenho.', 'Eram o contrário.'], ['colônias portuguesas de comércio.', 'Eram comunidades de resistência.'], ['missões jesuíticas.', 'Não eram missões religiosas.']]);
  H('h08', 'zumbi', 'média', null, 'O Dia Nacional da Consciência Negra é comemorado em 20 de novembro. Essa data lembra a morte de',
    'Zumbi dos Palmares, em 1695, símbolo da resistência à escravidão.', 'Zumbi foi um dos principais líderes do Quilombo dos Palmares.',
    [['Tomé de Sousa, primeiro governador-geral.', 'Ele governou a colônia a partir de 1549.'], ['Dom Pedro II, último imperador.', 'Morreu em 1891.'], ['Pedro Álvares Cabral, navegador.', 'Chegou ao Brasil em 1500.']]);
  H('h08', 'resistencia-formas', 'difícil', null, 'A resistência das pessoas escravizadas assumiu várias formas. Qual alternativa NÃO é exemplo de resistência?',
    'Aceitar sem nenhum questionamento as ordens do senhor.', 'Fugas, quilombos, preservação de culturas e negociações eram formas de resistência.',
    [['Fugir e formar quilombos.', 'É resistência.'], ['Preservar músicas, danças e crenças.', 'É resistência cultural.'], ['Comprar a própria liberdade (alforria).', 'É uma forma de conquista de liberdade.']]);

  // ---------- Paraná ----------
  HR('h09', 'guaira', 'difícil', null, 'No século XVII, as missões jesuíticas do Guairá, na região do atual Paraná, foram atacadas e destruídas por',
    'bandeirantes paulistas, que capturaram muitos indígenas para escravizá-los.', 'Os ataques levaram os jesuítas e milhares de guaranis a abandonarem a região.',
    [['tropeiros vindos do Rio Grande do Sul.', 'O tropeirismo ocorreu mais tarde.'], ['imigrantes alemães e poloneses.', 'Chegaram no século XIX.'], ['fazendeiros de café do norte do estado.', 'O café chegou ao norte do Paraná no século XX.']]);
  HR('h09', 'tropeirismo', 'média', null, 'O tropeirismo foi uma atividade importante no Paraná durante os séculos XVIII e XIX. Os tropeiros eram',
    'condutores de tropas de animais, como mulas e gado, que viajavam do Sul até Sorocaba, em São Paulo, para vendê-los.', 'O Caminho do Viamão passava pelo Paraná, nos Campos Gerais.',
    [['marinheiros que transportavam mercadorias pelo litoral.', 'Eram condutores de animais por terra.'], ['operários de fábricas de Curitiba.', 'Não eram operários.'], ['imigrantes que construíam ferrovias.', 'A ferrovia foi construída depois.']]);
  HR('h09', 'tropeirismo-cidades', 'média', null, 'Uma das consequências do tropeirismo para o Paraná foi',
    'o surgimento de pousos, que se tornaram vilas e cidades, como Lapa, Castro e Ponta Grossa.', 'Os locais de descanso e comércio deram origem a povoados.',
    [['a destruição de todos os caminhos do estado.', 'Os caminhos eram usados e expandidos.'], ['o fim do comércio de animais.', 'O comércio era a razão do tropeirismo.'], ['a criação da cidade de Foz do Iguaçu.', 'Foz do Iguaçu surgiu em outro contexto.']]);
  HR('h09', 'emancipacao', 'média', null, 'Em 1853, o Paraná deixou de ser parte de São Paulo e passou a ser uma província. Qual alternativa descreve corretamente esse acontecimento?',
    'A Província do Paraná foi criada em 1853 e teve Curitiba como capital e Zacarias de Góis e Vasconcelos como primeiro presidente.', 'A lei de 29 de agosto de 1853 criou a província, instalada em 19 de dezembro.',
    [['O Paraná tornou-se estado em 1853, com Londrina como capital.', 'A província tornou-se estado em 1889, e a capital é Curitiba.'], ['O Paraná foi criado em 1693, junto com a Vila de Curitiba.', '1693 é a data da vila.'], ['O Paraná tornou-se independente do Brasil.', 'Continuou parte do Império.']]);
  HR('h09', 'dia-pr', 'média', null, 'Qual data é celebrada como o Dia do Paraná, em lembrança da instalação da província?',
    '19 de dezembro.', 'A instalação da Província do Paraná ocorreu em 19 de dezembro de 1853.',
    [['29 de março.', 'É o aniversário de Curitiba.'], ['7 de setembro.', 'É a data da Independência do Brasil.'], ['15 de novembro.', 'É a data da Proclamação da República.']]);
  HR('h09', 'erva-mate', 'média', null, 'No século XIX, qual produto foi a base da economia do Paraná e era exportado, sobretudo, para países vizinhos como Argentina e Uruguai?',
    'Erva-mate.', 'O mate era processado em engenhos e enviado por Paranaguá.',
    [['Café.', 'O café marcou o norte do estado no século XX.'], ['Cana-de-açúcar.', 'Não foi a base da economia paranaense.'], ['Borracha.', 'Era explorada na Amazônia.']]);
  HR('h09', 'ferrovia', 'média', null, 'A ferrovia Paranaguá–Curitiba, inaugurada em 1885, atravessa a Serra do Mar e foi importante porque',
    'ligou o litoral ao planalto, facilitando o transporte de mercadorias, como a erva-mate, e de pessoas.', 'Antes dela, as ligações eram difíceis, feitas por estradas como a da Graciosa.',
    [['impediu o comércio entre o litoral e o planalto.', 'Facilitou o comércio.'], ['foi construída apenas para turistas.', 'Teve função econômica.'], ['substituiu o porto de Paranaguá.', 'O porto continuou em uso.']]);
  HR('h09', 'imigracao-pr', 'média', null, 'No século XIX e início do século XX, chegaram ao Paraná imigrantes de vários países. Qual alternativa apresenta corretamente alguns deles?',
    'Alemães, poloneses, italianos e ucranianos.', 'Esses grupos formaram colônias e influenciaram a culinária, a arquitetura e as festas do estado.',
    [['Chineses, russos e australianos, apenas.', 'Não eram os principais grupos.'], ['Gregos, canadenses e egípcios, apenas.', 'Não eram os principais grupos.'], ['Indianos e noruegueses, apenas.', 'Não eram os principais grupos.']]);
  QF('h09', 'imigracao-assoc', 'difícil', null, 'Associe cada local do Paraná ao grupo de imigrantes que marcou sua história:\n(1) Santa Felicidade, em Curitiba\n(2) Prudentópolis\n(3) Carambeí\nA) holandeses  B) italianos  C) ucranianos\nA associação correta é:',
    [['1–B; 2–C; 3–A', ''], ['1–A; 2–B; 3–C', 'Santa Felicidade é de colonização italiana.'], ['1–C; 2–A; 3–B', 'Prudentópolis é de colonização ucraniana.'], ['1–B; 2–A; 3–C', 'Carambeí é de colonização holandesa.']], 0, 'Santa Felicidade (italianos), Prudentópolis (ucranianos) e Carambeí (holandeses).', { regional: true, refs: ['pr'] });
  HR('h09', 'contestado', 'difícil', null, 'A Guerra do Contestado (1912–1916), na região disputada pelo Paraná e Santa Catarina, foi um conflito em que',
    'camponeses pobres, muitos expulsos de suas terras, se rebelaram contra o governo e as empresas que ocupavam a região.', 'O conflito envolveu disputa de terras, a construção de ferrovia e a religiosidade popular.',
    [['dois países vizinhos disputaram a posse de Curitiba.', 'Foi um conflito interno do Brasil.'], ['indígenas e portugueses disputaram o pau-brasil.', 'Ocorreu no século XX.'], ['imigrantes alemães lutaram contra os italianos.', 'Não foi um conflito entre imigrantes.']]);
  HR('h09', 'cerco-lapa', 'difícil', null, 'O Cerco da Lapa, no Paraná, ocorreu em 1894. Ele aconteceu',
    'durante a Revolução Federalista, quando forças republicanas resistiram por cerca de 26 dias ao ataque dos federalistas.', 'O comandante da resistência, general Gomes Carneiro, morreu em decorrência de ferimentos recebidos durante os combates.',
    [['durante a Independência do Brasil, em 1822.', 'A data é bem posterior.'], ['durante o tropeirismo, no século XVIII.', 'Ocorreu no final do século XIX.'], ['durante a construção de Itaipu.', 'Itaipu é do século XX.']]);
  HR('h09', 'cafe-norte', 'média', null, 'No século XX, a ocupação do norte do Paraná, com cidades como Londrina e Maringá, foi impulsionada principalmente pelo cultivo de',
    'café.', 'A região, de terra fértil, atraiu migrantes e companhias colonizadoras.',
    [['erva-mate.', 'Foi a base da economia do século XIX.'], ['açúcar.', 'Não foi o principal produto da região.'], ['algodão apenas.', 'O café foi o principal produto.']]);
  HR('h09', 'itaipu-hist', 'média', null, 'A Usina de Itaipu, no rio Paraná, foi inaugurada em 1984. Para formar seu reservatório, foram alagadas áreas, incluindo',
    'as Sete Quedas, grandes cachoeiras na divisa com o Paraguai.', 'O lago de Itaipu cobriu Sete Quedas, que ficavam em Guaíra.',
    [['as Cataratas do Iguaçu.', 'As Cataratas do Iguaçu continuam existindo.'], ['a Serra do Mar.', 'A serra não foi alagada.'], ['o centro de Curitiba.', 'Curitiba fica longe do rio Paraná.']]);
  HR('h09', 'gralha-simbolo', 'fácil', null, 'Qual é a ave símbolo do estado do Paraná?',
    'Gralha-azul.', 'A gralha-azul vive nas matas de araucária e ajuda a espalhar seus pinhões.',
    [['Tucano.', 'É característico de outras regiões.'], ['Arara-azul.', 'É símbolo de outras regiões.'], ['Sabiá-laranjeira.', 'É a ave nacional do Brasil.']]);
  HR('h09', 'barreado', 'média', null, 'Qual é um prato típico do litoral do Paraná, preparado em panela de barro e associado à cidade de Morretes?',
    'Barreado.', 'O barreado é um cozido de carne, feito lentamente em panela de barro lacrada.',
    [['Pierogi.', 'É prato de origem polonesa.'], ['Acarajé.', 'É prato típico da Bahia.'], ['Chimarrão.', 'É uma bebida típica do Sul.']]);
  HR('h09', 'quilombolas-pr', 'média', null, 'Atualmente, no Paraná, existem comunidades quilombolas. Elas são formadas por',
    'descendentes de pessoas africanas escravizadas, que mantêm tradições, território e modos de vida próprios.', 'Os quilombos contemporâneos preservam a memória e a cultura afro-brasileiras.',
    [['imigrantes europeus recém-chegados.', 'Têm origem afro-brasileira.'], ['povos indígenas isolados da Amazônia.', 'Não são povos indígenas.'], ['funcionários de empresas de turismo.', 'Não é essa a definição.']]);

  // ---------- Curitiba ----------
  HR('h10', 'aniversario', 'média', null, 'O aniversário de Curitiba é comemorado em 29 de março porque, nessa data de 1693,',
    'foi instalada a Vila de Curitiba, com a criação de sua Câmara.', 'A vila foi instalada no século XVII, depois da formação do povoado.',
    [['foi proclamada a República.', 'A República é de 1889.'], ['foi inaugurada a ferrovia para Paranaguá.', 'A ferrovia é de 1885.'], ['Curitiba tornou-se capital do estado.', 'A capitalidade vem de 1853.']]);
  HR('h10', 'nome', 'média', null, 'O nome “Curitiba” tem origem no tupi-guarani e está relacionado a',
    'pinheiros ou pinhões, ou seja, à grande quantidade de araucárias na região.', 'A interpretação mais aceita aponta para “pinhal” ou “muito pinhão”.',
    [['rios, lagos e pântanos.', 'Não é o significado.'], ['ouro e pedras preciosas.', 'Não é o significado.'], ['animais de pastagem.', 'Não é o significado.']]);
  HR('h10', 'origem-ouro', 'difícil', null, 'A ocupação inicial da região de Curitiba, no século XVII, foi impulsionada, em grande parte, pela',
    'exploração de ouro de aluvião (de rios), atraindo povoadores.', 'A mineração levou ao povoamento do litoral e do planalto.',
    [['construção da Usina de Itaipu.', 'Itaipu é do século XX.'], ['produção de café para exportação.', 'O café é do século XIX e XX.'], ['produção de automóveis.', 'A indústria automobilística chegou muito depois.']]);
  HR('h10', 'capital-1853', 'média', null, 'Em 1853, Curitiba foi escolhida como capital da nova Província do Paraná. Antes disso, a cidade fazia parte da província de',
    'São Paulo.', 'O Paraná era a 5ª Comarca de São Paulo antes de 1853.',
    [['Santa Catarina.', 'Não pertencia a Santa Catarina.'], ['Rio Grande do Sul.', 'Não pertencia ao Rio Grande do Sul.'], ['Minas Gerais.', 'Não pertencia a Minas Gerais.']]);
  HR('h10', 'imigrantes-curitiba', 'média', null, 'O bairro de Santa Felicidade, em Curitiba, é conhecido por sua história ligada à imigração de',
    'italianos, que chegaram no final do século XIX.', 'O bairro mantém tradições italianas, como a culinária e as festas.',
    [['japoneses, que chegaram no século XVIII.', 'Não corresponde ao bairro.'], ['alemães, que chegaram no século XVI.', 'Não corresponde ao bairro.'], ['holandeses, que chegaram em 1500.', 'Não corresponde ao bairro.']]);
  HR('h10', 'rua-xv', 'difícil', null, 'A Rua XV de Novembro, no centro de Curitiba, ficou conhecida por ter sido, em 1972, a primeira rua do Brasil',
    'transformada em calçadão, exclusiva para pedestres.', 'A Rua das Flores (Rua XV) tornou-se exemplo de urbanismo voltado às pessoas.',
    [['asfaltada com piche.', 'Não foi esse o motivo da fama.'], ['dedicada somente a carros.', 'A rua é exclusiva para pedestres.'], ['construída sobre um rio.', 'Não é essa a origem da fama.']]);
  HR('h10', 'passeio-publico', 'média', null, 'O Passeio Público, inaugurado em 1886, é um marco da história de Curitiba porque foi',
    'o primeiro parque público da cidade, criado para o lazer da população.', 'Ele foi aberto em área que antes era um pântano.',
    [['o primeiro shopping center do país.', 'Não é um shopping.'], ['a primeira usina de energia.', 'Não é uma usina.'], ['a sede do governo imperial.', 'A sede era no Rio de Janeiro.']]);
  HR('h10', 'ippuc', 'difícil', null, 'O IPPUC (Instituto de Pesquisa e Planejamento Urbano de Curitiba), criado em 1965, é responsável por',
    'estudar e planejar o crescimento da cidade, com projetos de transporte, uso do solo e áreas verdes.', 'O planejamento urbano é uma marca da história recente de Curitiba.',
    [['administrar o porto de Paranaguá.', 'Não é função do instituto.'], ['produzir energia elétrica.', 'Não é função do instituto.'], ['organizar o calendário escolar do estado.', 'Não é função do instituto.']]);
  HR('h10', 'largo-ordem', 'média', null, 'O Largo da Ordem, no centro histórico de Curitiba, é importante para a memória da cidade porque',
    'preserva construções antigas, como a Igreja da Ordem (século XVIII), testemunhos materiais do passado.', 'Edifícios antigos são fontes históricas materiais.',
    [['é uma área sem nenhuma construção antiga.', 'Preserva construções antigas.'], ['foi criado em 2020, como parque temático.', 'Seu valor é histórico, e não recente.'], ['fica no litoral, junto ao porto.', 'Fica em Curitiba, no planalto.']]);

  // ---------- Diversidade cultural ----------
  H('h04', 'diversidade', 'média', null, 'Quando pessoas de diferentes origens passam a viver juntas em uma cidade, é comum que',
    'as culturas se misturem, criando novas tradições na culinária, na música e nas festas.', 'A diversidade cultural resulta do encontro de diferentes modos de vida.',
    [['uma única cultura impeça todas as outras de existir.', 'A diversidade valoriza várias culturas.'], ['os costumes sejam esquecidos de imediato.', 'Costumes se transformam, mas não desaparecem de imediato.'], ['não haja nenhuma troca entre elas.', 'Há trocas constantes.']]);
  H('h04', 'respeito', 'fácil', null, 'Qual atitude demonstra respeito à diversidade cultural?',
    'Reconhecer e valorizar as tradições de diferentes povos, como indígenas, africanos e imigrantes.', 'O respeito à diversidade é base do convívio social.',
    [['Zombar de costumes diferentes dos seus.', 'É desrespeitoso.'], ['Obrigar todos a seguir a mesma tradição.', 'Desrespeita a liberdade cultural.'], ['Ignorar as tradições de outros povos.', 'Não valoriza a diversidade.']]);
  H('h04', 'fandango', 'difícil', null, 'O fandango caiçara, tradição do litoral do Paraná, é',
    'uma manifestação cultural com música, dança e instrumentos como a viola e a rabeca, tradicional entre comunidades de pescadores.', 'É um exemplo da diversidade cultural do estado.',
    [['uma competição de natação.', 'Não é um esporte.'], ['um prato típico feito com erva-mate.', 'Não é culinária.'], ['uma festa religiosa exclusiva de Curitiba.', 'É uma tradição do litoral.']], { regional: true, refs: ['pr'] });
})();
