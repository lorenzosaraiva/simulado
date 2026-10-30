(function () {
  'use strict';
  // "Mandela: o africano de todas as cores" (Alain Serres e Zaü): biografia de Nelson Mandela.
  // Usam-se fatos da biografia e informações da ficha da edição; os textos-base são autorais e não reproduzem a obra.
  const { Q, QF, V } = window.FIEL;
  const T = 'Mandela: o africano de todas as cores';
  const M = (item, fam, lvl, base, prompt, ok, why, bad, extra = {}) => Q(item, 'mandela-' + fam, lvl, base, prompt, ok, why, bad, { topic: T, refs: ['mandela'], book: true, schools: ['cep'], ...extra });
  const MF = (item, fam, lvl, base, prompt, opts, right, why, extra = {}) => QF(item, 'mandela-' + fam, lvl, base, prompt, opts, right, why, { topic: T, refs: ['mandela'], book: true, schools: ['cep'], ...extra });
  const AUTORAL = 'Texto autoral, inspirado na vida de Nelson Mandela; não é trecho do livro.\n';

  M('p13', 'autoria', 'fácil', null, 'Na obra “Mandela: o africano de todas as cores”, quem escreveu o texto e quem fez as ilustrações?',
    'Alain Serres escreveu o texto, e Zaü fez as ilustrações.', 'A autoria do texto é de Alain Serres; as imagens são de Zaü.',
    [['Zaü escreveu o texto, e Alain Serres fez as ilustrações.', 'Inverte as funções dos dois.'], ['Nelson Mandela escreveu o texto, e Zaü o traduziu.', 'A obra conta a vida de Mandela, mas não é escrita por ele.'], ['Alain Serres e Zaü escreveram o texto, e Mandela fez as ilustrações.', 'As ilustrações são de Zaü.']]);

  M('p10', 'genero', 'média', null, 'O livro conta a vida de Nelson Mandela por meio de um autor que não é ele. Esse tipo de texto é classificado como',
    'biografia, porque outra pessoa narra a história de vida de alguém.', 'Biografia é o relato da vida de uma pessoa feito por outra. Se o próprio personagem escrevesse, seria autobiografia.',
    [['autobiografia, porque o narrador é o próprio Mandela.', 'Na autobiografia, quem escreve é a pessoa cuja vida é contada.'], ['diário, porque registra um dia por vez em primeira pessoa.', 'Diário é escrito pela própria pessoa, dia após dia.'], ['conto de fadas, porque os fatos narrados são fantásticos.', 'Os fatos são reais e históricos.']]);

  M('p13', 'apartheid', 'fácil', null, 'Nelson Mandela dedicou a vida à luta contra qual situação na África do Sul?',
    'O apartheid, regime que separava e discriminava pessoas pela cor da pele.', 'O apartheid foi um sistema legal de segregação racial, combatido por Mandela.',
    [['A colonização portuguesa, que havia ocupado todo o território.', 'Esse não é o foco da luta de Mandela.'], ['O tráfico de pessoas para a América, que ainda era permitido.', 'O tráfico transatlântico já havia acabado havia muito tempo.'], ['A escassez de água, que atingia todos os grupos.', 'A luta era contra a desigualdade imposta por lei.']]);

  M('p04', 'apartheid-palavra', 'média', 'Na África do Sul, durante décadas, a lei obrigava pessoas negras e brancas a viver em bairros separados, estudar em escolas diferentes e usar transportes distintos.',
    'O regime descrito no texto é chamado de apartheid. Pelo contexto, a palavra “apartheid” está relacionada à ideia de',
    'separação forçada entre grupos de pessoas.', 'O texto descreve bairros, escolas e transportes separados. A palavra, do africâner, remete a “separação”.',
    [['união entre diferentes grupos.', 'É o contrário do que o texto descreve.'], ['viagem organizada entre cidades.', 'Não há relação com viagens.'], ['festa cultural de um país.', 'O texto trata de leis discriminatórias, não de festas.']]);

  M('p13', 'prisao-anos', 'média', null, 'Nelson Mandela foi preso por sua luta contra o apartheid. No total, ele ficou preso por cerca de quantos anos?',
    '27 anos.', 'Mandela foi preso em 1962 e libertado em 1990, após cerca de 27 anos na prisão.',
    [['18 anos.', 'Esse foi o tempo que passou na prisão da Ilha Robben, apenas parte do total.'], ['7 anos.', 'Foi muito menos do que ele realmente passou preso.'], ['40 anos.', 'Ultrapassa o tempo que ele ficou preso.']]);

  M('p13', 'libertacao', 'média', null, 'Em que ano Nelson Mandela foi libertado da prisão?',
    '1990.', 'Mandela saiu da prisão em 11 de fevereiro de 1990.',
    [['1964.', 'Foi o ano em que ele foi condenado à prisão perpétua.'], ['1994.', 'Foi o ano em que foi eleito presidente.'], ['1962.', 'Foi o ano em que foi preso.']]);

  M('p13', 'presidente', 'média', null, 'Em 1994, Nelson Mandela passou a ocupar qual lugar na história da África do Sul?',
    'Foi eleito o primeiro presidente negro do país.', 'As eleições de 1994 foram as primeiras em que a maioria negra pôde votar, e Mandela venceu.',
    [['Foi condenado à prisão perpétua pela primeira vez.', 'A condenação foi em 1964.'], ['Recebeu o Prêmio Nobel da Paz pela primeira vez.', 'O Nobel foi entregue em 1993.'], ['Nasceu em uma pequena aldeia sul-africana.', 'O nascimento foi em 1918.']]);

  M('p13', 'nobel', 'difícil', null, 'Em 1993, Nelson Mandela recebeu o Prêmio Nobel da Paz. Esse prêmio foi dividido com o então presidente Frederik de Klerk em reconhecimento ao trabalho dos dois para',
    'acabar com o apartheid e abrir caminho para um país democrático.', 'O prêmio reconheceu a atuação conjunta no fim do regime de segregação e na construção de uma democracia.',
    [['conquistar territórios vizinhos pela força militar.', 'O prêmio honra esforços pela paz, não conquistas militares.'], ['aumentar a produção de ouro e diamantes.', 'Não se trata de um prêmio econômico.'], ['organizar a primeira Copa do Mundo na África.', 'Nada tem a ver com eventos esportivos.']]);

  MF('p13', 'ordem', 'difícil', null, 'Observe os acontecimentos da vida de Mandela:\nI. Foi eleito presidente da África do Sul.\nII. Nasceu em um vilarejo sul-africano.\nIII. Foi libertado da prisão.\nIV. Foi preso por lutar contra o apartheid.\nA ordem cronológica correta é:',
    [['II – IV – III – I', ''], ['II – III – IV – I', 'Ele só foi libertado depois de preso.'], ['IV – II – III – I', 'Ninguém é preso antes de nascer.'], ['II – IV – I – III', 'Foi eleito presidente depois de ser libertado.']], 0,
    'Nascimento (1918), prisão (1962), libertação (1990) e eleição como presidente (1994).');

  M('p13', 'pais', 'fácil', null, 'Nelson Mandela nasceu e viveu a maior parte da vida em qual país?',
    'África do Sul.', 'Mandela nasceu em 1918 na África do Sul, país que governou de 1994 a 1999.',
    [['Moçambique.', 'É um país vizinho de língua portuguesa.'], ['Estados Unidos.', 'Nunca foi presidente desse país.'], ['Angola.', 'Fica em outra região do continente africano.']]);

  M('p13', 'nome', 'média', null, 'O nome de nascimento de Mandela era Rolihlahla. O nome “Nelson”, usado no mundo todo, foi dado',
    'por uma professora, no primeiro dia de escola.', 'Na época, era comum dar nomes ingleses às crianças na escola; foi assim que Rolihlahla passou a se chamar Nelson.',
    [['pelo pai, no dia do nascimento.', 'Rolihlahla foi o nome dado ao nascer.'], ['pelo governo, quando ele foi preso.', 'O nome já existia antes da prisão.'], ['por ele mesmo, ao fundar um partido político.', 'Nelson já era seu nome quando entrou para a política.']]);

  M('p13', 'cna', 'média', null, 'Mandela foi um dos líderes do Congresso Nacional Africano (CNA). Esse movimento político',
    'lutava pelo fim da segregação e pelos direitos da população negra.', 'O CNA reunia pessoas contrárias ao apartheid.',
    [['defendia a manutenção do apartheid.', 'Quem o defendia era o governo da época, contra o CNA.'], ['era um exército estrangeiro que invadiu o país.', 'Era um movimento político de sul-africanos.'], ['organizava campeonatos esportivos regionais.', 'Sua atuação era política.']]);

  M('p13', 'por-que-preso', 'média', null, 'Por que Nelson Mandela foi condenado à prisão perpétua em 1964?',
    'Por se opor ao apartheid e organizar ações de resistência contra o governo.', 'O governo o acusou por sua atuação contra o regime, e ele foi condenado.',
    [['Por apoiar as leis de segregação do governo.', 'Ele era contrário a essas leis.'], ['Por roubar dinheiro de uma empresa.', 'Não foi um crime comum.'], ['Por abandonar o exército durante uma guerra.', 'O motivo foi político.']]);

  M('p08', 'ilustracao-cor', 'difícil', null, 'Nas ilustrações do livro, as fases fora da prisão são coloridas, e os anos entre 1962 e 1990, em que Mandela esteve preso, aparecem em tons de bege, preto e branco. Essa escolha do ilustrador contribui para',
    'destacar, pelo contraste com as cores, o período em que ele ficou sem liberdade.', 'A mudança de cores sinaliza, de forma visual, a diferença entre os momentos de liberdade e de prisão.',
    [['mostrar que as prisões ficavam em regiões desérticas.', 'A cor é recurso expressivo, não retrato geográfico.'], ['indicar que as imagens foram feitas por outro ilustrador.', 'A obra é ilustrada por Zaü.'], ['dar a entender que as fotos antigas perderam a cor.', 'As imagens são ilustrações, e a cor é uma escolha artística.']]);

  M('p24', 'titulo', 'média', null, 'O título “Mandela: o africano de todas as cores” não quer dizer que Mandela tinha a pele de várias cores. Em sentido figurado, o título sugere que Mandela',
    'defendia a convivência e a união de pessoas de todas as origens e cores.', 'A expressão “de todas as cores” é figurada: a luta de Mandela era pela igualdade entre todos.',
    [['pintava quadros coloridos durante a prisão.', 'Entende o sentido literalmente.'], ['mudava de cor conforme o ambiente.', 'Não há relação com a pele de Mandela.'], ['só representava as pessoas de uma região.', 'Contraria a ideia de reunir diferentes grupos.']]);

  M('p10', 'para-compreender', 'média', null, 'No final do livro há a seção “Para compreender melhor”, com palavras-chave, fotos, um mapa e uma cronologia da vida de Mandela. Essa seção serve para',
    'complementar a narrativa com informações de apoio à leitura.', 'Mapa, cronologia e palavras-chave ajudam o leitor a localizar e entender os fatos narrados.',
    [['apresentar um final diferente para a história.', 'Não altera a história; informa sobre ela.'], ['propor exercícios de gramática sobre o texto.', 'Não é uma seção de atividades.'], ['listar outros livros escritos por Zaü.', 'O foco é compreender a vida de Mandela.']]);

  M('p24', 'janela-livro', 'difícil', AUTORAL + 'Na cela sem janelas,\no preso abriu um livro.\nO livro era a janela\nque a cela não tinha.',
    'No poema, a expressão “O livro era a janela que a cela não tinha” significa que',
    'a leitura permitia conhecer e imaginar o mundo além das paredes da cela.', 'Há uma metáfora: o livro cumpre a função de uma janela, que mostra o que está fora.',
    [['o livro tinha o formato de uma janela de vidro.', 'Entende a metáfora de forma literal.'], ['a cela ganhou uma janela depois que o preso leu.', 'O poema diz que a cela não tinha janela.'], ['o preso desejava quebrar a janela do livro.', 'Nada no poema sugere esse desejo.']]);

  M('p24', 'alfabeto', 'difícil', AUTORAL + '“Quem aprende uma letra por dia\nabre uma porta por dia.”',
    'Segundo o trecho, aprender a ler e escrever está relacionado a',
    'ampliar, aos poucos, as possibilidades de conhecer e de ser livre.', 'As “portas” são figuradas: cada letra aprendida abre novas possibilidades.',
    [['construir portas de madeira para a casa.', 'Interpreta as portas literalmente.'], ['trocar de escola a cada dia.', 'O trecho fala de aprendizagem, não de escolas.'], ['esquecer o que já foi aprendido.', 'Contradiz a ideia de abrir portas.']]);

  M('p04', 'segregacao', 'média', 'A segregação separava as pessoas em bairros, escolas e ônibus diferentes, conforme a cor da pele.',
    'No texto, a palavra “segregação” significa', 'separação forçada de grupos de pessoas.', 'O texto explica a palavra com exemplos de separação em bairros, escolas e ônibus.',
    [['convivência harmoniosa entre todos.', 'É o contrário do sentido do texto.'], ['viagem organizada para estudantes.', 'Não é essa a ideia.'], ['festa de comemoração nacional.', 'O texto descreve discriminação.']]);

  M('p04', 'resistencia', 'média', 'Mesmo proibidos de se reunir, os moradores resistiram: organizaram abaixo-assinados, boicotes aos ônibus e greves contra as leis injustas.',
    'No texto, o verbo “resistir” indica',
    'opor-se a algo considerado injusto, agindo contra isso.', 'Os exemplos (abaixo-assinados, boicotes, greves) são formas de oposição organizada.',
    [['cansar-se depois de uma longa caminhada.', 'Não se trata de cansaço físico.'], ['obedecer em silêncio a todas as ordens.', 'O texto indica o contrário.'], ['mudar-se para outra cidade.', 'Os moradores permanecem e protestam.']]);

  M('p23', 'antonimo-libertar', 'fácil', null, 'Qual palavra tem sentido oposto ao do verbo “libertar”, muito usado ao se falar de Mandela?',
    'aprisionar.', 'Libertar é soltar; aprisionar é prender.',
    [['soltar.', 'É sinônimo de libertar.'], ['liberar.', 'É sinônimo de libertar.'], ['salvar.', 'Pode ser aproximado de libertar, não oposto.']]);

  MF('p07', 'fato-opiniao', 'média', 'Leia as frases sobre Nelson Mandela.\nI. Mandela nasceu em 1918.\nII. Mandela foi o líder mais admirável do século XX.\nIII. Ele ficou preso por cerca de 27 anos.\nIV. Seu discurso de posse foi o mais emocionante de todos.',
    'Quais frases expressam uma opinião?', [['I e III', 'São fatos que podem ser conferidos.'], ['II e IV', ''], ['I e II', 'A frase I é um fato.'], ['III e IV', 'A frase III é um fato.']], 1,
    'As frases II e IV usam “mais admirável” e “mais emocionante”, juízos pessoais. I e III trazem dados verificáveis.');

  M('p05', 'causa-consequencia', 'difícil', AUTORAL + 'Em vários países, multidões saíram às ruas com faixas e cartazes pedindo a libertação de Mandela. A pressão cresceu, e, em 1990, o governo sul-africano o libertou.',
    'Segundo o texto, as manifestações em vários países foram',
    'um dos fatores que aumentaram a pressão pela libertação de Mandela.', 'O texto liga as manifestações ao crescimento da pressão e, depois, à libertação.',
    [['a única causa da prisão de Mandela.', 'Ele foi preso por outros motivos, antes das manifestações.'], ['uma consequência da libertação de 1990.', 'As manifestações aconteceram antes.'], ['uma ordem do governo sul-africano.', 'Foram iniciativas de pessoas nas ruas.']]);

  M('p10', 'texto-biografico', 'média', AUTORAL + 'Em 1918, nasceu Rolihlahla, que mais tarde seria chamado de Nelson. Estudou Direito, ajudou a defender pessoas injustiçadas e entrou para o Congresso Nacional Africano. Em 1962, foi preso.',
    'O trecho é predominantemente narrativo-biográfico porque',
    'relata, em ordem cronológica, fatos da vida de uma pessoa real.', 'Há datas, verbos no passado e uma sequência de acontecimentos reais.',
    [['ensina o passo a passo de uma receita.', 'Não traz instruções.'], ['descreve um objeto sem apresentar ações.', 'Há várias ações e datas.'], ['tenta convencer o leitor a comprar um produto.', 'Não há propaganda.']]);

  M('p12', 'espaco', 'média', null, 'Em uma narrativa sobre a vida de Mandela, qual alternativa aponta o ESPAÇO onde parte dos fatos acontece?',
    'A prisão da Ilha Robben, na África do Sul.', 'Espaço é o lugar da ação; a prisão da ilha é um local real da história.',
    [['O ano de 1990.', 'Indica o tempo.'], ['O próprio Nelson Mandela.', 'É a personagem principal.'], ['A decisão de resistir ao regime.', 'É um momento do enredo, não um lugar.']]);

  M('p12', 'conflito', 'média', null, 'Na história de vida de Nelson Mandela, qual é o principal conflito enfrentado pelo protagonista?',
    'A luta contra a desigualdade e a injustiça impostas pelo apartheid.', 'O conflito central é a oposição entre Mandela e um sistema de segregação racial.',
    [['Uma disputa familiar por herança.', 'Não é o foco da narrativa.'], ['Uma competição esportiva entre dois países.', 'O esporte aparece, no máximo, como episódio.'], ['Uma guerra entre Brasil e África do Sul.', 'Os dois países não estiveram em guerra.']]);

  M('p13', 'voto-1994', 'difícil', null, 'As eleições de 1994 na África do Sul foram históricas porque, pela primeira vez,',
    'a maioria negra do país pôde votar em eleições nacionais.', 'Com o fim do apartheid, o direito de voto foi estendido a todos os adultos, e Mandela foi eleito.',
    [['as mulheres puderam usar calçados na escola.', 'Não tem relação com as eleições.'], ['o país foi dividido em duas nações.', 'A África do Sul seguiu unida.'], ['o voto passou a ser proibido para todos.', 'O fato histórico foi a ampliação do voto.']]);

  M('p13', 'dia-mandela', 'média', null, 'O Dia Internacional de Nelson Mandela é comemorado em 18 de julho. Essa data foi escolhida porque',
    'é o dia do aniversário de Mandela.', 'A ONU instituiu a data em homenagem ao nascimento do líder, em 18 de julho de 1918.',
    [['é o dia em que ele foi libertado.', 'A libertação foi em 11 de fevereiro.'], ['é o dia em que ele morreu.', 'Ele morreu em dezembro.'], ['é o dia em que o apartheid começou.', 'O apartheid foi oficializado em 1948.']]);

  M('p24', 'arco-iris', 'difícil', null, 'A África do Sul pós-apartheid foi chamada de “Nação Arco-Íris”. Em sentido figurado, essa expressão destaca',
    'a diversidade de povos e culturas convivendo no mesmo país.', 'O arco-íris reúne muitas cores sem que uma apague a outra, como a ideia de convivência entre diferentes grupos.',
    [['o clima chuvoso durante todo o ano.', 'Interpreta literalmente.'], ['a existência de uma única cultura dominante.', 'A expressão valoriza a diversidade.'], ['a proibição do uso de cores na bandeira.', 'A bandeira do país é colorida.']]);

  M('p13', 'robben', 'média', null, 'Parte da pena de Mandela foi cumprida em uma prisão situada numa ilha. Qual?',
    'Ilha Robben, perto da Cidade do Cabo.', 'Mandela passou 18 anos na prisão da Ilha Robben, hoje um museu.',
    [['Ilha de Gorée, no Senegal.', 'É um memorial do tráfico de pessoas escravizadas, em outro país.'], ['Ilha de Marajó, no Brasil.', 'Fica no Brasil.'], ['Ilha de Santa Helena, no Atlântico.', 'Foi local de exílio de Napoleão.']]);

  M('p25', 'gentilico', 'média', null, 'Em “Nelson Mandela foi um líder sul-africano”, a palavra “sul-africano” é classificada como',
    'adjetivo, pois caracteriza o substantivo “líder”.', '“Sul-africano” indica a origem do líder e acompanha o substantivo.',
    [['verbo, pois indica uma ação.', 'Não há ação nessa palavra.'], ['advérbio, pois modifica o verbo “foi”.', 'Ela se liga ao substantivo, não ao verbo.'], ['artigo, pois antecede o substantivo.', 'O artigo é “um”.']]);

  M('p21', 'tonica-mandela', 'média', null, 'Quanto à sílaba tônica, as palavras “Mandela” e “africano” são',
    'paroxítonas, pois a tônica é a penúltima sílaba.', 'Man-DE-la e a-fri-CA-no têm a sílaba mais forte na penúltima posição.',
    [['oxítonas, pois a tônica é a última sílaba.', 'A última sílaba é fraca nas duas.'], ['proparoxítonas, pois a tônica é a antepenúltima.', 'A tônica não é a antepenúltima.'], ['monossílabas, pois têm uma só sílaba.', 'Têm três e quatro sílabas.']]);

  M('p18', 'africa-acento', 'média', null, 'A palavra “África” recebe acento gráfico porque é',
    'proparoxítona.', 'Á-fri-ca tem a tônica na antepenúltima sílaba; toda proparoxítona é acentuada.',
    [['oxítona terminada em “a”.', 'A tônica não é a última sílaba.'], ['paroxítona terminada em “a”.', 'Paroxítonas terminadas em “a” não são acentuadas.'], ['monossílaba tônica.', 'A palavra tem três sílabas.']]);

  M('p13', 'ubuntu', 'difícil', null, 'A palavra “ubuntu”, de línguas africanas do sul do continente, costuma ser associada ao pensamento de Mandela. Ela expressa a ideia de que',
    'a humanidade de cada pessoa depende da relação com as outras.', 'Ubuntu é frequentemente resumida como “eu sou porque nós somos”.',
    [['cada um deve cuidar apenas de si.', 'É o oposto da ideia de comunidade.'], ['só os líderes merecem respeito.', 'A ideia valoriza todas as pessoas.'], ['a riqueza deve ser guardada em segredo.', 'Não há relação com riqueza.']]);

  M('p03', 'carta-mandela', 'difícil', AUTORAL + 'Querido Madiba,\nEu tinha dez anos quando descobri sua história. Na minha escola, uma menina foi chamada de “diferente” por causa do cabelo. Eu me lembrei de você e disse: “Diferentes somos todos, e é por isso que precisamos de todos”. Hoje, ela é minha melhor amiga.\nCom carinho, Clara.',
    'Pelo conteúdo da carta, é possível concluir que Clara',
    'aplicou, na própria escola, a ideia de respeito às diferenças aprendida com a história de Mandela.', 'A carta relaciona a frase dita à colega com a lição que ela aprendeu ao conhecer a história de Mandela.',
    [['conheceu Mandela pessoalmente na prisão.', 'Ela diz que “descobriu sua história”, não que o encontrou.'], ['discordou das ideias de Mandela sobre igualdade.', 'Ela usa essas ideias para defender a colega.'], ['mudou de escola para evitar a colega.', 'Ao contrário, as duas ficaram amigas.']]);

  M('p13', 'ordem-linha-tempo', 'difícil', null, 'Observe a linha do tempo da vida de Nelson Mandela. Quantos anos se passaram entre a condenação à prisão perpétua e a libertação?',
    '26 anos.', '1990 − 1964 = 26 anos entre a condenação e a libertação.',
    [['28 anos.', 'Corresponde a 1990 − 1962 (da prisão, não da condenação).'], ['4 anos.', 'Corresponde a 1994 − 1990.'], ['31 anos.', 'Não corresponde a nenhuma diferença entre as datas.']], { visual: 'f_linha_mandela', alt: 'Linha do tempo com os marcos da vida de Nelson Mandela: 1918 nascimento; 1948 início oficial do apartheid; 1962 prisão; 1964 condenação à prisão perpétua; 1990 libertação; 1993 Prêmio Nobel da Paz; 1994 eleição para presidente; 2013 morte.' });

  M('h01', 'cronologia-apartheid', 'difícil', null, 'Observe a linha do tempo. Qual afirmação é sustentada por ela?',
    'O apartheid foi oficializado em 1948, e Mandela foi preso 14 anos depois.', '1962 − 1948 = 14 anos entre o início oficial do regime e a prisão.',
    [['Mandela foi libertado antes de ser condenado.', 'A condenação (1964) ocorreu antes da libertação (1990).'], ['O Nobel da Paz foi entregue depois da eleição para presidente.', 'O Nobel foi em 1993; a eleição, em 1994.'], ['Mandela nasceu depois do início do apartheid.', 'Ele nasceu em 1918, antes de 1948.']], { visual: 'f_linha_mandela', alt: 'Linha do tempo com os marcos da vida de Nelson Mandela.', topic: 'Tempo histórico e cronologia' });
})();
