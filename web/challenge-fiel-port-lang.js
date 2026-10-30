(function () {
  'use strict';
  // Português: conhecimentos linguísticos (ortografia, acentuação, pontuação, sílabas, classes de palavras, verbos, variação).
  const { Q, QF } = window.FIEL;
  const N = (item, fam, lvl, prompt, ok, why, bad, base = null, extra = {}) => Q(item, fam, lvl, base, prompt, ok, why, bad, extra);

  // Ortografia
  N('p16', 'orto-palavras', 'média', 'Assinale a alternativa em que todas as palavras estão escritas corretamente.',
    'exceção – obsessão – paralisia – discussão', 'As quatro formas seguem a ortografia: exceção (ç), obsessão (ss), paralisia (s) e discussão (ss).',
    [['excessão – obsessão – paralisia – discussão', '“Exceção” escreve-se com “ç”.'], ['exceção – obssessão – paralisia – discussão', '“Obsessão” tem só um “ss”.'], ['exceção – obsessão – paralizia – discussão', '“Paralisia” escreve-se com “s”.']]);
  N('p16', 'orto-mas-mais', 'média', 'Complete a frase: “Queria ir ao parque, ______ choveu ______ do que o previsto.”',
    'mas – mais', '“Mas” indica oposição (queria, porém choveu). “Mais” indica intensidade ou quantidade.',
    [['mais – mas', 'Inverte os dois: o primeiro espaço pede oposição.'], ['mais – mais', 'O primeiro espaço pede oposição (mas).'], ['mas – mas', 'O segundo espaço pede intensidade (mais).']]);
  N('p16', 'orto-ha-a', 'difícil', 'Complete: “______ dois anos moro nesta cidade e, daqui ______ dois anos, vou me mudar.”',
    'Há – a', '“Há” indica tempo passado (equivale a “faz”). “Daqui a” indica tempo futuro e não leva “há”.',
    [['A – há', 'O primeiro espaço indica passado e pede “há”.'], ['Há – há', 'Em “daqui a dois anos” usa-se “a”.'], ['A – a', 'O primeiro espaço indica passado e pede “há”.']]);
  N('p16', 'orto-porque', 'difícil', 'Assinale a alternativa que completa corretamente as frases: “______ você chegou tarde?” / “Cheguei tarde ______ perdi o ônibus.”',
    'Por que – porque', 'Em perguntas diretas usa-se “por que” (separado); para responder dando a causa, “porque”.',
    [['Porque – por que', 'Inverte as formas.'], ['Por quê – porque', 'O “quê” acentuado só aparece no fim da frase.'], ['Porquê – por que', 'O substantivo “porquê” é usado com artigo (o porquê).']]);
  N('p16', 'orto-x-ch', 'média', 'Em qual alternativa todas as palavras são escritas com “x”?',
    'enxada – mexer – deixar', 'Todas as palavras escrevem-se com “x”.',
    [['enchada – mexer – deixar', '“Enxada” escreve-se com “x”.'], ['enxada – mecher – deixar', '“Mexer” escreve-se com “x”.'], ['enxada – mexer – deichar', '“Deixar” escreve-se com “x”.']]);
  N('p16', 'orto-g-j', 'média', 'Assinale a opção em que todas as palavras estão corretas quanto ao uso de “g” e “j”.',
    'viagem – gorjeta – jiló – geladeira', 'Todas as palavras seguem a ortografia: viagem (g), gorjeta (j), jiló (j) e geladeira (g).',
    [['viajem – gorjeta – jiló – geladeira', '“Viagem” (substantivo) escreve-se com “g”.'], ['viagem – gorgeta – jiló – geladeira', '“Gorjeta” escreve-se com “j”.'], ['viagem – gorjeta – giló – geladeira', '“Jiló” escreve-se com “j”.']]);
  N('p16', 'orto-plural', 'média', 'Assinale a alternativa em que todos os plurais estão corretos.',
    'mãos – cidadãos – capitães – limões', 'O plural de mão é mãos; cidadão, cidadãos; capitão, capitães; limão, limões.',
    [['mãos – cidadões – capitães – limões', 'O plural de cidadão é cidadãos.'], ['mães – cidadãos – capitães – limões', 'O plural de “mão” é mãos; mães é plural de mãe.'], ['mãos – cidadãos – capitões – limãos', 'O plural de limão é limões; de capitão, capitães.']]);

  // Maiúsculas
  N('p17', 'maiusculas-frase', 'média', 'Assinale a frase em que o uso de letras maiúsculas e minúsculas está correto.',
    'Em janeiro, visitamos o rio Iguaçu, no Paraná.', 'Meses e o termo genérico “rio” iniciam com minúscula; os nomes próprios Iguaçu e Paraná iniciam com maiúscula.',
    [['Em Janeiro, visitamos o rio Iguaçu, no Paraná.', 'Nomes de meses iniciam com minúscula.'], ['Em janeiro, visitamos o rio iguaçu, no paraná.', 'Nomes próprios de rio e de estado iniciam com maiúscula.'], ['em janeiro, visitamos o rio Iguaçu, no Paraná.', 'A frase deve iniciar com maiúscula.']]);
  N('p17', 'maiusculas-palavra', 'fácil', 'Qual das palavras abaixo deve ser escrita com inicial maiúscula?',
    'Curitiba', 'Nomes próprios de cidades iniciam com maiúscula.',
    [['paranaense', 'Gentílicos são escritos com minúscula.'], ['segunda-feira', 'Dias da semana iniciam com minúscula.'], ['capital', 'É substantivo comum.']]);
  N('p17', 'maiusculas-dialogo', 'difícil', 'Assinale a frase em que todas as letras maiúsculas e minúsculas estão corretas.',
    'Fui ao Museu Paranaense na quarta-feira passada.', 'O nome da instituição inicia com maiúscula; o dia da semana, com minúscula; e a frase começa com maiúscula.',
    [['Fui ao museu paranaense na Quarta-feira passada.', 'O nome da instituição leva maiúscula; o dia da semana, minúscula.'], ['Fui ao Museu Paranaense na Quarta-feira passada.', 'Dias da semana iniciam com minúscula.'], ['fui ao Museu Paranaense na quarta-feira passada.', 'A frase deve iniciar com maiúscula.']]);

  // Acentuação
  N('p18', 'acento-correto', 'média', 'Segundo a ortografia atual, qual palavra está acentuada corretamente?',
    'história', 'É paroxítona terminada em ditongo (“ia”), por isso recebe acento.',
    [['ideía', 'Segundo o Acordo Ortográfico, “ideia” não tem acento.'], ['heroi', 'Escreve-se “herói”, com acento.'], ['jibóia', 'Escreve-se “jiboia”, sem acento.']]);
  N('p18', 'acento-oxitona', 'média', 'As palavras “café”, “você” e “avó” recebem acento gráfico porque são',
    'oxítonas terminadas em a, e, o (seguidas ou não de “s”).', 'As oxítonas terminadas em a, e, o, em ou ens são acentuadas.',
    [['paroxítonas terminadas em ditongo.', 'São oxítonas.'], ['proparoxítonas.', 'Têm só duas sílabas.'], ['monossílabas átonas.', 'Têm duas sílabas.']]);
  N('p18', 'acento-hiato', 'difícil', 'Em “baú”, o acento gráfico é usado porque',
    'o “u” é a vogal tônica do hiato e vem sozinha na sílaba.', 'Em ba-ú, as vogais estão em sílabas separadas (hiato), e o “u” tônico é acentuado.',
    [['toda palavra terminada em “u” é acentuada.', 'Muitas palavras em “u” (urubu) não têm acento.'], ['a palavra é proparoxítona.', 'Ba-ú é oxítona.'], ['a palavra tem três sílabas.', 'Tem duas sílabas.']]);
  N('p18', 'acento-monossilabo', 'média', 'Assinale a alternativa em que todos os monossílabos tônicos estão acentuados corretamente.',
    'pé – só – já', 'Monossílabos tônicos terminados em a, e, o recebem acento: pé, só, já.',
    [['pe – so – ja', 'Faltam os acentos.'], ['pé – so – já', '“Só” é monossílabo tônico em “o” e é acentuado.'], ['pê – só – já', '“Pê” não é a forma de pé.']]);

  // Pontuação
  N('p19', 'pont-vocativo', 'média', 'Qual frase está pontuada corretamente?',
    'Pedro, traga o caderno de matemática.', 'O nome de quem é chamado (vocativo) é separado por vírgula.',
    [['Pedro traga, o caderno de matemática.', 'A vírgula separa o verbo do complemento.'], ['Pedro traga o caderno, de matemática.', 'A vírgula separa partes que não devem ser separadas.'], ['Pedro; traga o caderno de matemática.', 'O ponto e vírgula não separa vocativo.']]);
  N('p19', 'pont-enumeracao', 'média', 'Assinale a frase em que a vírgula foi usada corretamente para separar elementos de uma enumeração.',
    'Comprei lápis, borracha, caderno e régua.', 'Na enumeração, as vírgulas separam os itens; antes do “e” final, não se usa vírgula.',
    [['Comprei, lápis borracha caderno e régua.', 'Faltam vírgulas entre os itens.'], ['Comprei lápis borracha, caderno, e régua.', 'Não se usa vírgula antes do “e” final.'], ['Comprei lápis, borracha, caderno, e, régua.', 'Separa o “e” dos itens.']]);
  N('p19', 'pont-dois-pontos', 'média', 'Em “Leve para a prova: lápis, borracha e caneta azul.”, os dois-pontos servem para',
    'anunciar uma lista que explica o que deve ser levado.', 'Os dois-pontos introduzem enumeração ou explicação.',
    [['encerrar a frase com uma ordem.', 'Quem encerra a frase é o ponto final.'], ['indicar uma pergunta.', 'A pergunta usa interrogação.'], ['separar o sujeito do verbo.', 'Não se separa sujeito de verbo.']]);
  QF('p19', 'pont-dialogo', 'difícil', null, 'Observe as frases:\nI. “Que dia lindo!”, disse Ana.\nII. — Você vem comigo? — perguntou Beto.\nIII. Ela ficou calada…\nOs sinais de pontuação usados em I, II e III expressam, respectivamente,',
    [['admiração; pergunta; hesitação ou suspense.', ''], ['pergunta; admiração; fim definitivo da fala.', 'Os sinais não correspondem a esses sentidos.'], ['ordem; dúvida; alegria.', 'Não são essas as funções.'], ['explicação; admiração; hesitação.', 'Em II, o sinal indica pergunta.']], 0,
    'A exclamação marca emoção; a interrogação, pergunta; as reticências, pausa, hesitação ou suspense.');
  N('p19', 'pont-sentido', 'difícil', 'Compare: “Vamos comer, crianças.” e “Vamos comer crianças.” A vírgula muda o sentido porque, na primeira frase,',
    'as crianças são chamadas, e, na segunda, seriam o alimento.', 'A vírgula separa o vocativo; sem ela, “crianças” passa a ser o objeto de “comer”.',
    [['as crianças são o alimento, e, na segunda, são chamadas.', 'Inverte os sentidos das duas frases.'], ['a frase é uma pergunta e, na segunda, uma ordem.', 'Nenhuma é pergunta.'], ['as duas frases têm o mesmo sentido.', 'A vírgula muda totalmente o sentido.']]);

  // Sílabas
  N('p20', 'sil-contagem', 'média', 'Qual das palavras abaixo é trissílaba (tem três sílabas)?',
    'história', 'his-tó-ria tem três sílabas.',
    [['jardim', 'jar-dim tem duas sílabas.'], ['pneu', 'Tem uma sílaba.'], ['saguão', 'sa-guão: duas sílabas.']]);
  N('p20', 'sil-divisao', 'média', 'Assinale a alternativa em que a separação silábica está correta.',
    'car-ro – pas-sa – quei-jo – bi-bli-o-te-ca', 'Os dígrafos “rr” e “ss” separam-se; “quei” é uma só sílaba; “bi-bli-o-te-ca” tem cinco sílabas.',
    [['ca-rro – pa-ssa – quei-jo – bi-bli-o-te-ca', 'Os dígrafos “rr” e “ss” são separados.'], ['car-ro – pas-sa – que-i-jo – bi-bli-o-te-ca', '“Quei” forma uma só sílaba (ditongo).'], ['car-ro – pas-sa – quei-jo – bi-blio-te-ca', 'Há hiato entre “i” e “o”: bi-bli-o-te-ca.']]);
  N('p20', 'sil-classif', 'fácil', 'Quanto ao número de sílabas, a palavra “Paraná” é classificada como',
    'trissílaba.', 'Pa-ra-ná tem três sílabas.',
    [['dissílaba.', 'Tem três sílabas.'], ['monossílaba.', 'Tem três sílabas.'], ['polissílaba.', 'Polissílabas têm mais de três sílabas.']]);
  N('p21', 'tonica-class', 'média', 'Classifique, quanto à posição da sílaba tônica, as palavras “sofá”, “fácil” e “médico”, respectivamente.',
    'oxítona, paroxítona e proparoxítona.', 'So-FÁ (última), FÁ-cil (penúltima) e MÉ-di-co (antepenúltima).',
    [['paroxítona, oxítona e proparoxítona.', 'Troca a classificação das duas primeiras.'], ['oxítona, proparoxítona e paroxítona.', '“Fácil” é paroxítona e “médico” é proparoxítona.'], ['proparoxítona, paroxítona e oxítona.', 'Inverte tudo.']]);
  N('p21', 'tonica-silaba', 'média', 'Em qual alternativa as palavras têm a sílaba tônica na penúltima sílaba (são paroxítonas)?',
    'caderno – mesa – lápis', 'Ca-DER-no, ME-sa e LÁ-pis têm a tônica na penúltima sílaba.',
    [['sofá – café – jacaré', 'São oxítonas.'], ['pássaro – árvore – médico', 'São proparoxítonas.'], ['animal – papel – amor', 'São oxítonas.']]);

  // Grafema/fonema
  N('p22', 'fonema-letras', 'difícil', 'Em qual palavra o número de letras é menor do que o número de fonemas (sons)?',
    'táxi', 'A letra “x” representa dois sons (/ks/): t-a-k-s-i, cinco sons em quatro letras.',
    [['chuva', 'Tem 5 letras e 4 sons, pois “ch” é um único som.'], ['carro', 'Tem 5 letras e 4 sons, pois “rr” é um único som.'], ['queijo', 'Tem 6 letras e 5 sons, pois “qu” é um único som.']]);
  N('p22', 'fonema-digrafo', 'média', 'Assinale a palavra que NÃO apresenta dígrafo.',
    'bola', 'Em “bola” cada letra representa um som.',
    [['chave', 'Tem o dígrafo “ch”.'], ['carro', 'Tem o dígrafo “rr”.'], ['passarinho', 'Tem os dígrafos “ss” e “nh”.']]);
  N('p22', 'fonema-som', 'média', 'Em “casa” e “cassa”, o som representado por “s” e “ss” é, respectivamente,',
    'de /z/ e de /s/, pois o “s” entre vogais soa como “z”.', 'Entre vogais, o “s” tem som de /z/; o “ss” representa o som de /s/.',
    [['de /s/ nos dois casos.', 'Em “casa”, o “s” soa /z/.'], ['de /z/ nos dois casos.', 'Em “cassa”, o “ss” soa /s/.'], ['de /s/ e de /z/, respectivamente.', 'Troca a ordem.']]);

  // Sinônimos e antônimos
  N('p23', 'sinonimo', 'média', 'Em “O prefeito mencionou a reforma da escola”, a palavra “mencionou” pode ser substituída, sem alterar o sentido, por',
    'citou.', '“Mencionar” é sinônimo de citar.',
    [['construiu.', 'Não é sinônimo.'], ['esqueceu.', 'Tem sentido oposto.'], ['proibiu.', 'Não tem relação.']]);
  N('p23', 'antonimo', 'média', 'Qual palavra é antônimo de “escassez”?',
    'abundância.', 'Escassez é falta; abundância é fartura.',
    [['carência.', 'É sinônimo de escassez.'], ['pobreza.', 'Pode ser associada à falta, não à fartura.'], ['necessidade.', 'Aproxima-se de falta.']]);
  N('p23', 'sinonimo-contexto', 'difícil', 'Em “O professor foi veemente ao defender o uso do capacete”, “veemente” pode ser substituído por',
    'enfático.', '“Veemente” indica algo dito com firmeza e intensidade.',
    [['tímido.', 'É o oposto.'], ['distraído.', 'Não tem relação.'], ['indiferente.', 'É o oposto.']]);

  // Sentido literal e figurado
  N('p24', 'figurado-frase', 'média', 'Em qual frase a expressão destacada está em sentido figurado?',
    'Meu avô tem um coração de ouro.', 'A expressão significa que ele é muito bondoso, e não que o coração seja feito de ouro.',
    [['O anel era feito de ouro.', 'O ouro é literal.'], ['O coração bombeia o sangue.', 'Descreve a função do órgão.'], ['O ourives comprou ouro para o anel.', 'Sentido literal.']]);
  N('p24', 'figurado-expressao', 'média', 'Em “Fiquei com a pulga atrás da orelha”, a expressão significa',
    'ficar desconfiado.', 'A expressão popular indica desconfiança ou suspeita.',
    [['ter coceira no corpo.', 'Interpreta literalmente.'], ['sentir muito sono.', 'Não tem esse sentido.'], ['ter dor de ouvido.', 'Não tem esse sentido.']]);

  // Classes de palavras
  N('p25', 'substantivo-coletivo', 'média', 'Qual alternativa apresenta substantivos coletivos?',
    'cardume, matilha, arquipélago.', 'Coletivos designam um conjunto: peixes (cardume), cães (matilha), ilhas (arquipélago).',
    [['peixe, cão, ilha.', 'São substantivos no singular, não coletivos.'], ['grande, forte, bonito.', 'São adjetivos.'], ['correr, nadar, pular.', 'São verbos.']]);
  N('p25', 'substantivo-proprio', 'fácil', 'Em “Júlia visitou Curitiba no verão”, os substantivos próprios são',
    'Júlia e Curitiba.', 'Nomes de pessoa e de cidade são substantivos próprios.',
    [['visitou e verão.', '“Visitou” é verbo.'], ['Júlia e verão.', '“Verão” é substantivo comum.'], ['Curitiba e visitou.', '“Visitou” é verbo.']]);
  N('p25', 'artigo', 'média', 'Em “Uma menina entregou o livro aos colegas”, os artigos são',
    'uma e o.', '“Uma” é artigo indefinido; “o” é artigo definido.',
    [['menina e livro.', 'São substantivos.'], ['entregou e colegas.', 'Verbo e substantivo.'], ['aos e uma.', '“Aos” é a junção da preposição “a” com o artigo “os”.']]);
  N('p25', 'numeral', 'média', 'Na frase “O terceiro aluno da fila comprou dois lápis”, as palavras “terceiro” e “dois” são numerais,',
    'ordinal e cardinal, respectivamente.', '“Terceiro” indica ordem; “dois” indica quantidade.',
    [['cardinal e ordinal, respectivamente.', 'Troca as classificações.'], ['multiplicativo e fracionário.', 'Não indicam multiplicação nem fração.'], ['ambos ordinais.', '“Dois” é cardinal.']]);
  N('p25', 'pronome', 'média', 'Em “Eles trouxeram nossos livros”, os pronomes são, respectivamente,',
    'pessoal e possessivo.', '“Eles” é pronome pessoal; “nossos” indica posse.',
    [['possessivo e pessoal.', 'Inverte a ordem.'], ['demonstrativo e pessoal.', '“Eles” não é demonstrativo.'], ['pessoal e demonstrativo.', '“Nossos” indica posse.']]);
  N('p25', 'pronome-retomada', 'difícil', 'Em “Marta encontrou Joana e lhe entregou o convite”, o pronome “lhe” refere-se a',
    'Joana.', 'Marta entregou o convite à pessoa que encontrou, Joana.',
    [['Marta.', 'Marta é quem entrega.'], ['o convite.', 'O convite é o objeto entregue.'], ['um terceiro personagem não citado.', 'O pronome retoma uma pessoa citada.']]);

  // Verbos
  N('p25', 'verbo-tempo', 'média', 'Em “Ontem choveu, hoje faz frio e amanhã fará sol”, os verbos estão, respectivamente, nos tempos',
    'passado, presente e futuro.', 'Choveu (passado), faz (presente), fará (futuro).',
    [['presente, passado e futuro.', 'Troca as duas primeiras formas.'], ['futuro, presente e passado.', 'Inverte a ordem.'], ['passado, futuro e presente.', 'Troca as duas últimas.']]);
  N('p25', 'verbo-conjugacao', 'média', 'O verbo “vender” pertence à segunda conjugação porque',
    'seu infinitivo termina em “-er”.', 'Verbos em -ar formam a 1ª conjugação; em -er, a 2ª; em -ir, a 3ª.',
    [['seu infinitivo termina em “-ar”.', 'Isso seria a 1ª conjugação.'], ['seu infinitivo termina em “-ir”.', 'Isso seria a 3ª conjugação.'], ['ele não pode ser conjugado.', 'Todos os verbos podem ser conjugados.']]);
  N('p25', 'verbo-concordancia', 'difícil', 'Assinale a frase em que o verbo concorda com o sujeito de acordo com a norma-padrão.',
    'As crianças brincaram na praça.', 'O sujeito plural “As crianças” pede o verbo no plural.',
    [['As crianças brincou na praça.', 'O sujeito plural exige o verbo no plural.'], ['Os meninos chegou cedo.', 'O sujeito plural exige o verbo no plural.'], ['Nós chegou à biblioteca.', '“Nós” exige “chegamos”.']]);
  N('p25', 'verbo-subjuntivo', 'difícil', 'Em “Se eu estudar hoje, irei bem na prova”, o verbo “estudar” está no',
    'futuro do subjuntivo.', 'A forma “estudar” (igual ao infinitivo) é a do futuro do subjuntivo e indica uma ação hipotética no futuro.',
    [['pretérito perfeito do indicativo.', 'O perfeito seria “estudei”.'], ['presente do indicativo.', 'O presente seria “estudo”.'], ['infinitivo impessoal.', 'Aqui, o verbo tem sujeito (“eu”) e indica hipótese.']]);
  N('p25', 'adverbio-classe', 'média', 'Em “O ônibus chegou rapidamente ao terminal”, a palavra “rapidamente” indica',
    'modo.', 'Mostra de que maneira o ônibus chegou.',
    [['tempo.', 'Não informa quando.'], ['lugar.', 'Não informa onde.'], ['intensidade.', 'Não indica grau.']]);

  // Fala, escrita e variação linguística
  N('p14', 'fala-reducao', 'média', 'Na fala informal, é comum dizer “Cê vai?” em vez de “Você vai?”. Isso mostra que',
    'a fala pode reduzir palavras, o que nem sempre ocorre na escrita formal.', 'Na conversa, as palavras costumam ser encurtadas; na escrita formal, mantêm-se as formas completas.',
    [['a fala e a escrita nunca diferem.', 'Diferem em muitas situações.'], ['a palavra “você” deixou de existir.', 'Ela continua usada.'], ['quem fala assim não entende português.', 'É uma variedade de uso comum.']]);
  N('p15', 'variacao-regional', 'média', 'As palavras “mandioca”, “aipim” e “macaxeira” nomeiam o mesmo alimento em diferentes regiões do Brasil. Esse é um exemplo de',
    'variação linguística regional.', 'Cada região usa um nome para o mesmo alimento, sem que um deles seja “errado”.',
    [['erro de ortografia comum.', 'Todas as palavras estão corretas.'], ['linguagem técnica de cientistas.', 'São palavras populares.'], ['palavras de mesmo som e sentidos diferentes.', 'Os sentidos são iguais.']]);
  N('p15', 'variacao-situacao', 'difícil', 'Em uma entrevista formal, qual frase é mais adequada ao contexto?',
    'Gostaria de saber quais são os horários de atendimento.', 'Em situações formais, usa-se linguagem mais monitorada.',
    [['Tô querendo saber os horário aí.', 'Linguagem muito informal.'], ['E aí, mano, qual é o rolê?', 'Gíria e informalidade.'], ['Me vê aí os horário, tá?', 'Informal, com marcas de oralidade.']]);
  N('p14', 'escrita-marca', 'difícil', 'Qual das frases abaixo apresenta uma marca típica da fala informal, e não da escrita formal?',
    'A gente vai sair cedo.', 'O uso de “a gente” em lugar de “nós” é frequente na fala informal.',
    [['Nós sairemos cedo, conforme combinado.', 'Forma típica da escrita formal.'], ['Prezado senhor, informo que sairemos cedo.', 'Linguagem formal.'], ['Os alunos sairão cedo amanhã.', 'Linguagem neutra e formal.']]);
})();
