const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

function load() {
  const context = { window: {}, Math, Date };
  vm.createContext(context);
  for (const file of ['extra-questions.js', 'challenge-bank.js', 'challenge-math.js', 'challenge-world.js','challenge-londrina-cmpa.js','challenge-londrina-math.js','challenge-londrina-world.js','challenge-visuals.js','challenge-exam.js','challenge-exam-math.js','challenge-exam-world.js','challenge-exam-history.js','challenge-review.js', 'questions.js', 'practice.js', 'archive.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'web', file), 'utf8'), context);
  }
  return context.window;
}

test('três simulados consecutivos respeitam a matriz e não repetem questões estáticas', () => {
  const { CPM_DATA: data, CPM_PRACTICE: engine } = load();
  for (const mode of ['balanced', 'new']) {
    const draws = [], allStatic = new Set();
    for (let run = 0; run < 3; run++) {
      const selected = engine.select(data.buildQuestionBank(), data.DISTRIBUTION, mode, draws);
      assert.equal(selected.length, 35);
      assert.equal(new Set(selected.map(engine.fingerprint)).size, 35);
      for (const [subject, count] of Object.entries(data.DISTRIBUTION)) {
        assert.equal(selected.filter(q => q.subject === subject).length, count);
      }
      for (const q of selected.filter(q => q.subject !== 'matematica')) {
        const key = engine.fingerprint(q);
        assert.ok(!allStatic.has(key), `Questão recente repetida: ${q.id}`);
        allStatic.add(key);
      }
      if (mode === 'new') assert.ok(selected.every(q => q.authored));
      draws.unshift({ keys: selected.map(engine.fingerprint) });
    }
  }
});

test('um erro de matemática gera somente treino do mesmo assunto', () => {
  const { CPM_DATA: data, CPM_PRACTICE: engine } = load();
  const bank = data.buildQuestionBank();
  const q = bank.matematica.find(q => q.topic === 'Porcentagem');
  const attempt = { questions: [q], answers: [(q.correct + 1) % 4] };
  const errors = engine.mistakes([attempt]);
  const review = engine.review(bank, errors, [attempt]);
  assert.ok(review.length >= 1 && review.length <= 2);
  assert.ok(review.every(item => item.subject === 'matematica' && engine.related(item, q)));
  assert.ok(review.every(item => engine.fingerprint(item) !== engine.fingerprint(q)));
  assert.ok(review.every(item => item.reviewKind === 'related'));
});

test('revisão sem outra questão para o assunto identifica o original sem preencher com matérias alheias', () => {
  const { CPM_DATA: data, CPM_PRACTICE: engine } = load();
  const q = data.buildQuestionBank().portugues.find(q => q.id.startsWith('edward-'));
  const result = engine.review({ portugues: [q] }, [{ q }]);
  assert.equal(result.length, 1);
  assert.equal(result[0].reviewKind, 'retry');
  assert.equal(result[0].reviewFallback, true);
});

test('acerto posterior elimina o erro pendente, e resposta em branco é um erro', () => {
  const { CPM_DATA: data, CPM_PRACTICE: engine } = load();
  const q = data.buildQuestionBank().historia[0];
  const old = { questions: [q], answers: [null] };
  assert.equal(engine.mistakes([old]).length, 1);
  const newResult = { questions: [{ ...q, id: 'outro-id' }], answers: [q.correct] };
  assert.equal(engine.mistakes([newResult, old]).length, 0);
  assert.equal(engine.review({ historia: [q] }, engine.mistakes([old]), [], true)[0].id, q.id);
});

test('identidade depende do enunciado e gabarito, sem depender do ID ou ordem de alternativas', () => {
  const { CPM_PRACTICE: engine } = load();
  const q = { id: 'first', subject: 'matematica', prompt: '<p>2 + 2?</p>', options: ['4', '5', '6', '7'], correct: 0 };
  const reordered = { ...q, id: 'second', options: ['5', '7', '4', '6'], correct: 2 };
  assert.equal(engine.fingerprint(q), engine.fingerprint(reordered));
  assert.notEqual(engine.fingerprint(q), engine.fingerprint({ ...q, prompt: '<p>3 + 3?</p>' }));
});

test('onze cadernos incluem todas as páginas, originais intactos e gabaritos locais', () => {
  const { CPM_ARCHIVE: archive } = load();
  assert.equal(archive.length, 13);
  assert.equal(archive.filter(item => item.region === 'PR').length, 8);
  assert.ok(archive.some(item => item.region === 'PE'));
  assert.ok(archive.some(item => item.region === 'DF'));
  assert.ok(archive.some(item => item.region === 'MG' && item.pages.length === 32));
  for (const entry of archive) {
    const original = fs.readFileSync(path.join(__dirname, '..', 'web', entry.original));
    assert.equal(crypto.createHash('sha256').update(original).digest('hex'), entry.sha256);
    if (entry.original.endsWith('.docx')) {
      const provided = fs.readFileSync(path.join(__dirname, '..', path.basename(entry.original)));
      assert.ok(original.equals(provided), entry.id);
    }
    for (const document of [entry, entry.answerKey].filter(Boolean)) {
      assert.ok(document.pages.length > 0);
      for (const page of document.pages) assert.ok(fs.statSync(path.join(__dirname, '..', 'web', page)).size > 1000);
    }
  }
});

test('questões autorais são identificadas e o banco contém charges e textos', () => {
  const { CPM_DATA: data } = load();
  const questions = Object.values(data.buildQuestionBank()).flat();
  assert.ok(questions.length > 200);
  assert.ok(questions.filter(q => q.prompt.includes('<svg')).length >= 6);
  assert.ok(questions.filter(q => q.prompt.includes('reading')).length >= 15);
  for (const q of questions.filter(q => q.authored)) assert.match(q.origin, /Criada por IA/);
});
