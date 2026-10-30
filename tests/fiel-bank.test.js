const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), load = require('../scripts/read-bank');
const fiel = w => w.CHALLENGE_BANK.questions.filter(q => q.fiel);
const answer = q => q.options.find(o => o.id === q.correctId).text;
const byFamily = (w, f) => fiel(w).find(q => q.family === 'fiel-' + f);
const num = s => Number(s.replace(/[^\d,]/g, '').replace(',', '.'));
const gcd = (a, b) => b ? gcd(b, a % b) : a, lcm = (a, b) => a / gcd(a, b) * b;

test('banco fiel: estrutura, quantidades por matéria e recursos visuais existentes', () => {
  const w = load(), qs = fiel(w);
  assert.deepEqual(Array.from(w.FIEL_POLISH_MISSING), []);
  const count = s => qs.filter(q => q.subject === s).length;
  assert.ok(count('portugues') >= 150 && count('matematica') >= 140 && count('ciencias') >= 65 && count('geografia') >= 58 && count('historia') >= 78);
  assert.ok(qs.filter(q => q.book).length >= 30 && qs.filter(q => q.collection === 'parana-curitiba').length >= 70 && qs.filter(q => q.visual).length >= 95);
  assert.equal(new Set(qs.map(q => q.id)).size, qs.length);
  for (const q of qs) {
    assert.equal(new Set(q.options.map(o => o.text.trim())).size, 4, q.family);
    assert.ok(q.options.every(o => o.explanation && o.explanation.trim().length > 5), q.family);
    assert.equal(q.options.filter(o => o.id === q.correctId).length, 1, q.family);
    assert.ok(['fácil', 'média', 'difícil'].includes(q.difficulty), q.family);
    if (q.visual) assert.ok(w.CHALLENGE_VISUALS[q.visual], q.family);
    if (q.book) assert.deepEqual(Array.from(q.schools), ['cep']);
  }
  for (const m of ['brasil-regioes', 'parana-cidades', 'parana-letras']) assert.ok(fs.existsSync(`web/fiel/${m}.svg`));
  for (const key of Object.keys(w.CHALLENGE_VISUALS).filter(k => k.startsWith('f_'))) {
    const html = w.CHALLENGE_VISUALS[key], src = html.match(/<img src="([^"]+)"/);
    if (src) assert.ok(fs.existsSync('web/' + src[1]), key); else assert.match(html, /<title>.+<\/title>/, key);
  }
});

test('banco fiel: a alternativa correta não se revela pelo tamanho nem pela posição', () => {
  const w = load(), qs = fiel(w);
  const longest = qs.filter(q => { const c = answer(q).length; return q.options.filter(o => o.id !== q.correctId).every(o => o.text.length < c); }).length;
  assert.ok(longest / qs.length <= 0.4, `a correta é a mais longa em ${longest} de ${qs.length}`);
  const cpm = w.CPM_DATA.buildQuestionBank(), position = [0, 0, 0, 0];
  fiel(w).filter(q => q.schools.includes('cpm')).forEach(q => position[cpm[q.subject].find(x => x.id === q.id).correct]++);
  const total = position.reduce((a, b) => a + b, 0);
  position.forEach(p => assert.ok(p / total > 0.18 && p / total < 0.32, position.join()));
});

test('banco fiel: respostas de Matemática recalculadas de forma independente', () => {
  const w = load(), A = f => answer(byFamily(w, f));
  assert.equal(A('oculto-subtracao'), String(2 + 5 + 8) ); assert.equal(7284 - 3956, 3328);
  assert.equal(A('expressao'), String(6 + 4 * 3 - 8 / 2));
  assert.equal(A('numeracao'), '720.005');
  assert.equal(num(A('fracao-restante')), 32 / (2 / 3 * 2 / 5));
  assert.equal(num(A('fracao-paginas')), 240 - (240 * 2 / 5 + 240 / 4));
  assert.equal(num(A('pct-sucessivos')), 200 * .8 * .9);
  assert.equal(num(A('pct-escola')), 480 - (480 * .35 + 480 / 4));
  assert.equal(num(A('troco')), +(100 - (3 * 12.9 + 2 * 3.45)).toFixed(2));
  assert.match(A('promocao'), /Loja A.*R\$ 12,00/); assert.equal(3 * 30 * .8 - 2 * 30, 12);
  assert.equal(num(A('queijo')), +(42.5 * .6).toFixed(2));
  assert.equal(num(A('copos')), Math.round(3.6 / .24));
  assert.equal(num(A('mmc-luzes')), lcm(12, 18));
  assert.equal(num(A('mmc-satelites')), 1985 + lcm(lcm(15, 20), 24));
  assert.equal(num(A('mdc-fitas')), (84 + 120 + 156) / gcd(gcd(84, 120), 156));
  assert.equal(num(A('divisores')), [...Array(36)].filter((_, i) => 36 % (i + 1) === 0).length);
  assert.equal(num(A('multiplos')), [...Array(99)].map((_, i) => 101 + i).filter(n => n % 7 === 0).length);
  assert.equal(num(A('pares-intervalo')), [...Array(29)].map((_, i) => 16 + i).filter(n => n % 2 === 0).length);
  assert.equal(num(A('tres-impares')), 51 / 3 + 2);
  assert.equal(num(A('seq-dobro-mais-um')), 23 * 2 + 1);
  assert.equal(num(A('seq-quadrados')), 100);
  assert.equal(num(A('igualdade-simbolo')), (25 - 7) / 2);
  assert.equal(num(A('balanca')), (5 - 1) / 2);
  const triangle = 12 / 3, circle = 6 * triangle / 4; assert.equal(num(A('equivalencia-simbolos')), 5 * circle);
  assert.match(A('receita'), new RegExp(`${450 * 10 / 6} g.*${3 * 10 / 6} ovos`));
  assert.equal(num(A('tinta')), 2 * 45 / 15);
  assert.equal(num(A('consumo')), 150 / 12 * 6.4);
  assert.equal(num(A('escala')), 4.5 * 500000 / 100000);
  assert.equal(num(A('fila')), 7 + 12 - 1);
  const years = [...Array(100)].map((_, x) => x).find(x => 38 + x === 2 * (11 + x)); assert.equal(num(A('idade')), years);
  assert.equal(num(A('combinacoes')), 3 * 4 * 2);
  assert.equal(A('urna'), '3/10'); assert.equal(A('dado-par'), '1/3'); assert.equal(A('media'), '7,75');
  assert.equal(A('tempo-fim'), `${Math.floor((15 * 60 + 40 + 115) / 60)}h${(15 * 60 + 40 + 115) % 60}min.`);
  assert.equal(A('tempo-total'), `${Math.floor(222 / 60)}h${222 % 60}min.`);
  assert.equal(num(A('massa').replace(' kg', '')), 3 * .75 + 2 * 1.5);
  assert.equal(num(A('capacidade')), 2400 / 300);
  assert.equal(num(A('unidades-soma')), 3000);
  assert.equal(A('fracao-hora'), '1h25min.');
  assert.equal(num(A('perimetro-cerca')), 2 * (25 + 18) * 3);
  assert.equal(num(A('piso')), Math.round(5 * 3.6 / .09));
  assert.equal(num(A('garrafas')), 50 * 60 * 40 / 1000 / 1.5);
  assert.equal(num(A('piscinas')), (6 * 4 * 1.5 - 5 * 3 * 1.2) * 1000);
  assert.equal(num(A('graf-total')), 18 + 24 + 30 + 12); assert.equal(num(A('graf-diferenca')), 30 - 12); assert.equal(num(A('graf-media')), 84 / 4);
  assert.equal(A('tab-pct'), '25%'); assert.equal(A('tab-prob'), '2/5'); assert.equal(A('tab-combinada'), '7/20');
  assert.equal(num(A('pizza-quantidade')), 200 * .15); assert.equal(num(A('pizza-comparacao')), 200 * (.5 - .25 - .1));
  assert.equal(num(A('l-area')), 10 * 8 - 4 * 3); assert.equal(num(A('l-perimetro')), 6 + 3 + 4 + 5 + 10 + 8);
  assert.equal(num(A('vista-total')), 2 + 1 + 3 + 1 + 3 + 1); assert.equal(A('vista-frontal'), '2, 3, 3');
  assert.equal(num(A('palitos-fig10')), 3 * 10 + 1); assert.equal(num(A('palitos-inverso')), (100 - 1) / 3);
  assert.equal(A('fracao-malha'), '3/8'); assert.equal(A('malha-pct'), '3/5');
  assert.equal(A('anuncio-total'), 'R$ 300,00'); assert.equal(num(A('anuncio-pct')), 100 / 400 * 100);
  assert.equal(num(A('info-agua-mes')), (216 - 40) * 2);
  assert.equal(num(A('escala-numerica')), 6 * 250000 / 100000);
  assert.equal(num(A('rotulo')), 18 * 4 + 3 * 4 + 6 * 9);
});

test('banco fiel: problemas parametrizados e imagens novas recalculados', () => {
  const w = load(), A = f => answer(byFamily(w, f));
  assert.equal(num(A('gen-desconto-1')), 80 * .75); assert.equal(num(A('gen-desconto-4')), 1200 * .88);
  assert.equal(num(A('gen-acrescimo-2')), Math.round(1500 * 1.12));
  assert.equal(num(A('gen-mmc-eventos-3')), lcm(12, 20)); assert.equal(num(A('gen-mdc-grupos-1')), (48 + 36) / gcd(48, 36));
  assert.equal(num(A('gen-calcada-1')), (8 + 2) * (5 + 2) - 8 * 5); assert.equal(num(A('gen-calcada-2')), (10 + 4) * (6 + 4) - 60);
  assert.equal(num(A('gen-volume-litros-1')), 80 * 50 * 30 / 1000); assert.equal(num(A('gen-soma-diferenca-1')), (45 + 7) / 2);
  assert.equal(num(A('gen-pa-1')), 5 + 19 * 4); assert.equal(num(A('gen-pa-2')), 3 + 14 * 7);
  assert.match(A('gen-resto-1'), /20 caixas completas e 10 ovos/); assert.equal(250, 12 * 20 + 10);
  assert.equal(num(A('gen-proporcao-viagem-1')), 240 / 3 * 5); assert.equal(num(A('gen-area-triangulo-1')), 12 * 7 / 2);
  assert.equal(A('gen-probabilidade-bolas-1'), '3/10'); assert.equal(num(A('gen-inteiro-parte-1')), 250 - 100);
  assert.equal(num(A('gen-fracao-turma-1')), 40 - 10 - (40 - 10) * 2 / 5);
  assert.equal(num(A('gen-fita-pedacos-1')), 360 / 45); assert.equal(num(A('gen-copos-ml-1')), 1500 / 250);
  assert.equal(A('gen-chegada-1'), '10h35min.'); assert.equal(7 * 60 + 45 + 170, 10 * 60 + 35);
  assert.equal(num(A('gen-moedas-1')), 18 / .25); assert.equal(num(A('gen-moedas-3')), 96);
  assert.equal(num(A('gen-troco-compras-1')), +(50 - (3 * 8.5 + 2 * 4.75)).toFixed(2));
  assert.equal(A('pizza-pct'), '37,5%'); assert.equal(A('pizza-quem'), 'Bia comeu mais; sobrou 3/8 da pizza.'); assert.equal(3 / 8 > 1 / 4, true);
  assert.match(A('preco-quilo'), /pacote B.*10,00/); assert.equal(6 / .5, 12); assert.equal(20 / 2, 10); assert.equal(4 * 6 - 20, num(A('preco-economia')));
  assert.equal(num(A('chuva-maximo')), 160 - 60); assert.equal(num(A('chuva-trimestre')), 160 + 140 + 120);
  assert.equal(Math.round(2 ** 0), 1);
});

test('banco fiel: datas e cronologias de História e de Mandela', () => {
  const w = load(), A = f => answer(byFamily(w, f));
  assert.equal(num(A('duracao-republica')), 1889 - 1853);
  assert.equal(num(A('linha-parana')), 1885 - 1853);
  assert.equal(num(A('mandela-ordem-linha-tempo')), 1990 - 1964);
  assert.match(A('mandela-cronologia-apartheid'), /14 anos/); assert.equal(1962 - 1948, 14);
  const timeline = w.CHALLENGE_VISUALS.f_linha_mandela; for (const y of [1918, 1948, 1962, 1964, 1990, 1993, 1994, 2013]) assert.ok(timeline.includes(String(y)));
  assert.equal(Math.ceil(1693 / 100), 17); assert.equal(Math.ceil(1853 / 100), 19);
});

test('simulados CEP e CPM: matriz, Mandela só no CEP, Paraná presente e níveis de dificuldade', () => {
  const w = load();
  for (let run = 0; run < 40; run++) {
    const s = w.CEP_ENGINE.select(w.CEP_BANK, 'simulado', {}, [], []);
    assert.equal(s.length, 30); assert.equal(new Set(s.map(q => q.id)).size, 30); assert.ok(s.every(q => q.fiel));
    for (const [subject, n] of Object.entries(w.CEP_COVERAGE.distribution)) assert.equal(s.filter(q => q.subject === subject).length, n);
    assert.ok(s.filter(q => q.book).length >= 2 && s.filter(q => q.book).length <= 4);
    assert.ok(s.some(q => q.subject === 'historia' && q.collection === 'parana-curitiba') && s.some(q => q.subject === 'geografia' && q.collection === 'parana-curitiba'));
    assert.ok(s.filter(q => q.difficulty === 'difícil').length >= 13 && s.filter(q => q.difficulty === 'fácil').length <= 6);
    assert.ok(s.filter(q => q.visual).length >= 3);
  }
  const bank = w.CPM_DATA.buildQuestionBank();
  assert.equal(Object.values(bank).flat().filter(q => q.book).length, 0);
  for (let run = 0; run < 20; run++) {
    const s = w.CPM_PRACTICE.select(bank, w.CPM_DATA.DISTRIBUTION, 'balanced', []);
    assert.equal(s.length, 35); assert.equal(new Set(s.map(w.CPM_PRACTICE.fingerprint)).size, 35);
    for (const [subject, n] of Object.entries(w.CPM_DATA.DISTRIBUTION)) assert.equal(s.filter(q => q.subject === subject).length, n);
    assert.ok(s.filter(q => q.fiel).length >= 27); assert.ok(s.filter(q => String(q.topic || '').startsWith('Edward Tulane')).length >= 2);
    assert.ok(s.some(q => q.subject === 'historia' && q.collection === 'parana-curitiba'));
  }
});

test('oito simulados CEP seguidos usam questões fiéis sem repetir', () => {
  const w = load(), draws = [], seen = new Set();
  for (let i = 0; i < 8; i++) { const s = w.CEP_ENGINE.select(w.CEP_BANK, 'simulado', {}, [], draws); s.forEach(q => { assert.ok(!seen.has(q.id)); seen.add(q.id); }); draws.push(s.map(q => q.id)); }
  assert.equal(seen.size, 240);
});
