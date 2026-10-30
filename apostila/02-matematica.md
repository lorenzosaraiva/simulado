# 3. Matemática

**CPM e CEP.** Um problema exige duas decisões: descobrir qual relação existe entre as quantidades e executar o cálculo. Não escolha uma operação só por uma palavra. “A mais” pode indicar comparação, e “dividir” pode exigir saber quantos grupos cabem, não apenas repartir entre pessoas.

Base: [E1], Anexo A; [E2], Anexo II, 2.1–2.5. Referências de habilidades: CPM 2018, questões 11–20; CPM 2020/2021, questões 13–24; CPM 2025/2026, questões 16–25. Todos os valores dos exemplos abaixo são próprios desta apostila.

## 3.1 Sistema decimal e quatro operações

Nosso sistema de numeração é **decimal e posicional**. Cada posição vale dez vezes a posição à direita. Em 48.307, temos 4 dezenas de milhar, 8 unidades de milhar, 3 centenas, 0 dezenas e 7 unidades. O algarismo 8 vale 8.000; não vale apenas 8.

Uma decomposição é 48.307 = 40.000 + 8.000 + 300 + 7. A ausência de dezenas é marcada pelo zero. As **ordens** são unidades, dezenas, centenas e assim por diante. As **classes** agrupam três ordens: unidades simples, milhares, milhões.

Para comparar naturais com quantidades diferentes de algarismos, o número com mais algarismos é maior, desconsiderando zeros à esquerda. Com a mesma quantidade, compare da esquerda para a direita: 45.807 > 45.780 porque, na primeira ordem diferente, 8 centenas é maior que 7 centenas.

| Operação | Relações frequentes | Como conferir |
| --- | --- | --- |
| Adição | Juntar quantidades ou acrescentar | Subtraia uma parcela da soma para recuperar a outra |
| Subtração | Retirar, comparar ou descobrir quanto falta | Some a diferença ao subtraendo |
| Multiplicação | Grupos de mesmo tamanho, disposição em linhas e colunas ou combinações | Divida o produto por um fator não nulo |
| Divisão | Repartir em partes iguais ou descobrir quantos grupos cabem | Dividendo = divisor × quociente + resto |

Na divisão de naturais, o resto deve ser menor que o divisor. Em 157 ÷ 12, o quociente inteiro é 13 e o resto é 1, pois 12 × 13 + 1 = 157. O problema decide o significado do resto: se 157 pessoas viajam em veículos de 12 lugares, são necessários **14 veículos**, mesmo que o último não fique cheio.

::: Exemplo resolvido — dinheiro arrecadado
Uma feira vendeu 136 ingressos por R$ 8,00 cada. Gastou R$ 275,00 em materiais. Quanto restou?

Arrecadação: 136 × 8 = 1.088 reais. Depois do gasto: 1.088 − 275 = 813 reais. Resposta: **R$ 813,00**. Subtrair 275 de 136 misturaria quantidade de ingressos com dinheiro.
:::

Use estimativas para detectar erros: 136 × 8 é um pouco maior que 1.000. Se a conta der 108,8 ou 10.880, revise o valor posicional. Estimar ajuda a conferir; não substitui o valor exato quando ele é pedido.

## 3.2 Expressões, operações inversas e raciocínio

Em uma expressão numérica, resolva primeiro os agrupamentos, começando pelos mais internos. Depois faça multiplicações e divisões na ordem em que aparecem, da esquerda para a direita. Por fim, adições e subtrações também da esquerda para a direita.

**Não existe prioridade da multiplicação sobre a divisão**, nem da adição sobre a subtração. Elas têm a mesma prioridade dentro de cada par. Em 36 ÷ 6 × 2, calculamos 6 × 2 = 12. Fazer primeiro 6 × 2 mudaria o resultado indevidamente.

::: Exemplo resolvido — acompanhar a ordem
Expressão: 72 ÷ [3 × (8 − 4)] + 5 × 2.

Parênteses: 8 − 4 = 4. Colchetes: 3 × 4 = 12. A expressão fica 72 ÷ 12 + 5 × 2. Efetuando divisão e multiplicação, temos 6 + 10 = **16**.
:::

As operações inversas ajudam a descobrir valores desconhecidos. Se um número somado a 37 resulta em 92, o número é 92 − 37 = 55. Se cinco caixas iguais contêm 85 peças, cada caixa tem 85 ÷ 5 = 17 peças.

Em uma igualdade, os dois lados têm o mesmo valor. Alterar só um lado geralmente desfaz a igualdade. De 3 × 12 = 36, podemos obter 3 × 12 + 4 = 36 + 4. Essa ideia também ajuda a conferir problemas com um quadrinho no lugar de um número.

Em contas com algarismos apagados, trabalhe por coluna e considere o reagrupamento. Na subtração, “emprestar” uma dezena transforma-a em dez unidades, alterando também a coluna vizinha. Ao terminar, use a operação inversa para conferir toda a conta.

## 3.3 Múltiplos, divisores, MMC e MDC

Um **múltiplo** de um natural é obtido por multiplicação por um natural. Múltiplos de 6: 0, 6, 12, 18, 24... Um **divisor** de um natural positivo produz divisão com resto zero. Divisores de 12: 1, 2, 3, 4, 6 e 12.

Um número é **par** se é divisível por 2; termina em 0, 2, 4, 6 ou 8. É **ímpar** se não é divisível por 2. Um número **primo** é maior que 1 e tem exatamente dois divisores naturais positivos: 1 e ele mesmo. Assim, 2 é primo e é o único primo par. O número 1 não é primo.

| Divisibilidade | Como testar | Exemplo |
| --- | --- | --- |
| Por 2 | Último algarismo par | 348 é divisível por 2 |
| Por 3 | Soma dos algarismos divisível por 3 | 342: 3 + 4 + 2 = 9 |
| Por 4 | Número formado pelos dois últimos algarismos divisível por 4 | 1.316: 16 é divisível por 4 |
| Por 5 | Termina em 0 ou 5 | 735 é divisível por 5 |
| Por 6 | É divisível por 2 e por 3 | 342 passa nos dois testes |
| Por 9 | Soma dos algarismos divisível por 9 | 729: 7 + 2 + 9 = 18 |
| Por 10 | Termina em 0 | 1.250 é divisível por 10 |

O **MMC**, mínimo múltiplo comum, é o menor múltiplo positivo comum aos números dados. Ajuda em reencontros de ciclos e na construção de denominadores comuns. O **MDC**, máximo divisor comum, é o maior divisor positivo comum. Ajuda em repartições do maior tamanho possível sem sobra.

Na fatoração, 18 = 2 × 3² e 24 = 2³ × 3. Para o MMC, use os fatores presentes com os maiores expoentes: 2³ × 3² = 72. Para o MDC, use os fatores comuns com os menores expoentes: 2 × 3 = 6. Se ainda não estudou potências, leia 3² como 3 × 3.

::: Exemplo resolvido — reencontro de horários
Dois sinais tocaram juntos às 9h. Um toca a cada 12 minutos, outro a cada 18 minutos. Os múltiplos positivos comuns começam em 36. Portanto, tocarão juntos novamente **às 9h36**. Procuramos um intervalo que contenha um número inteiro de ciclos dos dois sinais.
:::

::: Exemplo resolvido — maior grupo sem sobra
Há 48 cartões azuis e 60 amarelos. Queremos formar o maior número de kits idênticos, usando todos os cartões. O número de kits deve dividir 48 e 60: MDC(48, 60) = 12. São **12 kits**, cada um com 4 azuis e 5 amarelos. Se o comando pedisse a maior quantidade de cartões de uma única cor por pacote, seria necessário reinterpretar as condições.
:::

MMC e MDC estão explicitados no CPM. O CEP exige múltiplos e divisores; compreender os problemas acima fortalece esse conhecimento, sem transformar toda questão em uma escolha automática entre duas siglas.

## 3.4 Frações: significado, comparação e operações

Uma fração a/b, com b diferente de zero, pode representar partes de um inteiro dividido em partes **iguais**, uma divisão ou uma relação entre quantidades. Em 3/4, o denominador 4 informa o total de partes iguais; o numerador 3 informa quantas foram consideradas.

O inteiro de referência importa. Metade de uma pizza pequena pode ser menor que um quarto de uma pizza muito grande. Para comparar apenas as frações, o inteiro deve ser o mesmo.

Frações **equivalentes** representam o mesmo número. Multiplicar ou dividir numerador e denominador pelo mesmo número não nulo preserva o valor: 3/4 = 6/8 = 9/12. Simplificar 18/24 por 6 dá 3/4. Não se deve somar o mesmo número aos dois termos esperando conservar a fração.

@figure fracoes As duas barras têm o mesmo tamanho. Pintar 3 de 4 partes ou 6 de 8 partes representa a mesma quantidade.

Com denominadores iguais, a maior fração tem maior numerador. Com numeradores iguais e positivos, a maior fração tem menor denominador: 3/5 > 3/8. Em outros casos, use equivalência: 5/6 = 10/12 e 3/4 = 9/12, então 5/6 > 3/4.

### Operar com frações — aprofundamento CPM

Na **adição e subtração**, as partes precisam ter o mesmo tamanho. Assim, 2/3 + 1/4 = 8/12 + 3/12 = 11/12. Não some os denominadores: 2/3 + 1/4 não é 3/7.

Na **multiplicação**, multiplique numeradores e denominadores: 2/3 × 3/5 = 6/15 = 2/5. Essa operação pode significar “uma parte de uma parte”. Na **divisão por uma fração não nula**, multiplique pelo inverso: 3/4 ÷ 1/2 = 3/4 × 2/1 = 3/2. A pergunta é quantas metades cabem em três quartos: uma metade e mais meia metade.

Para obter uma fração de uma quantidade, divida pelo denominador e multiplique pelo numerador. Três quintos de 120: 120 ÷ 5 × 3 = 72. Se você conhece a parte e procura o todo, faça o raciocínio inverso.

::: Exemplo resolvido — descobrir o total
Uma turma leu 24 livros, correspondentes a 3/5 da meta. Se 3 partes valem 24, uma parte vale 24 ÷ 3 = 8. Cinco partes valem 8 × 5 = **40 livros**. Calcular 3/5 de 24 encontraria uma parte dos livros já lidos, não a meta.
:::

Uma fração pode ser maior que 1: 7/4 = 1 inteiro e 3/4. Em uma situação de consumo, 7/4 de uma garrafa significa uma garrafa inteira e mais três quartos de outra, não uma parte impossível de uma só garrafa.

## 3.5 Decimais, dinheiro e relação com frações

À direita da vírgula vêm décimos, centésimos e milésimos. Em 4,275, o 2 vale 2/10, o 7 vale 7/100 e o 5 vale 5/1.000. Zeros finais depois da vírgula não alteram o valor: 0,5 = 0,50 = 0,500. Zeros colocados entre a vírgula e um algarismo podem alterar: 0,5 é diferente de 0,05.

Para comparar 2,7 e 2,65, escreva 2,70 e 2,65. Como 70 centésimos é maior que 65 centésimos, 2,7 > 2,65. Ter mais casas decimais não significa ter maior valor.

Na soma e subtração, alinhe as vírgulas e as ordens: 8,4 − 2,75 = 8,40 − 2,75 = 5,65. Na multiplicação, calcule como inteiros e conte as casas decimais dos fatores: 1,2 × 0,35 = 0,420 = 0,42.

Na divisão com divisor decimal, multiplique **dividendo e divisor** pela mesma potência de 10 até tornar inteiro o divisor. Em 4,5 ÷ 0,15, multiplicar ambos por 100 produz 450 ÷ 15 = 30. Mudar só um deles altera o quociente.

| Fração | Decimal | Porcentagem |
| --- | --- | --- |
| 1/2 | 0,5 | 50% |
| 1/4 | 0,25 | 25% |
| 3/4 | 0,75 | 75% |
| 1/5 | 0,2 | 20% |
| 1/10 | 0,1 | 10% |
| 1/8 | 0,125 | 12,5% |

Para converter fração em decimal, divida o numerador pelo denominador. Para converter um decimal finito em fração, use 10, 100, 1.000 conforme as casas e simplifique: 0,375 = 375/1.000 = 3/8. Nem toda fração produz um decimal finito: 1/3 = 0,333..., com repetição indefinida. Escrever apenas 0,33 é uma aproximação, não o valor exato de 1/3.

::: Exemplo resolvido — compra e troco
Foram comprados 2,4 kg de fruta a R$ 6,50 por kg. Custo: 2,4 × 6,50 = **R$ 15,60**. Com pagamento de R$ 20,00, o troco é 20,00 − 15,60 = **R$ 4,40**. O preço por quilograma deve ser multiplicado pela massa comprada.
:::
## 3.6 Porcentagem e proporcionalidade

**Porcentagem** significa uma razão com base 100. Assim, 15% = 15/100 = 0,15. Para calcular 15% de 240, faça 0,15 × 240 = 36. Uma estratégia mental é somar 10% e 5%: 24 + 12 = 36.

Em um **desconto**, subtraia o valor calculado do preço original. Em um **acréscimo**, some. Um produto de R$ 240,00 com 15% de desconto custa 240 − 36 = R$ 204,00. Com acréscimo de 15%, custaria R$ 276,00.

O percentual depende da **base de cálculo**. Um aumento de 20% seguido de desconto de 20% não volta ao preço inicial. Se o preço era 100, passa a 120; 20% de 120 é 24; depois do desconto, fica 96. Na segunda etapa, o inteiro de referência mudou.

::: Exemplo resolvido — quanto falta abastecer?
Um tanque de 48 L está com 25% da capacidade ocupada. A quantidade presente é 48 × 0,25 = 12 L. Faltam 48 − 12 = 36 L. A R$ 6,40 por litro, completar o tanque custa 36 × 6,40 = **R$ 230,40**. Pagar por 48 L ignoraria o combustível que já estava nele.
:::

Duas grandezas são **diretamente proporcionais** quando multiplicar uma por um fator multiplica a outra pelo mesmo fator, mantendo constante a razão. Se 4 cadernos iguais custam R$ 28,00, cada um custa R$ 7,00; 9 custam R$ 63,00, se o preço unitário permanecer igual.

Nem toda relação é proporcional. Se uma corrida custa R$ 8,00 de taxa fixa mais R$ 3,00 por quilômetro, 2 km custam R$ 14,00 e 4 km custam R$ 20,00. Dobrar a distância não dobra o custo total por causa da taxa fixa.

Algumas relações são **inversas** sob condições específicas. Duas torneiras idênticas, funcionando juntas com a mesma vazão, podem encher um reservatório em metade do tempo de uma só. É necessário manter o volume e as condições. Não aplique essa ideia automaticamente a trabalhadores, máquinas ou situações com interrupções.

Para comparar preços, encontre o custo por unidade. Um pacote com 750 g por R$ 12,00 custa R$ 16,00 por kg. Outro com 1 kg por R$ 15,00 tem menor preço por kg. O pacote com menor preço total nem sempre oferece a melhor relação entre quantidade e preço.

## 3.7 Grandezas e conversão de unidades

Uma medida reúne número e unidade. O número 5, sozinho, não informa se falamos de metros, litros ou minutos. Antes de operar com medidas da mesma grandeza, transforme-as para uma unidade comum.

| Grandeza | Relações importantes | Aplicação |
| --- | --- | --- |
| Comprimento | 1 km = 1.000 m; 1 m = 10 dm = 100 cm = 1.000 mm | 2,35 m = 235 cm |
| Massa | 1 t = 1.000 kg; 1 kg = 1.000 g; 1 g = 1.000 mg | 0,45 kg = 450 g |
| Capacidade | 1 L = 1.000 mL; 1 kL = 1.000 L | 750 mL = 0,75 L |
| Área | 1 m² = 10.000 cm²; 1 km² = 1.000.000 m²; 1 ha = 10.000 m² | 0,7 m² = 7.000 cm² |
| Volume | 1 m³ = 1.000 dm³ = 1.000.000 cm³ | 0,06 m³ = 60.000 cm³ |
| Volume e capacidade | 1 dm³ = 1 L; 1 cm³ = 1 mL; 1 m³ = 1.000 L | 60.000 cm³ = 60 L |
| Tempo | 1 h = 60 min; 1 min = 60 s; 1 dia = 24 h | 1 h 25 min = 85 min |

Na sequência km, hm, dam, m, dm, cm, mm, cada passo entre unidades de **comprimento** muda por fator 10. Para unidades quadradas, o fator por passo é 100; para unidades cúbicas, 1.000. Isso acontece porque a conversão envolve duas ou três dimensões.

::: Exemplo resolvido — por que área não converte por 100?
Um quadrado de lado 1 m tem lado 100 cm. Sua área é 1 × 1 = 1 m², mas também 100 × 100 = **10.000 cm²**. Converter o lado e converter a superfície são operações diferentes.
:::

### Tempo e temperatura

Em horários, conte intervalos. De 13h45 a 16h10: de 13h45 a 14h são 15 min; até 16h, 2 h; depois, 10 min. Duração total: **2 h 25 min**. Escrever 2,25 h significaria 2 horas e um quarto de hora, isto é, 2 h 15 min. Minutos não são centésimos de hora.

Em uma soma de durações, 60 min formam 1 h. Assim, 1 h 45 min + 2 h 30 min = 3 h 75 min = **4 h 15 min**. Na subtração, transforme uma hora em 60 minutos quando necessário.

A escala Celsius pode representar temperaturas abaixo de zero. De −2 °C a 7 °C há aumento de 9 °C: 2 graus até zero e mais 7. Não confunda a temperatura final com a variação.

## 3.8 Figuras planas, sólidos e localização

Uma **figura plana** tem duas dimensões. Um **sólido geométrico** ocupa espaço e tem três dimensões. O desenho de uma caixa no papel representa um sólido, mas o retângulo de uma face é uma figura plana.

**Polígonos** são figuras planas fechadas formadas por segmentos de reta que não se cruzam no contorno simples estudado aqui. Triângulo tem 3 lados; quadrilátero, 4; pentágono, 5; hexágono, 6; heptágono, 7; octógono, 8. Círculos não são polígonos.

Quanto aos lados, um triângulo pode ser equilátero (três iguais), isósceles (pelo menos dois iguais) ou escaleno (três diferentes). Alguns materiais usam “isósceles” para exatamente dois lados iguais; se a questão explicitar essa convenção, respeite-a. Quanto aos ângulos, pode ser acutângulo (três agudos), retângulo (um reto) ou obtusângulo (um obtuso). As classificações por lados e por ângulos podem coexistir.

O ângulo reto mede 90°; o agudo é menor que 90° e maior que 0°; o obtuso é maior que 90° e menor que 180°. Um ângulo raso mede 180°. A soma dos ângulos internos de um triângulo é 180°.

Um **paralelogramo** tem dois pares de lados paralelos. O retângulo tem quatro ângulos retos; o losango tem quatro lados iguais. O quadrado reúne as duas propriedades, portanto é também retângulo e losango. Não exclua uma classificação mais ampla porque a figura tem um nome mais específico.

### Sólidos: faces, arestas e vértices

Os **poliedros** têm apenas faces planas poligonais. O cubo e os prismas são exemplos. O encontro de duas faces forma uma aresta; o encontro de arestas forma um vértice. Cubo: 6 faces, 12 arestas e 8 vértices. Cilindro, cone e esfera têm superfície curva e não são poliedros.

Um **prisma** tem duas bases poligonais paralelas e congruentes. Um prisma de base hexagonal tem 8 faces, 18 arestas e 12 vértices. Uma **pirâmide** tem uma base poligonal e faces laterais triangulares que se encontram em um vértice.

A **planificação** abre a superfície do sólido em um plano. Em uma planificação de cubo, são necessários seis quadrados, mas nem toda disposição de seis quadrados fecha um cubo sem sobreposição. Ao dobrar mentalmente, acompanhe quais faces ficam vizinhas e opostas. Num dado comum com faces opostas somando 7, os pares são 1–6, 2–5 e 3–4.

As **vistas** mostram o sólido por uma direção: frente, lado ou cima. A vista superior de uma pilha de cubos informa as posições ocupadas, mas pode não mostrar quantos cubos há em cada coluna. Conte também os cubos escondidos necessários para sustentar os visíveis.

Na localização em uma malha, siga a ordem indicada para linhas e colunas ou para o par de coordenadas. Em deslocamentos, “à direita” depende da direção para a qual a pessoa está voltada. Já norte, sul, leste e oeste dependem da orientação do mapa.

## 3.9 Perímetro, área e volume

**Perímetro** mede o contorno; use unidades de comprimento. **Área** mede a superfície; use unidades quadradas. **Volume** mede o espaço ocupado; use unidades cúbicas. Capacidade indica quanto um recipiente comporta, frequentemente em litros.

| Figura ou sólido | Relação | Cuidado |
| --- | --- | --- |
| Retângulo | Perímetro = 2 × (comprimento + largura); área = comprimento × largura | Um resultado é linear; o outro é quadrado |
| Quadrado | Perímetro = 4 × lado; área = lado × lado | Dobrar o lado dobra o perímetro e quadruplica a área |
| Triângulo | Área = base × altura ÷ 2 | A altura é perpendicular à base |
| Paralelepípedo retângulo | Volume = comprimento × largura × altura | Converta as três dimensões para a mesma unidade |
| Superfície de uma caixa fechada | Área total = 2 × (c × l + c × h + l × h) | Se não houver tampa, uma face deve ser retirada |

### Composição e decomposição

Uma figura em L pode ser dividida em retângulos ou calculada por um retângulo maior menos o recorte. O importante é cobrir a superfície uma vez, sem deixar partes de fora e sem contar sobreposições.

@figure area Figura em L: retângulo de 8 m por 5 m com recorte de 3 m por 3 m. O traçado auxilia a decomposição.

No exemplo, a área é 40 − 9 = **31 m²**. O perímetro exige percorrer todos os lados do contorno, incluindo os lados internos do recorte. Os comprimentos são 8 + 2 + 3 + 3 + 5 + 5 = **26 m**. O fato de, neste recorte de canto, o perímetro coincidir com o do retângulo original não autoriza usar isso em qualquer recorte.

::: Exemplo resolvido — revestimento
Uma sala mede 4,5 m por 3,2 m. Cada placa cobre 0,09 m². Área da sala: 4,5 × 3,2 = 14,4 m². Quantidade teórica: 14,4 ÷ 0,09 = **160 placas**. Esse cálculo desconsidera perdas e cortes, conforme a hipótese. Se o problema acrescentasse 10% de reserva, seriam 176 placas.
:::

### Volume e capacidade

@figure volume Caixa retangular com medidas internas de 60 cm, 40 cm e 25 cm. O esquema não representa proporções exatas.

O volume é 60 × 40 × 25 = **60.000 cm³**. Como 1.000 cm³ = 1 L, a capacidade é 60 L. Se a caixa estiver com 3/4 da capacidade, conterá 45 L e faltarão 15 L. Use dimensões internas quando o objetivo for calcular o espaço disponível dentro do recipiente.

**Cobrir** uma caixa exige área de superfície; **encher** uma caixa exige volume ou capacidade. Uma pergunta sobre papel para uma embalagem e outra sobre água para um reservatório podem mostrar o mesmo sólido, mas pedem medidas diferentes.

## 3.10 Gráficos, tabelas, padrões e probabilidade

Antes de calcular, leia título, categorias, unidade, legenda, fonte e escala. Um gráfico de barras pode começar em valor diferente de zero; nesse caso, a diferença visual entre as barras pode parecer maior do que a diferença numérica. Confira os números do eixo.

@figure grafico Gráfico autoral. Os valores exatos devem ser lidos pela escala e pelas indicações, não pelo tamanho aparente na página.

Total semanal: 12 + 18 + 15 + 20 + 10 = **75 livros**. Maior quantidade: quinta-feira, 20. Diferença entre quinta e sexta: 10. Média diária: 75 ÷ 5 = **15 livros**. A média pode não corresponder a uma observação específica em outros conjuntos de dados.

Em gráficos de setores, o círculo inteiro corresponde a 100% ou 360°. Metade corresponde a 50% e 180°; um quarto, a 25% e 90°. Para saber quantas pessoas um setor representa, é necessário conhecer o total ou outra informação equivalente.

### Padrões e igualdade — destaque CEP

Na sequência 5, 9, 13, 17..., cada termo aumenta 4. O próximo é 21. Para o 10º termo, há nove aumentos a partir do primeiro: 5 + 9 × 4 = **41**. Um erro comum é fazer dez aumentos e esquecer que o primeiro termo já foi contado.

Em uma fileira de quadrados de palitos, o primeiro usa 4 e cada novo quadrado compartilha um lado, acrescentando 3. Para 6 quadrados: 4 + 5 × 3 = **19 palitos**. Desenhe os primeiros casos antes de generalizar.

Uma sequência curta pode admitir várias regras matemáticas. Em questões escolares, identifique o padrão compatível com todos os termos, a figura e as condições do enunciado. Não imponha uma regra que só funcione para os dois primeiros números.

### Probabilidade simples — destaque CEP

Quando todos os resultados elementares são igualmente prováveis, a probabilidade de um evento é a quantidade de resultados favoráveis dividida pela quantidade de resultados possíveis. Em um dado comum equilibrado, sair número maior que 4 tem probabilidade 2/6 = **1/3**, pois os resultados favoráveis são 5 e 6.

Uma sacola com 3 fichas azuis e 2 amarelas, iguais em tamanho e textura, tem 5 fichas. A chance de retirar uma azul ao acaso é 3/5 = 60%. “Há duas cores” não torna a chance de cada cor igual a 1/2, porque as quantidades são diferentes.

Sem reposição, as quantidades mudam após a retirada. Se sair uma azul, restam 2 azuis e 2 amarelas; a próxima chance de azul passa a 2/4. Com reposição e mistura, a composição original é restabelecida. Leia essa condição.

### Revisão ativa de Matemática

Explique por que somar frações exige partes do mesmo tamanho; quando usar um múltiplo comum; como diferenciar área e volume; e por que 20% de desconto após 20% de aumento não restaura o preço. Refaça um exemplo de cada tema com valores diferentes e confira por outra estratégia.
