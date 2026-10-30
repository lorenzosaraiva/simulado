(function () {
  'use strict';
  // Matemática no formato das provas: problemas de várias etapas, grandezas e medidas, geometria e dados.
  const F = window.FIEL, { Q, QF, rect, line, text, circle, lines, figure, barChart, tableFigure } = F;
  const gcd = (a, b) => b ? gcd(b, a % b) : a, lcm = (a, b) => a / gcd(a, b) * b;
  const br = (n, d = 0) => { const [i, f] = Math.abs(n).toFixed(d).split('.'); return (n < 0 ? '-' : '') + i.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (f ? ',' + f : ''); };
  const rs = n => 'R$ ' + br(n, 2);
  const M = (item, fam, lvl, base, prompt, ok, why, bad, extra = {}) => Q(item, fam, lvl, base, prompt, ok, why, bad, extra);

  // ---------- Números e operações ----------
  M('m05', 'oculto-subtracao', 'média', null, 'Em uma subtração, alguns algarismos foram apagados:\n7 ▢ 8 4 − 3 9 ▢ 6 = 3 3 2 ▢\nQual é a soma dos algarismos apagados?',
    '15', '7.284 − 3.956 = 3.328. Os algarismos apagados são 2, 5 e 8, e 2 + 5 + 8 = 15.',
    [['14', 'Algum dos algarismos foi identificado incorretamente.'], ['16', 'Soma além do valor correto.'], ['13', 'Algum dos algarismos foi identificado incorretamente.']]);
  M('m05', 'expressao', 'média', null, 'Qual é o valor da expressão 6 + 4 × 3 − 8 ÷ 2 ?',
    '14', 'Multiplicação e divisão vêm antes: 4 × 3 = 12 e 8 ÷ 2 = 4. Depois, 6 + 12 − 4 = 14.',
    [['11', 'Resulta de resolver da esquerda para a direita, sem respeitar as prioridades.'], ['16', 'Erro em uma das operações com prioridade.'], ['22', 'Calcula 4 × 3 + 6 + 4 sem subtrair corretamente.']]);
  M('m01', 'numeracao', 'média', null, 'O número formado por 7 centenas de milhar, 2 dezenas de milhar e 5 unidades é',
    '720.005', '700.000 + 20.000 + 5 = 720.005.',
    [['72.005', 'Falta uma ordem: 7 centenas de milhar valem 700.000.'], ['702.005', 'Corresponde a 7 centenas de milhar, 2 unidades de milhar e 5 unidades.'], ['7.200.005', 'Sobra uma ordem: o número tem seis algarismos.']]);
  M('m03', 'valor-posicional', 'fácil', null, 'No número 5.172,48, o algarismo 7 vale',
    '70 (sete dezenas).', 'O 7 ocupa a casa das dezenas da parte inteira.',
    [['700 (sete centenas).', 'As centenas são ocupadas pelo algarismo 1.'], ['7 (sete unidades).', 'As unidades são ocupadas pelo algarismo 2.'], ['0,7 (sete décimos).', 'Os décimos são ocupados pelo algarismo 4.']]);
  M('m10', 'decimais-ordem', 'média', null, 'Qual é a ordem crescente dos números 0,5; 0,45; 0,405 e 0,54?',
    '0,405 < 0,45 < 0,5 < 0,54', 'Igualando casas: 0,500; 0,450; 0,405; 0,540. Em ordem crescente: 0,405; 0,450; 0,500; 0,540.',
    [['0,5 < 0,45 < 0,405 < 0,54', 'Compara só a quantidade de algarismos depois da vírgula.'], ['0,405 < 0,45 < 0,54 < 0,5', '0,54 é maior que 0,5.'], ['0,45 < 0,405 < 0,5 < 0,54', '0,405 é menor que 0,45.']]);
  M('m04', 'representacoes', 'média', null, 'Qual das representações abaixo NÃO equivale a 0,75?',
    '7/5', '7/5 = 1,4. As demais valem 0,75: 3/4, 75% e 75/100.',
    [['3/4', '3 ÷ 4 = 0,75.'], ['75%', '75% = 75/100 = 0,75.'], ['75/100', '75 ÷ 100 = 0,75.']]);
  M('m09', 'fracao-equivalente', 'fácil', null, 'Qual fração é equivalente a 3/5?',
    '12/20', 'Multiplicando numerador e denominador por 4: 3/5 = 12/20.',
    [['6/15', 'Equivale a 2/5.'], ['9/20', 'Equivale a 0,45, não a 0,6.'], ['5/3', 'É o inverso de 3/5.']]);
  M('m09', 'fracao-ordem', 'média', null, 'Qual é a ordem decrescente das frações 3/4, 5/8, 2/3 e 7/12?',
    '3/4, 2/3, 5/8, 7/12', 'Com denominador 24: 18/24, 16/24, 15/24 e 14/24.',
    [['7/12, 5/8, 2/3, 3/4', 'É a ordem crescente.'], ['3/4, 5/8, 2/3, 7/12', '2/3 é maior que 5/8.'], ['2/3, 3/4, 5/8, 7/12', '3/4 é maior que 2/3.']]);
  M('m09', 'fracao-restante', 'difícil', null, 'Rita gastou 1/3 do dinheiro que tinha em um livro e 3/5 do que sobrou em lanches. Ficou com R$ 32,00. Quanto Rita tinha no começo?',
    'R$ 120,00', 'Depois do livro restaram 2/3. Gastou 3/5 desse resto e sobrou 2/5: 2/3 × 2/5 = 4/15 do total. 4/15 = 32, então 1/15 = 8 e o total é 120.',
    [['R$ 96,00', 'Resulta de tratar 1/3 e 3/5 como se fossem frações do mesmo todo.'], ['R$ 80,00', 'Considera que os R$ 32,00 são 2/5 do total.'], ['R$ 160,00', 'Ignora que os 3/5 incidem sobre o que sobrou.']]);
  M('m09', 'fracao-paginas', 'média', null, 'Um livro tem 240 páginas. Lucas leu 2/5 no sábado e 1/4 no domingo. Quantas páginas ainda faltam?',
    '84 páginas.', '2/5 de 240 = 96 e 1/4 de 240 = 60. Já leu 156; faltam 240 − 156 = 84.',
    [['156 páginas.', 'É o número de páginas já lidas.'], ['144 páginas.', 'Considera só a leitura de sábado.'], ['96 páginas.', 'É o número de páginas lidas no sábado.']]);

  // ---------- Porcentagem e dinheiro ----------
  M('m12', 'pct-fracao', 'fácil', null, 'Quanto é 25% de 360?',
    '90', '25% = 1/4 e 360 ÷ 4 = 90.',
    [['25', 'Repete o percentual sem calcular.'], ['9', 'Divide por 40 em vez de 4.'], ['180', 'Calcula 50%, e não 25%.']]);
  M('m12', 'pct-sucessivos', 'difícil', null, 'Uma camiseta custa R$ 200,00. A loja deu 20% de desconto e, sobre o preço já com desconto, mais 10%. Qual é o preço final?',
    rs(144), 'Primeiro desconto: 200 × 0,8 = 160. Segundo: 160 × 0,9 = 144.',
    [[rs(140), 'Soma os descontos (30%) sobre o preço original.'], [rs(160), 'Considera só o primeiro desconto.'], [rs(150), 'Calcula 25% de desconto, sem justificativa.']]);
  M('m12', 'pct-acresc-desc', 'difícil', null, 'O preço de um produto aumentou 25%. Depois, a loja deu 20% de desconto sobre o novo preço. Em comparação com o preço original, o preço final',
    'é igual ao preço original.', '1,25 × 0,80 = 1,00: o aumento de 25% é compensado pelo desconto de 20% sobre o valor maior.',
    [['é 5% maior.', 'Soma 25% − 20% sem considerar a base de cálculo.'], ['é 5% menor.', 'Subtrai de forma incorreta.'], ['é 20% maior.', 'Ignora o desconto.']]);
  M('m12', 'pct-escola', 'média', null, 'Em uma escola de 480 alunos, 35% vão de ônibus, 1/4 vão a pé e os demais vão de carro. Quantos alunos vão de carro?',
    '192 alunos.', '35% de 480 = 168; 1/4 de 480 = 120. Total de 288; 480 − 288 = 192.',
    [['168 alunos.', 'É o número de alunos que vão de ônibus.'], ['120 alunos.', 'É o número de alunos que vão a pé.'], ['288 alunos.', 'É a soma dos que vão de ônibus e a pé.']]);
  M('m25', 'troco', 'média', null, 'Beatriz comprou 3 cadernos de R$ 12,90 cada e 2 canetas de R$ 3,45 cada. Pagou com uma nota de R$ 100,00. Qual foi o troco?',
    rs(54.40), 'Cadernos: 3 × 12,90 = 38,70. Canetas: 2 × 3,45 = 6,90. Total de R$ 45,60. Troco: 100 − 45,60 = 54,40.',
    [[rs(45.60), 'É o valor gasto, não o troco.'], [rs(55.60), 'Erro ao somar os valores das compras.'], [rs(57.10), 'Considera apenas parte dos itens.']]);
  M('m25', 'promocao', 'difícil', null, 'Maria quer comprar 3 camisetas de R$ 30,00 cada. Na loja A, a promoção é “leve 3 e pague 2”. Na loja B, há 20% de desconto em cada camiseta. Qual loja é mais barata e quanto Maria economiza em relação à outra?',
    'Loja A, com economia de R$ 12,00.', 'Loja A: 2 × 30 = R$ 60,00. Loja B: 3 × 24 = R$ 72,00. A diferença é R$ 12,00.',
    [['Loja B, com economia de R$ 12,00.', 'Inverte as lojas.'], ['Loja A, com economia de R$ 6,00.', 'Erro no cálculo da diferença.'], ['As duas custam o mesmo.', 'Os totais são R$ 60,00 e R$ 72,00.']]);
  M('m25', 'notas', 'fácil', null, 'Quantas notas de R$ 5,00 são necessárias para formar R$ 235,00?',
    '47 notas.', '235 ÷ 5 = 47.',
    [['46 notas.', '46 notas valem R$ 230,00.'], ['45 notas.', '45 notas valem R$ 225,00.'], ['40 notas.', '40 notas valem R$ 200,00.']]);
  M('m11', 'queijo', 'média', null, 'O quilo de um queijo custa R$ 42,50. Quanto custa 0,6 kg desse queijo?',
    rs(25.50), '42,50 × 0,6 = 25,50.',
    [[rs(21.25), 'É o valor de meio quilo.'], [rs(255), 'Erro na posição da vírgula.'], [rs(2.55), 'Erro na posição da vírgula.']]);
  M('m11', 'copos', 'média', null, 'Uma jarra tem 3,6 L de suco. Quantos copos de 0,24 L podem ser servidos com todo o suco?',
    '15 copos.', '3,6 ÷ 0,24 = 15.',
    [['1,5 copo.', 'Erro na posição da vírgula.'], ['150 copos.', 'Erro na posição da vírgula.'], ['14 copos.', 'Arredonda para menos sem justificativa.']]);

  // ---------- Múltiplos, divisores, pares e ímpares ----------
  M('m07', 'mmc-luzes', 'média', null, 'Duas luzes de um farol piscam juntas às 20h. Uma pisca a cada 12 segundos e a outra a cada 18 segundos. Depois de quantos segundos piscarão juntas novamente?',
    `${lcm(12, 18)} segundos.`, 'É o menor múltiplo comum: mmc(12, 18) = 36.',
    [['6 segundos.', 'É o máximo divisor comum.'], ['216 segundos.', 'É o produto 12 × 18, que não é o menor múltiplo comum.'], ['30 segundos.', 'É a soma dos intervalos.']]);
  M('m07', 'mmc-satelites', 'difícil', null, 'Três cometas passam por perto da Terra a cada 15, 20 e 24 anos. Se os três passaram juntos em 1985, em que ano passarão juntos novamente?',
    `${1985 + lcm(lcm(15, 20), 24)}.`, 'mmc(15, 20, 24) = 120. 1985 + 120 = 2105.',
    [['2025.', 'Soma 40 anos, que não é múltiplo de 15, 20 e 24 ao mesmo tempo.'], ['2005.', 'Soma só 20 anos.'], ['2345.', 'Soma 360 anos, que é múltiplo comum, mas não o menor.']]);
  M('m07', 'mdc-fitas', 'difícil', null, 'Três fitas medem 84 cm, 120 cm e 156 cm. Elas serão cortadas em pedaços de mesmo tamanho, o maior possível, sem sobras. Quantos pedaços serão obtidos ao todo?',
    `${(84 + 120 + 156) / gcd(gcd(84, 120), 156)} pedaços.`, 'mdc(84, 120, 156) = 12. Pedaços: 7 + 10 + 13 = 30.',
    [['12 pedaços.', '12 é o comprimento de cada pedaço, em centímetros.'], ['360 pedaços.', 'Considera pedaços de 1 cm.'], ['15 pedaços.', 'Usa pedaços de 24 cm, que não cabem em 84 cm.']]);
  M('m07', 'divisores', 'média', null, 'Quantos divisores naturais tem o número 36?',
    '9', 'Os divisores de 36 são 1, 2, 3, 4, 6, 9, 12, 18 e 36.',
    [['8', 'Esquece um dos divisores.'], ['10', 'Inclui um número que não divide 36.'], ['6', 'Considera apenas os divisores até 6.']]);
  M('m07', 'multiplos', 'média', null, 'Quantos múltiplos de 7 existem entre 100 e 200?',
    '14', 'O primeiro é 105 (7 × 15) e o último é 196 (7 × 28). De 15 a 28 há 14 números.',
    [['13', 'Esquece um dos múltiplos.'], ['15', 'Inclui um número fora do intervalo.'], ['28', 'É o maior fator, não a quantidade.']]);
  M('m08', 'pares-intervalo', 'média', null, 'Quantos números pares existem entre 15 e 45?',
    '15', 'Do 16 ao 44: (44 − 16) ÷ 2 + 1 = 15 números pares.',
    [['14', 'Esquece um dos extremos.'], ['16', 'Conta um número a mais.'], ['30', 'Conta todos os números, e não só os pares.']]);
  QF('m08', 'afirmativas-par-impar', 'média', null, 'Considere as afirmações:\nI. A soma de dois números pares é sempre par.\nII. A soma de dois números ímpares é sempre ímpar.\nIII. O produto de um número par por qualquer número natural é par.\nIV. O sucessor de um número ímpar é par.\nEstão corretas apenas',
    [['I, III e IV.', ''], ['I e II.', 'II é falsa: 3 + 5 = 8, que é par.'], ['II, III e IV.', 'II é falsa.'], ['I, II e III.', 'II é falsa.']], 0, 'II é falsa (ímpar + ímpar = par). As demais são verdadeiras.');
  M('m08', 'tres-impares', 'média', null, 'A soma de três números ímpares consecutivos é 51. Qual é o maior deles?',
    '19', 'Os números são 15, 17 e 19, pois 15 + 17 + 19 = 51.',
    [['17', 'É o número do meio.'], ['21', 'Resulta de uma soma maior que 51.'], ['25', 'Maior que o necessário.']]);

  // ---------- Padrões, igualdade e proporção ----------
  M('m13', 'seq-dobro-mais-um', 'média', null, 'Observe a sequência: 2, 5, 11, 23, ... Qual é o próximo número?',
    '47', 'Cada termo é o dobro do anterior mais 1: 23 × 2 + 1 = 47.',
    [['35', 'Soma 12, mas a regra é outra.'], ['46', 'Só dobra, sem somar 1.'], ['41', 'Não segue o padrão.']]);
  M('m13', 'seq-quadrados', 'difícil', null, 'Observe a sequência: 1, 4, 9, 16, 25, ... Qual é o 10º termo?',
    '100', 'Os termos são quadrados perfeitos: 10 × 10 = 100.',
    [['90', 'Acrescenta 10 a cada passo, sem seguir o padrão.'], ['81', 'É o 9º termo.'], ['110', 'Soma 10 ao 100.']]);
  M('m14', 'igualdade-simbolo', 'média', null, 'Se ▲ + ▲ + 7 = 25, quanto vale ▲?',
    '9', '2 × ▲ = 25 − 7 = 18; logo, ▲ = 9.',
    [['18', 'É o valor de 2 × ▲.'], ['16', 'Subtrai 9 de 25.'], ['11', 'Subtrai 7 sem dividir por 2 corretamente.']]);
  M('m14', 'balanca', 'média', null, 'Uma balança está em equilíbrio. De um lado há 2 melancias iguais e um peso de 1 kg; do outro, um peso de 5 kg. Qual é a massa de cada melancia?',
    '2 kg', '2 × melancia + 1 = 5, então 2 × melancia = 4 e cada melancia tem 2 kg.',
    [['3 kg', 'Divide 5 − 1 por 2 incorretamente.'], ['2,5 kg', 'Divide 5 por 2 sem considerar o peso de 1 kg.'], ['4 kg', 'É a massa das duas melancias juntas.']]);
  M('m14', 'equivalencia-simbolos', 'difícil', null, 'Sabe-se que 4 ● valem o mesmo que 6 ■ e que 3 ■ valem o mesmo que 12 ▲. Quantos ▲ equivalem a 5 ●?',
    '30', '3 ■ = 12 ▲, logo ■ = 4 ▲. 4 ● = 6 ■ = 24 ▲, então ● = 6 ▲ e 5 ● = 30 ▲.',
    [['24', 'É o valor de 4 ●, e não de 5 ●.'], ['20', 'Erro ao converter ■ em ▲.'], ['15', 'Metade do valor correto.']]);
  M('m16', 'receita', 'média', null, 'Uma receita de bolo para 6 pessoas usa 450 g de farinha e 3 ovos. Para 10 pessoas, mantendo as proporções, serão necessários',
    '750 g de farinha e 5 ovos.', 'De 6 para 10 pessoas multiplica-se por 10/6: 450 × 10/6 = 750 e 3 × 10/6 = 5.',
    [['600 g de farinha e 4 ovos.', 'Soma a quantidade de 4 pessoas a mais sem proporção.'], ['900 g de farinha e 6 ovos.', 'Dobra a receita, o que serve a 12 pessoas.'], ['750 g de farinha e 6 ovos.', 'Os ovos não acompanham a proporção.']]);
  M('m16', 'tinta', 'média', null, 'Com 2 litros de tinta pinta-se uma parede de 15 m². Quantos litros são necessários para pintar 45 m², nas mesmas condições?',
    '6 litros.', '45 m² é o triplo de 15 m²; logo, 3 × 2 = 6 litros.',
    [['4,5 litros.', 'Divide 45 por 10 sem proporção.'], ['5 litros.', 'Soma 3 litros por aproximação.'], ['7,5 litros.', 'Esse valor corresponde a 56 m².']]);
  M('m16', 'consumo', 'difícil', null, 'Um carro percorre 12 km com 1 litro de gasolina. Em uma viagem de 150 km, com gasolina a R$ 6,40 o litro, quanto se gasta com combustível?',
    rs(80), '150 ÷ 12 = 12,5 litros; 12,5 × 6,40 = 80,00.',
    [[rs(76.80), 'Considera 12 litros, sem a metade do litro.'], [rs(96), 'Considera 15 litros.'], [rs(160), 'Dobra o valor correto.']]);
  M('m16', 'escala', 'difícil', null, 'Em um mapa com escala 1 : 500.000, a distância entre duas cidades é 4,5 cm. Qual é a distância real?',
    '22,5 km', '4,5 × 500.000 = 2.250.000 cm = 22.500 m = 22,5 km.',
    [['2,25 km', 'Erro na conversão de centímetros para quilômetros.'], ['225 km', 'Erro na conversão de centímetros para quilômetros.'], ['4,5 km', 'Ignora a escala.']]);

  // ---------- Raciocínio e contagem ----------
  M('m06', 'fila', 'média', null, 'Ana ocupa a 7ª posição contando da frente de uma fila e a 12ª contando de trás para a frente. Quantas pessoas há na fila?',
    '18 pessoas.', '7 + 12 = 19, mas Ana foi contada duas vezes: 19 − 1 = 18.',
    [['19 pessoas.', 'Conta Ana duas vezes.'], ['17 pessoas.', 'Desconta uma pessoa a mais.'], ['5 pessoas.', 'É a diferença entre as posições.']]);
  M('m06', 'idade', 'difícil', null, 'Hoje, Júlia tem 11 anos e a mãe dela tem 38. Daqui a quantos anos a idade da mãe será o dobro da idade de Júlia?',
    '16 anos.', 'Daqui a 16 anos, Júlia terá 27 e a mãe, 54, que é o dobro de 27.',
    [['5 anos.', 'Em 5 anos: 16 e 43, e 43 não é o dobro de 16.'], ['27 anos.', 'É a idade de Júlia daqui a 16 anos.'], ['14 anos.', 'Em 14 anos: 25 e 52, e 52 não é o dobro de 25.']]);
  M('m28', 'combinacoes', 'média', null, 'Pedro tem 3 camisas, 4 bermudas e 2 pares de tênis. De quantas maneiras diferentes ele pode se vestir, usando uma peça de cada?',
    '24 maneiras.', 'Pelo princípio multiplicativo: 3 × 4 × 2 = 24.',
    [['9 maneiras.', 'Soma 3 + 4 + 2, em vez de multiplicar.'], ['12 maneiras.', 'Considera apenas camisas e bermudas.'], ['14 maneiras.', 'Não corresponde a nenhuma combinação.']]);
  M('m28', 'urna', 'média', null, 'Uma urna tem 5 bolas vermelhas, 3 azuis e 2 verdes, todas iguais no tato. Retirando uma bola ao acaso, qual é a probabilidade de ela ser azul?',
    '3/10', 'Há 3 bolas azuis entre 10 bolas.',
    [['3/7', 'Compara azuis com as bolas de outras cores, sem considerar o total.'], ['1/3', 'Considera uma entre três cores.'], ['3/5', 'Compara azuis com vermelhas.']]);
  M('m28', 'dado-par', 'média', null, 'Ao lançar um dado comum, qual é a probabilidade de sair um número par maior que 2?',
    '1/3', 'Os resultados favoráveis são 4 e 6, ou seja, 2 em 6 = 1/3.',
    [['1/2', 'Considera todos os pares (2, 4, 6).'], ['2/3', 'Considera os números maiores que 2, sem exigir que sejam pares.'], ['1/6', 'Considera apenas um resultado favorável.']]);
  M('m29', 'media', 'média', null, 'As notas de Davi em quatro provas foram 7,0; 8,5; 6,0 e 9,5. Qual é a média dessas notas?',
    '7,75', '(7 + 8,5 + 6 + 9,5) ÷ 4 = 31 ÷ 4 = 7,75.',
    [['7,5', 'Divide por 4 uma soma incorreta.'], ['8,0', 'Média apenas das duas maiores notas, aproximadamente.'], ['31', 'É a soma, sem dividir por 4.']]);

  // ---------- Grandezas e medidas ----------
  M('m21', 'tempo-fim', 'média', null, 'Um filme começa às 15h40min e dura 1h55min. A que horas termina?',
    '17h35min.', '15h40 + 1h55 = 16h95 = 17h35.',
    [['17h25min.', 'Erra o total de minutos.'], ['17h45min.', 'Soma minutos a mais.'], ['16h35min.', 'Esquece uma hora da duração.']]);
  M('m21', 'tempo-total', 'média', null, 'João e Letícia vão assistir a dois filmes: o primeiro dura 94 minutos e o segundo, 1h48min. Eles farão uma pausa de 20 minutos entre os filmes. Quanto tempo ao todo?',
    '3h42min.', '94 + 108 + 20 = 222 minutos = 3h42min.',
    [['3h22min.', 'Esquece de somar a pausa.'], ['4h02min.', 'Soma a pausa duas vezes.'], ['3h12min.', 'Erra na conversão da duração do segundo filme.']]);
  M('m21', 'massa', 'média', null, 'Em uma compra, Marcos levou 3 pacotes de 750 g e 2 pacotes de 1,5 kg. Qual foi a massa total, em quilogramas?',
    '5,25 kg', '3 × 0,75 = 2,25 kg e 2 × 1,5 = 3 kg. Total: 5,25 kg.',
    [['4,25 kg', 'Erra a soma dos pacotes.'], ['5.250 kg', 'Confunde gramas com quilogramas.'], ['3,75 kg', 'Considera apenas parte dos pacotes.']]);
  M('m21', 'capacidade', 'fácil', null, 'Uma jarra tem 2,4 litros de suco, que serão distribuídos em copos de 300 mL. Quantos copos serão servidos?',
    '8 copos.', '2,4 L = 2.400 mL e 2.400 ÷ 300 = 8.',
    [['80 copos.', 'Erro na conversão de litros para mililitros.'], ['12 copos.', 'Considera copos de 200 mL.'], ['6 copos.', 'Considera copos de 400 mL.']]);
  M('m21', 'unidades-soma', 'média', null, 'Um percurso tem 2,5 km, mais 350 m, mais 1,5 hm. Qual é o comprimento total em metros?',
    '3.000 m', '2,5 km = 2.500 m; 1,5 hm = 150 m. Total: 2.500 + 350 + 150 = 3.000 m.',
    [['2.850 m', 'Ignora o hectômetro.'], ['4.350 m', 'Converte 1,5 hm para 1.500 m.'], ['2.500 m', 'Considera só o primeiro trecho.']]);
  M('m21', 'fracao-hora', 'média', null, 'Ana estudou 3/4 de hora de Português e 2/3 de hora de Matemática. Quanto tempo estudou, ao todo?',
    '1h25min.', '3/4 de hora = 45 min e 2/3 de hora = 40 min. Total de 85 min = 1h25min.',
    [['1h05min.', 'Soma 45 + 20.'], ['1h15min.', 'Soma 45 + 30.'], ['1h35min.', 'Soma 45 + 50.']]);
  M('m22', 'perimetro-cerca', 'média', null, 'Um terreno retangular mede 25 m por 18 m. Para cercá-lo, serão usadas 3 voltas de arame. Quantos metros de arame são necessários?',
    '258 m', 'Perímetro: 2 × (25 + 18) = 86 m. Três voltas: 3 × 86 = 258 m.',
    [['86 m', 'É o perímetro, para uma volta.'], ['172 m', 'Corresponde a duas voltas.'], ['450 m', 'É a área do terreno, e não o comprimento do arame.']]);
  M('m23', 'piso', 'média', null, 'Uma sala retangular mede 5 m por 3,6 m. Deseja-se cobri-la com lajotas quadradas de 30 cm de lado. Quantas lajotas serão necessárias, sem considerar perdas?',
    '200 lajotas.', 'Área da sala: 18 m². Área de cada lajota: 0,09 m². 18 ÷ 0,09 = 200.',
    [['20 lajotas.', 'Usa 0,9 m² por lajota.'], ['2.000 lajotas.', 'Usa 0,009 m² por lajota.'], ['600 lajotas.', 'Erro na conversão de unidades.']]);
  M('m24', 'garrafas', 'difícil', null, 'Uma caixa-d’água em forma de paralelepípedo mede 50 cm × 60 cm × 40 cm. Quantas garrafas de 1,5 litro são necessárias para enchê-la completamente? (1 litro = 1.000 cm³)',
    '80 garrafas.', 'Volume: 50 × 60 × 40 = 120.000 cm³ = 120 L. 120 ÷ 1,5 = 80.',
    [['120 garrafas.', 'Considera garrafas de 1 litro.'], ['60 garrafas.', 'Considera garrafas de 2 litros.'], ['100 garrafas.', 'Considera garrafas de 1,2 litro.']]);
  M('m24', 'piscinas', 'difícil', null, 'A piscina A mede 6 m × 4 m e tem 1,5 m de profundidade. A piscina B mede 5 m × 3 m e tem 1,2 m de profundidade. Quantos litros a mais cabem em A do que em B? (1 m³ = 1.000 litros)',
    '18.000 litros.', 'A: 6 × 4 × 1,5 = 36 m³. B: 5 × 3 × 1,2 = 18 m³. Diferença: 18 m³ = 18.000 L.',
    [['18 litros.', 'Esquece de converter metros cúbicos em litros.'], ['54.000 litros.', 'Soma os volumes, e não subtrai.'], ['36.000 litros.', 'É a capacidade de A.']]);
  M('m17', 'robo', 'média', null, 'Um robô parte do ponto P voltado para o norte. Ele anda 3 passos, vira 90° à direita, anda 4 passos, vira 90° à esquerda e anda 2 passos. Em relação a P, onde o robô está e para onde olha?',
    'A 4 passos a leste e 5 ao norte de P, olhando para o norte.', 'Norte 3, depois leste 4 (virou à direita), depois norte 2 (virou à esquerda): 4 a leste e 5 ao norte.',
    [['A 5 passos a leste e 4 ao norte de P, olhando para o leste.', 'Inverte as distâncias e a direção final.'], ['A 4 passos a oeste e 5 ao norte de P, olhando para o norte.', 'Vira à esquerda em vez de à direita no primeiro giro.'], ['A 4 passos a leste e 3 ao norte de P, olhando para o leste.', 'Esquece o último trecho e a última virada.']]);

  // ---------- Geometria ----------
  QF('m18', 'quadrilateros', 'média', null, 'Analise as afirmações:\nI. Todo quadrado é também um retângulo.\nII. Todo retângulo é também um quadrado.\nIII. Todo quadrado é também um losango.\nIV. Todo losango tem quatro ângulos retos.\nEstão corretas apenas',
    [['I e III.', ''], ['I e II.', 'II é falsa: um retângulo 2 × 4 não é quadrado.'], ['II e IV.', 'II e IV são falsas.'], ['III e IV.', 'IV é falsa: um losango pode ter ângulos que não são retos.']], 0, 'Quadrado tem quatro lados iguais e quatro ângulos retos: é retângulo e losango. Nem todo retângulo tem lados iguais, e nem todo losango tem ângulos retos.');
  QF('m19', 'solidos', 'difícil', null, 'Analise as afirmações:\nI. Um prisma de base triangular tem 5 faces, 6 vértices e 9 arestas.\nII. Uma pirâmide de base quadrada tem 5 faces, 5 vértices e 8 arestas.\nIII. Um cubo tem 6 faces, 8 vértices e 12 arestas.\nIV. Um cone tem dois vértices.\nEstão corretas apenas',
    [['I, II e III.', ''], ['I e IV.', 'IV é falsa: o cone tem um vértice.'], ['II, III e IV.', 'IV é falsa.'], ['I, III e IV.', 'IV é falsa.']], 0, 'I, II e III estão corretas. O cone tem um único vértice.');
  M('m18', 'triangulos', 'média', null, 'Um triângulo tem lados de 7 cm, 7 cm e 10 cm. Esse triângulo é classificado como',
    'isósceles, com perímetro de 24 cm.', 'Dois lados iguais definem o triângulo isósceles. Perímetro: 7 + 7 + 10 = 24 cm.',
    [['equilátero, com perímetro de 21 cm.', 'O equilátero tem os três lados iguais.'], ['escaleno, com perímetro de 24 cm.', 'O escaleno não tem lados iguais.'], ['isósceles, com perímetro de 17 cm.', 'Erra o perímetro.']]);
  M('m19', 'hexagonal', 'média', null, 'Um prisma tem como bases dois hexágonos. Quantas faces, vértices e arestas esse sólido possui, respectivamente?',
    '8 faces, 12 vértices e 18 arestas.', 'Faces: 6 retangulares + 2 hexagonais = 8. Vértices: 6 + 6 = 12. Arestas: 6 + 6 + 6 = 18.',
    [['6 faces, 12 vértices e 18 arestas.', 'Esquece as duas bases.'], ['8 faces, 6 vértices e 12 arestas.', 'Considera só uma base.'], ['7 faces, 12 vértices e 18 arestas.', 'Conta uma face a menos.']]);

  // ---------- Dados em cenários cotidianos ----------
  M('m26', 'temperaturas', 'média', null, 'As temperaturas máximas, em °C, de uma cidade durante cinco dias foram: segunda, 18; terça, 21; quarta, 24; quinta, 19; sexta, 23. Qual foi a diferença entre a maior e a menor dessas temperaturas?',
    '6 °C', 'Maior: 24 °C (quarta). Menor: 18 °C (segunda). 24 − 18 = 6 °C.',
    [['5 °C', 'Subtrai valores que não são os extremos.'], ['3 °C', 'Subtrai dias consecutivos.'], ['21 °C', 'É a média das temperaturas.']]);
})();
