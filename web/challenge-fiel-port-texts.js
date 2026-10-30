(function () {
  'use strict';
  // Português: leitura de textos autorais de vários gêneros (como nos cadernos), com perguntas de compreensão e de linguagem.
  const { Q, QF } = window.FIEL;
  const A = 'Texto autoral.\n';

  // Crônica
  const guardaChuva = A + 'O guarda-chuva do vovô\nTodo dia, antes de sair, vovô conferia o céu e levava o guarda-chuva debaixo do braço. “Para quê, se não vai chover?”, eu perguntava. “O guarda-chuva é como um amigo precavido”, respondia ele. “Só aparece quando o tempo fecha, mas é bom ter por perto.” Na terça, a tempestade chegou de repente. Corri para casa encharcada, e vovô, seco, me esperava na porta, com o guarda-chuva aberto.';
  Q('p12', 'guarda-chuva-narrador', 'média', guardaChuva, 'Quanto à posição do narrador, o texto é narrado em',
    'primeira pessoa, por uma neta que participa dos fatos.', 'Expressões como “eu perguntava” e “me esperava” mostram que quem narra participa da história.',
    [['terceira pessoa, por alguém que apenas observa.', 'O narrador usa “eu” e “me”.'], ['segunda pessoa, dirigindo-se ao vovô.', 'Não há “você” dirigido ao vovô.'], ['primeira pessoa, pelo próprio vovô.', 'O vovô é personagem; quem narra é a neta.']]);
  Q('p24', 'guarda-chuva-amigo', 'média', guardaChuva, 'Na fala do vovô, “O guarda-chuva é como um amigo precavido” é uma comparação que significa que',
    'o objeto está preparado para ajudar quando for necessário.', 'Como o amigo precavido, o guarda-chuva só é usado na hora certa, mas é útil por estar à mão.',
    [['o guarda-chuva é uma pessoa que conversa com o vovô.', 'É uma comparação, não personificação literal.'], ['o vovô não gosta de pessoas precavidas.', 'Ele usa a comparação de modo positivo.'], ['o guarda-chuva deve ser levado só em dias de sol.', 'Contraria a ideia do texto.']]);
  Q('p03', 'guarda-chuva-desfecho', 'difícil', guardaChuva, 'Pelo desfecho do texto, é possível concluir que',
    'a precaução do vovô se mostrou acertada, e a neta passou a reconhecer isso.', 'A tempestade confirma o cuidado do avô; a imagem final (ele seco, com o guarda-chuva aberto) contrasta com a neta encharcada.',
    [['a neta tinha razão ao desconfiar da previsão do tempo.', 'A chuva veio, o que dá razão ao avô.'], ['o vovô esqueceu o guarda-chuva em casa.', 'Ele estava com o guarda-chuva aberto.'], ['a tempestade foi anunciada pela televisão.', 'O texto diz que ela chegou “de repente”.']]);

  // Fábula
  const fabula = A + 'O sabiá e o espelho do lago\nUm sabiá passava horas à beira do lago, admirando o próprio reflexo. “Que penas bonitas eu tenho!”, cantava. Os outros pássaros o chamavam para procurar frutas, mas ele recusava: “Não posso me afastar de minha beleza”. Quando o inverno chegou, o lago congelou, o reflexo desapareceu e o sabiá, magro e sozinho, percebeu que ninguém o acompanhara em sua vaidade. Ao voltar ao bando, foi recebido com frutas e conversa. Desde então, passou a admirar menos o espelho e mais os amigos.';
  Q('p10', 'sabia-moral', 'fácil', fabula, 'A lição de moral que se pode retirar dessa fábula é:',
    'A vaidade em excesso afasta as pessoas e nos faz perder o que realmente importa.', 'O sabiá se isolou por vaidade e só foi acolhido quando valorizou os amigos.',
    [['Quem tem penas bonitas nunca precisa de ajuda.', 'Contraria o final da fábula.'], ['O inverno é a melhor estação para os pássaros.', 'O texto mostra o inverno como momento difícil.'], ['Todo pássaro deve evitar a água de lagos.', 'O problema não é o lago, mas a vaidade.']]);
  Q('p05', 'sabia-conectivo', 'média', fabula, 'No trecho “Quando o inverno chegou, o lago congelou, o reflexo desapareceu e o sabiá, magro e sozinho, percebeu...”, a palavra “quando” introduz uma ideia de',
    'tempo, indicando o momento em que os fatos aconteceram.', 'A oração marca a ocasião em que o lago congelou.',
    [['causa, explicando por que o sabiá era vaidoso.', 'A oração não explica a vaidade.'], ['oposição, contrariando a ideia anterior.', 'Não há contraste.'], ['condição, pois depende de algo incerto.', 'A chegada do inverno é um fato.']]);
  Q('p25', 'sabia-adjetivos', 'média', fabula, 'Na expressão “o sabiá, magro e sozinho”, as palavras “magro” e “sozinho” são',
    'adjetivos, pois caracterizam o substantivo “sabiá”.', 'Os dois termos atribuem características ao pássaro.',
    [['verbos, pois indicam ações do sabiá.', 'Não indicam ações.'], ['advérbios, pois modificam o verbo “percebeu”.', 'Referem-se ao sabiá, não ao verbo.'], ['artigos, pois acompanham o substantivo.', 'Artigos são “o”, “a”, “um”, “uma”.']]);

  // Notícia
  const noticia = A + 'Escola planta 200 mudas de ipê no Dia da Árvore\nCerca de 400 alunos da Escola Municipal Rio Claro, em Ponta Grossa, plantaram 200 mudas de ipê na manhã desta sexta-feira (21), no pátio e nos arredores da escola. A atividade faz parte de um projeto de educação ambiental que dura o ano todo. “Foi o melhor dia da escola”, disse a aluna Marina, de 10 anos. Segundo a direção, as mudas serão regadas por turmas em revezamento até ficarem firmes.';
  Q('p02', 'ipe-lide', 'fácil', noticia, 'Segundo a notícia, quantas mudas de ipê foram plantadas?',
    '200 mudas.', 'A informação aparece no título e no primeiro parágrafo.',
    [['400 mudas.', 'É o número de alunos.'], ['21 mudas.', 'É o dia do mês.'], ['10 mudas.', 'É a idade da aluna Marina.']]);
  Q('p07', 'ipe-opiniao', 'média', noticia, 'Qual trecho da notícia expressa uma opinião?',
    '“Foi o melhor dia da escola”.', 'A frase traz um julgamento pessoal da aluna; os demais trechos informam fatos.',
    [['“plantaram 200 mudas de ipê”.', 'É um fato.'], ['“na manhã desta sexta-feira (21)”.', 'É uma informação de tempo.'], ['“as mudas serão regadas por turmas em revezamento”.', 'É uma informação sobre o plano da escola.']]);
  Q('p01', 'ipe-tema', 'média', noticia, 'A notícia tem como assunto principal',
    'uma ação de educação ambiental realizada em uma escola.', 'O plantio de mudas por alunos é o fato central, ligado a um projeto ambiental.',
    [['a mudança de endereço de uma escola.', 'Não há mudança de endereço.'], ['a venda de plantas ornamentais.', 'As mudas são plantadas, não vendidas.'], ['uma competição esportiva entre escolas.', 'Não há competição.']]);
  Q('p05', 'ipe-finalidade', 'difícil', noticia, 'No trecho “As mudas serão regadas por turmas em revezamento até ficarem firmes”, a expressão “até ficarem firmes” indica',
    'o momento em que o cuidado com as mudas deixará de ser necessário.', 'A preposição “até” marca o limite de tempo da ação de regar.',
    [['o motivo pelo qual as mudas foram plantadas.', 'Não é uma causa.'], ['uma comparação entre as turmas.', 'Não há comparação.'], ['o local onde as mudas serão regadas.', 'Não indica lugar.']]);

  // Poema
  const poema = A + 'Chuva de domingo\nA chuva bate na janela,\nbatuca no telhado,\ntoca um samba devagar.\nDentro da casa, o silêncio\nfaz xícara de chá\ne prepara um bolo de laranja\npara a tarde se demorar.';
  Q('p24', 'chuva-sentido', 'média', poema, 'Nos versos “A chuva bate na janela, / batuca no telhado, / toca um samba devagar”, a chuva é apresentada como alguém que',
    'faz música ao cair, o que é um recurso de personificação.', 'Atribuir ações humanas (batucar, tocar samba) à chuva é personificação.',
    [['dá aulas de música aos moradores.', 'O poema não fala de aulas.'], ['compra instrumentos musicais.', 'Interpreta literalmente.'], ['impede a casa de ter silêncio.', 'Dentro da casa há silêncio.']]);
  Q('p11', 'chuva-sentimento', 'difícil', poema, 'A atmosfera criada pelo poema é de',
    'calma e aconchego, típica de um dia chuvoso em casa.', 'O chá, o bolo de laranja e o samba devagar compõem uma cena tranquila.',
    [['medo diante de uma tempestade.', 'Nada no poema sugere medo.'], ['agitação, por causa de uma festa.', 'O samba é “devagar”, e há silêncio.'], ['tristeza, pela falta de companhia.', 'O poema não mostra solidão.']]);
  Q('p22', 'chuva-rima', 'média', poema, 'No poema, as palavras “telhado” e “devagar” são exemplos de palavras que',
    'terminam com sons diferentes, pois não rimam entre si.', 'Rima exige sons finais semelhantes; “telhado” e “devagar” terminam em sons distintos.',
    [['rimam, pois as duas têm quatro letras iguais no final.', 'As letras finais não são iguais.'], ['rimam porque ambas terminam em “a”.', '“Devagar” termina em “ar”, e “telhado” em “ado”.'], ['formam um verso, pois estão na mesma estrofe.', 'Estar na mesma estrofe não é rima.']]);

  // Texto informativo: gralha-azul
  const gralha = A + 'A gralha-azul e o pinheiro-do-paraná\nA gralha-azul é uma ave de plumagem azul-escura, comum nas matas de araucária do Sul do Brasil. Ela se alimenta de pinhões, as sementes da araucária. Para guardar comida, enterra os pinhões no solo, mas nem sempre se lembra de todos os esconderijos. Os pinhões esquecidos podem germinar e dar origem a novas araucárias. Assim, a ave ajuda a espalhar a espécie e a manter a floresta.';
  Q('p05', 'gralha-causa', 'média', gralha, 'Segundo o texto, novas araucárias podem surgir porque a gralha-azul',
    'esquece alguns pinhões que enterrou, e eles germinam.', 'O texto relaciona os esconderijos esquecidos ao nascimento de novas árvores.',
    [['planta mudas de araucária de propósito.', 'O texto diz que a ave “nem sempre se lembra” dos esconderijos.'], ['derruba pinhões para os outros animais.', 'Não se afirma isso.'], ['come todos os pinhões e deixa as sementes.', 'As sementes enterradas e esquecidas são o ponto.']]);
  Q('p03', 'gralha-inferencia', 'difícil', gralha, 'É possível concluir do texto que, se as gralhas-azuis desaparecessem de uma região de araucárias,',
    'a renovação natural da floresta poderia ser prejudicada.', 'A ave participa da dispersão das sementes; sem ela, haveria menos novas árvores.',
    [['as araucárias passariam a produzir mais pinhões.', 'O texto não relaciona a ave à produção de pinhões.'], ['a floresta cresceria mais rápido.', 'Não há essa informação.'], ['as araucárias se tornariam plantas azuis.', 'É absurdo: a cor refere-se à ave.']]);
  Q('p02', 'gralha-explicita', 'fácil', gralha, 'De acordo com o texto, do que a gralha-azul se alimenta?',
    'De pinhões.', 'O texto afirma que ela se alimenta de pinhões, as sementes da araucária.',
    [['De folhas de pinheiro.', 'O texto não menciona folhas.'], ['De insetos de lagos.', 'O texto não fala de insetos.'], ['De frutas tropicais.', 'Não há frutas tropicais no texto.']]);

  // Verbete
  const verbete = A + 'pinhão (pi·nhão) s.m.\n1. Semente comestível da araucária, muito usada na culinária do Sul do Brasil. Ex.: Na festa junina, comemos pinhão cozido.\n2. Peça pequena de uma engrenagem. Ex.: O pinhão da bicicleta estava solto.\nPl.: pinhões.';
  Q('p10', 'verbete-sigla', 'média', verbete, 'No verbete, a abreviatura “s.m.” indica que a palavra “pinhão” é',
    'um substantivo masculino.', '“s.m.” significa “substantivo masculino”.',
    [['um verbo no modo imperativo.', 'Verbos são indicados por “v.”.'], ['um sinônimo de “pinheiro”.', 'A abreviatura não indica sinônimos.'], ['uma palavra de origem estrangeira.', 'A abreviatura não trata de origem.']]);
  Q('p04', 'verbete-acepcao', 'média', verbete, 'Na frase “O pinhão da bicicleta estava solto”, a palavra “pinhão” aparece com o sentido de número',
    '2 do verbete: peça de uma engrenagem.', 'Numa bicicleta, o pinhão é uma peça mecânica, não uma semente.',
    [['1 do verbete: semente da araucária.', 'Uma bicicleta não tem sementes.'], ['1 e 2 ao mesmo tempo.', 'Cada ocorrência tem um sentido por contexto.'], ['nenhum dos dois sentidos do verbete.', 'O sentido está registrado em 2.']]);
  Q('p25', 'verbete-plural', 'média', verbete, 'O plural de “pinhão”, segundo o verbete, é',
    '“pinhões”.', 'O verbete apresenta “Pl.: pinhões”.',
    [['“pinhãos”.', 'Não é a forma indicada.'], ['“pinhães”.', 'Não é a forma indicada.'], ['“pinhons”.', 'Não é forma da língua portuguesa.']]);

  // Texto instrucional
  const instrucao = A + 'Como fazer um terrário\n1. Lave bem um pote de vidro grande e deixe-o secar.\n2. Coloque uma camada de pedrinhas no fundo, para a água escorrer.\n3. Cubra com terra vegetal e plante pequenas mudas.\n4. Regue com pouca água e feche o pote.\n5. Deixe em lugar claro, longe do sol forte.';
  Q('p25', 'terrario-verbos', 'média', instrucao, 'Os verbos “lave”, “coloque” e “cubra” estão no imperativo porque o texto',
    'orienta o leitor a realizar ações em uma sequência.', 'Textos de instrução usam o imperativo para dar ordens ou orientações.',
    [['relata fatos que já aconteceram.', 'O imperativo não relata o passado.'], ['descreve as características de um terrário pronto.', 'Não é descrição.'], ['expressa dúvidas do autor sobre o método.', 'Não há dúvidas.']]);
  Q('p05', 'terrario-ordem', 'média', instrucao, 'Se uma pessoa seguir as instruções, o que deve fazer logo depois de colocar as pedrinhas no fundo do pote?',
    'Cobrir com terra vegetal e plantar as mudas.', 'A ordem das etapas é indicada pelos números: após as pedrinhas, vem a terra.',
    [['Regar com bastante água.', 'A rega vem depois do plantio e com pouca água.'], ['Fechar o pote e levá-lo ao sol forte.', 'O sol forte é evitado.'], ['Lavar o pote de vidro.', 'A lavagem é a primeira etapa.']]);
  Q('p03', 'terrario-por-que', 'difícil', instrucao, 'Qual é a função das pedrinhas no fundo do pote, segundo o texto?',
    'Permitir que a água escorra.', 'A etapa 2 explica: “para a água escorrer”.',
    [['Enfeitar o pote com cores.', 'O texto não menciona enfeite.'], ['Prender as mudas ao vidro.', 'Não há essa função.'], ['Impedir que a luz entre no pote.', 'O pote deve ficar em lugar claro.']]);

  // Texto de opinião
  const opiniao = A + 'Recreio com música\nA escola deveria tocar músicas calmas no recreio. Em primeiro lugar, o barulho no pátio é tão grande que muitos alunos saem cansados. Além disso, pesquisas feitas por professores mostram que ouvir música relaxante reduz a agitação. Por fim, a música pode unir quem gosta de ritmos diferentes. Por isso, defendo que essa ideia seja testada por um mês.';
  Q('p06', 'recreio-tese', 'média', opiniao, 'A tese (a ideia que o autor defende) do texto é que',
    'a escola deve tocar músicas calmas durante o recreio.', 'A tese aparece na primeira frase e é retomada no final.',
    [['o recreio deve ser abolido da escola.', 'O autor não propõe isso.'], ['os alunos devem trazer instrumentos musicais.', 'Não há tal proposta.'], ['os professores devem fazer pesquisas sobre o barulho.', 'As pesquisas são um argumento, não a tese.']]);
  Q('p05', 'recreio-conectivos', 'difícil', opiniao, 'No texto, as expressões “Em primeiro lugar”, “Além disso” e “Por fim” servem para',
    'organizar os argumentos em uma sequência.', 'Esses conectivos ordenam as ideias que sustentam a tese.',
    [['contar fatos em ordem cronológica.', 'São argumentos, não fatos de uma história.'], ['indicar o lugar onde o recreio acontece.', 'Não indicam lugares.'], ['introduzir uma pergunta ao leitor.', 'Não há pergunta.']]);
  Q('p07', 'recreio-fato', 'difícil', opiniao, 'Qual trecho apresenta um argumento que pretende se apoiar em dados ou em estudos, e não apenas em opinião?',
    '“pesquisas feitas por professores mostram que ouvir música relaxante reduz a agitação”.', 'O trecho cita pesquisas como base do argumento.',
    [['“A escola deveria tocar músicas calmas no recreio”.', 'É a opinião do autor.'], ['“a música pode unir quem gosta de ritmos diferentes”.', 'É uma opinião (uma possibilidade).'], ['“defendo que essa ideia seja testada por um mês”.', 'É uma proposta.']]);

  // Biografia
  const dumont = A + 'Santos Dumont\nAlberto Santos Dumont nasceu em Minas Gerais, em 1873. Aos 18 anos, foi estudar em Paris, onde se apaixonou pela aviação. Construiu balões e dirigíveis. Em 23 de outubro de 1906, decolou com o 14-bis diante do público, e o voo foi registrado como o primeiro de um avião com meios próprios de decolagem. Mais tarde, tornou-se conhecido no mundo todo.';
  Q('p10', 'dumont-genero', 'fácil', dumont, 'Esse texto é uma biografia porque',
    'relata a vida de uma pessoa real, em ordem cronológica.', 'Há datas, local de nascimento e uma sequência de fatos.',
    [['narra uma aventura com personagens imaginários.', 'A pessoa é real.'], ['ensina o passo a passo para construir um avião.', 'Não é texto instrucional.'], ['defende uma opinião por meio de argumentos.', 'Não é texto de opinião.']]);
  Q('p05', 'dumont-sequencia', 'média', dumont, 'Segundo o texto, qual acontecimento ocorreu primeiro?',
    'A mudança de Santos Dumont para estudar em Paris.', 'Ele foi a Paris aos 18 anos, antes dos voos de 1906.',
    [['O voo do 14-bis.', 'Ocorreu em 1906, depois da ida a Paris.'], ['O reconhecimento mundial de Santos Dumont.', 'Ocorreu “mais tarde”.'], ['A construção do 14-bis.', 'Aconteceu depois da paixão pela aviação em Paris.']]);
  Q('p02', 'dumont-idade', 'média', dumont, 'Em 1906, quantos anos Santos Dumont tinha, aproximadamente, ao realizar o voo do 14-bis?',
    '33 anos.', '1906 − 1873 = 33 anos.',
    [['18 anos.', 'Era a idade em que foi para Paris.'], ['43 anos.', 'Seria 1916.'], ['23 anos.', 'Confunde com o dia do mês do voo.']]);

  // Conto com personagem-narrador
  const botao = A + 'O botão azul\nMinha avó guardava, em uma lata de biscoitos, mais de cem botões. Eu gostava do azul, redondo, com quatro furinhos. “Esse veio do casaco de um homem que atravessou o mar”, ela dizia, e eu imaginava navios, tempestades e gaivotas. Só descobri, anos depois, que o casaco era do tio Arnaldo e que o mar era apenas a represa da cidade vizinha. Ainda assim, o botão continua valendo uma viagem.';
  Q('p12', 'botao-tempo', 'média', botao, 'No trecho “Só descobri, anos depois, que o casaco era do tio Arnaldo”, a expressão “anos depois” indica',
    'passagem de tempo entre a infância e o momento da descoberta.', 'A expressão marca um salto temporal na narrativa.',
    [['o espaço onde a história acontece.', 'Não indica lugar.'], ['um conflito entre a narradora e o tio.', 'Não há conflito com o tio.'], ['uma comparação entre dois botões.', 'Não há comparação.']]);
  Q('p03', 'botao-inferencia', 'difícil', botao, 'A última frase (“o botão continua valendo uma viagem”) sugere que a narradora',
    'valoriza a lembrança e a imaginação despertadas pelo botão, apesar da descoberta.', 'Mesmo sabendo da verdade, ela mantém o valor afetivo da história que a avó contava.',
    [['ficou com raiva da avó por ter mentido.', 'O tom é carinhoso.'], ['pretende vender o botão para viajar.', 'O sentido de “viagem” é figurado.'], ['acredita que o casaco atravessou o mar.', 'Ela já sabe que foi na represa.']]);
  Q('p24', 'botao-figurado', 'média', botao, 'Em “o mar era apenas a represa da cidade vizinha”, a palavra “mar” foi usada pela avó em sentido',
    'figurado, para tornar a história mais emocionante.', 'A avó usa “mar” para aumentar a fantasia, embora o lugar real fosse uma represa.',
    [['literal, pois a cidade ficava no litoral.', 'O texto diz que era uma represa.'], ['técnico, como termo de geografia.', 'Não é uso técnico.'], ['irônico, para criticar o tio Arnaldo.', 'Não há crítica a ele.']]);

  // Regulamento
  const regras = A + 'Regras da gincana de leitura\n1. Cada equipe terá cinco alunos.\n2. Cada aluno poderá registrar, no máximo, três livros por semana.\n3. Só serão contados livros com resumo escrito no caderno da equipe.\n4. Vence a equipe com mais livros registrados ao final de quatro semanas.';
  Q('p02', 'regras-calculo', 'média', regras, 'Uma equipe completa, em que todos registraram o máximo permitido de livros em cada uma das quatro semanas, terá registrado, no total,',
    '60 livros.', '5 alunos × 3 livros × 4 semanas = 60 livros.',
    [['15 livros.', 'Corresponde a 5 × 3, apenas uma semana.'], ['12 livros.', 'Corresponde a 3 × 4, de um só aluno.'], ['20 livros.', 'Corresponde a 5 × 4, ignorando o limite de livros.']]);
  Q('p03', 'regras-restricao', 'difícil', regras, 'Maria leu quatro livros em uma semana, mas fez resumo de apenas dois no caderno da equipe. Para a gincana, ela poderá registrar',
    'dois livros, pois só contam os livros com resumo.', 'A regra 3 só conta livros com resumo; e dois está abaixo do limite de três.',
    [['quatro livros, pois leu todos.', 'Só contam os livros com resumo.'], ['três livros, o limite semanal.', 'Ela só tem dois com resumo.'], ['nenhum livro, pois leu mais do que o permitido.', 'O excesso não anula os livros válidos.']]);

  // Carta de leitor
  const carta = A + 'Prezada redação,\nEscrevo para parabenizar o jornal pela matéria sobre a limpeza do Rio Belém. Moro perto dele há trinta anos e nunca o vi tão limpo. Gostaria, porém, de sugerir que os próximos textos incluam o telefone da prefeitura para denúncias de lixo. Agradeço a atenção.\nAtenciosamente,\nCarlos Moreira.';
  Q('p01', 'carta-leitor-finalidade', 'média', carta, 'Carlos escreve ao jornal com duas finalidades principais:',
    'elogiar uma matéria e fazer uma sugestão.', 'Ele parabeniza a reportagem e sugere incluir um telefone para denúncias.',
    [['pedir emprego e reclamar do preço do jornal.', 'Nenhuma dessas ideias aparece.'], ['contar uma aventura e pedir desculpas.', 'Não há narrativa nem pedido de desculpas.'], ['vender um terreno e divulgar um evento.', 'O texto não trata de vendas.']]);
  Q('p25', 'carta-leitor-pronome', 'difícil', carta, 'No trecho “nunca o vi tão limpo”, o pronome “o” retoma',
    'o Rio Belém.', 'O pronome substitui o termo citado antes (“Rio Belém”), evitando repetição.',
    [['o jornal.', 'O que aparece “limpo” é o rio, não o jornal.'], ['Carlos Moreira.', 'Carlos é quem vê, não o que é visto.'], ['a prefeitura.', 'A prefeitura é mencionada depois.']]);
})();
