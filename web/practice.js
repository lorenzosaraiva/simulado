(function () {
  'use strict';
  // Content identity survives restarts, regenerated IDs and reordered alternatives.
  function fingerprint(q) {
    const content = JSON.stringify([q.subject, q.prompt, q.options[q.correct]]);
    let a = 2166136261, b = 5381;
    for (let i = 0; i < content.length; i++) {
      a = Math.imul(a ^ content.charCodeAt(i), 16777619);
      b = Math.imul(b, 33) ^ content.charCodeAt(i);
    }
    return `${content.length}:${(a >>> 0).toString(16)}:${(b >>> 0).toString(16)}`;
  }
  function shuffled(items, random = Math.random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function usage(attempts) {
    const counts = new Map(), recent = new Map(), families = new Map();
    attempts.forEach((attempt, index) => {
      (attempt.families || (attempt.questions || []).map(family)).forEach(key => families.set(key, (families.get(key) || 0) + 1));
      (attempt.keys || (attempt.questions || []).map(fingerprint)).forEach(key => {
        counts.set(key, (counts.get(key) || 0) + 1);
        if (!recent.has(key)) recent.set(key, index);
      });
    });
    return { counts, recent, families };
  }
  function family(q) { return q.contextFamily || q.family || (q.id.startsWith('mat-') ? q.id.replace(/-\d.*$/, '') : q.base || q.id); }
  function ranked(pool, attempts, random, limit = pool.length) {
    const { counts, recent, families } = usage(attempts);
    // Sample the tie breaker once; random values inside Array.sort are inconsistent.
    const candidates = pool.map(q => ({ q, key: fingerprint(q), tie: random() }));
    const selected = [], usedFamilies = new Map(), usedTopics = new Map();
    while (candidates.length && selected.length < limit) {
      candidates.sort((a, b) => {
        const ar = recent.get(a.key), br = recent.get(b.key);
        const aRecent = ar !== undefined && ar < 3, bRecent = br !== undefined && br < 3;
        return Number(counts.has(a.key)) - Number(counts.has(b.key)) || Number(aRecent) - Number(bRecent) ||
          (counts.get(a.key) || 0) - (counts.get(b.key) || 0) ||
          Number(b.q.difficulty === 'difícil') - Number(a.q.difficulty === 'difícil') ||
          (usedFamilies.get(family(a.q)) || 0) - (usedFamilies.get(family(b.q)) || 0) ||
          Number(!!b.q.examStyle) - Number(!!a.q.examStyle) ||
          (families.get(family(a.q)) || 0) - (families.get(family(b.q)) || 0) ||
          (usedTopics.get(a.q.topic) || 0) - (usedTopics.get(b.q.topic) || 0) ||
          (br ?? 9999) - (ar ?? 9999) || a.tie - b.tie;
      });
      const {q} = candidates.shift(); selected.push(q);
      usedFamilies.set(family(q), (usedFamilies.get(family(q)) || 0) + 1);
      usedTopics.set(q.topic, (usedTopics.get(q.topic) || 0) + 1);
    }
    return selected;
  }
  function unique(pool) {
    const seen = new Set();
    return pool.filter(q => {
      const key = fingerprint(q);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  function select(bank, distribution, mode, attempts = [], random = Math.random) {
    const selected = [];
    Object.entries(distribution).forEach(([subject, count]) => {
      const pool = unique(bank[subject]);
      const authored = pool.filter(q => !q.origin.startsWith('Oficial'));
      const official = pool.filter(q => q.origin.startsWith('Oficial'));
      let items;
      if (mode === 'new') {
        items = ranked(authored, attempts, random, count);
      } else {
        // Official questions join the same rotation instead of occupying fixed seats.
        items = ranked([...authored, ...official], attempts, random, count);
      }
      if (items.length !== count) throw new Error(`Banco insuficiente para ${subject}`);
      selected.push(...shuffled(items, random));
    });
    return selected.map((q, i) => ({ ...q, examNumber: i + 1 }));
  }
  function mistakes(attempts) {
    const seen = new Set(), errors = [];
    attempts.forEach(attempt => (attempt.questions || []).forEach((q, index) => {
      const key = fingerprint(q);
      if (seen.has(key)) return;
      seen.add(key);
      const answer = attempt.answers?.[index] ?? null;
      if (answer !== q.correct) errors.push({ q, index, answer, attempt });
    }));
    return errors;
  }
  const equivalent = [
    ['Plantas e cadeia alimentar', 'Cadeia alimentar'],
    ['Regiões do Brasil', 'Região Sul', 'Divisão regional'],
    ['Volume e capacidade', 'Medidas de capacidade'],
    ['Volume', 'Volume de paralelepípedo'],
    ['Porcentagem e dinheiro', 'Porcentagem'],
    ['Plantas', 'Partes das plantas'],
    ['Sistemas respiratório e imunológico', 'Sistema respiratório', 'Vacinação']
  ];
  function related(a, b) {
    return a.subject === b.subject && (a.topic === b.topic ||
      equivalent.some(group => group.includes(a.topic) && group.includes(b.topic)));
  }
  function review(bank, errors, attempts = [], retry = false, topicKey = null, random = Math.random) {
    const focused = topicKey ? errors.filter(({ q }) => `${q.subject}::${q.topic}` === topicKey) : errors;
    if (retry) return unique(focused.map(({ q }) => q)).map((q, i) => ({ ...q, examNumber: i + 1, reviewKind: 'retry' }));
    const failed = new Set(focused.map(({ q }) => fingerprint(q)));
    const pool = unique(Object.values(bank).flat()).filter(q => !failed.has(fingerprint(q)));
    const selected = [], used = new Set();
    // Round robin gives every mistaken topic a turn before taking another question.
    const topics = [...new Map(focused.map(item => [`${item.q.subject}::${item.q.topic}`, item.q])).values()];
    const lists = topics.map(q => ({ q, candidates: ranked(pool.filter(candidate => related(q, candidate)), attempts, random) }));
    for (let round = 0; round < 2; round++) {
      for (const entry of lists) {
        const candidate = entry.candidates.find(q => !used.has(fingerprint(q)));
        const q = candidate || (round === 0 ? entry.q : null);
        if (!q || used.has(fingerprint(q))) continue;
        used.add(fingerprint(q));
        selected.push({ ...q, reviewKind: candidate ? 'related' : 'retry', reviewFallback: !candidate, reviewTopic: entry.q.topic });
      }
    }
    return selected.map((q, i) => ({ ...q, examNumber: i + 1 }));
  }
  window.CPM_PRACTICE = { fingerprint, family, select, mistakes, review, related };
})();
