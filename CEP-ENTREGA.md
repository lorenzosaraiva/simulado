# Preparatório CPM e CEP · versão 1.11.0

## Revisão do banco e do aplicativo — 25/10/2026

**Diagnóstico.** O banco anterior (616 itens CEP) rotulava tudo como "difícil", mas a maior parte era de perguntas de raciocínio genérico ("qual conclusão é mais cuidadosa?") com alternativas erradas absurdas ("sempre", "nunca"). Uma criança acertava sem conhecer o conteúdo. Faltavam também o livro de Mandela, charges, gramática, medidas e História do Paraná. As provas reais (CPM Paraná 2018–2025) cobram conteúdo: tempos verbais, classes de palavras, sílabas, V/F, afirmativas I–IV, mmc/mdc, volume, sistemas do corpo, Sistema Solar, colonização e fontes.

**Novo banco "fiel à prova": 516 questões**, em `web/challenge-fiel-*.js`, compartilhado pelos dois preparatórios, com a mesma estrutura do banco anterior (quatro alternativas, justificativa por alternativa, itens do edital). Níveis: fácil, média e difícil (classificação editorial, sem calibração com estudantes). Simulado: ~50% difíceis, 40% médias, 10% fáceis; priorizam-se questões fiéis e ainda não vistas.

| Matéria | Questões | Com imagem |
|---|---|---|
| Português | 155 (36 do livro Mandela, só CEP) | 38 |
| Matemática | 151 | 32 |
| Ciências | 68 | 13 |
| Geografia | 61 | 13 |
| História | 81 (1 sobre Mandela) | 5 |

**Livro obrigatório (CEP).** Pesquisa feita na ficha da editora (Companhia das Letras / Pequena Zahar: 64 páginas, tradução de André Telles, original francês de 2010, selo FNLIJ 2014), em guias do professor e em resenhas: texto de Alain Serres, ilustrações de Zaü, biografia poética de Nelson Mandela, imagens coloridas fora da prisão e em bege/preto e branco entre 1962 e 1990, seção "Para compreender melhor" com palavras-chave, fotos, mapa e cronologia. O texto integral da obra **não está disponível** nem foi reproduzido. As questões usam fatos da biografia de Mandela (nascimento em 1918, apartheid oficializado em 1948, prisão em 1962, condenação em 1964, libertação em 11/02/1990, Nobel em 1993, presidência em 1994, morte em 05/12/2013), informações da ficha e textos autorais inspirados na vida dele, identificados como tal. **Recomenda-se que a responsável confira, com o livro em mãos, as questões que citam a obra** (autoria, gênero, ilustrações, seção final).

**Paraná e Curitiba.** Fatos conferidos em fontes oficiais: lei imperial nº 704 (29/08/1853) e instalação em 19/12/1853 com Zacarias de Góis e Vasconcelos (Agência Estadual de Notícias), vila de Curitiba em 29/03/1693 (Prefeitura), além de conhecimento geral do material escolar do Paraná (tropeirismo, Guairá, imigração, Contestado, Cerco da Lapa, café, Itaipu). Mapas do Paraná e do Brasil são gerados da malha de UFs do IBGE (`scripts/build-fiel-maps.js`), com cidades em coordenadas conhecidas e escala gráfica de 100 km.

**Aplicativo.**
- Treinos, estudo, Mandela, Paraná e revisão funcionam com um simulado em andamento; o simulado fica guardado (até 6 sessões) e retorna pelo início. Descarte individual de simulados e treinos; exclusão de resultados finalizados (CEP: resultado e painel da responsável; CPM: histórico e detalhe).
- CEP: guia da obra na aba Mandela; simulado com 2 questões da obra e ao menos uma de História e uma de Geografia do Paraná; matemática, imagens e tirinhas distribuídas pelo sorteio.
- CPM: simulado de 35 questões com leitura recomendada do edital (Edward Tulane), Paraná, questões oficiais e do novo banco.

**Limites declarados.** Nenhuma questão passou por revisão pedagógica humana independente. A dificuldade é uma escolha editorial. O estilo da prova do CEP de 2026 é desconhecido; as provas antigas usadas como referência são as do CPM Paraná. As imagens são desenhos simples, autorais, sem fotos reais.

**Validação.** `npm test` (inclui `tests/fiel-bank.test.js`: estrutura, ausência de "tell" por tamanho/posição, 100+ resultados matemáticos recalculados de forma independente, composição de simulados, 10 simulados sem repetição), `npm run test:sessions` e os testes de interface existentes, atualizados.

## Versão 1.10.0

## Ampliação e revisão a partir do acervo — 12/10/2026

118 novos itens (28 Português, 24 Matemática, 18 Ciências, 18 Geografia, 30 História), com caderno e numeração de referência de formato em cada questão. Inclui 28 itens regionais e revisão dos distratores de 24 anteriores nas cinco matérias. IDs e gabaritos dessas revisões foram mantidos. A dificuldade foi trabalhada com relações entre informações, conteúdos específicos e alternativas próximas; a classificação é editorial do preparatório, sem calibração estatística com estudantes.

Quatro charges e 12 outros recursos visuais novos aparecem em 31 questões. Tudo funciona no acervo local, com descrição e ampliação. Os textos e ilustrações são próprios. Foram consultados os oito cadernos estaduais do acervo 2018–2025, inclusive as imagens da cópia digitalizada 2020/2021. A correspondência entre as referências e os PDFs efetivamente exibidos é verificada por teste e pelo relatório `artifacts/exam-review/bank-audit.json`.

CEP: 116 itens novos, total de 616 (600 difíceis, 16 médios). Primeiro Reinado e Regência são dois novos exercícios exclusivos do CPM. Regional CEP: 64 itens, sendo 36 História e 28 Geografia. O sorteio mantém prioridade de inéditas e diversidade de leitura, usando a proximidade às provas como critério adicional. Histórico e armazenamento existentes permanecem compatíveis; a primeira tentativa e o bloqueio após conferência continuam verificados.

Fontes factuais adicionais: Arquivo Público do Paraná e Assembleia Legislativa (lei e instalação de 1853), Prefeitura e Câmara de Curitiba (fundação, imigração e ferrovia), Museu Paranaense (Guairá, povos indígenas, erva-mate e memórias afro-paranaenses), Patrimônio Cultural (Cerco da Lapa), IAT (mapas, relevo, bacias e Contestado), IBGE (mapa estadual e vegetação) e Senado (leis abolicionistas). Não foram usados como gabarito a data de emancipação divergente da página municipal de imigração nem o relato de confronto com tropas imperiais em 1894 de uma página metropolitana. As referências completas ficam nos exercícios e no módulo regional.

Entrega: `dist/Rumo-ao-CPM-CEP-1.10.0.exe` e `dist/Rumo-ao-CPM-CEP-1.10.0.apk`. APK com código de versão 11 e assinatura de desenvolvimento do projeto. Testes usam perfis temporários, preservando o histórico real.

O aplicativo existente foi ampliado com duas abas de instituição. O CPM conserva seu banco, acervo e armazenamento anteriores. O CEP tem banco, sessões, histórico, materiais e backups próprios. A seleção da aba também fica salva.

## Executar

`npm start` abre o aplicativo no Windows. Os pacotes ficam em `dist/Rumo-ao-CPM-CEP-1.10.0.exe` e `dist/Rumo-ao-CPM-CEP-1.10.0.apk`. O APK usa a assinatura de desenvolvimento existente, com o mesmo identificador Android e código de versão incrementado para permitir atualização.

## Mudanças na versão 1.9.0

32 novos exercícios difíceis com imagens reais na interface dos dois preparatórios: Português 8 (quatro charges/tirinhas próprias), Matemática 8, Ciências 6, Geografia 5 e História 5. Mais 11 exercícios da versão anterior receberam desenhos sem alterar seus IDs, enunciados, alternativas ou gabaritos. A ampliação totaliza 43 questões ilustradas e 37 recursos visuais; SVGs próprios e mapa do IBGE local funcionam offline. Cada imagem oferece descrição acessível e ampliação, inclusive na revisão CPM. O sorteio normal inclui os novos exercícios.

Validação: 45 testes unitários, com cálculo de área, perímetro e frações a partir das células desenhadas, dobra da planificação em seis faces e conferência de gráficos e setores. Testes de interface verificam charges e diagramas nos dois preparatórios, SVGs válidos, mapa sem acesso à rede, ampliação, celular e preservação da resposta bloqueada. Perfis isolados preservam o histórico real. Capturas em `artifacts/charges-preview.png`, `artifacts/diagrams-preview.png`, `artifacts/science-preview.png` e `artifacts/history-preview.png` permitem conferir os desenhos.

## Mudanças na versão 1.8.0

160 exercícios adicionais compartilhados entre CPM e CEP: 50 Português, 50 Matemática, 20 Ciências, 20 Geografia e 20 História. IDs das 120 questões anteriores são mantidos. Os novos itens usam a coleção `londrina-cmpa`, possuem uma referência identificada, quatro alternativas e justificativas, e entram no sorteio habitual. Português acrescenta 25 textos próprios; Matemática acrescenta 50 problemas com famílias distintas. Nenhum texto literário dos cadernos foi reproduzido nos exercícios autorais.

Fontes consultadas: PDFs locais da seleção estadual que inclui Curitiba e Londrina (arquivo 2021: capa 2020/2021; demais cadernos 2022/2023 até 2025/2026) e [CMPA no Cursos Azambuja](https://www.cursosazambuja.com.br/provas-e-gabaritos-cursos-azambuja/1257/colegio-militar-cmpa-fundamental-6-ano), cadernos 2024/2025 e 2025/2026. Pontos de referência: Londrina 2020/2021, página 4, recorte de área, divisibilidade e expressão decimal; 2022, distinções na escrita e sistemas digestório/ecológico; 2025, questões 1–4, leitura contextual e classes de palavras, 16–25, medidas e sólidos, 26–35, sistemas, mapas e colonização. CMPA 2025/2026: questões 3–8 (ritmo, taxas e geometria), 12–20 (dados, diluição, conjuntos e custo); CMPA 2024/2025: questões 4 e 17 (materiais e cordas), 22–29 (leitura, referenciação, tempos e comparação literária). A numeração orienta a consulta de formato, não atribui os enunciados novos às instituições.

Acervo offline: 13 cadernos, 210 páginas de provas e seus gabaritos. PDFs enviados substituem as cópias estaduais correspondentes no leitor; DOCX anteriores permanecem preservados. O gabarito chamado 2020 corresponde à prova 2019/2020; o chamado 2021 corresponde à prova 2020/2021. Proveniência e hashes dos originais ficam em `web/archive.js`. Referências locais do CEP abrem as páginas numa ampliação, preservando a sessão; CPM usa o leitor de documentos. Minas Gerais e Rio Grande do Sul também têm filtros no acervo.

Validação: 41 testes unitários, incluindo os 50 novos resultados matemáticos recalculados com contas e enumerações independentes, integridade dos PDFs fornecidos, correspondência das fontes locais, unicidade das alternativas e adaptação aos dois bancos. Conferência da resposta continua mantendo a escolha e bloqueando alterações, sem desconto da pontuação CPM. Testes de interface usam perfis isolados do histórico real.

## Mudanças anteriores — versão 1.7.0

120 desafios novos e distintos foram incluídos no CPM e CEP em 06/10/2026: Português 40 (20 textos autorais), Matemática 32, Ciências 16, Geografia 16, História 16. Cada alternativa CEP tem justificativa. O simulado CEP prioriza 30 difíceis; o diagnóstico mantém variedade de níveis. O sorteio usa todas as sessões registradas, inclusive abandonadas, e prefere perguntas novas antes de variedade de habilidades. Contextos compartilhados são distribuídos entre sessões quando o banco permite.

Pesquisa de formato: [caderno CPM Pernambuco 2025](https://www.upenet.com.br/concursos/25_CPM25/Provas/CADERNO%20DE%20PROVA%20FUNDAMENTAL.pdf), [caderno CMBH 2024/2025, cópia em Cursos Azambuja](https://cursosazambuja.com.br/storage/app/media/PROVA%20E%20GABARITOS/2024-25/CMS%20%20FUNDAMENTAL/2024-25-cmbh-fund-matematica-e-portugues.pdf), [acervo Tiradentes DF](https://www.colegiomilitartiradentes.com.br/acervo/) e [referência de treino OBMEP](https://www.obmep.org.br/provas.htm). Pernambuco: comparação de versões, percursos, leitura numérica e contagem; Belo Horizonte: ordens decimais (questão 3), frações com referência ao restante (questão 6), crônica (página impressa 21); DF: metas percentuais e calendário (questões 26–28). Novos enunciados não reproduzem questões ou textos literários desses documentos. O CMBH foi adicionado integralmente ao leitor offline com gabarito, preservando os arquivos da cópia consultada; sua proveniência está identificada. As 32 páginas do caderno são legíveis sem rede.

Conferência mantém a escolha e bloqueia alteração nas questões e testes de aula. Respostas erradas são corrigidas na tela sem apagar a tentativa. No CPM, ver o gabarito depois de escolher não zera a pontuação; consultas continuam registradas. Sessões e resultados anteriores são preservados.

Validação nova: 120 questões válidas nos dois formatos; 32 resultados matemáticos calculados independentemente; oito simulados CEP consecutivos difíceis sem repetição; filtros esgotados e sorteios abandonados; variedade de textos e famílias CPM; bloqueio na interface, teclado, cartão e recarregamento.

## Mudanças anteriores — versão 1.6.0

Módulo Paraná e Curitiba acessível no início, no treino por assunto e nas aulas relacionadas. Inclui 36 novas questões difíceis, 18 de História e 18 de Geografia, quatro textos autorais, dois exemplos resolvidos e três recursos visuais locais em SVG. Exercícios fictícios são identificados; não foram copiados artigos, fotografias ou questões oficiais. Questões entram no banco geral, nos simulados com a matriz preservada e na revisão por primeira tentativa e confiança. As 42 aulas foram preservadas, com aprofundamento de história local, território e ambiente.

Fontes enviadas: [InfoEscola](https://www.infoescola.com/parana/historia-do-parana/) e [Mundo Educação](https://mundoeducacao.uol.com.br/geografia/curitiba.htm), ambas consultadas em 04/10/2026. O app registra as divergências: vila de Paranaguá em 1648 (Prefeitura), Paraná como província em 1853 e estado na República de 1889 (Arquivo Público); dados populacionais sem ano e descrição dos poderes municipais não foram aproveitados. Conferência adicional: Prefeitura de Curitiba (marcos e tropeiros), Agência Estadual de Notícias (Viamão–Sorocaba), Prefeitura (remanescentes florestais) e IPPUC (relevo, clima e bacia do Iguaçu, PDF de 98 páginas). As referências por questão ficam na correção e na página Fontes. Nenhum acesso externo é necessário para resolver os exercícios.

Banco atual: **500 questões — 484 difíceis e 16 médias**. A dificuldade não foi calibrada com uma prova futura do CEP. Revisão humana pedagógica independente continua pendente.

## Revisão e estudo preservados

Revisão e estudo aprofundados: 42 aulas autorais organizadas por grupos de habilidades (87 itens relacionados, literatura obrigatória continua pendente), com explicações específicas, método de resolução, um exemplo explicado, comparação de duas alternativas, armadilha comum, teste interativo e atividade de elaboração. O teste da aula não altera notas de simulados. Aulas agrupadas e exemplos não declaram cobertura integral de todos os subtemas.

Quatro etapas com posição e anotações persistentes. A aula utiliza material próprio separado do banco de questões. O treino específico mostra a quantidade disponível e ainda não respondida antes de começar. Prática guiada avança por dificuldade quando há material disponível.

Revisão com filtros de matéria e tipo, prioridades por erro recorrente, omissão e baixa confiança, acesso à aula relacionada e treino da mesma habilidade. É possível refazer o item e testar em outras questões disponíveis. A primeira escolha e sua confiança são preservadas antes da conferência; uma correção assistida não apaga o erro inicial. Alternativa concorrente e reflexão escrita ficam salvas. Resultados antigos sem primeira tentativa explícita não são tratados como evidência independente quando houve ajuda. Suspensões e correções continuam recalculando as evidências.

O critério de evidência consistente exige pelo menos quatro acertos com certeza em questões diferentes, em ao menos duas sessões, sem pendências nas cinco observações distintas recentes. O app não declara domínio por um acerto ou pela repetição. Sugestões de manutenção usam 7 dias; erros/omissões, 1 dia; confirmação, 3 dias. São escolhas do aplicativo, sem notificações ou calendário externo. Backup inclui aulas, testes, primeiras tentativas, alternativas concorrentes e reflexões; backups anteriores continuam aceitos.

### Banco da versão 1.4.0 preservado

Banco CEP inteiramente substituído: 152 questões novas (136 difíceis e 16 médias). Textos com confronto de evidências e alternativas próximas; problemas com frações do restante, descontos sucessivos, medidas, restrições e cálculos em etapas. Essa dificuldade é uma escolha pedagógica do aplicativo, sem alegar equivalência com a futura prova. Simulado seleciona 25 difíceis e 5 médias (uma média por matéria), e diagnóstico combina mais questões médias. Treino começa em difícil. A divisão é uma escolha do app, não uma distribuição oficial de dificuldade.

“Descartar simulado” aparece na sessão, no cartão-resposta e na sessão salva da tela inicial. Cancelar mantém as respostas; confirmar remove somente a sessão em andamento, de forma persistente e sem nota. Histórico, leitura, materiais e sorteios anteriores são preservados. Sessões e notas antigas mantêm seus enunciados e gabaritos originais, sem aplicar respostas anteriores a novas questões.

## Funcionalidades CEP

- Diagnóstico e simulado: 10 Português, 10 Matemática, 4 Ciências, 3 Geografia e 3 História; 30 questões; alternativas A–D; um ponto por acerto; três horas incluindo revisão e cartão-resposta; sem redação obrigatória. As correções aparecem depois da entrega. O prazo continua contando ao sair; uma sessão vencida é entregue com as respostas salvas.
- Treino por matéria, item de conteúdo, dificuldade e quantidade 5/10/15. Quando há menos itens disponíveis, o total real é informado e nenhuma questão é repetida na sessão. Ao conferir, a escolha permanece marcada e bloqueada, com correção imediata.
- Registro opcional de certeza, dúvida ou chute, marcação para revisão, alteração e limpeza de respostas, navegação por teclado, retorno às questões e recuperação após fechamento ou atualização.
- Revisão de erros, omissões e acertos inseguros; preferência por exercícios novos das mesmas habilidades e manutenção de treinos em todas as matérias.
- Estudo guiado com orientação, exemplo resolvido, exercícios em dificuldade crescente e atividades escritas salvas para leitura da responsável. Produções não recebem nota automática.
- Relatórios de matéria, assunto e habilidade, histórico cronológico, evolução percentual por sessão, tempo ativo aproximado, duração total, puladas e confiança. Tentativas e consultas durante treino são identificadas.
- Contestação abre revisão e suspende a questão sem alterar o gabarito. Questões suspensas ficam fora das métricas, e uma republicação ou correção recalcula resultados anteriores com IDs estáveis.
- PDF e imagens PNG/JPEG/WebP: leitura de texto e OCR local em português, prévia, preservação da página completa e edição. Cada página de prova cria um rascunho; separar as questões e conferir alternativas/gabarito é trabalho da responsável. A extração não valida o conteúdo. Gabaritos, livros e editais são materiais de conferência e não publicam questões automaticamente. Banco JSON também entra como rascunho.
- Editor de dados completos das questões, com origem e metadados. Publicação exige campos válidos e confirmação explícita da conferência pedagógica, do gabarito definitivo quando aplicável e da autorização de reutilização. A validação automática é estrutural; não comprova esses fatos por si só.
- Exportação e restauração de sessão, histórico, rascunhos, revisões, atividades, diário de leitura e materiais locais. No Android, o backup usa o compartilhamento nativo e a restauração usa o seletor de arquivo.

## Banco inicial e revisão

500 questões autorais estáticas: **149 Português, 141 Matemática, 62 Ciências, 74 Geografia, 74 História**. Nenhuma questão de prova oficial foi importada para o banco CEP. Todas estão identificadas como autorais criadas com apoio de IA. Foram revisados enunciados, justificativas e unicidade prevista da resposta na implementação, com verificações estruturais e testes independentes de cálculos e representações. **Não houve revisão pedagógica humana independente.** O painel permite continuar essa revisão.

Cada questão guarda identificador, matéria, assunto, habilidade, itens do edital, dificuldade, texto-base, recurso visual quando pertinente, alternativas com IDs estáveis, resposta correta, explicação de cada alternativa, evidência, origem e status de revisão. O embaralhamento altera a posição das alternativas, preservando os IDs. Há suporte a ordem fixa em questões importadas.

Textos, tirinha, cartazes, gráficos, tabelas, planta fictícia, figuras, malha, fração, caixa, esquemas científicos, linha do tempo e reconstrução histórica são autorais. A reconstrução histórica não se apresenta como fotografia real. Esquemas científicos são identificados como simplificados ou sem escala. O mapa brasileiro usa as 27 geometrias da malha de UFs do IBGE, preservada em `web/cep/br-uf.geojson`. Não foram inventadas fronteiras ou localizações de cidades. Recursos aparecem dentro das questões e permitem ampliação.

## Conteúdo do edital

O Anexo II foi transformado em **88 itens de cobertura**, preservando todos os detalhes da lista fornecida e relacionando os exercícios aos itens. A redação e os temas foram comparados com as páginas 24–28 do PDF oficial. Não foi encontrada diferença de conteúdo nessa consulta.

**87 itens têm ao menos um exercício; isso não constitui cobertura integral de cada subtema.** A interface identifica essa cobertura como parcial. Relações textuais, gêneros, classes gramaticais, representações e atividades de produção precisam continuar sendo ampliados. Nenhum assunto é declarado dominado por um acerto: a interface exige mais evidência e recomenda revisões.

O item sem exercícios é a leitura integral de **“Mandela: o africano de todas as cores”**, de Alain Serres e Zaü. Não foi disponibilizada uma cópia autorizada. O módulo fica pendente, permite importar material autorizado e registrar o diário e a conclusão da leitura. A conclusão registrada não aprova exercícios nem completa Literatura. Questões sobre a obra exigem material local, edição, página e evidência, além da revisão da responsável. Nenhuma cena, citação ou ilustração da obra foi inventada ou copiada.

## Fontes realmente consultadas

Consulta em **03/10/2026**:

- [Edital CEP nº 005/2026](https://www.cep.pr.gov.br/sites/cep/arquivos_restritos/files/documento/2026-10/edital_0052026_edital_6_ano_fundamental.pdf): 29 páginas, cópia local em `web/documents/cep-edital-005-2026.pdf`. Formato nas páginas 14–15; Anexo II nas páginas 24–28. A primeira abertura direta do leitor web falhou; a abertura pelo link da página e o download local funcionaram.
- [Editais CEP 2027](https://www.cep.pr.gov.br/Pagina/EDITAIS-ANO-LETIVO-2027): página consultada; não foi identificada atualização para o 6º ano nessa consulta. A verificação não é contínua. A responsável pode abrir a página e importar comunicados manualmente.
- [Processos CPM Londrina](https://cpmlondrina.com.br/processo-classificatorio/) e [acervo CPM Londrina](https://cpmlondrina.com.br/caderno-de-provas/): páginas consultadas como referências de preparação de outra instituição.
- [Caderno CPM 2025/2026](https://cpmlondrina.com.br/wp-content/uploads/2025/12/EF-v-11-11.cdr-ensino-fundamentalpdf-1764547187.pdf), 11 páginas; [2024/2025](https://cpmlondrina.com.br/wp-content/uploads/2024/12/ensino-fundamentalpdf-24-25pdf-1732488271.pdf), 10 páginas; [2018](https://cpmlondrina.com.br/wp-content/uploads/2018/01/caderno-de-prova-ensino-fundamental-2o-cpm.pdf), 8 páginas: documentos abertos e consultados; nenhuma questão reproduzida no banco CEP. O acervo CPM anterior permanece na aba CPM.
- [CMC, Cursos Azambuja](https://cursosazambuja.com.br/provas-e-gabaritos-cursos-azambuja/544/colegio-militar-de-curitiba-cmc): página de acervo consultada; cadernos individuais não extraídos ou importados para CEP.
- [Gabaritos da Prova Paraná](https://www.provaparana.pr.gov.br/Pagina/Gabaritos): página consultada; nenhum gabarito usado isoladamente.
- [Malha de UFs IBGE](https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo%2Bjson&qualidade=minima&intrarregiao=UF): dados obtidos para gerar o mapa local.
- [História territorial de Curitiba, IBGE](https://www.ibge.gov.br/biblioteca/visualizacao/dtb/parana/curitiba.pdf): o leitor web retornou 403, mas o download direto funcionou. O PDF foi lido localmente e preservado em `web/documents/ibge-curitiba.pdf`.
- [História de Curitiba, Prefeitura](https://www.curitiba.pr.gov.br/conteudo/historia-fundacao-e-nome-da-cidade/207), [Informações Quilombolas, Fundação Palmares](https://www.gov.br/palmares/pt-br/departamentos/protecao-preservacao-e-articulacao/informacoes-quilombolas/) e [Terra, NASA Space Place](https://spaceplace.nasa.gov/all-about-earth/en/): referências consultadas para conferência factual; não foram copiadas ilustrações nem textos extensos dessas páginas.

## Persistência e limites

Progresso CEP em `localStorage`, chave `rumoCep.v1`; imagens importadas em IndexedDB `rumoCepAssets`. CPM continua usando suas próprias chaves. Não há conta, sincronização ou envio de respostas. Remover os dados do app ou mudar de aparelho pode apagar o progresso: exporte backups. Falhas de armazenamento são avisadas.

Não há serviço de IA configurado nem chave de API. O banco estático e a importação funcionam sem acesso externo durante o treino. O conteúdo importado depende de conferência manual e autorização de reutilização. Atualizações do edital são preservadas como material de consulta; não modificam silenciosamente a configuração do simulado.

## Verificação

- `npm test`: banco e matriz CEP/CPM, alternativas, IDs, revisão, suspensão e recálculo, cálculos e visuais, integridade do acervo anterior.
- `npm run test:cep`: fluxo CEP real no Electron com perfil temporário — entrega, respostas puladas, alteração no cartão, recuperação, confiança, revisão, layout móvel, edital offline, PDF, OCR e backup com imagens.
- `npm run test:e2e` e `npm run test:mobile`: regressões do CPM, incluindo layout de 390 × 844.
- `npm run test:study`: fluxo das quatro etapas, teste sem gabarito antecipado, primeira resposta, dúvida entre alternativas, revisão focada, reflexão, filtros salvos, celular e backup.
- `npm run test:regional`: módulo Paraná e Curitiba, referências, filtros, textos, imagens ampliadas, primeira tentativa, recuperação, revisão e bloqueio de estudo durante simulado. 32 testes unitários passaram; testes de CEP, estudo e regional passaram. Os arquivos incluídos no ASAR e no APK foram comparados com o código validado.
- `npm run test:package`: verifica o pacote Windows com ambas as instituições e o edital local CEP.

O teste de layout móvel usa um viewport no Electron. O APK é compilado; isso não equivale a teste de OCR e importação em um aparelho Android físico.
