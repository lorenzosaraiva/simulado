(function () {
  'use strict';

  const SOURCES = {
    edital: {
      label: 'Edital CPM 2027 — Anexo A',
      url: 'https://processoclassificatoriocpm.com.br/'
    },
    cpm2025: {
      label: 'Gabarito definitivo CPM Paraná 2025/2026',
      url: 'https://www.cpmfoz.com.br/_files/ugd/02760c_dc0b773036984c6cac597ef114dde1f9.pdf'
    },
    edward: {
      label: 'Guia oficial da obra — Candlewick Press',
      url: 'https://www.candlewick.com/book_files/0763625892.btg.1.pdf'
    },
    abl: {
      label: 'Academia Brasileira de Letras — VOLP',
      url: 'https://academia.org.br/nossa-lingua/vocabulario-ortografico'
    },
    ibge: {
      label: 'IBGE Educa — divisão territorial',
      url: 'https://educa.ibge.gov.br/criancas/brasil/2850-nosso-territorio/19637-divisao-territorial.html'
    },
    ibgeClima: {
      label: 'IBGE Educa — relevo e clima',
      url: 'https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19634-relevo-e-clima.html'
    },
    ibgeMapas: {
      label: 'IBGE Educa — mapas para o Ensino Fundamental',
      url: 'https://educa.ibge.gov.br/criancas/mapas-5.html'
    },
    saude: {
      label: 'Ministério da Saúde — imunidade',
      url: 'https://www.gov.br/saude/pt-br/vacinacao/faq/vacinas/o-que-e-imunidade'
    },
    nasa: {
      label: 'NASA — Sistema Solar',
      url: 'https://spaceplace.nasa.gov/planets/en/'
    },
    camaraIndependencia: {
      label: 'Câmara dos Deputados — Independência do Brasil',
      url: 'https://www2.camara.leg.br/a-camara/documentos-e-pesquisa/arquivo/acervo-por-tipo/sites-tematicos/200-anos-da-assembleia-constituinte/2022'
    },
    camaraColonia: {
      label: 'Câmara dos Deputados — Brasil Colônia',
      url: 'https://www2.camara.leg.br/a-camara/conheca/historia/colonia.html'
    },
    leiAurea: {
      label: 'Câmara dos Deputados — Lei Áurea',
      url: 'https://www.camara.leg.br/noticias/64000-noticia'
    },
    khan: {
      label: 'Khan Academy — Matemática do Ensino Fundamental',
      url: 'https://pt.khanacademy.org/math/pt-5-ano'
    }
  };

  const SUBJECTS = {
    portugues: { label: 'Língua Portuguesa', short: 'Português', color: '#3859a8' },
    matematica: { label: 'Matemática', short: 'Matemática', color: '#d16b3b' },
    ciencias: { label: 'Ciências', short: 'Ciências', color: '#358264' },
    geografia: { label: 'Geografia', short: 'Geografia', color: '#b0832e' },
    historia: { label: 'História', short: 'História', color: '#8a537c' }
  };

  const DISTRIBUTION = {
    portugues: 15,
    matematica: 10,
    ciencias: 4,
    geografia: 3,
    historia: 3
  };

  function question(id, subject, topic, prompt, options, correct, explanation, source, origin = 'Inédita • edital 2027') {
    const authored = !origin.startsWith('Oficial');
    return { id, subject, topic, prompt, options, correct, explanation, source, authored,
      origin: authored ? `⚑ Criada por IA · ${origin}` : origin };
  }

  const portugues = [
    question(
      'of25-p02', 'portugues', 'Classes de palavras',
      '<div class="reading">“As unhas <strong>cor-de-rosa</strong> de Dona Mamãe, polidas diariamente como o corrimão, brilhavam como dez janelinhas ao levantar do sol. Em torno do pescoço, orelhas, pulsos e dedos de Dona Mamãe, cintilavam colares, brincos, pulseiras e anéis de pedras <strong>preciosas</strong>.”</div><p>No trecho, “cor-de-rosa” e “preciosas” são classificadas, morfologicamente, como:</p>',
      ['substantivos.', 'advérbios.', 'adjetivos.', 'verbos.'], 2,
      'As duas palavras atribuem características aos substantivos “unhas” e “pedras”. Palavras que caracterizam ou qualificam substantivos são adjetivos.',
      SOURCES.cpm2025, 'Oficial CPM 2025 • questão 2'
    ),
    question(
      'of25-p04', 'portugues', 'Tipologia textual',
      '<p>Assinale o trecho predominantemente <strong>descritivo</strong>.</p>',
      [
        '“O pai dela [...] era a criatura mais chata que eu já conheci. Um homem vaidoso, ainda que, no fundo, fosse uma boa pessoa.”',
        '“Lorde John e eu descemos a Vigo Street e passamos pelos escuros portais [...].”',
        '“Quando estávamos prestes a subir no navio, ouvimos alguém gritar atrás de nós [...].”',
        '“Desde que se juntara ao grupo, Challenger dera ordens o tempo inteiro [...].”'
      ], 0,
      'O primeiro trecho se concentra em caracterizar uma pessoa, com traços como “chata” e “vaidoso”. Os demais apresentam principalmente ações, típicas de narração.',
      SOURCES.cpm2025, 'Oficial CPM 2025 • questão 4'
    ),
    question(
      'of25-p05', 'portugues', 'Gêneros textuais',
      '<div class="reading"><strong>PREPARAÇÃO</strong><br><br>Malandro passou o ano inteiro na capital, torrando o dinheiro do pai e dizendo que estava estudando.<br>No final do ano, mandou um telegrama para a mãe:<br>— Fui reprovado nos exames. Prepare papai.<br>Dias depois, recebeu a resposta da mamãe:<br>— Papai preparado, meu filho. Agora prepare-se você.</div><p>O texto é considerado:</p>',
      ['um diário, porque conta um episódio na vida do autor.', 'uma fábula, porque existe uma lição de moral.', 'uma piada, porque a intenção é gerar humor.', 'um poema, porque está em forma de versos.'], 2,
      'A resposta da mãe muda inesperadamente o sentido de “prepare papai” e produz humor. Essa construção breve, com desfecho engraçado, caracteriza uma piada.',
      SOURCES.cpm2025, 'Oficial CPM 2025 • questão 5'
    ),
    question(
      'of25-p08', 'portugues', 'Norma-padrão',
      '<div class="reading">“Domingo de tardezinha eu estava mesmo à toa<br>Convidei meus companheiro pra ir pescar na lagoa<br>Levamo a rede de lance, ai, ai, fomo pescar de canoa!<br>Eu levei meus apreparo pra dá uma pescada boa<br>Saímo cortando água na minha velha canoa<br>A garça avistei de longe, ai, ai, chego perto ela avoa...”</div><p>Considerando a norma-padrão, marque a alternativa correta.</p>',
      ['“levamo”, “fomo” e “saímo” já seguem a norma-padrão.', '“meus companheiro” apresenta concordância adequada.', 'O verbo “dá” deveria ser substituído por “dará”.', 'A palavra “avoa” deveria ser substituída por “voa”.'], 3,
      'Na norma-padrão, a forma é “ela voa”. As demais opções mantêm desvios: “levamos”, “fomos”, “saímos”, “meus companheiros” e “para dar”. A canção usa variedade popular de modo intencional.',
      SOURCES.cpm2025, 'Oficial CPM 2025 • questão 8'
    ),
    question(
      'of25-p14', 'portugues', 'Fato e opinião',
      '<p>Qual trecho apresenta claramente uma <strong>opinião</strong> do autor sobre um livro?</p>',
      [
        '“O livro é muito bom, porque é recheado de valores [...]. Por isso, vale muito a pena ler a história.”',
        '“Tistu vive com seus pais em Mirapólvora.”',
        '“O menino do dedo verde foi escrito na década de 1950.”',
        '“Tistu é um menino que produz plantas e flores ao toque do dedo.”'
      ], 0,
      'Expressões avaliativas como “muito bom” e “vale muito a pena” mostram um julgamento pessoal. As outras alternativas apresentam informações sobre a obra.',
      SOURCES.cpm2025, 'Oficial CPM 2025 • questão 14'
    ),
    question(
      'edward-personagem', 'portugues', 'Edward Tulane • personagem',
      '<p>No início de <em>A Extraordinária Jornada de Edward Tulane</em>, qual característica melhor descreve Edward?</p>',
      ['Humilde e atento aos sentimentos alheios.', 'Vaidoso e muito concentrado em si mesmo.', 'Medroso e incapaz de ficar sozinho.', 'Curioso e sempre disposto a viajar.'], 1,
      'No começo, Edward admira a própria aparência e dá pouca atenção ao amor que recebe. Essa atitude muda ao longo da jornada.',
      SOURCES.edward, 'Inédita • leitura 2027'
    ),
    question(
      'edward-abilene', 'portugues', 'Edward Tulane • personagens',
      '<p>Na obra indicada para a prova de 2027, quem é Abilene?</p>',
      ['A menina que ama e cuida de Edward.', 'A pescadora que encontra Edward no mar.', 'A avó que fabrica o coelho de porcelana.', 'A criança que conserta o relógio de Edward.'], 0,
      'Abilene é a menina que recebe Edward e o trata com grande carinho. A perda desse lar dá início à jornada do coelho.',
      SOURCES.edward, 'Inédita • leitura 2027'
    ),
    question(
      'edward-material', 'portugues', 'Edward Tulane • informação explícita',
      '<p>Edward Tulane é apresentado na narrativa como um coelho feito principalmente de:</p>',
      ['madeira.', 'tecido.', 'porcelana.', 'metal.'], 2,
      'Edward é um coelho de porcelana. A fragilidade do material também se relaciona simbolicamente às mudanças de seu coração.',
      SOURCES.edward, 'Inédita • leitura 2027'
    ),
    question(
      'edward-conflito', 'portugues', 'Edward Tulane • enredo',
      '<p>Qual acontecimento rompe a vida confortável de Edward com Abilene e inicia sua grande jornada?</p>',
      ['Ele é esquecido em uma estação de trem.', 'Ele cai no mar durante uma viagem de navio.', 'Ele foge para procurar sua criadora.', 'Ele é vendido a um colecionador.'], 1,
      'Durante a viagem de navio, Edward vai parar no oceano. A perda o afasta de Abilene e inicia a sequência de novos encontros.',
      SOURCES.edward, 'Inédita • leitura 2027'
    ),
    question(
      'edward-sequencia', 'portugues', 'Edward Tulane • sequência narrativa',
      '<p>Qual alternativa apresenta espaços que fazem parte da jornada de Edward?</p>',
      ['O fundo do oceano, a rede de um pescador e as ruas de Mênfis.', 'Uma escola, uma fábrica e uma estação espacial.', 'Um castelo, uma floresta encantada e uma ilha deserta.', 'Uma fazenda no Brasil, um circo e um museu francês.'], 0,
      'A viagem leva Edward do fundo do oceano à rede de um pescador e, depois de outros encontros, às ruas de Mênfis.',
      SOURCES.edward, 'Inédita • leitura 2027'
    ),
    question(
      'edward-transformacao', 'portugues', 'Edward Tulane • transformação',
      '<p>Ao comparar o início e o fim da narrativa, qual é a principal transformação de Edward?</p>',
      ['Ele aprende a falar com os seres humanos.', 'Ele deixa de ser um brinquedo e se torna uma pessoa.', 'Ele aprende a amar mesmo depois de sofrer perdas.', 'Ele perde todas as lembranças de Abilene.'], 2,
      'As experiências de amor e perda tornam Edward capaz de se importar profundamente com os outros e de se abrir para amar novamente.',
      SOURCES.edward, 'Inédita • leitura 2027'
    ),
    question(
      'edward-tema', 'portugues', 'Edward Tulane • tema',
      '<p>Qual tema ocupa posição central em <em>A Extraordinária Jornada de Edward Tulane</em>?</p>',
      ['A disputa por riquezas entre famílias.', 'O poder transformador do amor e dos vínculos.', 'A explicação científica para brinquedos falantes.', 'A competição entre crianças e adultos.'], 1,
      'A trajetória mostra como receber amor, perder pessoas queridas e continuar aberto a novos vínculos transforma Edward.',
      SOURCES.edward, 'Inédita • leitura 2027'
    ),
    question(
      'edward-titulo', 'portugues', 'Edward Tulane • interpretação',
      '<p>Por que a palavra “jornada”, presente no título da obra, vai além de uma simples mudança de lugar?</p>',
      ['Porque Edward aprende a dirigir diferentes veículos.', 'Porque a viagem inclui também uma transformação interior do personagem.', 'Porque todos os acontecimentos são apenas um sonho de Abilene.', 'Porque o narrador ensina a desenhar mapas.'], 1,
      'Edward percorre muitos lugares, mas a jornada mais importante é interior: ele passa do orgulho e da indiferença à capacidade de amar.',
      SOURCES.edward, 'Inédita • leitura 2027'
    ),
    question(
      'edward-pellegrina', 'portugues', 'Edward Tulane • função no enredo',
      '<p>Antes da viagem de navio, Pellegrina conta uma história sobre uma princesa que não amava ninguém. No enredo, essa história principalmente:</p>',
      ['antecipa e reforça a necessidade de Edward aprender a amar.', 'explica como Edward foi fabricado em uma oficina.', 'prova que Abilene queria se desfazer do coelho.', 'interrompe definitivamente a viagem da família.'], 0,
      'A história funciona como um aviso: viver sem amar tem consequências. Ela prepara o leitor para a transformação que Edward precisará enfrentar.',
      SOURCES.edward, 'Inédita • leitura 2027'
    ),
    question(
      'edward-narrador', 'portugues', 'Edward Tulane • narrador',
      '<p>Embora Edward não fale como uma pessoa, o leitor conhece seus pensamentos e sentimentos. Esse recurso permite principalmente:</p>',
      ['acompanhar de perto a transformação interior do coelho.', 'confirmar que Abilene narra toda a história em primeira pessoa.', 'transformar a obra em um texto de instruções.', 'eliminar os conflitos da narrativa.'], 0,
      'O acesso aos pensamentos de Edward mostra como sua maneira de ver o mundo e as pessoas muda a cada encontro e perda.',
      SOURCES.edward, 'Inédita • leitura 2027'
    ),
    question(
      'pt-explicita', 'portugues', 'Informação explícita',
      '<div class="reading">Na sexta-feira, a turma plantou três mudas de ipê no pátio. Ana trouxe as pás, enquanto Caio ficou responsável por regar as plantas. A diretora prometeu colocar placas com o nome de cada espécie.</div><p>Quem ficou responsável por regar as plantas?</p>',
      ['A diretora.', 'Ana.', 'Caio.', 'Toda a turma.'], 2,
      'O texto informa diretamente que “Caio ficou responsável por regar as plantas”. Não é necessário deduzir: a informação está explícita.',
      SOURCES.edital
    ),
    question(
      'pt-inferencia', 'portugues', 'Inferência',
      '<div class="reading">Lia abriu a janela e viu as pessoas apressadas, com guarda-chuvas. Antes de sair, voltou ao quarto e pegou sua capa.</div><p>O que se pode concluir?</p>',
      ['Estava chovendo.', 'Lia iria dormir.', 'Era um dia muito quente.', 'A janela estava quebrada.'], 0,
      'Guarda-chuvas abertos, pessoas apressadas e a decisão de pegar uma capa são pistas que permitem inferir que estava chovendo.',
      SOURCES.edital
    ),
    question(
      'pt-tema', 'portugues', 'Tema do texto',
      '<div class="reading">Separar papel, plástico, vidro e metal facilita o reaproveitamento desses materiais. Quando a família organiza o lixo antes da coleta, ajuda a reduzir a quantidade de resíduos enviados aos aterros.</div><p>Qual é o tema principal?</p>',
      ['A fabricação de vidro.', 'A coleta seletiva e sua importância.', 'O trabalho das famílias nos aterros.', 'A compra de objetos de metal.'], 1,
      'Todas as ideias do texto se organizam em torno da separação dos resíduos e dos benefícios da coleta seletiva.',
      SOURCES.edital
    ),
    question(
      'pt-fato-opiniao', 'portugues', 'Fato e opinião',
      '<p>Assinale a frase que expressa uma <strong>opinião</strong>.</p>',
      ['A água congela a 0 °C em condições usuais.', 'O Brasil possui 26 estados e um Distrito Federal.', 'A apresentação da turma foi emocionante.', 'O recreio começou às dez horas.'], 2,
      '“Emocionante” é uma avaliação que pode variar de pessoa para pessoa. As demais frases podem ser verificadas objetivamente.',
      SOURCES.edital
    ),
    question(
      'pt-finalidade', 'portugues', 'Finalidade do texto',
      '<div class="reading"><strong>BOLO DE CANECA</strong><br>1. Misture os ingredientes em uma caneca.<br>2. Leve ao micro-ondas por 90 segundos.<br>3. Espere esfriar antes de servir.</div><p>Qual é a finalidade desse texto?</p>',
      ['Narrar uma aventura.', 'Ensinar um modo de preparo.', 'Divulgar uma notícia.', 'Defender uma opinião.'], 1,
      'A lista ordenada de ações orienta o leitor a preparar algo. Essa é a finalidade típica de uma receita ou texto instrucional.',
      SOURCES.edital
    ),
    question(
      'pt-coesao', 'portugues', 'Coesão textual',
      '<div class="reading">Marina encontrou uma carteira na biblioteca. <strong>Ela</strong> entregou o objeto à funcionária.</div><p>A palavra “Ela” substitui:</p>',
      ['carteira.', 'biblioteca.', 'Marina.', 'funcionária.'], 2,
      'O pronome “Ela” retoma “Marina”, evitando a repetição do nome e mantendo a continuidade do texto.',
      SOURCES.edital
    ),
    question(
      'pt-narrativa', 'portugues', 'Elementos da narrativa',
      '<div class="reading">Ao anoitecer, Pedro percebeu que seu cachorro havia sumido. Procurou pela praça e pelas ruas próximas. Quando já ia voltar, ouviu um latido atrás da padaria e encontrou o animal.</div><p>Qual acontecimento resolve o conflito da narrativa?</p>',
      ['O anoitecer.', 'O sumiço do cachorro.', 'A busca pelas ruas.', 'O encontro do cachorro atrás da padaria.'], 3,
      'O conflito é o desaparecimento do cachorro. Ele se resolve no desfecho, quando Pedro encontra o animal.',
      SOURCES.edital
    ),
    question(
      'pt-causa', 'portugues', 'Causa e consequência',
      '<div class="reading">Como o vento ficou muito forte, a organização adiou a apresentação ao ar livre.</div><p>Qual foi a causa do adiamento?</p>',
      ['A apresentação era curta.', 'O vento ficou muito forte.', 'O público chegou cedo.', 'A organização esqueceu o horário.'], 1,
      'A expressão “como o vento ficou muito forte” apresenta o motivo; o adiamento é a consequência.',
      SOURCES.edital
    ),
    question(
      'pt-conjuncao', 'portugues', 'Relações lógico-discursivas',
      '<p>Na frase “Estudei bastante, <strong>porém</strong> ainda estava nervoso”, a palavra destacada indica:</p>',
      ['oposição.', 'causa.', 'explicação.', 'tempo.'], 0,
      '“Porém” é uma conjunção adversativa: liga ideias que apresentam contraste ou oposição.',
      SOURCES.edital
    ),
    question(
      'pt-humor', 'portugues', 'Efeito de humor',
      '<div class="reading">— Pai, posso ver televisão?<br>— Pode, filho. Só não pode ligar.</div><p>O humor acontece porque:</p>',
      ['o filho não gosta de televisão.', 'o pai entende “ver” de maneira literal.', 'a televisão está quebrada.', 'o filho queria ouvir rádio.'], 1,
      'A expectativa é obter permissão para assistir. O pai explora o sentido literal de “ver” e permite apenas olhar para o aparelho desligado.',
      SOURCES.edital
    ),
    question(
      'pt-silabas', 'portugues', 'Divisão silábica',
      '<p>Qual palavra está dividida corretamente em sílabas?</p>',
      ['sa-ú-de', 's-aú-de', 'saú-de', 'sa-úd-e'], 0,
      'Em “saúde”, as vogais “a” e “ú” formam um hiato e ficam em sílabas separadas: sa-ú-de.',
      SOURCES.abl
    ),
    question(
      'pt-tonica', 'portugues', 'Sílaba tônica',
      '<p>A palavra “médico” é classificada, quanto à posição da sílaba tônica, como:</p>',
      ['oxítona.', 'paroxítona.', 'proparoxítona.', 'monossílabo tônico.'], 2,
      'A sílaba mais forte é “mé”, a antepenúltima: mé-di-co. Por isso, a palavra é proparoxítona.',
      SOURCES.abl
    ),
    question(
      'pt-acentuacao', 'portugues', 'Acentuação gráfica',
      '<p>Qual alternativa apresenta apenas palavras corretamente acentuadas?</p>',
      ['lâmpada, ônibus, médico.', 'lampada, ônibus, médico.', 'lâmpada, onibus, medico.', 'lâmpada, ônibús, médico.'], 0,
      '“Lâmpada”, “ônibus” e “médico” são proparoxítonas, e todas as proparoxítonas recebem acento gráfico.',
      SOURCES.abl
    ),
    question(
      'pt-vocativo', 'portugues', 'Pontuação',
      '<p>Em qual frase a vírgula separa corretamente um vocativo?</p>',
      ['Lucas traga, seu caderno.', 'Lucas, traga seu caderno.', 'Lucas traga seu, caderno.', 'Lucas traga seu caderno,'], 1,
      '“Lucas” é o termo usado para chamar o interlocutor. O vocativo deve ser isolado por vírgula: “Lucas, traga seu caderno.”',
      SOURCES.edital
    ),
    question(
      'pt-adjetivo', 'portugues', 'Classes de palavras',
      '<p>Na frase “A menina curiosa abriu o antigo baú”, quais palavras são adjetivos?</p>',
      ['menina e baú.', 'curiosa e antigo.', 'abriu e antigo.', 'a e o.'], 1,
      '“Curiosa” caracteriza a menina e “antigo” caracteriza o baú; portanto, as duas palavras são adjetivos.',
      SOURCES.edital
    ),
    question(
      'pt-adverbio', 'portugues', 'Advérbio',
      '<p>Na frase “A equipe chegou <strong>ontem</strong>”, a palavra destacada indica circunstância de:</p>',
      ['lugar.', 'modo.', 'tempo.', 'intensidade.'], 2,
      '“Ontem” situa a ação no tempo e, por isso, funciona como advérbio de tempo.',
      SOURCES.edital
    ),
    question(
      'pt-sujeito', 'portugues', 'Sujeito e predicado',
      '<p>Na oração “Os pássaros construíram um ninho”, o sujeito é:</p>',
      ['construíram.', 'um ninho.', 'construíram um ninho.', 'Os pássaros.'], 3,
      'O verbo “construíram” se refere a quem praticou a ação: “Os pássaros”. Esse termo é o sujeito.',
      SOURCES.edital
    ),
    question(
      'pt-antonimo', 'portugues', 'Antônimos',
      '<p>Qual palavra é antônima de “generoso”?</p>',
      ['bondoso.', 'egoísta.', 'solidário.', 'gentil.'], 1,
      '“Generoso” descreve quem compartilha ou dá com facilidade. “Egoísta” expressa a ideia oposta.',
      SOURCES.edital
    ),
    question(
      'pt-norma', 'portugues', 'Norma-padrão',
      '<p>Qual frase está de acordo com a norma-padrão?</p>',
      ['As criança brincou no pátio.', 'A gente fomos ao museu.', 'Os alunos fizeram a pesquisa.', 'Nós vai terminar amanhã.'], 2,
      'Em “Os alunos fizeram a pesquisa”, sujeito e verbo concordam no plural. Nas demais, seria necessário usar “crianças brincaram”, “a gente foi” e “nós vamos”.',
      SOURCES.edital
    ),
    question(
      'pt-variedade', 'portugues', 'Variedades linguísticas',
      '<p>Em uma história, um personagem diz: “Ocê vai na festa?”. Essa forma de falar:</p>',
      ['não possui significado.', 'é uma variedade linguística e pode caracterizar o personagem.', 'deve ser usada em qualquer texto formal.', 'prova que o personagem não sabe se comunicar.'], 1,
      'A língua varia conforme região, grupo e situação. Em uma narrativa, “ocê” pode representar uma variedade oral. Isso não impede a comunicação, embora textos formais peçam a norma-padrão.',
      SOURCES.edital
    ),
    question(
      'pt-predicado', 'portugues', 'Sujeito e predicado',
      '<p>Na oração “A chuva forte alagou a rua”, qual é o predicado?</p>',
      ['A chuva forte.', 'chuva forte.', 'alagou a rua.', 'a rua.'], 2,
      'O sujeito é “A chuva forte”. Tudo o que se declara sobre ele — “alagou a rua” — forma o predicado.',
      SOURCES.edital
    ),
    question(
      'pt-pronome', 'portugues', 'Pronomes',
      '<p>Qual palavra é um pronome na frase “Ela trouxe dois livros novos”?</p>',
      ['Ela.', 'trouxe.', 'livros.', 'novos.'], 0,
      '“Ela” substitui ou acompanha um nome e indica a pessoa de quem se fala; é um pronome pessoal.',
      SOURCES.edital
    ),
    question(
      'pt-pontuacao', 'portugues', 'Pontuação',
      '<p>Qual sinal deve completar a frase “Que surpresa incrível__”?</p>',
      ['Ponto de interrogação (?).', 'Ponto de exclamação (!).', 'Dois-pontos (:).', 'Ponto e vírgula (;).'], 1,
      'A frase expressa admiração e surpresa; o ponto de exclamação é o sinal adequado para marcar essa entonação.',
      SOURCES.edital
    )
  ];

  const matematicaStatic = [
    question(
      'of25-m16', 'matematica', 'Volume e capacidade',
      '<p>Uma caixa-d’água em forma de paralelepípedo mede 75 cm × 80 cm × 120 cm. Sabendo que 1 litro = 1.000 cm³, qual é o número mínimo de garrafas de 1,5 litro necessário para enchê-la?</p>',
      ['480 garrafas.', '400 garrafas.', '275 garrafas.', '183 garrafas.'], 0,
      'O volume é 75 × 80 × 120 = 720.000 cm³, ou 720 litros. Dividindo 720 por 1,5, obtemos 480 garrafas.',
      SOURCES.cpm2025, 'Oficial CPM 2025 • questão 16'
    ),
    question(
      'of25-m17', 'matematica', 'Mínimo múltiplo comum',
      '<p>Três satélites se aproximam da Terra a cada 20, 24 e 28 anos. Se o último ano em que todos estiveram próximos foi 1990, quando isso ocorrerá novamente?</p>',
      ['2158.', '2200.', '2410.', '2830.'], 3,
      'MMC(20, 24, 28) = 840. Portanto, a coincidência se repete 840 anos depois: 1990 + 840 = 2830.',
      SOURCES.cpm2025, 'Oficial CPM 2025 • questão 17'
    ),
    question(
      'of25-m18', 'matematica', 'Medidas de capacidade',
      '<p>Uma escola oferecerá 700 mL de suco para cada um de seus 150 alunos. Quanto suco deverá comprar?</p>',
      ['1.050 litros.', '105 litros.', '105 m³.', '105 cm³.'], 1,
      '150 × 700 mL = 105.000 mL. Como 1.000 mL correspondem a 1 litro, são necessários 105 litros.',
      SOURCES.cpm2025, 'Oficial CPM 2025 • questão 18'
    ),
    question(
      'of25-m21', 'matematica', 'Volume',
      '<p>Uma piscina para adultos mede 100 dm de comprimento, 60 dm de largura e 1,5 m de profundidade. Outra, infantil, mede 1,2 dam de comprimento, 0,6 dam de largura e 0,5 m de profundidade. É correto afirmar que:</p>',
      ['a piscina adulta possui 60.000 dm³.', 'a infantil possui 0,018 dam³.', 'a adulta possui duas vezes e meia a capacidade da infantil.', 'a infantil possui exatamente 20% da capacidade da adulta.'], 2,
      'Convertendo para metros: adulta = 10 × 6 × 1,5 = 90 m³; infantil = 12 × 6 × 0,5 = 36 m³. Como 90 ÷ 36 = 2,5, a adulta tem duas vezes e meia a capacidade da infantil.',
      SOURCES.cpm2025, 'Oficial CPM 2025 • questão 21'
    ),
    question(
      'of25-m22', 'matematica', 'Porcentagem e dinheiro',
      '<p>Um tanque comporta 44 litros e está com 25% de sua capacidade. Se o litro do combustível custa R$ 6,95, quanto será pago para completar o tanque?</p>',
      ['R$ 305,80.', 'R$ 229,35.', 'R$ 152,90.', 'R$ 76,45.'], 1,
      'Faltam 75% de 44 litros: 0,75 × 44 = 33 litros. O custo é 33 × R$ 6,95 = R$ 229,35.',
      SOURCES.cpm2025, 'Oficial CPM 2025 • questão 22'
    ),
    question(
      'of25-m24', 'matematica', 'Mínimo múltiplo comum',
      '<p>João completa uma volta em 1 min 30 s, Pedro em 2 min e Caio em 2 min 30 s. Largando juntos e mantendo o ritmo, depois de quantos minutos voltarão a se encontrar na largada?</p>',
      ['30 minutos.', '90 minutos.', '120 minutos.', '150 minutos.'], 0,
      'Os tempos são 90, 120 e 150 segundos. O MMC é 1.800 segundos, que corresponde a 30 minutos.',
      SOURCES.cpm2025, 'Oficial CPM 2025 • questão 24'
    )
  ];

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffledOptions(correctText, distractors) {
    const all = [correctText, ...distractors].map((text, index) => ({ text, right: index === 0 }));
    for (let i = all.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return { options: all.map((item) => item.text), correct: all.findIndex((item) => item.right) };
  }

  const matematicaGenerators = [
    () => {
      const caixas = randInt(6, 12);
      const porCaixa = randInt(18, 32);
      const vendidos = randInt(24, 60);
      const total = caixas * porCaixa;
      const answer = total - vendidos;
      const o = shuffledOptions(String(answer), [String(answer + porCaixa), String(total + vendidos), String(Math.abs(answer - caixas))]);
      return question(`mat-op-${Date.now()}-${caixas}`, 'matematica', 'Operações com naturais',
        `<p>Uma papelaria recebeu ${caixas} caixas com ${porCaixa} cadernos em cada uma. Depois, vendeu ${vendidos} cadernos. Quantos cadernos restaram?</p>`,
        o.options, o.correct,
        `Primeiro calculamos o total: ${caixas} × ${porCaixa} = ${total}. Depois tiramos os ${vendidos} vendidos: ${total} − ${vendidos} = ${answer}.`, SOURCES.khan);
    },
    () => {
      const a = randInt(5, 12);
      const b = randInt(3, 9);
      const c = randInt(2, 6);
      const d = randInt(2, Math.min(13, a + b * c - 1));
      const answer = a + b * c - d;
      const o = shuffledOptions(String(answer), [String((a + b) * c - d), String(a + b * (c - d)), String(answer - 1)]);
      return question(`mat-expr-${Date.now()}-${a}`, 'matematica', 'Expressões numéricas',
        `<p>Qual é o valor de ${a} + ${b} × ${c} − ${d}?</p>`, o.options, o.correct,
        `A multiplicação vem antes da adição e da subtração: ${b} × ${c} = ${b * c}. Assim, ${a} + ${b * c} − ${d} = ${answer}.`, SOURCES.khan);
    },
    () => {
      const sets = [[6, 8], [8, 12], [9, 12], [10, 15], [12, 18]];
      const [a, b] = sets[randInt(0, sets.length - 1)];
      const gcd = (x, y) => (y ? gcd(y, x % y) : x);
      const answer = (a * b) / gcd(a, b);
      const o = shuffledOptions(String(answer), [String(a * b), String(gcd(a, b)), String(answer + a)]);
      return question(`mat-mmc-${Date.now()}-${a}`, 'matematica', 'Mínimo múltiplo comum',
        `<p>Dois sinais piscam a cada ${a} e ${b} segundos. Se piscaram juntos agora, após quantos segundos piscarão juntos novamente?</p>`, o.options, o.correct,
        `Precisamos do menor múltiplo comum de ${a} e ${b}. O MMC é ${answer}, então essa é a primeira nova coincidência.`, SOURCES.khan);
    },
    () => {
      const sets = [[24, 36], [30, 45], [36, 48], [42, 56], [54, 72]];
      const [a, b] = sets[randInt(0, sets.length - 1)];
      const gcd = (x, y) => (y ? gcd(y, x % y) : x);
      const answer = gcd(a, b);
      const o = shuffledOptions(String(answer), [String(answer / 2), String(a + b), String(Math.min(a, b))]);
      return question(`mat-mdc-${Date.now()}-${a}`, 'matematica', 'Máximo divisor comum',
        `<p>${a} lápis azuis e ${b} lápis vermelhos serão distribuídos em grupos iguais, sem sobrar nenhum e com a maior quantidade possível de grupos. Quantos grupos serão formados?</p>`, o.options, o.correct,
        `O número de grupos deve dividir ${a} e ${b} e ser o maior possível. O MDC(${a}, ${b}) é ${answer}.`, SOURCES.khan);
    },
    () => {
      const num = randInt(2, 5);
      const den = randInt(num + 2, 10);
      const factor = randInt(2, 5);
      const correctText = `${num * factor}/${den * factor}`;
      const o = shuffledOptions(correctText, [`${num + factor}/${den + factor}`, `${num * factor}/${den}`, `${num}/${den * factor}`]);
      return question(`mat-frac-eq-${Date.now()}-${num}`, 'matematica', 'Frações equivalentes',
        `<p>Qual fração é equivalente a ${num}/${den}?</p>`, o.options, o.correct,
        `Multiplicando numerador e denominador pelo mesmo número (${factor}), obtemos ${num * factor}/${den * factor}. O valor da fração não muda.`, SOURCES.khan);
    },
    () => {
      const den = [6, 8, 10, 12][randInt(0, 3)];
      const a = randInt(1, Math.floor(den / 2));
      const b = randInt(1, Math.floor(den / 2));
      const answer = a + b;
      const o = shuffledOptions(`${answer}/${den}`, [`${answer + 1}/${den}`, `${answer}/${den + 1}`, `${Math.max(1, answer - 1)}/${den}`]);
      return question(`mat-frac-add-${Date.now()}-${den}`, 'matematica', 'Adição de frações',
        `<p>Qual é o resultado de ${a}/${den} + ${b}/${den}?</p>`, o.options, o.correct,
        `Como os denominadores são iguais, somamos os numeradores e conservamos o denominador: ${a} + ${b} = ${answer}, portanto ${answer}/${den}.`, SOURCES.khan);
    },
    () => {
      const price = [80, 120, 160, 200, 240][randInt(0, 4)];
      const pct = [10, 15, 20, 25][randInt(0, 3)];
      const answer = price * pct / 100;
      const o = shuffledOptions(`R$ ${answer.toFixed(2).replace('.', ',')}`, [`R$ ${(price - answer).toFixed(2).replace('.', ',')}`, `R$ ${(answer + 10).toFixed(2).replace('.', ',')}`, `R$ ${(price * pct / 10).toFixed(2).replace('.', ',')}`]);
      return question(`mat-pct-${Date.now()}-${price}`, 'matematica', 'Porcentagem',
        `<p>Uma mochila custa R$ ${price.toFixed(2).replace('.', ',')} e recebeu desconto de ${pct}%. Qual foi o valor do desconto?</p>`, o.options, o.correct,
        `${pct}% de ${price} = ${pct}/100 × ${price} = ${answer}. Portanto, o desconto foi de R$ ${answer.toFixed(2).replace('.', ',')}.`, SOURCES.khan);
    },
    () => {
      const width = randInt(4, 9);
      const height = randInt(3, 8);
      const answer = width * height;
      const o = shuffledOptions(`${answer} m²`, [`${answer + 1} m²`, `${answer + width} m²`, `${answer * 2} m²`]);
      return question(`mat-area-${Date.now()}-${width}`, 'matematica', 'Área de figuras planas',
        `<p>Um jardim retangular mede ${width} m de comprimento e ${height} m de largura. Qual é sua área?</p>`, o.options, o.correct,
        `A área de um retângulo é comprimento × largura: ${width} × ${height} = ${answer} m².`, SOURCES.khan);
    },
    () => {
      const width = randInt(5, 12);
      const height = randInt(3, 9);
      const answer = 2 * (width + height);
      const o = shuffledOptions(`${answer} m`, [`${answer + 1} m`, `${answer + width} m`, `${answer * 2} m`]);
      return question(`mat-perim-${Date.now()}-${width}`, 'matematica', 'Perímetro',
        `<p>Uma quadra retangular mede ${width} m por ${height} m. Quantos metros de cerca são necessários para contornar toda a quadra?</p>`, o.options, o.correct,
        `Somamos os quatro lados: ${width} + ${height} + ${width} + ${height} = ${answer} m.`, SOURCES.khan);
    },
    () => {
      const h = randInt(1, 4);
      const min = randInt(10, 50);
      const answer = h * 60 + min;
      const o = shuffledOptions(`${answer} minutos`, [`${h * 100 + min} minutos`, `${answer - 60} minutos`, `${answer + 60} minutos`]);
      return question(`mat-time-${Date.now()}-${h}`, 'matematica', 'Medidas de tempo',
        `<p>Uma atividade durou ${h} h e ${min} min. Qual foi a duração total em minutos?</p>`, o.options, o.correct,
        `${h} hora(s) correspondem a ${h * 60} minutos. Somando ${min}, temos ${h * 60} + ${min} = ${answer} minutos.`, SOURCES.khan);
    },
    () => {
      const values = Array.from({ length: 5 }, () => randInt(8, 35));
      const answer = values.reduce((a, b) => a + b, 0);
      const o = shuffledOptions(String(answer), [String(Math.max(...values)), String(answer - values[0]), String(answer + 10)]);
      return question(`mat-table-${Date.now()}`, 'matematica', 'Tabelas',
        `<p>Uma biblioteca registrou os empréstimos da semana:</p><div class="data-table">${values.map((value, i) => `<span>${['Seg', 'Ter', 'Qua', 'Qui', 'Sex'][i]}<br><b>${value}</b></span>`).join('')}</div><p>Quantos livros foram emprestados ao todo?</p>`, o.options, o.correct,
        `Somamos os cinco valores: ${values.join(' + ')} = ${answer}.`, SOURCES.khan);
    },
    () => {
      const a = randInt(2, 7);
      const b = randInt(2, 6);
      const c = randInt(2, 5);
      const answer = a * b * c;
      const o = shuffledOptions(`${answer} cm³`, [`${answer + 1} cm³`, `${answer + a} cm³`, `${answer * 2} cm³`]);
      return question(`mat-volume-${Date.now()}-${a}`, 'matematica', 'Volume de paralelepípedo',
        `<p>Uma caixa mede ${a} cm de comprimento, ${b} cm de largura e ${c} cm de altura. Qual é o volume?</p>`, o.options, o.correct,
        `Volume = comprimento × largura × altura: ${a} × ${b} × ${c} = ${answer} cm³.`, SOURCES.khan);
    }
  ];

  const ciencias = [
    question('of25-c26', 'ciencias', 'Sistemas respiratório e imunológico',
      '<p>Analise as afirmações:</p><div class="reading">I. O sistema respiratório permite a entrada e a saída de ar e pode ser porta de entrada de vírus.<br>II. O sistema imunológico utiliza anticorpos e células de defesa contra invasores.<br>III. O muco do nariz participa da defesa do sistema respiratório.</div><p>Quais estão corretas?</p>',
      ['I, II e III.', 'Apenas I e II.', 'Apenas I e III.', 'Apenas II e III.'], 0,
      'As três afirmações estão corretas: há troca de ar pelo sistema respiratório, atuação de células e anticorpos na defesa, e o muco ajuda a reter partículas e microrganismos.', SOURCES.saude, 'Oficial CPM 2025 • questão 26'),
    question('of25-c27', 'ciencias', 'Plantas e cadeia alimentar',
      '<p>Qual processo realizado pelas plantas está corretamente descrito quanto à sua função na natureza?</p>',
      ['Decomposição de material inorgânico.', 'Transpiração que produz gás oxigênio.', 'Produção de gás carbônico que reduz mudanças climáticas.', 'Fotossíntese, que torna as plantas a base de muitas cadeias alimentares.'], 3,
      'Na fotossíntese, as plantas produzem matéria orgânica usando luz, água e gás carbônico. Por serem produtoras, iniciam muitas cadeias alimentares.', SOURCES.cpm2025, 'Oficial CPM 2025 • questão 27'),
    question('of25-c28', 'ciencias', 'Sistema Solar',
      '<p>Marque V ou F:</p><div class="reading">( ) Saturno possui anéis formados por fragmentos de gelo e rocha.<br>( ) Vênus é o planeta mais frio por estar muito distante do Sol.<br>( ) A gravidade de Júpiter pode alterar trajetórias de asteroides e cometas.<br>( ) Netuno é o segundo planeta mais próximo do Sol e é rochoso.</div>',
      ['V – F – V – F.', 'F – V – V – F.', 'V – F – F – V.', 'F – V – F – V.'], 0,
      'Saturno realmente tem anéis de gelo e rocha; Vênus é muito quente e próximo do Sol; Júpiter exerce forte influência gravitacional; Netuno é o planeta mais distante do Sol e é um gigante gelado.', SOURCES.nasa, 'Oficial CPM 2025 • questão 28'),
    question('of25-c29', 'ciencias', 'Sistema digestório',
      '<p>Qual associação entre órgão, produção e função está correta?</p>',
      ['Estômago — libera bile e suco pancreático.', 'Pâncreas — produz enzimas que ajudam a digerir proteínas e gorduras e libera bicarbonato que reduz a acidez do quimo.', 'Glândulas salivares — produzem ácido clorídrico.', 'Intestino grosso — realiza a maior parte da digestão de carboidratos.'], 1,
      'O pâncreas libera enzimas digestivas e bicarbonato no intestino delgado. A bile é produzida pelo fígado; o ácido clorídrico, pelo estômago; o intestino grosso absorve principalmente água e sais.', SOURCES.cpm2025, 'Oficial CPM 2025 • questão 29'),
    question('ci-sol', 'ciencias', 'Sistema Solar',
      '<p>Qual afirmação sobre o Sistema Solar está correta?</p>',
      ['O Sol é um planeta.', 'A Terra é o planeta mais próximo do Sol.', 'Oito planetas orbitam o Sol.', 'A Lua é uma estrela.'], 2,
      'O Sistema Solar possui oito planetas. O Sol é uma estrela; Mercúrio é o planeta mais próximo dele; e a Lua é o satélite natural da Terra.', SOURCES.nasa),
    question('ci-fotossintese', 'ciencias', 'Plantas',
      '<p>Na fotossíntese, a planta utiliza principalmente:</p>',
      ['luz, água e gás carbônico.', 'oxigênio, solo e animais.', 'apenas água.', 'apenas luz e oxigênio.'], 0,
      'A planta usa energia luminosa, água e gás carbônico para produzir açúcares, liberando oxigênio no processo.', SOURCES.edital),
    question('ci-cadeia', 'ciencias', 'Cadeia alimentar',
      '<p>Na cadeia “capim → gafanhoto → sapo → cobra”, qual ser é produtor?</p>',
      ['Capim.', 'Gafanhoto.', 'Sapo.', 'Cobra.'], 0,
      'O capim produz seu próprio alimento pela fotossíntese. Os demais organismos obtêm energia consumindo outros seres vivos.', SOURCES.edital),
    question('ci-vertebrado', 'ciencias', 'Animais',
      '<p>Qual dos animais abaixo é invertebrado?</p>',
      ['Sapo.', 'Minhoca.', 'Peixe.', 'Lagarto.'], 1,
      'A minhoca não possui coluna vertebral, por isso é invertebrada. Sapo, peixe e lagarto são vertebrados.', SOURCES.edital),
    question('ci-raiz', 'ciencias', 'Partes das plantas',
      '<p>Qual é uma função importante da raiz?</p>',
      ['Produzir sementes.', 'Absorver água e sais minerais do solo.', 'Realizar a polinização.', 'Atrair animais com pétalas.'], 1,
      'A raiz fixa a planta e absorve água e sais minerais do solo. Flores e frutos estão mais diretamente ligados à reprodução.', SOURCES.edital),
    question('ci-organizacao', 'ciencias', 'Corpo humano',
      '<p>Qual sequência vai do menor para o maior nível de organização do corpo humano?</p>',
      ['Órgão → célula → tecido → sistema.', 'Célula → tecido → órgão → sistema.', 'Tecido → sistema → célula → órgão.', 'Sistema → órgão → tecido → célula.'], 1,
      'Células semelhantes formam tecidos; tecidos formam órgãos; órgãos que atuam juntos formam sistemas.', SOURCES.edital),
    question('ci-vacina', 'ciencias', 'Vacinação',
      '<p>De modo geral, a vacinação ajuda o organismo porque:</p>',
      ['substitui todos os hábitos de higiene.', 'estimula uma resposta de defesa e memória imunológica.', 'elimina qualquer doença imediatamente.', 'impede o corpo de produzir anticorpos.'], 1,
      'Vacinas apresentam ao sistema imune um antígeno seguro ou instruções para reconhecê-lo, estimulando defesa específica e memória imunológica. Elas não substituem higiene e saneamento.', SOURCES.saude),
    question('ci-saneamento', 'ciencias', 'Saneamento básico',
      '<p>Qual ação faz parte do saneamento básico e ajuda a prevenir doenças?</p>',
      ['Lançar esgoto diretamente nos rios.', 'Tratar a água antes da distribuição.', 'Acumular lixo em terrenos vazios.', 'Beber água sem conhecer a procedência.'], 1,
      'O tratamento da água reduz microrganismos e contaminantes. Esgoto e lixo sem manejo adequado favorecem contaminação e vetores.', SOURCES.edital),
    question('ci-respiracao', 'ciencias', 'Sistema respiratório',
      '<p>Durante a inspiração:</p>',
      ['o ar entra no corpo e chega aos pulmões.', 'o sangue deixa de circular.', 'o estômago produz oxigênio.', 'o gás carbônico entra nas células para alimentá-las.'], 0,
      'Na inspiração, o ar entra pelas vias respiratórias e chega aos pulmões, onde ocorre a troca de gases com o sangue.', SOURCES.edital),
    question('ci-ambiente', 'ciencias', 'Problemas ambientais',
      '<p>Qual atitude contribui para proteger rios e solos?</p>',
      ['Descartar óleo de cozinha na pia.', 'Jogar pilhas no lixo comum.', 'Entregar óleo usado e pilhas em pontos de coleta adequados.', 'Queimar resíduos no quintal.'], 2,
      'Óleo e pilhas exigem destinação adequada, pois podem contaminar água e solo. Pontos de coleta encaminham esses resíduos para tratamento ou reciclagem.', SOURCES.edital)
  ];

  const geografia = [
    question('of25-g30', 'geografia', 'Urbanização',
      '<p>Como se chama o processo caracterizado pelo crescimento das cidades e pela expansão da área urbana sobre áreas antes rurais?</p>',
      ['Urbanização.', 'Êxodo urbano.', 'Metropolização.', 'Crescimento natural.'], 0,
      'Urbanização é o crescimento da população urbana e das áreas ocupadas pelas cidades. “Êxodo rural” é o deslocamento do campo para a cidade.', SOURCES.cpm2025, 'Oficial CPM 2025 • questão 30'),
    question('of25-g31', 'geografia', 'Regiões do Brasil',
      '<p>Sobre os estados brasileiros e suas regiões, assinale a alternativa correta.</p>',
      ['Piauí fica na Região Norte.', 'Amazonas fica na Região Norte e é o maior estado brasileiro em área.', 'Pernambuco fica na Região Norte.', 'Amapá pertence à Região Nordeste.'], 1,
      'O Amazonas integra a Região Norte e é a maior Unidade da Federação em área. Piauí e Pernambuco estão no Nordeste; Amapá, no Norte.', SOURCES.ibge, 'Oficial CPM 2025 • questão 31'),
    question('of25-g32', 'geografia', 'Coordenadas geográficas',
      '<p>Sobre as coordenadas geográficas, é correto afirmar que:</p>',
      ['latitude é medida a partir do Meridiano de Greenwich.', 'longitude é representada por paralelos.', 'latitude é medida em graus a partir da Linha do Equador e representada por paralelos.', 'meridianos indicam latitude.'], 2,
      'A latitude mede a distância ao norte ou ao sul da Linha do Equador e é indicada por paralelos. A longitude usa os meridianos e tem Greenwich como referência.', SOURCES.ibgeMapas, 'Oficial CPM 2025 • questão 32'),
    question('geo-sul', 'geografia', 'Região Sul',
      '<p>Quais estados formam a Região Sul do Brasil?</p>',
      ['Paraná, Santa Catarina e Rio Grande do Sul.', 'São Paulo, Paraná e Santa Catarina.', 'Paraná, Mato Grosso do Sul e Rio Grande do Sul.', 'Santa Catarina, São Paulo e Minas Gerais.'], 0,
      'A Região Sul é composta por Paraná (PR), Santa Catarina (SC) e Rio Grande do Sul (RS).', SOURCES.ibge),
    question('geo-capital', 'geografia', 'Paraná',
      '<p>Qual é a capital do estado do Paraná?</p>',
      ['Londrina.', 'Maringá.', 'Curitiba.', 'Cascavel.'], 2,
      'Curitiba é a capital do Paraná. Londrina, Maringá e Cascavel são municípios paranaenses importantes, mas não são a capital.', SOURCES.ibge),
    question('geo-regioes', 'geografia', 'Divisão regional',
      '<p>Em quantas Grandes Regiões o território brasileiro é dividido pelo IBGE?</p>',
      ['Três.', 'Quatro.', 'Cinco.', 'Seis.'], 2,
      'O Brasil é dividido em cinco Grandes Regiões: Norte, Nordeste, Centro-Oeste, Sudeste e Sul.', SOURCES.ibge),
    question('geo-uf', 'geografia', 'Organização político-administrativa',
      '<p>O Brasil é formado por:</p>',
      ['25 estados e um Distrito Federal.', '26 estados e um Distrito Federal.', '27 estados e dois Distritos Federais.', '26 estados, sem Distrito Federal.'], 1,
      'A Federação brasileira possui 26 estados e o Distrito Federal, totalizando 27 Unidades da Federação.', SOURCES.ibge),
    question('geo-clima', 'geografia', 'Clima',
      '<p>Qual característica climática se destaca na Região Sul em comparação com grande parte do Brasil?</p>',
      ['Predomínio de clima mais frio, com estações mais marcadas.', 'Ausência completa de chuvas.', 'Calor constante em todos os meses.', 'Clima polar em todo o território.'], 0,
      'A Região Sul é a mais fria do país e nela predomina o clima subtropical/temperado, com estações mais marcadas. Isso não significa clima polar nem ausência de chuvas.', SOURCES.ibgeClima),
    question('geo-relevo', 'geografia', 'Relevo',
      '<p>As áreas relativamente planas formadas principalmente pela deposição de sedimentos são chamadas de:</p>',
      ['planaltos.', 'planícies.', 'serras.', 'chapadas.'], 1,
      'Planícies são áreas onde predomina a deposição de sedimentos. Nos planaltos, em geral, o desgaste do relevo é mais importante.', SOURCES.ibgeClima),
    question('geo-legenda', 'geografia', 'Cartografia',
      '<p>Em um mapa, para que serve a legenda?</p>',
      ['Para indicar somente o título.', 'Para explicar o significado de cores e símbolos.', 'Para aumentar a área representada.', 'Para definir o clima de todos os lugares.'], 1,
      'A legenda permite interpretar os símbolos, cores e padrões usados para representar informações no mapa.', SOURCES.ibgeMapas)
  ];

  const historia = [
    question('of25-h33', 'historia', 'Período pré-colonial',
      '<p>Marque V ou F:</p><div class="reading">( ) A expansão colonial europeia foi sustentada apenas por trabalho livre e assalariado.<br>( ) Escambo é uma troca de mercadorias sem uso de dinheiro.<br>( ) Na extração inicial do pau-brasil, os portugueses evitaram o trabalho indígena.<br>( ) O pau-brasil atraiu o interesse de outras nações europeias.</div>',
      ['V – V – F – V.', 'F – V – F – V.', 'V – F – V – F.', 'F – F – V – V.'], 1,
      'A colonização utilizou intensamente trabalho escravizado; o escambo foi usado com povos indígenas; indígenas participaram da extração do pau-brasil; e outros europeus também se interessaram pelo produto.', SOURCES.cpm2025, 'Oficial CPM 2025 • questão 33'),
    question('of25-h34', 'historia', 'Revoltas nativistas',
      '<p>A Guerra dos Mascates, no início do século XVIII, foi:</p>',
      ['motivada apenas pelos impostos do ouro.', 'vencida pelos fazendeiros contra a Coroa.', 'uma revolta separatista para tornar Pernambuco independente.', 'um conflito nativista por disputas políticas e econômicas entre senhores de engenho de Olinda e comerciantes de Recife.'], 3,
      'A Guerra dos Mascates envolveu a elite açucareira de Olinda e comerciantes de Recife, chamados de mascates. Foi um conflito nativista, não separatista.', SOURCES.cpm2025, 'Oficial CPM 2025 • questão 34'),
    question('of25-h35', 'historia', 'Primeiro Reinado',
      '<p>Sobre o Primeiro Reinado, marque V ou F:</p><div class="reading">( ) A abdicação de D. Pedro I abriu caminho para o Período Regencial.<br>( ) D. Pedro I teve apoio político sem oposição durante todo o governo.<br>( ) A Constituição de 1824 eliminou o poder do imperador.<br>( ) D. Pedro I manteve o Brasil como parte do Reino Unido de Portugal.</div>',
      ['F – V – F – F.', 'V – F – F – F.', 'V – V – V – F.', 'F – V – F – V.'], 1,
      'Somente a primeira afirmação é verdadeira. Houve forte oposição a D. Pedro I; a Constituição de 1824 criou o Poder Moderador; e o Brasil já era independente.', SOURCES.cpm2025, 'Oficial CPM 2025 • questão 35'),
    question('hist-tupis', 'historia', 'Povos indígenas',
      '<p>Quando os portugueses chegaram ao território que hoje é o Brasil, muitos povos de língua tupi viviam:</p>',
      ['principalmente em áreas próximas ao litoral atlântico.', 'somente nas Cordilheiras dos Andes.', 'apenas no atual território mexicano.', 'exclusivamente no extremo sul da Argentina.'], 0,
      'Diversos povos de língua tupi ocupavam extensas áreas do litoral atlântico no início do século XVI. O território também era habitado por muitos outros povos indígenas.', SOURCES.edital),
    question('hist-escambo', 'historia', 'Período pré-colonial',
      '<p>No início da exploração do pau-brasil, “escambo” era:</p>',
      ['a cobrança de um imposto.', 'a troca de produtos e trabalho sem uso de moeda.', 'uma guerra entre capitanias.', 'a viagem da Corte portuguesa.'], 1,
      'No escambo, portugueses ofereciam objetos em troca de trabalho e produtos, sem pagamento em dinheiro.', SOURCES.edital),
    question('hist-capitanias', 'historia', 'Capitanias hereditárias',
      '<p>As capitanias hereditárias foram criadas pela Coroa portuguesa com o objetivo de:</p>',
      ['dividir e administrar a colonização do território.', 'declarar a Independência do Brasil.', 'abolir a escravidão.', 'transferir a capital para Brasília.'], 0,
      'Portugal dividiu parte do território em grandes faixas entregues a donatários para incentivar ocupação, defesa e exploração colonial.', SOURCES.edital),
    question('hist-governo-geral', 'historia', 'Governo-geral',
      '<p>A criação do governo-geral, em 1548, buscava principalmente:</p>',
      ['centralizar a administração colonial.', 'encerrar a colonização portuguesa.', 'proclamar a República.', 'substituir Portugal pela França.'], 0,
      'Diante das dificuldades das capitanias, o governo-geral foi criado para coordenar e centralizar a administração da colônia.', SOURCES.edital),
    question('hist-familia-real', 'historia', 'Período Joanino',
      '<p>A família real portuguesa transferiu-se para o Brasil em 1808 principalmente porque:</p>',
      ['Portugal sofria a ameaça das tropas de Napoleão.', 'o Brasil já era uma república.', 'a escravidão havia acabado em Portugal.', 'D. Pedro I havia abdicado.'], 0,
      'Portugal foi pressionado pelo Bloqueio Continental e ameaçado pelas forças napoleônicas. Sob proteção britânica, a Corte transferiu-se para o Brasil.', SOURCES.camaraColonia),
    question('hist-independencia', 'historia', 'Independência',
      '<p>Em que ano foi proclamada a Independência do Brasil?</p>',
      ['1500.', '1808.', '1822.', '1889.'], 2,
      'A Independência foi proclamada em 1822. O processo se relaciona às transformações iniciadas com a chegada da Corte em 1808.', SOURCES.camaraIndependencia),
    question('hist-regencia', 'historia', 'Período Regencial',
      '<p>O Período Regencial começou após:</p>',
      ['a chegada de Cabral.', 'a abdicação de D. Pedro I, em 1831.', 'a assinatura da Lei Áurea.', 'a Proclamação da República.'], 1,
      'D. Pedro I abdicou em 1831. Como D. Pedro II ainda era criança, o país passou a ser governado por regentes.', SOURCES.edital),
    question('hist-aurea', 'historia', 'Segundo Reinado',
      '<p>O que a Lei Áurea, de 13 de maio de 1888, determinou oficialmente?</p>',
      ['A Independência do Brasil.', 'O início do Período Regencial.', 'A extinção da escravidão no Brasil.', 'A criação das capitanias hereditárias.'], 2,
      'O artigo 1º da Lei nº 3.353 declarou extinta a escravidão no Brasil. A lei foi sancionada pela princesa Isabel.', SOURCES.leiAurea)
  ];

  function buildQuestionBank() {
    const bank = {
      portugues: portugues.map((q) => ({ ...q })),
      matematica: [...matematicaStatic.map((q) => ({ ...q })), ...Array.from({ length: 8 }, () => matematicaGenerators.map((make) => make())).flat()],
      ciencias: ciencias.map((q) => ({ ...q })),
      geografia: geografia.map((q) => ({ ...q })),
      historia: historia.map((q) => ({ ...q }))
    };
    (window.CPM_EXTRA || []).forEach(q => bank[q.subject].push({ ...q }));
    (window.CHALLENGE_BANK?.questions || []).forEach(q => {
      const esc = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
      const offset = Number(q.id.slice(-3)) % 4;
      const options = [...q.options.slice(offset), ...q.options.slice(0, offset)];
      bank[q.subject].push({ ...q, authored:true, topic:q.topic||q.family,
        prompt:`${q.base?`<section class="challenge-base"><p>${esc(q.base).replace(/\n/g,'<br>')}</p></section>`:''}<p>${esc(q.prompt)}</p>`,
        options:options.map(o=>o.text), correct:options.findIndex(o=>o.id===q.correctId),
        source:{label:q.references[0]?.name||'Resolução autoral · evidências do enunciado',url:q.references[0]?.url||null},
        origin:'⚑ Criada por IA · desafio difícil' });
    });
    Object.keys(bank).forEach(subject => {
      const seen = new Set();
      bank[subject] = bank[subject].filter(q => {
        const key = `${q.prompt}::${q.options[q.correct]}`;
        if (seen.has(key)) return false;
        seen.add(key);
        // Generated IDs depend on the exercise content, never on the wall clock.
        if (q.id.startsWith('mat-')) {
          let hash = 2166136261;
          for (const char of key) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
          q.id = `${q.id.replace(/-\d{13}.*$/, '')}-${(hash >>> 0).toString(16)}`;
        }
        return true;
      });
    });
    return bank;
  }

  window.CPM_DATA = { SUBJECTS, DISTRIBUTION, SOURCES, buildQuestionBank };
})();
