(function () {
  'use strict';
  // Geografia: Brasil, Paraná, Curitiba, natureza, cartografia.
  const F = window.FIEL, { Q, QF, V } = F;
  const img = (src, alt, w, h) => `<img src="fiel/${src}" alt="${alt}" width="${w}" height="${h}">`;
  V.f_mapa_regioes = img('brasil-regioes.svg', 'Mapa do Brasil dividido nas cinco regiões, com siglas dos estados, legenda de cores e rosa dos ventos. Norte em verde, Nordeste em amarelo, Sudeste em rosa, Sul em azul e Centro-Oeste em roxo. Geometria do IBGE.', 560, 580);
  V.f_mapa_parana = img('parana-cidades.svg', 'Mapa do Paraná com os vizinhos São Paulo ao norte, Mato Grosso do Sul a noroeste, Santa Catarina ao sul, Argentina e Paraguai a oeste e o Oceano Atlântico a leste. Cidades marcadas: Curitiba, Londrina, Maringá, Foz do Iguaçu, Paranaguá, Ponta Grossa, Cascavel e Guarapuava. Escala gráfica de 100 km e rosa dos ventos. Geometria do IBGE.', 760, 520);
  V.f_mapa_parana_letras = img('parana-letras.svg', 'Mapa do Paraná com oito cidades marcadas por letras: A Curitiba, B Londrina, C Maringá, D Foz do Iguaçu, E Paranaguá, F Ponta Grossa, G Cascavel e H Guarapuava. Escala gráfica de 100 km e rosa dos ventos. Geometria do IBGE.', 760, 520);
  const G = (item, fam, lvl, base, prompt, ok, why, bad, extra = {}) => Q(item, fam, lvl, base, prompt, ok, why, bad, { refs: ['ibge'], ...extra });
  const GR = (item, fam, lvl, base, prompt, ok, why, bad, extra = {}) => Q(item, fam, lvl, base, prompt, ok, why, bad, { refs: ['ibge', 'pr'], regional: true, ...extra });

  // ---------- Brasil ----------
  G('g03', 'regiao-parana', 'fácil', null, 'No mapa, o estado do Paraná (PR) pertence a qual região do Brasil?',
    'Sul.', 'O Paraná, Santa Catarina e o Rio Grande do Sul formam a Região Sul.',
    [['Sudeste.', 'Fica ao norte do Paraná e inclui São Paulo.'], ['Centro-Oeste.', 'Inclui Mato Grosso do Sul, vizinho do Paraná, mas não o Paraná.'], ['Nordeste.', 'Fica muito ao norte e a leste.']], { visual: 'f_mapa_regioes' });
  G('g03', 'regiao-norte', 'média', null, 'Qual é a região de maior extensão territorial do Brasil, representada em verde no mapa?',
    'Norte.', 'A Região Norte ocupa cerca de 45% do território brasileiro e inclui o Amazonas e o Pará.',
    [['Nordeste.', 'É a região em amarelo, com nove estados, mas menor em área.'], ['Centro-Oeste.', 'É a região em roxo.'], ['Sudeste.', 'É a região em rosa, a mais populosa.']], { visual: 'f_mapa_regioes' });
  G('g03', 'maior-estado', 'média', null, 'Qual é o maior estado brasileiro em extensão territorial?',
    'Amazonas.', 'O Amazonas é o maior estado do Brasil em área.',
    [['Pará.', 'É o segundo maior.'], ['Mato Grosso.', 'É o terceiro maior.'], ['Minas Gerais.', 'É grande, mas menor que os três anteriores.']]);
  G('g03', 'capitais', 'média', null, 'Em qual alternativa todos os estados estão associados às suas capitais corretas?',
    'Paraná – Curitiba; Santa Catarina – Florianópolis; Rio Grande do Sul – Porto Alegre.', 'São as capitais da Região Sul.',
    [['Paraná – Londrina; Santa Catarina – Joinville; Rio Grande do Sul – Porto Alegre.', 'Londrina e Joinville não são capitais.'], ['Bahia – Recife; Pernambuco – Salvador; Ceará – Fortaleza.', 'Salvador é capital da Bahia e Recife, de Pernambuco.'], ['Pará – Manaus; Amazonas – Belém; Rondônia – Porto Velho.', 'Belém é capital do Pará e Manaus, do Amazonas.']]);
  G('g03', 'fronteiras', 'difícil', null, 'O Brasil faz fronteira com quase todos os países da América do Sul. Quais dois países sul-americanos NÃO têm fronteira com o Brasil?',
    'Chile e Equador.', 'Todos os demais países da América do Sul fazem fronteira com o Brasil.',
    [['Argentina e Uruguai.', 'Ambos fazem fronteira com o Brasil.'], ['Paraguai e Bolívia.', 'Ambos fazem fronteira com o Brasil.'], ['Peru e Colômbia.', 'Ambos fazem fronteira com o Brasil.']]);
  G('g03', 'linhas-imaginarias', 'difícil', null, 'O Brasil é cortado por duas importantes linhas imaginárias. Quais são elas, respectivamente, ao norte e ao sul do país?',
    'Linha do Equador e Trópico de Capricórnio.', 'O Equador passa pelo norte do país (Amapá, Pará, Amazonas e Roraima), e o Trópico de Capricórnio, pelo sul (inclui São Paulo, Paraná e Mato Grosso do Sul).',
    [['Trópico de Câncer e Linha do Equador.', 'O Trópico de Câncer está no hemisfério norte, fora do Brasil.'], ['Meridiano de Greenwich e Trópico de Capricórnio.', 'O meridiano de Greenwich não passa pelo Brasil.'], ['Círculo Polar Ártico e Linha do Equador.', 'O Círculo Polar Ártico está no extremo norte do planeta.']]);
  G('g03', 'hemisferios', 'média', null, 'O Brasil está localizado, em sua maior parte, nos hemisférios',
    'sul e ocidental.', 'A maior parte do território fica ao sul da Linha do Equador e a oeste do meridiano de Greenwich.',
    [['norte e oriental.', 'A maior parte está ao sul e a oeste.'], ['sul e oriental.', 'Fica a oeste de Greenwich.'], ['norte e ocidental.', 'A maior parte está ao sul do Equador.']]);
  G('g03', 'nordeste-estados', 'média', null, 'Qual região do Brasil tem o maior número de estados?',
    'Nordeste, com nove estados.', 'Maranhão, Piauí, Ceará, Rio Grande do Norte, Paraíba, Pernambuco, Alagoas, Sergipe e Bahia.',
    [['Sudeste, com cinco estados.', 'O Sudeste tem quatro estados.'], ['Norte, com doze estados.', 'O Norte tem sete estados.'], ['Sul, com cinco estados.', 'O Sul tem três estados.']]);

  // ---------- Paraná ----------
  GR('g04', 'limites-pr', 'fácil', null, 'No mapa, qual estado faz divisa com o Paraná ao norte e qual faz divisa ao sul, respectivamente?',
    'São Paulo e Santa Catarina.', 'São Paulo está ao norte e Santa Catarina, ao sul.',
    [['Mato Grosso do Sul e São Paulo.', 'O Mato Grosso do Sul está a noroeste.'], ['Santa Catarina e São Paulo.', 'Inverte as posições.'], ['Rio Grande do Sul e Mato Grosso do Sul.', 'O Rio Grande do Sul não faz divisa com o Paraná.']], { visual: 'f_mapa_parana' });
  GR('g04', 'paises-fronteira', 'média', null, 'Com quais países o Paraná faz fronteira?',
    'Argentina e Paraguai.', 'A oeste e sudoeste, o Paraná limita-se com o Paraguai (rio Paraná) e a Argentina (rio Iguaçu).',
    [['Uruguai e Paraguai.', 'O Uruguai faz fronteira com o Rio Grande do Sul.'], ['Argentina e Bolívia.', 'A Bolívia fica longe do Paraná.'], ['Chile e Paraguai.', 'O Brasil não faz fronteira com o Chile.']]);
  GR('g04', 'mapa-curitiba-letra', 'média', null, 'No mapa, qual letra representa a capital do Paraná, e em qual direção, em relação a ela, fica a cidade identificada pela letra B (Londrina)?',
    'A (Curitiba); Londrina fica a noroeste.', 'Curitiba é a letra A. Londrina (B) está mais ao norte e mais a oeste, ou seja, a noroeste.',
    [['A (Curitiba); Londrina fica a sudeste.', 'Londrina está ao norte e a oeste.'], ['E (Paranaguá); Londrina fica a noroeste.', 'Paranaguá é a letra E e não é a capital.'], ['H (Guarapuava); Londrina fica a nordeste.', 'Guarapuava não é a capital.']], { visual: 'f_mapa_parana_letras' });
  GR('g04', 'mapa-litoral', 'média', null, 'Qual letra representa a cidade onde está localizado o principal porto do Paraná, no litoral?',
    'E (Paranaguá).', 'Paranaguá fica no litoral, ao lado do Oceano Atlântico, e abriga o porto mais importante do estado.',
    [['B (Londrina).', 'Londrina fica no norte do estado.'], ['D (Foz do Iguaçu).', 'Foz do Iguaçu fica no extremo oeste.'], ['G (Cascavel).', 'Cascavel fica no oeste, longe do litoral.']], { visual: 'f_mapa_parana_letras' });
  GR('g04', 'mapa-fronteira', 'média', null, 'A cidade identificada pela letra D (Foz do Iguaçu) é conhecida por estar em uma tríplice fronteira. Isso significa que ela fica perto da divisa entre',
    'Brasil, Argentina e Paraguai.', 'Em Foz do Iguaçu, os rios Iguaçu e Paraná marcam o encontro das fronteiras desses três países.',
    [['Brasil, Uruguai e Argentina.', 'O Uruguai não está próximo.'], ['Brasil, Paraguai e Bolívia.', 'A Bolívia não está próxima.'], ['Paraná, São Paulo e Santa Catarina.', 'Esses são estados de um mesmo país.']], { visual: 'f_mapa_parana_letras' });
  GR('g09', 'mapa-escala', 'difícil', null, 'Usando a escala gráfica do mapa (100 km), a distância em linha reta entre Curitiba (A) e Paranaguá (E) é',
    'menor que 100 km.', 'No mapa, a distância entre os pontos A e E é menor que a barra de 100 km.',
    [['entre 100 km e 200 km.', 'É maior do que a distância real.'], ['cerca de 300 km.', 'É muito maior.'], ['cerca de 500 km.', 'É muito maior.']], { visual: 'f_mapa_parana_letras', topic: 'Escala' });
  GR('g04', 'itaipu', 'difícil', null, 'A Usina Hidrelétrica de Itaipu, construída no rio Paraná, pertence a quais países?',
    'Brasil e Paraguai.', 'Itaipu é binacional: foi construída e é operada pelo Brasil e pelo Paraguai.',
    [['Brasil e Argentina.', 'A Argentina divide com o Brasil outras usinas, como Garabi.'], ['Paraguai e Argentina.', 'O Brasil também é dono de Itaipu.'], ['Somente o Brasil.', 'É uma usina binacional.']]);
  GR('g04', 'porto-paranagua', 'média', null, 'O Porto de Paranaguá tem grande importância para a economia do Brasil porque',
    'é um dos principais portos de exportação de grãos, como soja e milho.', 'A produção agrícola do Paraná e de outros estados é escoada por ele.',
    [['é o único porto do país.', 'O Brasil tem muitos portos.'], ['só recebe turistas em navios.', 'Sua principal função é o comércio.'], ['fica no oeste do estado, junto à fronteira.', 'Paranaguá fica no litoral.']]);
  GR('g04', 'populacao', 'média', null, 'A maior parte da população do Paraná vive',
    'em áreas urbanas, principalmente em cidades como Curitiba, Londrina e Maringá.', 'O Paraná, como todo o Brasil, é predominantemente urbano.',
    [['em áreas rurais isoladas.', 'A maior parte vive em cidades.'], ['no litoral, em vilas de pescadores.', 'O litoral tem poucos habitantes em relação ao total.'], ['em áreas de floresta preservada.', 'Essa não é a situação da maior parte da população.']]);
  GR('g04', 'cataratas', 'média', null, 'As Cataratas do Iguaçu, no rio Iguaçu, ficam na divisa entre o Paraná e',
    'a Argentina.', 'As quedas ficam no limite entre o Brasil (Paraná) e a Argentina e são protegidas por parques nacionais nos dois países.',
    [['o Uruguai.', 'Não fica na divisa com o Uruguai.'], ['Santa Catarina.', 'Santa Catarina fica no sul do Paraná.'], ['o Paraguai.', 'O Paraguai fica no rio Paraná.']]);

  // ---------- Curitiba ----------
  GR('g05', 'relevo-curitiba', 'média', null, 'Curitiba está localizada em qual compartimento de relevo do Paraná?',
    'No Primeiro Planalto, a cerca de 900 metros de altitude.', 'A cidade fica no planalto, atrás da Serra do Mar, em altitude elevada.',
    [['Na planície litorânea, ao nível do mar.', 'A planície fica a leste da Serra do Mar.'], ['No Terceiro Planalto, no extremo oeste.', 'O Terceiro Planalto abrange o centro-oeste do estado.'], ['Na Serra do Mar, a mais de 2.000 metros.', 'Curitiba fica depois da serra.']]);
  GR('g05', 'clima-curitiba', 'média', null, 'Curitiba costuma ser mais fria do que Londrina, no norte do Paraná. Qual é a principal explicação?',
    'Curitiba fica em altitude maior e mais ao sul.', 'Quanto maior a altitude e mais distante do Equador, menores são as temperaturas.',
    [['Curitiba fica mais perto do Equador.', 'Londrina fica mais ao norte.'], ['Curitiba fica em uma ilha.', 'Curitiba fica no continente.'], ['Curitiba não recebe luz solar no inverno.', 'Recebe luz solar como todas as cidades.']]);
  GR('g05', 'rio-iguacu', 'média', null, 'Qual alternativa descreve corretamente o rio Iguaçu?',
    'Nasce na região de Curitiba, corre para oeste e forma as Cataratas antes de desaguar no rio Paraná.', 'Ele atravessa o estado de leste a oeste.',
    [['Nasce em Foz do Iguaçu e corre para leste até o oceano.', 'Inverte a direção do curso.'], ['Nasce no Paraguai e deságua no rio São Francisco.', 'Não é essa a bacia do Iguaçu.'], ['Corre apenas no litoral e deságua na Baía de Paranaguá.', 'Não é esse o rio.']]);
  GR('g05', 'transporte-curitiba', 'média', null, 'Curitiba é conhecida mundialmente pelas canaletas exclusivas para ônibus e pelos ônibus biarticulados. Esse sistema é um exemplo de',
    'planejamento urbano para melhorar a mobilidade da população.', 'As canaletas foram criadas na década de 1970 para melhorar o transporte coletivo.',
    [['forma de impedir a circulação de pedestres.', 'O objetivo era facilitar o transporte.'], ['medida para aumentar o número de carros.', 'Estimula o transporte coletivo.'], ['sistema de transporte fluvial.', 'Os ônibus circulam em vias terrestres.']]);
  GR('g05', 'metropole', 'difícil', null, 'Curitiba é o centro de uma região metropolitana. Isso significa que',
    'a cidade e municípios vizinhos estão integrados, compartilhando serviços e movimentos diários de pessoas.', 'Muitas pessoas moram em cidades vizinhas e trabalham ou estudam na capital.',
    [['todos os municípios do Paraná pertencem a ela.', 'Só os municípios integrados à região metropolitana.'], ['só moram na cidade pessoas nascidas lá.', 'Nada a ver com o local de nascimento.'], ['a cidade fica no meio de uma floresta intocada.', 'Não é esse o significado.']]);

  // ---------- Natureza ----------
  GR('g06', 'pico-parana', 'média', null, 'Qual é o ponto mais alto do estado do Paraná e de toda a Região Sul?',
    'Pico Paraná, na Serra do Mar, com cerca de 1.877 metros.', 'É o ponto culminante da Região Sul.',
    [['Pico da Neblina, no Amazonas.', 'É o ponto mais alto do Brasil.'], ['Pico das Agulhas Negras, no Rio de Janeiro.', 'Fica na Região Sudeste.'], ['Morro do Pilão, no litoral.', 'Não existe com esse destaque.']]);
  GR('g06', 'rio-limite', 'média', null, 'Qual rio forma a divisa natural entre o Paraná e São Paulo?',
    'Paranapanema.', 'O Paranapanema corre ao longo da divisa norte do Paraná.',
    [['Iguaçu.', 'Atravessa o sul do estado.'], ['Tibagi.', 'Corre inteiramente dentro do Paraná.'], ['São Francisco.', 'Fica em outras regiões do Brasil.']]);
  GR('g06', 'vegetacao-pr', 'média', null, 'A floresta típica do planalto paranaense, em que predominam as araucárias, é chamada de',
    'Floresta com Araucária (Mata de Araucárias).', 'É característica de áreas de clima mais frio do Sul do Brasil.',
    [['Floresta Amazônica.', 'Fica na Região Norte.'], ['Caatinga.', 'Fica no Nordeste, em clima semiárido.'], ['Pantanal.', 'Fica no Centro-Oeste.']]);
  GR('g06', 'litoral-chuva', 'difícil', null, 'O litoral do Paraná é uma das áreas mais chuvosas do estado. Qual é a explicação mais adequada?',
    'O ar úmido vindo do oceano sobe a Serra do Mar, esfria e se condensa, formando chuvas.', 'A serra funciona como barreira: o ar sobe, esfria e libera chuva.',
    [['Não há montanhas perto do litoral.', 'A Serra do Mar é a grande barreira.'], ['O ar do oceano é sempre seco.', 'O ar do oceano é rico em vapor de água.'], ['As chuvas vêm do deserto do interior.', 'Não há deserto no interior do Paraná.']]);
  GR('g06', 'geada', 'fácil', null, 'No Paraná, a geada ocorre com mais frequência durante qual estação do ano?',
    'Inverno.', 'As temperaturas baixas do inverno favorecem a formação de geada, sobretudo no sul e no planalto.',
    [['Verão.', 'É a estação mais quente.'], ['Primavera.', 'Geadas são raras.'], ['Todas, com a mesma frequência.', 'A geada é típica do inverno.']]);
  G('g06', 'relevo-conceitos', 'média', null, 'Um terreno de baixa altitude, relativamente plano e formado por sedimentos acumulados é chamado de',
    'planície.', 'Planícies são áreas planas e baixas, como a do litoral paranaense.',
    [['planalto.', 'Planaltos são áreas elevadas e desgastadas pela erosão.'], ['montanha.', 'Montanhas são elevações altas e íngremes.'], ['depressão absoluta.', 'Esse termo define áreas abaixo do nível do mar.']]);
  G('g06', 'hidro-conceitos', 'média', null, 'Em Hidrografia, o rio menor que deságua em um rio maior é chamado de',
    'afluente.', 'Afluentes contribuem com suas águas para o rio principal.',
    [['foz.', 'É o local onde um rio deságua.'], ['nascente.', 'É o local onde o rio se origina.'], ['margem.', 'É a área lateral do rio.']]);
  G('g06', 'hidro-foz', 'fácil', null, 'O local onde um rio termina, desaguando no mar ou em outro rio, chama-se',
    'foz.', 'A foz é o ponto final do rio.',
    [['nascente.', 'É o começo do rio.'], ['afluente.', 'É um rio que desemboca em outro.'], ['bacia.', 'É a área drenada por um rio e seus afluentes.']]);
  GR('g07', 'parque-iguacu', 'média', null, 'O Parque Nacional do Iguaçu, no Paraná, é uma unidade de conservação cuja função principal é',
    'proteger a natureza, incluindo a Mata Atlântica e as Cataratas do Iguaçu.', 'Unidades de conservação protegem a fauna, a flora e as paisagens naturais.',
    [['permitir a derrubada total das florestas.', 'Seu objetivo é a proteção.'], ['abrigar áreas de mineração intensiva.', 'A mineração não é a função do parque.'], ['abastecer fábricas com madeira.', 'Não é essa a função.']]);
  G('g07', 'coleta-seletiva', 'fácil', null, 'A coleta seletiva consiste em',
    'separar os resíduos recicláveis, como papel, plástico, metal e vidro, dos demais.', 'A separação facilita a reciclagem e reduz o lixo enviado aos aterros.',
    [['misturar todo o lixo em um mesmo saco.', 'Dificulta a reciclagem.'], ['queimar o lixo no quintal.', 'Polui o ar.'], ['jogar o lixo em terrenos vazios.', 'Contamina o ambiente.']]);
  G('g07', 'assoreamento', 'difícil', null, 'O desmatamento das margens de um rio pode causar o assoreamento. Esse problema ocorre quando',
    'terra e outros sedimentos são arrastados para o leito do rio e o tornam mais raso.', 'Sem a vegetação, a chuva carrega o solo para dentro do rio.',
    [['o rio fica mais fundo e cresce em extensão.', 'O assoreamento reduz a profundidade.'], ['a água do rio se transforma em gelo.', 'Não há relação.'], ['o rio muda de nome.', 'Não há relação.']]);
  G('g07', 'mata-ciliar', 'média', null, 'A mata ciliar, vegetação que cresce nas margens dos rios, é importante porque',
    'protege o solo da erosão e ajuda a manter a qualidade da água.', 'As raízes seguram o solo e a vegetação filtra o que chega ao rio.',
    [['aumenta a erosão nas margens.', 'Ocorre o contrário.'], ['impede a chuva de chegar ao rio.', 'Não bloqueia a chuva.'], ['serve apenas como enfeite.', 'Tem funções ambientais importantes.']]);

  // ---------- Lugar, paisagem, território, sociedade e natureza ----------
  G('g01', 'conceitos', 'média', null, 'Em Geografia, o conceito de “território” está mais relacionado a',
    'um espaço delimitado e controlado por um grupo ou um poder, como um município, um estado ou um país.', 'Território envolve limites e poder de gestão.',
    [['tudo o que se pode ver de um ponto, como uma paisagem.', 'Esse é o conceito de paisagem.'], ['apenas um local com significado afetivo.', 'Esse é o conceito de lugar.'], ['uma região sem nenhum tipo de limite.', 'Território envolve limites.']]);
  G('g01', 'paisagem', 'média', null, 'Uma praça, em 1950, tinha casas baixas e muitas árvores. Hoje, tem prédios altos e ruas asfaltadas. Essa mudança mostra que a paisagem',
    'se transforma ao longo do tempo, principalmente pela ação humana.', 'Construções e ruas são marcas da ação humana na paisagem.',
    [['nunca se modifica, apenas parece mudar.', 'Paisagens mudam.'], ['só é alterada por fenômenos da natureza.', 'No exemplo, a ação humana é decisiva.'], ['é a mesma em qualquer época.', 'As descrições mostram diferença.']]);
  G('g02', 'hidreletrica', 'média', null, 'A construção de uma usina hidrelétrica altera o ambiente natural porque',
    'forma um reservatório que alaga áreas de floresta, terras e moradias.', 'O represamento do rio inunda grandes áreas.',
    [['faz o rio desaparecer completamente.', 'O rio continua, mas com vazão controlada.'], ['elimina a necessidade de energia.', 'Usinas geram energia.'], ['impede a existência de peixes em todos os rios do país.', 'Afeta apenas o trecho represado e o curso do rio.']]);
  G('g02', 'urbanizacao-enchente', 'difícil', null, 'Em muitas cidades, o aumento das áreas asfaltadas e a falta de áreas verdes contribuem para as enchentes. Isso ocorre porque',
    'o solo impermeabilizado absorve menos água, que escoa rapidamente para as ruas e rios.', 'Sem solo permeável, a água da chuva se acumula e escorre.',
    [['o asfalto produz mais chuva.', 'O asfalto não produz chuva.'], ['as árvores atraem água para as ruas.', 'As árvores ajudam a absorver a água.'], ['a água evapora antes de chegar ao solo.', 'Não explica as enchentes.']]);

  // ---------- Cartografia ----------
  G('g09', 'legenda', 'fácil', null, 'Em um mapa, o elemento que explica o significado dos símbolos e das cores é a',
    'legenda.', 'A legenda mostra o que cada símbolo ou cor representa.',
    [['escala.', 'Mostra a relação entre as distâncias do mapa e as reais.'], ['rosa dos ventos.', 'Indica a orientação.'], ['fonte.', 'Indica a origem dos dados.']]);
  G('g09', 'escala-numerica', 'média', null, 'Um mapa tem escala 1 : 250.000. Se a distância entre duas cidades no mapa é de 6 cm, a distância real é de',
    '15 km.', '6 × 250.000 = 1.500.000 cm = 15.000 m = 15 km.',
    [['1,5 km.', 'Erro na conversão de unidades.'], ['150 km.', 'Erro na conversão de unidades.'], ['6 km.', 'Ignora a escala.']]);
  G('g09', 'escala-detalhe', 'difícil', null, 'Qual das escalas abaixo representa uma área menor com mais detalhes?',
    '1 : 10.000', 'Quanto menor o número depois dos dois-pontos, maior a escala e mais detalhes aparecem.',
    [['1 : 100.000', 'Mostra menos detalhes que 1 : 10.000.'], ['1 : 1.000.000', 'Mostra uma área grande, com menos detalhes.'], ['1 : 50.000.000', 'É própria de mapas-múndi.']]);
  G('g10', 'pontos-cardeais', 'média', null, 'Se uma pessoa está com o lado direito voltado para onde o Sol nasce, para qual ponto cardeal ela está voltada de frente?',
    'Sul.', 'O Sol nasce a leste. Com o leste à direita, a frente está para o sul.',
    [['Norte.', 'Se a frente fosse para o norte, o leste ficaria à direita, e isso seria o contrário.'], ['Leste.', 'O leste está à direita, e não à frente.'], ['Oeste.', 'O oeste está à esquerda.']]);
  G('g10', 'colaterais', 'média', null, 'Em um mapa, o município A está a sudoeste do município B. Então, em relação a A, o município B está a',
    'nordeste.', 'Os pontos colaterais opostos são: sudoeste e nordeste.',
    [['noroeste.', 'É o oposto de sudeste.'], ['sudeste.', 'É o oposto de noroeste.'], ['sudoeste.', 'É a mesma direção citada para A.']]);
  G('g08', 'coordenadas', 'difícil', null, 'As linhas imaginárias horizontais, paralelas ao Equador, que servem para medir a latitude, chamam-se',
    'paralelos.', 'Os paralelos medem a distância em graus ao norte ou ao sul do Equador.',
    [['meridianos.', 'São linhas verticais que medem a longitude.'], ['trópicos.', 'São apenas dois paralelos específicos.'], ['fusos.', 'São faixas de horários.']]);
})();
