(function () {
  'use strict';
  // Matemática: problemas com a mesma estrutura e valores diferentes, para ampliar o rodízio de simulados.
  // Todas as respostas são calculadas a partir dos próprios parâmetros.
  const { Q } = window.FIEL;
  const gcd = (a, b) => b ? gcd(b, a % b) : a, lcm = (a, b) => a / gcd(a, b) * b;
  const br = (n, d = 0) => { const [i, f] = Math.abs(n).toFixed(d).split('.'); return (n < 0 ? '-' : '') + i.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (f ? ',' + f : ''); };
  const rs = n => 'R$ ' + br(n, 2);
  const T = (fam, item, level, sets, build) => sets.forEach((p, i) => { const q = build(...p); Q(item, `gen-${fam}-${i + 1}`, level, null, q.prompt, q.ok, q.why, q.bad, { topic: q.topic }); });

  T('desconto', 'm12', 'média', [[80, 25], [240, 15], [350, 20], [1200, 12]], (price, d) => ({
    prompt: `Um produto custa ${rs(price)}. Durante uma promoção, a loja oferece ${d}% de desconto. Qual é o preço promocional?`,
    ok: rs(price * (1 - d / 100)), why: `${d}% de ${price} = ${br(price * d / 100, 2)}. Preço: ${br(price, 2)} − ${br(price * d / 100, 2)} = ${br(price * (1 - d / 100), 2)}.`,
    bad: [[rs(price * d / 100), 'É o valor do desconto, e não o preço final.'], [rs(price * (1 + d / 100)), 'Acrescenta o percentual, em vez de descontar.'], [rs(price - d), 'Subtrai o percentual como se fossem reais.']]
  }));
  T('acrescimo', 'm12', 'média', [[600, 8], [1500, 12], [250, 20]], (v, a) => ({
    prompt: `A mensalidade de um curso era ${rs(v)} e teve um reajuste de ${a}%. Qual é o novo valor?`,
    ok: rs(v * (1 + a / 100)), why: `${a}% de ${v} = ${br(v * a / 100, 2)}. Novo valor: ${br(v * (1 + a / 100), 2)}.`,
    bad: [[rs(v * a / 100), 'É apenas o valor do reajuste.'], [rs(v * (1 - a / 100)), 'Subtrai, em vez de acrescentar.'], [rs(v + a), 'Soma o percentual como se fossem reais.']]
  }));
  T('fracao-turma', 'm09', 'média', [[40, 1, 4, 2, 5], [48, 1, 3, 3, 8], [60, 2, 5, 1, 4]], (n, a, b, c, d) => {
    const first = n * a / b, rest = n - first, second = rest * c / d, left = rest - second;
    return {
      prompt: `Em uma turma de ${n} alunos, ${a}/${b} praticam futebol. Dos demais, ${c}/${d} praticam vôlei. Quantos alunos não praticam nenhum dos dois esportes?`,
      ok: `${br(left)} alunos.`, why: `Futebol: ${first}. Restam ${rest}. Vôlei: ${br(second)}. Sobram ${rest} − ${br(second)} = ${br(left)}.`,
      bad: [[`${br(rest)} alunos.`, 'É o número dos que não praticam futebol.'], [`${br(first + second)} alunos.`, 'É o total dos que praticam algum dos dois esportes.'], [`${br(n - c / d * n - first)} alunos.`, 'Aplica a segunda fração sobre o total, e não sobre os demais.']]
    };
  });
  T('mmc-eventos', 'm07', 'média', [[6, 8], [10, 15], [12, 20]], (a, b) => ({
    prompt: `Dois ônibus saem juntos do terminal às 6h. Um passa pelo terminal a cada ${a} minutos e o outro, a cada ${b} minutos. Depois de quantos minutos eles estarão juntos de novo?`,
    ok: `${lcm(a, b)} minutos.`, why: `mmc(${a}, ${b}) = ${lcm(a, b)}.`,
    bad: [[`${gcd(a, b)} minutos.`, 'É o máximo divisor comum.'], [`${a * b} minutos.`, 'É o produto, que não é o menor múltiplo comum.'], [`${a + b} minutos.`, 'É a soma dos intervalos.']]
  }));
  T('mdc-grupos', 'm07', 'difícil', [[48, 36], [60, 45], [72, 54]], (a, b) => ({
    prompt: `Um professor tem ${a} meninas e ${b} meninos e quer formar grupos com o mesmo número de crianças, sem misturar meninas e meninos e sem sobras, usando o maior número possível de crianças em cada grupo. Quantos grupos serão formados?`,
    ok: `${(a + b) / gcd(a, b)} grupos.`, why: `mdc(${a}, ${b}) = ${gcd(a, b)} crianças por grupo. Grupos: ${a / gcd(a, b)} + ${b / gcd(a, b)} = ${(a + b) / gcd(a, b)}.`,
    bad: [[`${gcd(a, b)} grupos.`, `${gcd(a, b)} é o número de crianças em cada grupo.`], [`${a + b} grupos.`, 'Forma grupos com uma criança cada.'], [`${lcm(a, b)} grupos.`, 'É o menor múltiplo comum, que não resolve o problema.']]
  }));
  T('calcada', 'm23', 'difícil', [[8, 5, 1], [10, 6, 2], [12, 7, 1]], (a, b, w) => ({
    prompt: `Um jardim retangular mede ${a} m por ${b} m e será cercado, por fora, por uma calçada de ${w} m de largura. Qual é a área da calçada?`,
    ok: `${(a + 2 * w) * (b + 2 * w) - a * b} m².`, why: `Retângulo maior: ${a + 2 * w} × ${b + 2 * w} = ${(a + 2 * w) * (b + 2 * w)} m². Subtraindo o jardim (${a * b} m²): ${(a + 2 * w) * (b + 2 * w) - a * b} m².`,
    bad: [[`${(a + 2 * w) * (b + 2 * w)} m².`, 'É a área do jardim com a calçada.'], [`${2 * (a + b) * w} m².`, 'Esquece os quatro cantos da calçada.'], [`${a * b} m².`, 'É a área do jardim.']]
  }));
  T('fita-pedacos', 'm21', 'média', [[3.6, 45], [4.8, 60], [2.4, 30]], (m, cm) => ({
    prompt: `Uma fita de ${br(m, 1)} metros será cortada em pedaços de ${cm} centímetros cada. Quantos pedaços serão obtidos?`,
    ok: `${m * 100 / cm} pedaços.`, why: `${br(m, 1)} m = ${m * 100} cm e ${m * 100} ÷ ${cm} = ${m * 100 / cm}.`,
    bad: [[`${m * 10 / cm} pedaços.`, 'Erro na conversão de metros para centímetros.'], [`${m * 1000 / cm} pedaços.`, 'Erro na conversão de metros para centímetros.'], [`${Math.round(m * 100 / cm) - 1} pedaços.`, 'Desconta um pedaço sem justificativa.']]
  }));
  T('copos-ml', 'm21', 'fácil', [[1.5, 250], [2, 200], [3, 250]], (l, ml) => ({
    prompt: `Uma garrafa contém ${br(l, 1)} litro${l > 1 ? 's' : ''} de suco, que será distribuído em copos de ${ml} mL. Quantos copos serão completamente enchidos?`,
    ok: `${l * 1000 / ml} copos.`, why: `${br(l, 1)} L = ${l * 1000} mL e ${l * 1000} ÷ ${ml} = ${l * 1000 / ml}.`,
    bad: [[`${l * 100 / ml} copos.`, 'Erro na conversão de litros para mililitros.'], [`${l * 10000 / ml} copos.`, 'Erro na conversão de litros para mililitros.'], [`${l * 1000 / ml + 2} copos.`, 'Soma copos sem correspondência no cálculo.']]
  }));
  T('chegada', 'm21', 'média', [[7, 45, 2, 50], [9, 20, 3, 55], [13, 35, 1, 45]], (h, m, dh, dm) => {
    const total = h * 60 + m + dh * 60 + dm, fmt = t => `${Math.floor(t / 60)}h${String(t % 60).padStart(2, '0')}min`;
    return {
      prompt: `Um ônibus saiu às ${h}h${String(m).padStart(2, '0')}min e a viagem durou ${dh}h${String(dm).padStart(2, '0')}min. A que horas ele chegou?`,
      ok: fmt(total) + '.', why: `${h}h${m} + ${dh}h${dm} = ${fmt(total)}.`,
      bad: [[fmt(total - 10) + '.', 'Erra a soma dos minutos.'], [fmt(total + 10) + '.', 'Erra a soma dos minutos.'], [fmt(total - 60) + '.', 'Esquece de somar uma das horas.']]
    };
  });
  T('moedas', 'm25', 'média', [[0.25, 18], [0.5, 27], [0.1, 9.6]], (coin, total) => ({
    prompt: `Quantas moedas de ${rs(coin)} são necessárias para formar ${rs(total)}?`,
    ok: `${Math.round(total / coin)} moedas.`, why: `${br(total, 2)} ÷ ${br(coin, 2)} = ${Math.round(total / coin)}.`,
    bad: [[`${Math.round(total / coin / 10)} moedas.`, 'Erro na posição da vírgula.'], [`${Math.round(total / coin * 10)} moedas.`, 'Erro na posição da vírgula.'], [`${Math.round(total / coin) - 4} moedas.`, 'Subtrai sem justificativa.']]
  }));
  T('pa', 'm13', 'média', [[5, 4, 20], [3, 7, 15], [10, 6, 12]], (a, r, n) => ({
    prompt: `Observe a sequência: ${[0, 1, 2, 3].map(i => a + i * r).join(', ')}, ... Mantendo o padrão, qual será o ${n}º termo?`,
    ok: String(a + (n - 1) * r), why: `Cada termo soma ${r} ao anterior. O ${n}º termo é ${a} + ${n - 1} × ${r} = ${a + (n - 1) * r}.`,
    bad: [[String(a + n * r), `Usa ${n} intervalos, mas há ${n - 1}.`], [String(a * n), 'Multiplica o primeiro termo pela posição.'], [String(a + (n - 1) * r - r), 'Usa um intervalo a menos.']]
  }));
  T('resto', 'm05', 'média', [[250, 12], [185, 8], [310, 24]], (n, k) => ({
    prompt: `Uma fábrica tem ${n} ovos para embalar em caixas de ${k} unidades. Quantas caixas ficarão completas e quantos ovos sobrarão?`,
    ok: `${Math.floor(n / k)} caixas completas e ${n % k} ovos sobrando.`, why: `${n} = ${k} × ${Math.floor(n / k)} + ${n % k}.`,
    bad: [[`${Math.floor(n / k) + 1} caixas completas e nenhum ovo sobrando.`, 'A última caixa não fica completa.'], [`${Math.floor(n / k)} caixas completas e ${k - (n % k)} ovos sobrando.`, 'Confunde o resto com o que falta para completar a caixa.'], [`${Math.floor(n / k) - 1} caixas completas e ${n % k + k} ovos sobrando.`, 'Sobra mais do que cabe em uma caixa.']]
  }));
  T('volume-litros', 'm24', 'difícil', [[80, 50, 30], [100, 40, 25], [60, 60, 50]], (a, b, c) => ({
    prompt: `Um aquário em forma de paralelepípedo mede ${a} cm de comprimento, ${b} cm de largura e ${c} cm de altura. Quantos litros de água cabem nele, quando está totalmente cheio? (1 litro = 1.000 cm³)`,
    ok: `${br(a * b * c / 1000)} litros.`, why: `${a} × ${b} × ${c} = ${br(a * b * c)} cm³ = ${br(a * b * c / 1000)} L.`,
    bad: [[`${br(a * b * c / 100)} litros.`, 'Erro na conversão de cm³ para litros.'], [`${br(a * b * c)} litros.`, 'Esquece de converter cm³ em litros.'], [`${br((a * b + b * c + a * c) * 2 / 1000)} litros.`, 'Usa a área total da superfície, e não o volume.']]
  }));
  T('soma-diferenca', 'm06', 'difícil', [[45, 7], [60, 12], [38, 6]], (s, d) => ({
    prompt: `A soma das idades de dois irmãos é ${s} anos, e o mais velho tem ${d} anos a mais que o mais novo. Qual é a idade do mais velho?`,
    ok: `${(s + d) / 2} anos.`, why: `Se o mais novo tem x, o mais velho tem x + ${d}, e 2x + ${d} = ${s}. Logo, x = ${(s - d) / 2} e o mais velho tem ${(s + d) / 2}.`,
    bad: [[`${(s - d) / 2} anos.`, 'É a idade do mais novo.'], [`${s / 2} anos.`, 'Divide a soma por 2, ignorando a diferença.'], [`${s - d} anos.`, 'Subtrai a diferença da soma, sem dividir.']]
  }));
  T('media-notas', 'm29', 'média', [[[6, 7.5, 8, 9.5]], [[5.5, 7, 8.5, 9]], [[8, 6, 7.5, 6.5, 9]]], notas => {
    const avg = notas.reduce((a, b) => a + b, 0) / notas.length;
    return {
      prompt: `As notas de Carla em ${notas.length} avaliações foram ${notas.map(n => br(n, 1)).join('; ')}. Qual é a média?`,
      ok: br(avg, 2), why: `Soma: ${br(notas.reduce((a, b) => a + b, 0), 1)}; dividida por ${notas.length}: ${br(avg, 2)}.`,
      bad: [[br(avg + 0.5, 2), 'Erro de soma ou de divisão.'], [br(avg - 0.5, 2), 'Erro de soma ou de divisão.'], [br(notas.reduce((a, b) => a + b, 0), 2), 'É a soma das notas, sem dividir.']]
    };
  });
  T('troco-compras', 'm25', 'média', [[3, 8.5, 2, 4.75, 50], [4, 6.2, 3, 2.9, 50], [2, 14.9, 5, 3.2, 100]], (n1, p1, n2, p2, pay) => {
    const total = n1 * p1 + n2 * p2;
    return {
      prompt: `Rui comprou ${n1} cadernos de ${rs(p1)} cada e ${n2} canetas de ${rs(p2)} cada. Pagou com ${rs(pay)}. Quanto recebeu de troco?`,
      ok: rs(pay - total), why: `Gastou ${br(n1 * p1, 2)} + ${br(n2 * p2, 2)} = ${br(total, 2)}. Troco: ${br(pay, 2)} − ${br(total, 2)} = ${br(pay - total, 2)}.`,
      bad: [[rs(total), 'É o valor da compra, e não o troco.'], [rs(pay - n1 * p1), 'Esquece de descontar as canetas.'], [rs(pay - total - 1), 'Erro de cálculo no total.']]
    };
  });
  const frac = (n, d) => { const g = gcd(n, d); return `${n / g}/${d / g}`; };
  T('probabilidade-bolas', 'm28', 'média', [[5, 3, 2], [7, 3, 5], [9, 4, 2]], (v, a, z) => {
    const t = v + a + z;
    return {
      prompt: `Uma caixa tem ${v} bolas vermelhas, ${a} azuis e ${z} amarelas, todas do mesmo tamanho. Retirando uma bola sem olhar, qual é a probabilidade de ela ser azul?`,
      ok: frac(a, t), why: `${a} bolas azuis em ${t}: ${a}/${t}${gcd(a, t) > 1 ? ' = ' + frac(a, t) : ''}.`,
      bad: [[frac(a, v + z), 'Compara as azuis com as de outras cores, sem considerar o total.'], [frac(v, t), 'É a probabilidade de a bola ser vermelha.'], [frac(z, t), 'É a probabilidade de a bola ser amarela.']]
    };
  });
  T('area-triangulo', 'm23', 'média', [[12, 7], [20, 9], [16, 5]], (b, h) => ({
    prompt: `Um painel retangular mede ${b} cm de base por ${h} cm de altura. Uma pintora cobrirá somente a metade dele, dividida por uma diagonal. Qual é a área da parte coberta?`,
    ok: `${br(b * h / 2)} cm².`, why: `Área do retângulo: ${b} × ${h} = ${b * h} cm². Metade: ${br(b * h / 2)} cm².`,
    bad: [[`${b * h} cm².`, 'É a área do painel inteiro.'], [`${b + h} cm².`, 'Soma as medidas, em vez de multiplicar.'], [`${2 * (b + h)} cm².`, 'É o perímetro do painel.']]
  }));
  T('proporcao-viagem', 'm16', 'média', [[3, 240, 5], [4, 280, 6], [2, 150, 7]], (h, km, h2) => ({
    prompt: `Um ônibus, em velocidade constante, percorre ${km} km em ${h} horas. Quantos quilômetros percorrerá em ${h2} horas?`,
    ok: `${km / h * h2} km.`, why: `Em 1 hora, ${km / h} km. Em ${h2} horas: ${km / h} × ${h2} = ${km / h * h2} km.`,
    bad: [[`${km + h2} km.`, 'Soma, em vez de usar proporção.'], [`${km / h} km.`, 'É a distância percorrida em uma hora.'], [`${km * h2} km.`, 'Multiplica a distância total pelo número de horas.']]
  }));
  T('inteiro-parte', 'm12', 'média', [[250, 40], [180, 35], [420, 15]], (n, p) => ({
    prompt: `Em um evento com ${n} pessoas, ${p}% são crianças. Quantos adultos há no evento, se todos os demais são adultos?`,
    ok: `${br(n - n * p / 100)} adultos.`, why: `${p}% de ${n} = ${br(n * p / 100)} crianças. Adultos: ${n} − ${br(n * p / 100)} = ${br(n - n * p / 100)}.`,
    bad: [[`${br(n * p / 100)} adultos.`, 'É o número de crianças.'], [`${br(n - p)} adultos.`, 'Subtrai o percentual como se fosse um número de pessoas.'], [`${br(n * (100 - p) / 10)} adultos.`, 'Erro na posição da vírgula.']]
  }));
})();
