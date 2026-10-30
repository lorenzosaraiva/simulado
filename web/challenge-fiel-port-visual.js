(function () {
  'use strict';
  // Português: tirinhas, charges, cartazes, avisos e anúncios (imagem como texto-base, como nos cadernos do CPM).
  const { Q, QF } = window.FIEL;
  const R = (item, fam, lvl, visual, prompt, ok, why, bad, extra = {}) => Q(item, fam, lvl, null, prompt, ok, why, bad, { visual, ...extra });

  // Charge: rio e lixo
  R('p09', 'rio-lixo-ironia', 'média', 'f_rio_lixo', 'O efeito de humor e de crítica da charge é construído pela',
    'contradição entre o que o homem declara na placa e o que ele faz.', 'A placa diz “Eu amo este rio!”, mas o homem joga lixo na água. A fala da menina aponta essa incoerência.',
    [['semelhança entre a atitude do homem e a mensagem da placa.', 'Ao contrário, as duas são opostas.'], ['surpresa da menina ao ver o rio limpo.', 'O rio está recebendo lixo.'], ['alegria dos dois ao encontrar um saco de lixo.', 'Ninguém comemora ao achar lixo.']]);
  R('p24', 'rio-lixo-presentes', 'média', 'f_rio_lixo', 'Na fala da menina, a palavra “presentes” é usada em sentido',
    'irônico, pois se refere ao lixo jogado no rio.', 'Presentes são coisas boas que se oferecem; a menina usa a palavra para criticar o lixo.',
    [['literal, pois o homem entrega brindes ao rio.', 'O que o homem joga é lixo.'], ['técnico, pois é termo de engenharia ambiental.', 'É uma expressão comum, usada com ironia.'], ['afetuoso, pois a menina elogia o homem.', 'Ela o critica.']]);
  R('p08', 'rio-lixo-mudanca', 'difícil', 'f_rio_lixo', 'Qual mudança na imagem tornaria a atitude do homem coerente com a placa e retiraria a crítica da charge?',
    'O homem colocar o saco em uma lixeira, longe do rio.', 'Descartar o lixo corretamente combina com a mensagem de amor ao rio.',
    [['O homem segurar uma placa maior, com letras mais grossas.', 'O tamanho da placa não muda a atitude.'], ['A menina trocar de roupa e de penteado.', 'Os detalhes da menina não mudam a crítica.'], ['O rio ficar mais largo e mais fundo.', 'O lixo continuaria sendo jogado.']]);

  // Tirinha: livros e legendas
  R('p09', 'livro-legenda-humor', 'média', 'f_livro_legenda', 'O humor da tirinha surge do fato de que a menina',
    'mostra que assistir a vídeos com legendas também exige saber ler.', 'O menino diz que vídeos substituem livros, mas legendas são textos que só se compreendem com leitura.',
    [['proíbe o menino de assistir a vídeos.', 'Ela não proíbe nada.'], ['concorda que livros não servem para nada.', 'Ela discorda dele.'], ['reclama do tamanho do tablet do menino.', 'O tamanho não é assunto.']]);
  R('p19', 'livro-legenda-pontuacao', 'difícil', 'f_livro_legenda', 'No primeiro quadrinho, a fala “Livros? Para que, se tem vídeo?” usa dois pontos de interrogação. O primeiro, depois de “Livros”, indica',
    'estranhamento ou desdém do menino diante da ideia de ler livros.', 'A interrogação, ali, retoma a palavra da conversa com tom de dúvida e desprezo, e não pede uma informação.',
    [['que o menino não sabe o que é um livro.', 'Ele sabe; está questionando a utilidade.'], ['que a fala terminou e outra pessoa vai falar.', 'A frase continua depois do ponto de interrogação.'], ['que a palavra “livros” é um nome próprio.', 'Nomes próprios não exigem esse sinal.']]);
  R('p03', 'livro-legenda-inferencia', 'média', 'f_livro_legenda', 'No último quadrinho, o menino diz “Hum... boa.”. Essa reação sugere que ele',
    'reconheceu que o argumento da menina fazia sentido.', 'O elogio “boa” indica que a resposta o convenceu, e as reticências mostram o momento de reflexão.',
    [['ficou irritado e vai discutir com a menina.', 'A expressão “boa” é de aprovação.'], ['não entendeu a resposta da menina.', 'Ele reage com aprovação.'], ['pretende guardar o tablet para sempre.', 'Nada indica essa decisão.']]);

  // Tirinha: dever de casa
  R('p09', 'dever-cachorro-ironia', 'média', 'f_dever_cachorro', 'No último quadrinho, a professora diz “Que ele faça a prova amanhã, então!”. Essa fala expressa',
    'ironia: ela não acredita na desculpa do aluno.', 'A professora devolve a desculpa com ironia: se o cachorro come o dever, que faça a prova também.',
    [['confiança total na história contada por Caio.', 'Ela reage com irritação, não com confiança.'], ['preocupação com a saúde do cachorro.', 'A saúde do animal não é o assunto.'], ['convite para o cachorro participar da aula.', 'O convite é irônico, não literal.']]);
  R('p25', 'dever-cachorro-verbos', 'difícil', 'f_dever_cachorro', 'Considere os verbos destacados nas falas: “Meu cachorro COMEU.” e “Que ele FAÇA a prova amanhã.” Eles estão, respectivamente, em',
    'pretérito perfeito do indicativo e presente do subjuntivo.', '“Comeu” indica ação já concluída. “Faça” expressa ordem ou desejo em relação a uma ação futura.',
    [['presente do indicativo e futuro do indicativo.', '“Comeu” está no passado.'], ['pretérito imperfeito do indicativo e pretérito perfeito.', '“Faça” não está no passado.'], ['futuro do subjuntivo e presente do indicativo.', 'Os dois tempos aparecem trocados.']]);
  R('p03', 'dever-cachorro-inferencia', 'média', 'f_dever_cachorro', 'Pelas expressões e pelas falas, é correto concluir que a professora',
    'desconfiou da desculpa de Caio.', 'A cara fechada e a ironia mostram que ela não acreditou na explicação.',
    [['acreditou na desculpa e elogiou o cachorro.', 'Ela reage com irritação.'], ['ficou feliz com a entrega do dever.', 'Caio não entregou o dever.'], ['pediu desculpas ao aluno pela cobrança.', 'Ela mantém a cobrança.']]);

  // Charge: a campanha das árvores
  R('p09', 'arvore-cartaz-critica', 'média', 'f_arvore_cartaz', 'A crítica da charge está na',
    'incoerência entre participar de uma campanha de preservação e cortar uma árvore para fazer o cartaz.', 'O homem diz apoiar a campanha, mas derruba a árvore para obter madeira para o cartaz “Preserve as árvores”.',
    [['falta de madeira para produzir cartazes.', 'A charge não trata de falta de madeira.'], ['dificuldade de pintar letras em tábuas.', 'A pintura não é o foco.'], ['grande quantidade de árvores no bairro.', 'Há apenas uma árvore, que é cortada.']]);
  R('p24', 'arvore-cartaz-otima', 'difícil', 'f_arvore_cartaz', 'Na fala “Madeira ótima para o cartaz!”, o adjetivo “ótima” revela que o personagem',
    'não percebe a contradição entre o cartaz e o que fez.', 'Ele elogia a madeira sem notar que a sua ação desmente a mensagem “Preserve as árvores”.',
    [['está arrependido por ter cortado a árvore.', 'Ele demonstra satisfação.'], ['quer plantar outras árvores no mesmo lugar.', 'Não há plantio na charge.'], ['pretende vender a madeira a uma fábrica.', 'A madeira é usada no cartaz.']]);

  // Tirinha: dieta
  R('p03', 'dieta-inferencia', 'média', 'f_dieta', 'A repetição da frase “Amanhã começo a dieta.” em três dias seguidos sugere que o homem',
    'sempre adia a decisão de começar a dieta.', 'O calendário muda (10, 11, 12), mas a frase e o salgadinho continuam os mesmos.',
    [['já terminou a dieta e comemora.', 'Ele continua com o salgadinho.'], ['começou a dieta no primeiro dia e a abandonou.', 'Nunca começou.'], ['esqueceu o dia em que deve começar.', 'Ele lembra e repete a promessa.']]);
  R('p25', 'dieta-adverbio', 'média', 'f_dieta', 'Na frase “Amanhã começo a dieta.”, a palavra “amanhã” é classificada como',
    'advérbio de tempo.', 'Indica quando a ação ocorrerá.',
    [['advérbio de lugar.', 'Não indica onde.'], ['substantivo próprio.', 'Não é um nome próprio.'], ['adjetivo.', 'Não caracteriza um substantivo.']]);
  R('p09', 'dieta-humor', 'difícil', 'f_dieta', 'Qual elemento da tirinha mais contribui para o efeito de humor?',
    'O contraste entre a mudança dos dias no calendário e a permanência da mesma fala e da mesma cena.', 'O leitor percebe o ciclo de adiamentos porque a única coisa que muda é o número do calendário.',
    [['A cor do sofá, que muda em cada quadrinho.', 'O sofá é igual nos três quadrinhos.'], ['A presença de um cachorro no último quadrinho.', 'Não há cachorro.'], ['O tamanho da letra da fala, que diminui.', 'A fala não muda de tamanho.']]);

  // Charge: urso polar
  R('p03', 'urso-gelo-critica', 'difícil', 'f_urso_gelo', 'A charge critica, principalmente,',
    'o derretimento do gelo provocado pelo aquecimento do planeta.', 'O bloco de gelo encolheu; o urso percebe que o problema não é o fim do inverno.',
    [['a falta de alimento para os ursos no verão.', 'A charge mostra o gelo, não o alimento.'], ['o excesso de neve durante o inverno.', 'Há menos gelo, não mais.'], ['a mudança de lugar do urso ao longo do dia.', 'O urso não muda de lugar.']]);
  R('p05', 'urso-gelo-ou', 'média', 'f_urso_gelo', 'No segundo quadrinho, a palavra “ou” em “Ou terminou o gelo?” introduz',
    'uma nova hipótese, mais grave, que substitui a pergunta anterior.', 'O urso corrige a primeira explicação (terminou o inverno) com outra (terminou o gelo).',
    [['uma soma de duas ideias iguais.', '“Ou” alterna possibilidades, não soma.'], ['uma ordem dirigida ao leitor.', 'É uma pergunta.'], ['a confirmação de que o inverno acabou.', 'A pergunta questiona essa ideia.']]);
  R('p19', 'urso-gelo-pontuacao', 'fácil', 'f_urso_gelo', 'O ponto de interrogação nas duas falas indica que o urso',
    'faz perguntas para refletir sobre o que acontece.', 'O sinal marca perguntas, usadas para pensar e provocar o leitor.',
    [['dá uma ordem ao leitor.', 'Ordens usam outro tom, geralmente com exclamação.'], ['grita de raiva.', 'Não há exclamação.'], ['afirma com certeza.', 'A interrogação marca dúvida.']]);

  // Tirinha: a cigarra
  R('p10', 'cigarra-fabula', 'média', 'f_cigarra', 'A tirinha retoma, de forma atualizada, a fábula',
    '“A cigarra e a formiga”.', 'A cigarra que canta no verão e a formiga que trabalha são personagens dessa fábula.',
    [['“A lebre e a tartaruga”.', 'Os personagens dessa fábula são outros.'], ['“A raposa e as uvas”.', 'Não há uvas na tirinha.'], ['“O lobo e o cordeiro”.', 'Não há lobo nem cordeiro.']]);
  R('p06', 'cigarra-ponto-vista', 'difícil', 'f_cigarra', 'Em comparação com a fábula tradicional, a cigarra da tirinha defende o ponto de vista de que',
    'cantar é um trabalho e merece pagamento.', 'Ela afirma que “cantar também é trabalho” e propõe receber grãos pelo show.',
    [['cantar é apenas diversão, sem valor.', 'É a visão tradicional, que ela contesta.'], ['as formigas devem parar de trabalhar.', 'Ela não diz isso.'], ['o inverno é mais quente que o verão.', 'A tirinha mostra frio no inverno.']]);
  R('p25', 'cigarra-cobre', 'difícil', 'f_cigarra', 'Em “Então cobre pelo show.”, a palavra “cobre” é',
    'forma do verbo cobrar, no imperativo.', 'A formiga sugere à cigarra: “cobre” (exija pagamento) pelo show. É uma orientação.',
    [['substantivo que nomeia um metal.', 'O contexto não fala de metal.'], ['adjetivo que indica cor.', 'Não caracteriza nenhum substantivo.'], ['advérbio de modo.', 'Não modifica o verbo.']]);

  // Tirinha: o vovô e o celular
  R('p15', 'vovo-variacao', 'média', 'f_vovo_celular', 'A fala do avô (“Nossa, ficô bunita!”) é um exemplo de',
    'variedade da língua usada na fala informal, diferente da norma-padrão escrita.', 'O avô se comunica bem; apenas pronuncia as palavras de modo diferente da escrita padrão.',
    [['erro grave que impede a comunicação.', 'A neta o entende sem problemas.'], ['linguagem técnica, de especialistas em fotografia.', 'Não há termos técnicos.'], ['gíria recente, usada só por jovens.', 'O personagem é um idoso.']]);
  R('p14', 'vovo-fala-escrita', 'média', 'f_vovo_celular', 'Na escrita, as palavras “ficô” e “bunita”, ditas pelo avô, devem ser escritas, respectivamente,',
    'ficou e bonita.', 'Na fala, o som final de “ficou” e o “o” de “bonita” mudam; na escrita padrão, mantêm-se as letras “ou” e “o”.',
    [['ficô e bonita.', 'A forma “ficô” não é a escrita padrão.'], ['ficou e bunita.', 'A escrita padrão de bonita é com “o”.'], ['fiquô e bonita.', 'A forma “fiquô” não existe.']]);
  R('p03', 'vovo-neta', 'difícil', 'f_vovo_celular', 'No último quadrinho, a neta responde “Ficou linda mesmo, vovô!”. Essa atitude mostra que ela',
    'valoriza o elogio do avô e usa uma forma diferente de falar, sem constrangê-lo.', 'Ela confirma o elogio e usa a forma padrão de modo natural, sem corrigir o avô de maneira ríspida.',
    [['ridiculariza a pronúncia do avô.', 'Não há ironia na fala da neta.'], ['recusa o elogio do avô.', 'Ela o confirma.'], ['ordena que o avô devolva o celular.', 'Nada indica essa ordem.']]);

  // Cartaz de vacinação
  R('p01', 'vacina-finalidade', 'fácil', 'f_cartaz_vacina', 'A principal finalidade do cartaz é',
    'convocar a população para vacinar as crianças em um dia específico.', 'O cartaz informa data, horário, local e público da campanha.',
    [['vender medicamentos pelo menor preço.', 'Não há venda ou preço.'], ['contar a história da vacina.', 'Não há narração histórica.'], ['ensinar a fazer uma injeção em casa.', 'O cartaz não traz instruções práticas.']]);
  R('p25', 'vacina-imperativo', 'média', 'f_cartaz_vacina', 'No cartaz, a expressão “Leve a caderneta de vacinação” está no modo imperativo e tem a função de',
    'orientar o leitor sobre o que fazer.', 'O imperativo é usado em instruções, pedidos e orientações.',
    [['narrar um fato que já aconteceu.', 'O imperativo não narra o passado.'], ['descrever a aparência da caderneta.', 'Não há descrição.'], ['expressar uma dúvida do autor.', 'Não há dúvida na frase.']]);
  R('p03', 'vacina-conclusao', 'difícil', 'f_cartaz_vacina', 'Uma mãe quer levar o filho de 10 anos ao posto no Dia D. Com base no cartaz, é correto concluir que',
    'a campanha, nesse dia, não atende crianças dessa idade.', 'O cartaz destaca “Crianças de 1 a 9 anos”; 10 anos está fora dessa faixa.',
    [['ele será vacinado, pois todos podem ir.', 'O cartaz limita a faixa etária.'], ['ele só poderá ser vacinado à noite.', 'O horário é das 8h às 17h.'], ['ele deve ir sem a caderneta de vacinação.', 'O cartaz pede a caderneta.']]);

  // Anúncio com letras miúdas
  R('p03', 'anuncio-letras-miudas', 'difícil', 'f_anuncio_liquida', 'Sobre a informação escrita em letras pequenas, é correto afirmar que ela',
    'restringe o alcance do desconto anunciado em letras grandes.', 'O desconto de 50% vale apenas para o segundo par comprado na mesma compra, e não para todos os tênis.',
    [['confirma que todos os tênis estão pela metade do preço.', 'A observação diz o contrário.'], ['não tem relação com o desconto.', 'Ela se refere ao asterisco do desconto.'], ['aumenta o desconto para 100%.', 'Não há esse aumento.']]);
  R('p07', 'anuncio-publicidade', 'média', 'f_anuncio_liquida', 'O objetivo principal do texto é',
    'convencer o consumidor a comprar.', 'Anúncios de liquidação usam números e destaques para atrair compradores.',
    [['ensinar a escolher tênis para corrida.', 'Não há instruções esportivas.'], ['informar a previsão do tempo.', 'Não há dado climático.'], ['contar uma história com final feliz.', 'Não há narração.']]);

  // Aviso da biblioteca
  R('p02', 'aviso-devolucao', 'média', 'f_aviso_biblioteca', 'De acordo com o aviso, os livros emprestados devem ser devolvidos até',
    'o dia 2 de março.', 'O texto determina a devolução “até o dia 2”.',
    [['o dia 3 de março.', 'É o primeiro dia de fechamento.'], ['o dia 7 de março.', 'É o último dia de fechamento.'], ['o dia 10 de março.', 'É quando o atendimento volta ao normal.']]);
  R('p10', 'aviso-genero', 'fácil', 'f_aviso_biblioteca', 'O texto é um aviso porque',
    'informa o público sobre uma mudança no funcionamento da biblioteca.', 'Avisos comunicam informações práticas e curtas a um grupo de pessoas.',
    [['conta uma aventura com personagens.', 'Não é narrativa.'], ['ensina o passo a passo de uma receita.', 'Não é texto instrucional.'], ['faz uma crítica humorística a um costume.', 'Não é charge.']]);
  R('p03', 'aviso-conclusao', 'difícil', 'f_aviso_biblioteca', 'Um aluno pretende pegar um livro emprestado na quinta-feira, dia 6 de março. Com base no aviso, ele',
    'não conseguirá, pois a biblioteca estará fechada nesse dia.', 'O fechamento vai de 3 a 7 de março; o dia 6 está nesse período.',
    [['conseguirá, pois a devolução é no dia 2.', 'O dia 2 é o prazo de devolução, não de empréstimo.'], ['conseguirá, pois o atendimento volta no dia 6.', 'O atendimento volta no dia 10.'], ['conseguirá, se pedir à equipe depois das 17h.', 'O aviso não prevê atendimento no período.']]);
})();
