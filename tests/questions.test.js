const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadData() {
  const code = fs.readFileSync(path.join(__dirname, '..', 'web', 'questions.js'), 'utf8');
  const context = { window: {}, console, Math, Date };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'web', 'extra-questions.js'), 'utf8'), context);
  for (const file of ['challenge-bank.js','challenge-math.js','challenge-world.js','challenge-londrina-cmpa.js','challenge-londrina-math.js','challenge-londrina-world.js','challenge-visuals.js','challenge-exam.js','challenge-exam-math.js','challenge-exam-world.js','challenge-exam-history.js','challenge-review.js']) vm.runInContext(fs.readFileSync(path.join(__dirname,'..','web',file),'utf8'),context);
  vm.runInContext(code, context);
  return context.window.CPM_DATA;
}

test('a matriz reproduz a distribuição oficial de 35 questões', () => {
  const { DISTRIBUTION } = loadData();
  assert.deepEqual({ ...DISTRIBUTION }, {
    portugues: 15,
    matematica: 10,
    ciencias: 4,
    geografia: 3,
    historia: 3
  });
  assert.equal(Object.values(DISTRIBUTION).reduce((a, b) => a + b, 0), 35);
});

test('o banco possui questões suficientes, válidas e explicadas', () => {
  const { DISTRIBUTION, buildQuestionBank } = loadData();
  const bank = buildQuestionBank();
  for (const [subject, required] of Object.entries(DISTRIBUTION)) {
    assert.ok(bank[subject].length >= required, `${subject} não tem questões suficientes`);
    assert.ok(bank[subject].filter((q) => !q.origin.startsWith('Oficial')).length >= required, `${subject} não tem inéditas suficientes`);
    for (const q of bank[subject]) {
      assert.equal(q.subject, subject);
      assert.equal(q.options.length, 4, `${q.id} deve ter quatro alternativas`);
      assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 3, `${q.id} tem gabarito inválido`);
      assert.ok(q.prompt.length > 20, `${q.id} tem enunciado curto demais`);
      assert.ok(q.explanation.length > 35, `${q.id} precisa de explicação`);
      assert.ok(q.source?.label, `${q.id} precisa indicar a base da resposta`);
    }
  }
});

test('as questões oficiais incluídas mantêm o gabarito publicado de 2025', () => {
  const { buildQuestionBank } = loadData();
  const all = Object.values(buildQuestionBank()).flat();
  const expected = {
    'of25-p02': 2, 'of25-p04': 0, 'of25-p05': 2, 'of25-p08': 3, 'of25-p14': 0,
    'of25-m16': 0, 'of25-m17': 3, 'of25-m18': 1, 'of25-m21': 2, 'of25-m22': 1, 'of25-m24': 0,
    'of25-c26': 0, 'of25-c27': 3, 'of25-c28': 0, 'of25-c29': 1,
    'of25-g30': 0, 'of25-g31': 1, 'of25-g32': 2,
    'of25-h33': 1, 'of25-h34': 3, 'of25-h35': 1
  };
  for (const [id, correct] of Object.entries(expected)) {
    const found = all.find((q) => q.id === id);
    assert.ok(found, `questão ${id} ausente`);
    assert.equal(found.correct, correct, `gabarito divergente em ${id}`);
  }
});

test('as variações aleatórias sempre oferecem quatro alternativas diferentes', () => {
  const { buildQuestionBank } = loadData();
  for (let run = 0; run < 300; run += 1) {
    const bank = buildQuestionBank();
    for (const q of Object.values(bank).flat()) {
      assert.equal(new Set(q.options).size, 4, `${q.id} gerou alternativas repetidas`);
    }
  }
});

test('o banco inclui a leitura recomendada de Edward Tulane com questões autorais', () => {
  const { buildQuestionBank } = loadData();
  const questions = buildQuestionBank().portugues.filter((q) => q.id.startsWith('edward-'));
  assert.ok(questions.length >= 8, 'deve haver variedade de questões sobre Edward Tulane');
  for (const q of questions) {
    assert.match(q.origin, /leitura 2027/);
    assert.match(q.source.label, /Candlewick Press/);
  }
});
