(function () {
  'use strict';
  const subjects = { portugues: 'Português', matematica: 'Matemática', ciencias: 'Ciências', geografia: 'Geografia', historia: 'História' };
  const coverage = [];
  function group(subject, prefix, section, page, lines) {
    lines.split('\n').forEach((label, index) => coverage.push({ id: `${prefix}${String(index + 1).padStart(2, '0')}`, subject, section, page, label }));
  }
  group('portugues', 'p', '1.1–1.4', 24, `Compreensão global, identificação do tema e da finalidade de textos de diferentes gêneros.
Localização de informações explícitas.
Inferência de informações implícitas a partir de elementos do texto.
Inferência do significado de palavras e expressões pelo contexto.
Relações de causa e consequência, finalidade, comparação, oposição, sequência e explicação.
Reconhecimento de diferentes pontos de vista.
Distinção entre fatos, opiniões e interpretações.
Interpretação de linguagem verbal, visual, gráfica e multissemiótica: quadrinhos, tirinhas, cartazes, anúncios, infográficos, fotografias e outros.
Efeitos de humor, ironia e sentido produzidos por escolhas linguísticas e visuais.
Reconhecimento das características e finalidades de biografias, contos, fábulas, crônicas, poemas, quadrinhos, tirinhas, notícias, reportagens, textos informativos e científicos de divulgação, cartas, bilhetes, mensagens, anúncios, campanhas, verbetes, instruções, regras e textos de opinião adequados à faixa etária.
Leitura e compreensão de textos literários.
Personagens, narrador, tempo, espaço, situação inicial, conflito, desenvolvimento e desfecho.
Leitura integral de “Mandela: o africano de todas as cores”, de Alain Serres e Zaü.
Relação entre fala e escrita.
Variação linguística e diversidade das formas de falar e escrever, considerando situações de uso.
Ortografia e convenções da escrita.
Maiúsculas e minúsculas.
Acentuação gráfica de palavras de uso frequente.
Pontuação e seus efeitos de sentido.
Sílaba, divisão silábica e classificação pelo número de sílabas.
Sílaba tônica e classificação quanto à tonicidade.
Relações entre grafemas e fonemas.
Sinônimos e antônimos.
Sentidos literal e figurado.
Reconhecimento e uso de substantivos, adjetivos, artigos, numerais, pronomes e verbos em leitura e produção textual.`);
  group('matematica', 'm', '2.1–2.5', 25, `Sistema de numeração decimal.
Leitura, escrita, composição, decomposição, comparação e ordenação de números naturais e racionais.
Valor posicional dos algarismos.
Naturais e racionais em diferentes representações.
Adição, subtração, multiplicação e divisão com naturais.
Resolução e elaboração de situações-problema envolvendo as quatro operações.
Múltiplos e divisores.
Pares e ímpares.
Frações: significado, representação, comparação e equivalência.
Decimais: leitura, escrita, comparação, ordenação e representação.
Operações com decimais em situações-problema.
Porcentagem em situações cotidianas: comparação, desconto, acréscimo e parte de um todo.
Regularidades e padrões em sequências numéricas e figurais.
Igualdade e equivalência.
Padrões e relações entre números e quantidades.
Problemas envolvendo proporcionalidade.
Localização e movimentação de pessoas e objetos.
Reconhecimento, classificação e características de figuras planas.
Reconhecimento, classificação e características de sólidos geométricos.
Diferentes vistas de objetos tridimensionais.
Comprimento, massa, capacidade, tempo e temperatura.
Perímetro.
Área por composição e decomposição de figuras e unidades de medida.
Noções de volume em situações concretas.
Sistema monetário brasileiro: valores, troco, comparação de preços e planejamento de gastos.
Leitura e interpretação de tabelas e gráficos.
Identificação e interpretação de dados cotidianos.
Probabilidade simples.
Organização, representação e análise de dados.`);
  group('ciencias', 'c', '3.1–3.4', 26, `Estados físicos e mudanças de estado.
Ciclo da água e sua importância para a vida.
Uso consciente da água e conservação dos recursos naturais.
Características gerais dos seres vivos.
Vertebrados e invertebrados.
Características e funções das principais estruturas das plantas.
Biodiversidade e sua importância.
Organização e funcionamento integrado do corpo.
Principais sistemas e suas relações.
Alimentação, nutrientes e hábitos saudáveis.
Prevenção de doenças.
Sistema Solar e seus principais componentes.
Sol, Terra, Lua e outros corpos celestes.
Movimentos da Terra e fenômenos observáveis relacionados.`);
  group('geografia', 'g', '4.1–4.4', 27, `Lugar, paisagem, território e espaço geográfico.
Relações entre sociedade e natureza.
Localização e características gerais do Brasil.
Paraná: localização, organização territorial e características naturais e sociais.
Curitiba e sua inserção no Paraná e no Brasil.
Relevo, clima, vegetação e hidrografia.
Preservação e conservação ambiental.
Leitura e interpretação de mapas.
Título, legenda, orientação, escala e símbolos dos mapas.
Pontos cardeais e colaterais.`);
  group('historia', 'h', '5.1–5.4', 28, `Tempo histórico e cronológico.
Sequência e duração dos acontecimentos.
Fontes históricas: documentos escritos, imagens, objetos, relatos orais, construções, registros e outras evidências.
Diversidade cultural e modos de vida de diferentes sociedades.
Povos indígenas antes e durante a chegada dos europeus.
Colonização portuguesa e organização da sociedade colonial.
Povos africanos, diáspora africana e escravização no Brasil.
Resistências e formas de organização das populações indígenas e africanas.
Formação histórica do Paraná.
Formação histórica de Curitiba.`);
  // Physical PDF pages and printed page numbers are equal in this document.
  coverage.forEach(item => {
    if (item.id.startsWith('p') && Number(item.id.slice(1)) >= 14) { item.section = '1.4'; item.page = 25; }
    else if (item.id.startsWith('p')) item.section = Number(item.id.slice(1)) <= 9 ? '1.1' : item.id === 'p10' ? '1.2' : '1.3';
    if (item.id.startsWith('m')) { const n = Number(item.id.slice(1)); item.section = n <= 12 ? '2.1' : n <= 16 ? '2.2' : n <= 20 ? '2.3' : n <= 25 ? '2.4' : '2.5'; if (n >= 13) item.page = 26; }
    if (item.id.startsWith('c')) { const n = Number(item.id.slice(1)); item.section = n <= 3 ? '3.1' : n <= 7 ? '3.2' : n <= 11 ? '3.3' : '3.4'; item.page = n <= 3 ? 26 : 27; }
    if (item.id.startsWith('g')) { const n = Number(item.id.slice(1)); item.section = n <= 2 ? '4.1' : n <= 5 ? '4.2' : n <= 7 ? '4.3' : '4.4'; }
    if (item.id.startsWith('h')) { const n = Number(item.id.slice(1)); item.section = n <= 3 ? '5.1' : n === 4 ? '5.2' : n <= 8 ? '5.3' : '5.4'; }
  });
  window.CEP_COVERAGE = { subjects, coverage, distribution: { portugues: 10, matematica: 10, ciencias: 4, geografia: 3, historia: 3 }, checkedAt: '03/10/2026', differences: 'Nenhuma diferença de conteúdo identificada entre a lista fornecida e o Anexo II consultado. A redação da lista foi preservada. Contagem de exercícios não comprova domínio nem cobertura de todos os detalhes de um item.' };
})();
