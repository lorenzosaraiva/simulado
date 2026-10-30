# Rumo ao CPM e CEP

Aplicativo local com preparatórios independentes para ingresso no 6º ano do CPM e do Colégio Estadual do Paraná (CEP).

## Versão 1.11.0 — questões fiéis às provas, Mandela, Paraná e sessões livres

**Banco novo "fiel à prova": 516 questões** (155 Português, 151 Matemática, 68 Ciências, 61 Geografia, 81 História), escritas depois de estudar as provas do CPM Paraná de 2018 a 2025 e o edital do CEP nº 005/2026. Em vez de perguntas de "qual conclusão é mais cuidadosa?", o banco cobra o que as provas cobram: tempos verbais, classes de palavras, acentuação, pontuação, divisão silábica, afirmativas I–IV, verdadeiro ou falso, associação de colunas, mmc e mdc, porcentagem em etapas, volume e capacidade, sistemas do corpo, Sistema Solar, colonização, povos indígenas e africanos, e Paraná. Alternativas erradas são plausíveis e têm extensão parecida com a da correta; o teste do projeto confere que a correta é a mais longa em no máximo 40% dos itens.

- **Livro "Mandela: o africano de todas as cores"** (CEP): 37 questões sobre autoria, gênero, apartheid, prisão e libertação, eleição de 1994, vocabulário, figuras de linguagem e cronologia, com textos autorais inspirados na vida de Mandela e informações da ficha da edição (Pequena Zahar; ilustrações coloridas fora da prisão e em bege, preto e branco de 1962 a 1990; seção "Para compreender melhor"). Nenhuma cena ou citação do livro foi inventada. Todo simulado do CEP traz 2 questões da obra. A aba Mandela tem guia de fatos, treino e diário de leitura. No CPM, o simulado traz 2 questões da leitura recomendada do edital CPM (Edward Tulane).
- **Charges, tirinhas e imagens:** 11 tirinhas e charges, cartazes, anúncio com letras miúdas, aviso, infográfico, gráficos de barras e de setores, tabelas, malhas, figura em L, planificação, vista de cubos, relógio, sequência de palitos, esquemas de ciências (ciclo da água, aquecimento, cadeia alimentar, plantas, Lua, Sistema Solar, sistema digestório, estados da matéria) e **mapas gerados da malha do IBGE** (Brasil por regiões, Paraná com cidades e escala gráfica). 101 questões têm imagem.
- **Paraná e Curitiba:** 77 questões (história e geografia): povos Kaingang e Guarani, Guairá, tropeirismo, emancipação de 1853, erva-mate, Graciosa e ferrovia, imigração, Contestado, Cerco da Lapa, café no norte, Itaipu, relevo, rios, clima, vegetação, Curitiba (vila de 1693, cidade, Rua XV, IPPUC). Todo simulado traz pelo menos 1 questão de História e 1 de Geografia do Paraná.
- **Simulado:** CEP com 30 questões (10/10/4/3/3) e CPM com 35, ambos de questões fiéis; cerca de 50% difíceis, 40% médias e 10% fáceis, para treinar acima do provável. Questões inéditas têm prioridade; o sorteio só repete depois de esgotar o banco (testado: 10 simulados seguidos sem repetição).
- **Sem bloqueios:** com um simulado em andamento é possível treinar por assunto, estudar, ver o Paraná e o Mandela, e abrir qualquer aba. O simulado fica guardado (o relógio continua correndo) e volta pelo início. Cada treino ou simulado em andamento tem seu botão de **Descartar**. **Resultados finalizados podem ser excluídos** do histórico, na tela do resultado, no painel da responsável (CEP) ou no histórico (CPM); as questões voltam a contar como inéditas.
- Matemática de grande volume é gerada por modelos com valores diferentes e conferida por cálculo independente (`tests/fiel-bank.test.js`).

Pacotes: `dist/Rumo-ao-CPM-CEP-1.11.0.exe` e `dist/Rumo-ao-CPM-CEP-1.11.0.apk` (código de versão Android 12, mesma assinatura de desenvolvimento, atualiza a versão instalada).

## Versão 1.10.0 — assuntos e formatos das provas antigas

**118 questões novas**: 28 de Português, 24 de Matemática, 18 de Ciências, 18 de Geografia e 30 de História. Os cadernos paranaenses de 2018 a 2025 orientam conteúdos e formatos: charges, gramática contextualizada, comparação de textos, sequências V/F, associação de colunas, análise de afirmativas, medidas, expressões, dados e sólidos. Cada questão identifica o caderno e os números usados como referência de habilidade e formato. Os textos, desenhos, problemas e alternativas novos são autorais, identificados como criados por IA.

Mais 28 questões de Paraná e Curitiba reforçam formação administrativa, povos indígenas, tropeirismo, erva-mate, imigração, memórias afro-paranaenses, Guairá, Cerco da Lapa, Contestado, relevo, bacias, vegetação e urbanização. O módulo regional CEP tem **64 questões**, 36 de História e 28 de Geografia. Fatos regionais foram confrontados com fontes institucionais. As páginas sobre imigração da Prefeitura trazem uma data divergente para a emancipação; o gabarito usa a lei de 1853 preservada pelo Arquivo Público e a Assembleia. O Cerco da Lapa é tratado como episódio republicano, conforme Patrimônio Cultural, evitando informações conflitantes em outras páginas.

**24 questões anteriores receberam distratores e justificativas revisados**, nas cinco matérias. IDs e alternativas corretas foram preservados. O sorteio favorece os itens alinhados quando disponíveis, respeitando a prioridade de inéditas e a variedade de contextos. Questões com o mesmo texto ou charge compartilham um grupo de leitura para evitar concentração num único estímulo.

Quatro novas charges e 12 diagramas/esquemas sustentam **31 questões ilustradas** desta ampliação, com transcrição acessível, zoom e funcionamento offline. Há 116 questões novas no CEP: duas de Primeiro Reinado/Regência são específicas do CPM e não entram na matriz CEP. Banco CEP total: **616 questões**, 600 difíceis e 16 médias. Os formatos CPM de 35 questões e CEP de 30 continuam independentes.

Pacotes da 1.10.0: `dist/Rumo-ao-CPM-CEP-1.10.0.exe` e `dist/Rumo-ao-CPM-CEP-1.10.0.apk`. Android: código de versão 11, identificador e assinatura de desenvolvimento existentes.

`npm run audit:bank` verifica todos os itens CEP e a correspondência dos novos com o acervo offline; registra a auditoria e o mapa de referências em `artifacts/exam-review/bank-audit.json`. `npm test` inclui os 24 resultados matemáticos recalculados independentemente, a dobra do dado e a rotação. `npm run test:alignment` verifica os 16 SVGs, textos/fontes offline, correção, ampliação e tela de celular nos dois preparatórios. Capturas: `artifacts/exam-review/new-charges.png`, `new-diagrams.png` e `charge-mobile.png`.

## Versão 1.9.0 — questões com imagens

**32 novas questões difíceis com imagens** nos dois preparatórios: 8 Português, 8 Matemática, 6 Ciências, 5 Geografia e 5 História. Quatro charges e tirinhas autorais exploram ironia, crítica, contexto e enquadramento. Gráficos, mapas, planificações, malhas e esquemas entram no raciocínio das outras matérias. Mais 11 questões anteriores receberam ilustrações: **43 questões desta ampliação têm recursos visuais**, com 37 gráficos e desenhos. Funcionam offline, com descrição acessível e botão para ampliar no CPM e CEP; o mapa brasileiro reutiliza a geometria real do IBGE.

Banco CEP atual: **500 questões**, 484 difíceis e 16 médias. Conferir a resposta mantém e bloqueia a alternativa escolhida. `npm run test:visual` verifica imagens e ampliação, funcionamento offline, telas de celular e seleção bloqueada nos dois preparatórios.

## Versão 1.8.0 — Londrina e Porto Alegre

Mais **160 questões autorais** nos dois preparatórios: 50 de Português (25 textos novos), 50 problemas distintos de Matemática, 20 de Ciências, 20 de Geografia e 20 de História. O banco CEP chega a **468 questões**, sendo 452 difíceis e 16 médias. A expansão usa os PDFs estaduais enviados, que incluem Londrina, e os cadernos CMPA 2024/2025 e 2025/2026 do [acervo Cursos Azambuja](https://www.cursosazambuja.com.br/provas-e-gabaritos-cursos-azambuja/1257/colegio-militar-cmpa-fundamental-6-ano). São enunciados próprios inspirados nas habilidades e nos formatos consultados, com fontes identificadas e soluções explicadas.

Há problemas de taxas com início atrasado, ritmo musical, diluição, faces ocultas, vistas de pilhas, média com retirada de dados, probabilidade com restrição, custo real de promoções, comparação de registros históricos e distinção entre evidência e generalização. Português inclui narrativa fantástica, poemas comparados, infográfico, notícia e comentário, cartas, regulamentos e análise contextual da língua. As 280 questões da coleção de desafios possuem 45 textos de Português e 82 famílias de Matemática; o sorteio continua preferindo questões inéditas e distribuindo contextos.

Os PDFs fornecidos são preservados byte a byte no acervo, com gabaritos definitivos correspondentes. O arquivo nomeado 2021 é da seleção **2020/2021**, conforme a capa; o gabarito nomeado 2020 é de **2019/2020**. As provas estaduais já existentes são atualizadas com os arquivos enviados, sem criar cadernos duplicados por cidade. O leitor offline inclui os dois CMPA com gabaritos, totalizando **13 cadernos e 210 páginas de provas**. Referências locais abrem no leitor e também aparecem em Fontes do CEP.

Validação: 41 testes automatizados, incluindo cálculo independente dos 50 novos resultados matemáticos, integridade dos arquivos locais, formatos CPM/CEP, fontes e rotação. A conferência mantém a alternativa marcada e bloqueia novas alterações, inclusive após recarregar; a pontuação não é zerada por consultar a resposta.

## Versão anterior 1.7.0 — variedade e correção

120 questões difíceis novas nos dois preparatórios: 40 de Português com 20 textos distintos, 32 problemas de Matemática, 16 de Ciências, 16 de Geografia e 16 de História. Problemas de lógica, contagem com restrições, proporcionalidade, frações inversas, experimentos, comparação de fontes e leitura de gêneros variados. Textos, cenários e alternativas são autorais; referências de formato consultadas: CPM Pernambuco, CMBH (cópia pública do caderno 2024/2025 em Cursos Azambuja) e Colégio Militar Tiradentes do DF. O acervo offline recebe o caderno completo do CMBH, 32 páginas, e seu gabarito, totalizando 11 cadernos.

O banco CEP tem 500 questões, 484 difíceis e 16 médias. O simulado prioriza 30 difíceis; o diagnóstico mantém níveis variados. Sorteios completos e abandonados contam para a rotação; variedade de habilidades não força repetição de questões vistas enquanto existem inéditas elegíveis. Dentro da sessão, textos e famílias de problemas diferentes recebem prioridade. Filtros com poucos exercícios continuam limitados ao material disponível.

Conferir uma resposta mantém a alternativa escolhida e bloqueia mudanças por clique, teclado, cartão-resposta e recarregamento. O mesmo comportamento vale para os testes das aulas. No CPM, conferir depois de escolher não desconta pontos da tentativa. Resultados antigos e backups permanecem legíveis.

## Conteúdo anterior — CEP

Duas abas independentes, CPM e CEP. Novo estudo específico de Paraná e Curitiba: 36 questões difíceis (18 História e 18 Geografia), quatro textos próprios e dois exemplos resolvidos. Referências enviadas consultadas e divergências conferidas em fontes oficiais. No CEP, revisão por primeira tentativa, confiança e habilidade; 42 aulas em quatro etapas, com exemplo próprio, comparação de alternativas, teste interativo e prática focada. O banco CEP foi integralmente reescrito com 188 questões autorais de interpretação e raciocínio em várias etapas. Treino abre na dificuldade difícil; simulado prioriza 30 difíceis. Há descarte da sessão sem nota e sem alteração dos resultados anteriores. Inclui simulado de 30 questões, diagnóstico, treinos, revisão de confiança, estudo guiado e painel da responsável. Importação de PDF/imagens com OCR local e backup completo. O livro obrigatório permanece pendente de material autorizado. Consulte [CEP-ENTREGA.md](CEP-ENTREGA.md) para fontes consultadas, cobertura real, testes e limites.

Pacotes da 1.10.0: `dist/Rumo-ao-CPM-CEP-1.10.0.exe` e `dist/Rumo-ao-CPM-CEP-1.10.0.apk`.

## Executar em desenvolvimento

```powershell
npm install
npm start
```

## Gerar o executável portátil

```powershell
npm run build
```

O executável será criado em `dist/Rumo-ao-CPM-CEP-1.11.0.exe`.

## Gerar o APK Android

Com Android SDK e Java 17 configurados:

```powershell
npm run icon
npx cap add android
npx capacitor-assets generate --android
npm run android:apk
```

O APK de teste será criado em `android/app/build/outputs/apk/debug/app-debug.apk`.

## Novidades da versão 1.2.0

- A aba **Revisão** mostra erros específicos, alternativa marcada, gabarito e explicação. É possível refazer os erros originais ou treinar até duas outras questões por assunto. O treino só inclui os assuntos errados; quando não há outra questão disponível, indica que está repetindo a original. Acertar a original em um treino posterior remove o erro pendente.
- O sorteio prioriza questões ainda não usadas e evita as dos três últimos treinos quando o banco permite. O registro persiste mesmo ao reiniciar ou abandonar uma prova. O reconhecimento de uma questão considera enunciado e resposta correta, sem depender de IDs gerados pela data.
- A aba **Provas reais** inclui os oito DOCX completos de 2018 a 2025 fornecidos no projeto, com os arquivos originais preservados. O leitor funciona offline, tem paginação e zoom, e mantém textos, charges, figuras e tabelas. Os documentos são lidos integralmente; essa aba não faz correção automática das respostas dos cadernos.
- Foram acrescentados os cadernos completos do [CPM Pernambuco, ingresso 2025](https://www.upenet.com.br/concursos/25_CPM25/) e do [Colégio Militar Tiradentes do DF, ingresso 2026](https://www.colegiomilitartiradentes.com.br/acervo/), acompanhados de gabaritos definitivos. Seus formatos próprios são preservados, incluindo cinco alternativas e questões de certo/errado. Não são convertidos para a matriz do Paraná.
- O banco autoral foi ampliado com textos, charges, perguntas de interpretação, ciências, geografia e história, além de variações de matemática. Todas as questões autorais exibem **⚑ Criada por IA**.
- O DOCX de gabarito de 2025 do Paraná é preliminar. O leitor usa o **gabarito definitivo da instituição**. Também foram recuperados os gabaritos definitivos de 2018 e 2024, que não estavam no acervo fornecido.

Os arquivos finais para distribuição ficam em `dist/Rumo-ao-CPM-1.2.0.apk` e `dist/Rumo-ao-CPM-1.2.0.exe`. O APK usa a assinatura de desenvolvimento do projeto.

## Regenerar o leitor de documentos

Requer Python com PyMuPDF e curl. Execute `python scripts/build-archive.py`. O script preserva os DOCX byte a byte, baixa os PDFs completos publicados pela instituição para evitar problemas de conversão dos documentos, renderiza todas as páginas e gera `web/archive.js` com hashes SHA-256 dos originais. Os PDFs convertidos dos gabaritos locais de 2019 a 2023 ficam em `web/documents`.

## Verificação

`npm test` verifica matriz, gabaritos, alternativas, rotação, treino específico, resolução de erros e integridade dos documentos. `npm run test:e2e`, `npm run test:mobile` e `npm run test:package` verificam a interface e o pacote. Os testes de interface usam perfis temporários separados do histórico do estudante.

## Dados e privacidade

Todo o histórico fica somente no computador, no armazenamento local do aplicativo. A tela de Histórico permite exportar e restaurar um backup JSON. Nenhuma resposta é enviada pela internet. Links de fontes abrem no navegador apenas quando o usuário clica neles.

## Matriz usada

- 15 questões de Língua Portuguesa
- 10 questões de Matemática
- 4 questões de Ciências
- 3 questões de Geografia
- 3 questões de História
- 4 alternativas por questão
- duração sugerida de 3 horas

A matriz e os temas seguem o Anexo A do Edital nº 001/2026 – Processo Classificatório 2027.
