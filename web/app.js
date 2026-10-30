(function () {
  'use strict';

  const { SUBJECTS, DISTRIBUTION, buildQuestionBank } = window.CPM_DATA;
  const STORAGE = {
    history: 'rumoCpm.history.v1',
    current: 'rumoCpm.current.v1',
    parked: 'rumoCpm.parked.v1',
    profile: 'rumoCpm.profile.v1',
    draws: 'rumoCpm.draws.v2'
  };
  const LETTERS = ['A', 'B', 'C', 'D'];

  const state = {
    view: 'home',
    exam: null,
    result: null,
    historyDetail: null,
    reviewAttempts: null,
    archiveRegion: 'all',
    archiveDoc: null,
    archivePage: 0,
    archiveKey: false,
    archiveZoom: false,
    timer: null,
    draftName: loadJson(STORAGE.profile, { name: '' }).name || '',
    draftMix: 'balanced'
  };

  const app = document.getElementById('app');

  function loadJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed ?? fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function history() {
    const value = loadJson(STORAGE.history, []);
    return Array.isArray(value) ? value : [];
  }

  function parkedExams() {
    const value = loadJson(STORAGE.parked, []);
    return Array.isArray(value) ? value.filter((exam) => exam && exam.status === 'active' && Array.isArray(exam.questions)) : [];
  }

  // Every unfinished exam, the current one first. Starting a training no longer discards a simulado.
  function openExams() {
    const current = loadJson(STORAGE.current, null);
    return [...(current && current.status === 'active' ? [current] : []), ...parkedExams()];
  }

  function examLabel(exam) {
    return exam.mix === 'review' ? 'Treino dos erros' : 'Simulado completo';
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function questionVisual(q) {
    const graphic=window.CHALLENGE_VISUALS?.[q.visual];
    return graphic?`<figure class="challenge-visual">${graphic}<figcaption>${q.visual==='v_brazil'?'Mapa · geometria do IBGE':'Ilustração autoral'} · <button class="text-button" data-action="zoom-visual" data-visual="${escapeHtml(q.visual)}">Ampliar imagem</button></figcaption></figure>`:'';
  }

  function zoomVisual(key) {
    const graphic=window.CHALLENGE_VISUALS?.[key];
    if(!graphic)return;
    const previous=document.activeElement,dialog=document.createElement('dialog');
    dialog.className='question-zoom';dialog.setAttribute('aria-label','Imagem ampliada');
    dialog.innerHTML=`<button class="button secondary" type="button" autofocus>Fechar ampliação</button><div>${graphic}</div>`;
    dialog.querySelector('button').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('close',()=>{dialog.remove();if(previous?.isConnected)previous.focus();});
    document.body.append(dialog);dialog.showModal();
  }

  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function formatDate(value, includeTime = false) {
    const date = new Date(value);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: 'short', year: 'numeric',
      ...(includeTime ? { hour: '2-digit', minute: '2-digit' } : {})
    }).format(date).replace('.', '');
  }

  function formatDuration(seconds) {
    const safe = Math.max(0, Math.round(seconds || 0));
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const secs = safe % 60;
    if (hours) return `${hours}h ${String(minutes).padStart(2, '0')}min`;
    if (minutes) return `${minutes}min ${String(secs).padStart(2, '0')}s`;
    return `${secs}s`;
  }

  function formatTimer(seconds) {
    const safe = Math.max(0, Math.floor(seconds));
    const h = Math.floor(safe / 3600);
    const m = Math.floor((safe % 3600) / 60);
    const s = safe % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function uid() {
    return globalThis.crypto?.randomUUID?.() || `attempt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function icon(name, size = 20) {
    const paths = {
      home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5M9.5 20v-6h5v6"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
      book: '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22zM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22z"/>',
      arrow: '<path d="m9 18 6-6-6-6"/>',
      back: '<path d="m15 18-6-6 6-6"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
      bulb: '<path d="M9 18h6M10 22h4M8.2 14.5A6 6 0 1 1 15.8 14.5c-.8.7-1.3 1.5-1.3 2.5h-5c0-1-.5-1.8-1.3-2.5Z"/>',
      flag: '<path d="M5 21V4m0 1h11l-2 3 2 3H5"/>',
      chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
      external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
      download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14"/>',
      upload: '<path d="M12 16V4m0 0 4 4m-4-4L8 8M5 20h14"/>',
      trash: '<path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7M10 11v6m4-6v6"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>'
    };
    return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;
  }

  function appShell(content, active = state.view) {
    const inExam = active === 'exam';
    return `
      <div class="app-shell ${inExam ? 'exam-mode' : ''}">
        <header class="topbar">
          <button class="brand" data-action="home" aria-label="Ir para o início">
            <span class="brand-mark"><span>R</span></span>
            <span><b>Rumo ao CPM</b><small>Preparação com propósito</small></span>
          </button>
          ${inExam ? `
            <div class="exam-top-progress">
              <span id="exam-top-label">Questão ${(state.exam?.index || 0) + 1} de ${state.exam?.questions.length}</span>
              <span class="top-progress-track"><i id="exam-top-bar" style="width:${(((state.exam?.index || 0) + 1) / state.exam?.questions.length) * 100}%"></i></span>
            </div>
            <div class="exam-clock ${remainingSeconds() < 900 ? 'urgent' : ''}" id="exam-clock">${icon('clock', 18)} <span>${formatTimer(remainingSeconds())}</span></div>
          ` : `
            <nav class="main-nav" aria-label="Navegação principal">
              <button class="nav-link ${active === 'home' ? 'active' : ''}" data-action="home">${icon('home', 18)} Início</button>
              <button class="nav-link ${active === 'create' ? 'active' : ''}" data-action="create">${icon('plus', 18)} Criar simulado</button>
              <button class="nav-link ${active === 'history' ? 'active' : ''}" data-action="history">${icon('history', 18)} Histórico</button>
              <button class="nav-link ${active === 'review' ? 'active' : ''}" data-action="review">${icon('bulb', 18)} Revisão</button>
              <button class="nav-link ${active === 'archive' ? 'active' : ''}" data-action="archive">${icon('book', 18)} Provas reais</button>
              <button class="nav-link ${active === 'sources' ? 'active' : ''}" data-action="sources">${icon('book', 18)} Conteúdos</button>
            </nav>
          `}
        </header>
        ${content}
      </div>`;
  }

  function toast(message, kind = 'info') {
    const region = document.getElementById('toast-region');
    const node = document.createElement('div');
    node.className = `toast ${kind}`;
    node.innerHTML = `${kind === 'success' ? icon('check', 18) : ''}<span>${escapeHtml(message)}</span>`;
    region.appendChild(node);
    setTimeout(() => node.classList.add('show'), 10);
    setTimeout(() => {
      node.classList.remove('show');
      setTimeout(() => node.remove(), 250);
    }, 3200);
  }

  function scrollToTop() {
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
  }

  function calculateStats(items) {
    if (!items.length) return { attempts: 0, average: 0, best: 0, totalTime: 0 };
    const scores = items.map((item) => ((item.cleanScore ?? item.score ?? 0) / item.questions.length) * 100);
    return {
      attempts: items.length,
      average: Math.round(scores.reduce((a, b) => a + b, 0) / items.length),
      best: Math.round(Math.max(...scores)),
      totalTime: items.reduce((sum, item) => sum + (item.durationUsed || 0), 0)
    };
  }

  function homeView() {
    stopTimer();
    const items = history();
    const stats = calculateStats(items);
    const current = loadJson(STORAGE.current, null);
    const recent = items.slice(0, 3);
    const greeting = state.draftName ? `Olá, ${escapeHtml(state.draftName.split(' ')[0])}!` : 'Olá!';
    const performance = aggregateSubjects(items);

    const content = `
      <main class="page home-page">
        ${openExams().map((exam) => `
          <section class="resume-banner">
            <div class="resume-icon">${icon('clock', 24)}</div>
            <div><b>${examLabel(exam)} em andamento</b><span>${answeredCount(exam)} de ${exam.questions.length} questões respondidas · restam ${formatDuration(remainingSeconds(exam))}</span></div>
            <button class="button secondary compact" data-action="resume" data-id="${exam.id}">Continuar ${icon('arrow', 17)}</button>
            <button class="button ghost compact" data-action="discard-exam" data-id="${exam.id}">Descartar</button>
          </section>
        `).join('')}
        <section class="hero">
          <div class="hero-copy">
            <span class="eyebrow">PROCESSO CLASSIFICATÓRIO 2027</span>
            <h1>${greeting}<br><em>Vamos avançar?</em></h1>
            <p>Simulados no formato oficial para transformar estudo em confiança — uma questão de cada vez.</p>
            <div class="hero-actions">
              <button class="button primary" data-action="create">${icon('plus', 19)} Criar simulado</button>
              ${current ? '<button class="button ghost" data-action="resume">Retomar prova</button>' : '<button class="button ghost" data-action="sources">Ver conteúdos da prova</button>'}
            </div>
          </div>
          <div class="hero-score-card" aria-label="Resumo de desempenho">
            <div class="score-ring" style="--score:${stats.average}">
              <div><strong>${stats.attempts ? `${stats.average}%` : '—'}</strong><span>média geral</span></div>
            </div>
            <div class="hero-score-meta">
              <span><b>${stats.attempts}</b> simulados</span>
              <span><b>${stats.attempts ? `${stats.best}%` : '—'}</b> melhor nota</span>
            </div>
            <span class="tiny-note">Notas das tentativas</span>
          </div>
        </section>

        <section class="dashboard-grid">
          <div class="panel progress-panel">
            <div class="panel-heading"><div><span class="eyebrow">DESEMPENHO</span><h2>Por matéria</h2></div><button class="text-button" data-action="history">Ver detalhes ${icon('arrow', 15)}</button></div>
            ${items.length ? Object.entries(SUBJECTS).map(([key, subject]) => {
              const value = performance[key] || 0;
              return `<div class="subject-progress"><span class="subject-dot" style="--dot:${subject.color}"></span><b>${subject.short}</b><div class="bar"><i style="width:${value}%;--bar:${subject.color}"></i></div><strong>${value}%</strong></div>`;
            }).join('') : '<div class="empty-inline"><span>Seu desempenho por matéria aparecerá aqui depois do primeiro simulado.</span></div>'}
          </div>
          <div class="panel format-panel">
            <span class="eyebrow">FORMATO OFICIAL</span>
            <h2>35 questões · 3 horas</h2>
            <div class="format-stack">
              ${Object.entries(DISTRIBUTION).map(([key, count]) => `<div style="--subject:${SUBJECTS[key].color};--portion:${count}"><span>${count}</span><b>${SUBJECTS[key].short}</b></div>`).join('')}
            </div>
            <p>Distribuição idêntica à matriz do edital para ingresso no 6º ano.</p>
            <button class="text-button" data-action="open-edital">Abrir edital completo ${icon('external', 15)}</button>
          </div>
        </section>

        <section class="recent-section">
          <div class="section-heading"><div><span class="eyebrow">SEU RITMO</span><h2>Atividade recente</h2></div>${items.length > 3 ? '<button class="text-button" data-action="history">Histórico completo</button>' : ''}</div>
          ${recent.length ? `<div class="recent-list">${recent.map(recentCard).join('')}</div>` : `
            <div class="empty-state compact-empty">
              <div class="empty-illustration">${icon('flag', 30)}</div>
              <div><h3>Sua jornada começa aqui</h3><p>Faça o primeiro simulado para começar a acompanhar a evolução.</p></div>
              <button class="button secondary compact" data-action="create">Começar agora</button>
            </div>`}
        </section>
      </main>`;
    app.innerHTML = appShell(content, 'home');
  }

  function recentCard(item) {
    const pct = Math.round(((item.cleanScore ?? item.score) / item.questions.length) * 100);
    return `<button class="recent-card" data-action="history-detail" data-id="${item.id}">
      <span class="recent-date">${formatDate(item.finishedAt)}</span>
      <span class="mini-ring" style="--score:${pct}"><b>${item.cleanScore ?? item.score}</b><small>/${item.questions.length}</small></span>
      <span class="recent-copy"><b>${item.mix === 'review' ? 'Treino dos erros' : 'Simulado completo'}</b><small>${formatDuration(item.durationUsed)} · ${item.consultedCount || 0} consulta(s)</small></span>
      ${icon('arrow', 18)}
    </button>`;
  }

  function createView() {
    stopTimer();
    const current = loadJson(STORAGE.current, null);
    const mistakeCount = missedQuestions(history()).length;
    if (!mistakeCount && state.draftMix === 'review') state.draftMix = 'balanced';
    const content = `
      <main class="page create-page">
        <section class="page-intro narrow">
          <span class="eyebrow">NOVO SIMULADO</span>
          <h1>Prepare sua próxima missão.</h1>
          <p>O aplicativo monta uma prova equilibrada com o mesmo número de questões e a mesma distribuição do edital.</p>
        </section>
        <section class="builder-layout">
          <div class="builder-main panel">
            <div class="field-group">
              <label for="student-name">Nome do estudante <span>opcional</span></label>
              <input id="student-name" type="text" maxlength="40" placeholder="Como devemos chamar você?" value="${escapeHtml(state.draftName)}" />
            </div>
            <div class="field-group">
              <span class="field-label">Tipo de questões</span>
              <div class="choice-cards">
                <button class="choice-card ${state.draftMix === 'balanced' ? 'selected' : ''}" data-action="set-mix" data-mix="balanced">
                  <span class="choice-radio"></span><span><b>Equilibrado</b><small>Alterna questões oficiais e autorais, priorizando as que você ainda não viu.</small></span><em>Recomendado</em>
                </button>
                <button class="choice-card ${state.draftMix === 'new' ? 'selected' : ''}" data-action="set-mix" data-mix="new">
                  <span class="choice-radio"></span><span><b>Somente autorais</b><small>Criadas por IA, com textos, charges e variações de cálculo. Questões recentes ficam para depois.</small></span>
                </button>
                <button class="choice-card ${state.draftMix === 'review' ? 'selected' : ''}" data-action="set-mix" data-mix="review" ${mistakeCount ? '' : 'disabled'}>
                  <span class="choice-radio"></span><span><b>Revisar meus erros</b><small>${mistakeCount ? `Veja os ${mistakeCount} erros pendentes e escolha questões do mesmo assunto.` : 'Disponível depois que você concluir um simulado com pontos para revisar.'}</small></span><em>${mistakeCount ? 'Personalizado' : 'Bloqueado'}</em>
                </button>
              </div>
            </div>
            <div class="reliability-note">
              ${icon('check', 20)}
              <div><b>Origem sempre identificada</b><p>As questões autorais exibem a flag “Criada por IA”, com resposta e explicação. Os cadernos completos estão na aba Provas reais.</p></div>
            </div>
          </div>
          <aside class="exam-summary panel">
            <span class="eyebrow">SUA PROVA</span>
            ${state.draftMix === 'review' ? `<h2>Revisão por assunto</h2><p>Abra a lista dos ${mistakeCount} erros pendentes. Depois escolha refazer as questões originais ou praticar outras do mesmo assunto.</p>` : `<h2>Simulado completo</h2>
            <div class="summary-metrics"><div><b>35</b><span>questões</span></div><div><b>03:00</b><span>horas</span></div><div><b>4</b><span>alternativas</span></div></div>
            <div class="summary-subjects">${Object.entries(DISTRIBUTION).map(([key, count]) => `<span><i style="--subject:${SUBJECTS[key].color}"></i>${SUBJECTS[key].short}<b>${count}</b></span>`).join('')}</div>`}
            <button class="button primary wide" data-action="start">${state.draftMix === 'review' ? 'Ver meus erros' : 'Gerar simulado'} ${icon('arrow', 18)}</button>
            ${current ? '<p class="replace-warning">O simulado em andamento fica guardado; você poderá continuar de onde parou.</p>' : ''}
          </aside>
        </section>
      </main>`;
    app.innerHTML = appShell(content, 'create');
  }

  function missedQuestions(attempts) {
    return window.CPM_PRACTICE.mistakes(attempts || []);
  }

  function launchExam(mix, attempts, questions) {
    const previousDraws = loadJson(STORAGE.draws, []);
    const selected = questions || window.CPM_PRACTICE.select(buildQuestionBank(), DISTRIBUTION, mix,
      [...(Array.isArray(previousDraws) ? previousDraws : []), ...history()]);
    if (!selected.length) return toast('Não há questões para este treino.');
    const open = loadJson(STORAGE.current, null);
    if (open && open.status === 'active') saveJson(STORAGE.parked, [open, ...parkedExams()].slice(0, 6));
    state.exam = {
      id: uid(),
      studentName: state.draftName,
      mix,
      questions: selected,
      answers: Array(selected.length).fill(null),
      consulted: Array(selected.length).fill(false),
      explanationOpen: Array(selected.length).fill(false),
      index: 0,
      startedAt: new Date().toISOString(),
      durationSeconds: mix === 'review' ? Math.max(10 * 60, selected.length * 5 * 60) : 3 * 60 * 60,
      status: 'active'
    };
    saveJson(STORAGE.draws, [{ keys: selected.map(window.CPM_PRACTICE.fingerprint), families: selected.map(window.CPM_PRACTICE.family) }, ...(Array.isArray(previousDraws) ? previousDraws : [])].slice(0, 100));
    saveCurrent();
    state.view = 'exam';
    examView();
    scrollToTop();
  }

  function startExam() {
    const input = document.getElementById('student-name');
    state.draftName = input?.value.trim() || '';
    saveJson(STORAGE.profile, { name: state.draftName });
    if (state.draftMix === 'review') return reviewView();
    launchExam(state.draftMix);
  }

  function startReviewExam(retry = false, topicKey = null) {
    const attempts = state.reviewAttempts || history();
    const errors = missedQuestions(attempts);
    if (!errors.length) {
      toast('Não há erros para revisar nesse simulado.', 'info');
      return;
    }
    state.draftName = attempts[0]?.studentName || state.draftName;
    saveJson(STORAGE.profile, { name: state.draftName });
    const questions = window.CPM_PRACTICE.review(buildQuestionBank(), errors, history(), retry, topicKey);
    launchExam('review', attempts, questions);
  }

  function resumeExam(id = null) {
    let current = loadJson(STORAGE.current, null);
    if (id && (!current || current.id !== id)) {
      const parked = parkedExams();
      const wanted = parked.find((exam) => exam.id === id);
      if (wanted) {
        const rest = parked.filter((exam) => exam.id !== id);
        saveJson(STORAGE.parked, current && current.status === 'active' ? [current, ...rest] : rest);
        saveJson(STORAGE.current, wanted);
        current = wanted;
      }
    }
    if (!current || current.status !== 'active') {
      toast('Não há simulado em andamento.');
      homeView();
      return;
    }
    state.exam = current;
    state.view = 'exam';
    examView();
    scrollToTop();
  }

  function discardExam(id) {
    if (!window.confirm('Descartar este treino em andamento? As respostas dele serão apagadas e não entrarão no histórico. Os resultados anteriores continuam salvos.')) return;
    const current = loadJson(STORAGE.current, null);
    if (current && current.id === id) {
      localStorage.removeItem(STORAGE.current);
      if (state.exam && state.exam.id === id) state.exam = null;
    } else {
      saveJson(STORAGE.parked, parkedExams().filter((exam) => exam.id !== id));
    }
    toast('Treino descartado. Nenhum resultado foi registrado.');
    state.view = 'home';
    homeView();
  }

  function saveCurrent() {
    if (state.exam?.status === 'active') saveJson(STORAGE.current, state.exam);
  }

  function elapsedSeconds(exam = state.exam) {
    return Math.max(0, Math.floor((Date.now() - new Date(exam.startedAt).getTime()) / 1000));
  }

  function remainingSeconds(exam = state.exam) {
    if (!exam) return 0;
    return Math.max(0, exam.durationSeconds - elapsedSeconds(exam));
  }

  function answeredCount(exam = state.exam) {
    return exam?.answers?.filter((answer) => answer !== null).length || 0;
  }

  function examView() {
    stopTimer();
    const exam = state.exam;
    if (!exam) return homeView();
    const q = exam.questions[exam.index];
    const answer = exam.answers[exam.index];
    const revealed = exam.consulted[exam.index];
    const explanationOpen = exam.explanationOpen[exam.index];
    const answered = answeredCount(exam);

    const content = `
      <main class="exam-page">
        <aside class="question-rail">
          <div class="rail-heading"><span><b>${answered}</b> respondidas</span><small>${exam.questions.length - answered} restantes</small></div>
          <div class="question-grid" aria-label="Questões">
            ${exam.questions.map((item, index) => {
              const classes = [index === exam.index ? 'current' : '', exam.answers[index] !== null ? 'answered' : '', exam.consulted[index] ? 'consulted' : ''].filter(Boolean).join(' ');
              return `<button class="question-pill ${classes}" data-action="goto-question" data-index="${index}" aria-label="Ir à questão ${index + 1}">${index + 1}</button>`;
            }).join('')}
          </div>
          <div class="rail-legend"><span><i class="answered"></i>Respondida</span><span><i class="consulted"></i>Consultada</span></div>
          <button class="finish-link" data-action="finish">Finalizar simulado</button>
        </aside>
        <section class="question-stage">
          <div class="question-card">
            <div class="question-meta">
              <span class="subject-chip" style="--subject:${SUBJECTS[q.subject].color}">${SUBJECTS[q.subject].label}</span>
              <span>${escapeHtml(q.topic)}</span>
              <span class="origin-chip ${q.authored || !q.origin.startsWith('Oficial') ? 'authored-chip' : ''}">${escapeHtml(q.origin)}</span>
            </div>
            ${exam.mix === 'review' ? `<p class="review-context">${q.reviewKind === 'retry' ? 'Refazendo a questão errada' : 'Outra questão do mesmo assunto'} · ${escapeHtml(q.reviewTopic || q.topic)}${q.reviewFallback ? ' · O acervo ainda não tem outra questão disponível para este tema.' : ''}</p>` : ''}
            <div class="question-title"><span>${exam.index + 1}</span><div>${questionVisual(q)}${q.prompt}</div></div>
            <div class="options" role="radiogroup" aria-label="Alternativas">
              ${q.options.map((option, index) => {
                const selected = answer === index;
                const correct = revealed && q.correct === index;
                const wrong = revealed && selected && q.correct !== index;
                return `<button class="option ${selected ? 'selected' : ''} ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}" data-action="answer" data-index="${index}" role="radio" aria-checked="${selected}" ${revealed ? 'disabled' : ''}>
                  <span class="option-letter">${LETTERS[index]}</span><span class="option-text">${escapeHtml(option)}</span>${correct ? `<span class="option-status">${icon('check', 18)} correta</span>` : ''}
                </button>`;
              }).join('')}
            </div>
            ${revealed ? `
              <div class="answer-reveal ${answer === q.correct ? 'is-correct' : 'is-wrong'}">
                <div>${icon('check', 21)}<span><b>Resposta: ${LETTERS[q.correct]}</b><small>${answer === null ? 'Questão consultada sem resposta marcada.' : answer === q.correct ? 'Você marcou a alternativa correta.' : `Você marcou ${LETTERS[answer]}.`} Sua seleção está bloqueada.</small></span></div>
                <button class="text-button" data-action="toggle-explanation">${icon('bulb', 17)} ${explanationOpen ? 'Fechar explicação' : 'Entender'}</button>
              </div>
              ${explanationOpen ? `<div class="explanation-panel"><div class="explanation-heading">${icon('bulb', 20)}<b>Entenda a resposta</b></div><p>${escapeHtml(q.explanation)}</p>${questionSourceLink(q.source)}</div>` : ''}
            ` : ''}
            <div class="question-actions">
              ${answer !== null ? `<button class="button subtle" data-action="reveal" ${revealed ? 'disabled' : ''}>${icon(revealed ? 'check' : 'eye', 18)} ${revealed ? 'Resposta checada' : 'Checar resposta'}</button>` : '<span class="answer-prompt">Marque uma alternativa para checar a resposta.</span>'}
              <div><button class="button ghost" data-action="previous" ${exam.index === 0 ? 'disabled' : ''}>${icon('back', 18)} Anterior</button><button class="button primary" data-action="next">${exam.index === exam.questions.length - 1 ? 'Revisar e finalizar' : 'Próxima'} ${icon('arrow', 18)}</button></div>
            </div>
          </div>
          <p class="keyboard-hint">Dica: use as teclas <kbd>1</kbd>–<kbd>4</kbd> para responder e <kbd>←</kbd> <kbd>→</kbd> para navegar.</p>
        </section>
      </main>`;
    app.innerHTML = appShell(content, 'exam');
    startTimer();
    document.querySelector('.question-card')?.focus();
  }

  function startTimer() {
    stopTimer();
    state.timer = setInterval(() => {
      const remaining = remainingSeconds();
      const clock = document.getElementById('exam-clock');
      if (clock) {
        clock.querySelector('span').textContent = formatTimer(remaining);
        clock.classList.toggle('urgent', remaining < 900);
      }
      if (remaining <= 0) {
        stopTimer();
        toast('O tempo terminou. O simulado foi finalizado.', 'info');
        finishExam(true);
      }
    }, 1000);
  }

  function stopTimer() {
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
  }

  function answerQuestion(index) {
    if (!state.exam || state.exam.consulted[state.exam.index]) return;
    state.exam.answers[state.exam.index] = index;
    saveCurrent();
    examView();
  }

  function revealAnswer() {
    if (!state.exam || state.exam.answers[state.exam.index] === null) return;
    state.exam.consulted[state.exam.index] = true;
    saveCurrent();
    examView();
  }

  function navigateQuestion(nextIndex) {
    if (!state.exam) return;
    state.exam.index = Math.min(state.exam.questions.length - 1, Math.max(0, nextIndex));
    saveCurrent();
    examView();
    scrollToTop();
  }

  function finishExam(force = false) {
    if (!state.exam) return;
    const unanswered = state.exam.questions.length - answeredCount();
    if (!force && unanswered > 0 && !window.confirm(`Ainda há ${unanswered} questão(ões) sem resposta. Deseja finalizar mesmo assim?`)) return;

    stopTimer();
    const exam = state.exam;
    const score = exam.questions.reduce((sum, q, index) => sum + (exam.answers[index] === q.correct ? 1 : 0), 0);
    // Checking after choosing cannot alter that choice, so it does not erase earned points.
    const cleanScore = score;
    const bySubject = {};
    Object.keys(SUBJECTS).forEach((key) => {
      const indices = exam.questions.map((q, index) => q.subject === key ? index : -1).filter((index) => index >= 0);
      bySubject[key] = {
        total: indices.length,
        correct: indices.filter((index) => exam.answers[index] === exam.questions[index].correct).length,
        cleanCorrect: indices.filter((index) => exam.answers[index] === exam.questions[index].correct).length
      };
    });
    const result = {
      ...exam,
      status: 'finished',
      score,
      cleanScore,
      consultedCount: exam.consulted.filter(Boolean).length,
      unanswered,
      bySubject,
      durationUsed: Math.min(exam.durationSeconds, elapsedSeconds(exam)),
      finishedAt: new Date().toISOString()
    };
    const items = history();
    items.unshift(result);
    saveJson(STORAGE.history, items.slice(0, 100));
    localStorage.removeItem(STORAGE.current);
    state.exam = null;
    state.result = result;
    state.view = 'result';
    resultView(result);
    scrollToTop();
  }

  function resultView(result) {
    stopTimer();
    const pct = Math.round((result.score / result.questions.length) * 100);
    const message = pct >= 85 ? ['Excelente trabalho!', 'Você demonstrou domínio consistente dos conteúdos.'] : pct >= 65 ? ['Muito bom!', 'Você está no caminho certo. Revise os pontos indicados abaixo.'] : ['Cada tentativa ensina.', 'Use a revisão para descobrir exatamente o que estudar agora.'];
    const content = `
      <main class="page result-page">
        <section class="result-hero">
          <span class="eyebrow">${result.mix === 'review' ? 'TREINO DE REVISÃO CONCLUÍDO' : 'SIMULADO CONCLUÍDO'}</span>
          <h1>${message[0]}</h1><p>${message[1]}</p>
          <div class="result-score-row">
            <div class="large-ring" style="--score:${pct}"><div><strong>${result.score}</strong><span>de ${result.questions.length}</span></div></div>
            <div class="result-facts">
              <div><span>Nota total</span><b>${pct}%</b></div>
              <div><span>Tentativa registrada</span><b>${result.cleanScore}/${result.questions.length}</b></div>
              <div><span>Tempo usado</span><b>${formatDuration(result.durationUsed)}</b></div>
              <div><span>Não respondidas</span><b>${result.unanswered}</b></div>
            </div>
          </div>
          ${result.consultedCount ? `<div class="consult-note">${icon('eye', 18)} Você consultou a resposta de ${result.consultedCount} questão(ões). A alternativa marcada foi mantida e bloqueada; conferir não tira seus pontos.</div>` : ''}
          <div class="result-actions"><button class="button primary" data-action="create">Criar outro simulado</button><button class="button ghost" data-action="home">Voltar ao início</button></div>
        </section>
        <section class="result-breakdown panel">
          <div class="panel-heading"><div><span class="eyebrow">RESULTADO</span><h2>Desempenho por matéria</h2></div></div>
          <div class="breakdown-grid">${Object.entries(SUBJECTS).map(([key, subject]) => {
            const data = result.bySubject[key];
            if (!data?.total) return '';
            const value = Math.round((data.correct / data.total) * 100);
            return `<div class="breakdown-item"><div><span class="subject-dot" style="--dot:${subject.color}"></span><b>${subject.short}</b><strong>${data.correct}/${data.total}</strong></div><div class="bar"><i style="width:${value}%;--bar:${subject.color}"></i></div><small>${value}% de acerto</small></div>`;
          }).join('')}</div>
        </section>
        ${errorAnalysis(result)}
        <section class="review-section">
          <div class="section-heading"><div><span class="eyebrow">REVISÃO</span><h2>Questão por questão</h2></div><div class="review-legend"><span><i class="dot-ok"></i>Acerto</span><span><i class="dot-error"></i>Erro</span><span><i class="dot-empty"></i>Em branco</span></div></div>
          <div class="review-list">${result.questions.map((q, index) => reviewItem(result, q, index)).join('')}</div>
        </section>
      </main>`;
    app.innerHTML = appShell(content, 'result');
  }

  function errorAnalysis(result) {
    const errors = result.questions.map((q, index) => ({ q, index, answer: result.answers[index] })).filter((item) => item.answer !== item.q.correct);
    if (!errors.length) {
      return `<section class="mistake-analysis panel mistake-analysis-perfect"><div>${icon('check', 26)}<div><span class="eyebrow">ANÁLISE DOS ERROS</span><h2>Nenhum ponto pendente</h2><p>Você acertou todas as questões. Continue praticando com um novo simulado para manter o ritmo.</p></div></div><button class="button secondary" data-action="create">Criar outro simulado</button></section>`;
    }

    const subjectCounts = {};
    const topicCounts = {};
    errors.forEach(({ q }) => {
      subjectCounts[q.subject] = (subjectCounts[q.subject] || 0) + 1;
      const key = `${q.subject}::${q.topic}`;
      topicCounts[key] = (topicCounts[key] || 0) + 1;
    });
    const mainTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return `<section class="mistake-analysis panel">
      <div class="mistake-analysis-heading"><div><span class="eyebrow">ANÁLISE DOS ERROS</span><h2>O que revisar agora</h2><p>Encontramos ${errors.length} ponto(s) para reforçar. O próximo treino prioriza estes temas.</p></div><button class="button primary" data-action="start-review">Treinar meus erros ${icon('arrow', 17)}</button></div>
      <div class="mistake-subjects">${Object.entries(subjectCounts).sort((a, b) => b[1] - a[1]).map(([subject, count]) => `<span style="--subject:${SUBJECTS[subject].color}"><i></i><b>${SUBJECTS[subject].short}</b>${count}</span>`).join('')}</div>
      <div class="weak-topics">${mainTopics.map(([key, count]) => { const [subject, topic] = key.split('::'); return `<span><small>${SUBJECTS[subject].short}</small><b>${escapeHtml(topic)}</b><em>${count} ponto(s)</em></span>`; }).join('')}</div>
      <div class="mistake-explanations"><h3>Explicações rápidas</h3>${errors.slice(0, 8).map(({ q, index }) => `<details><summary><span>Questão ${index + 1}</span><b>${escapeHtml(q.topic)}</b><em>Entender ${icon('arrow', 14)}</em></summary><div><p><strong>Resposta correta: ${LETTERS[q.correct]}.</strong> ${escapeHtml(q.explanation)}</p></div></details>`).join('')}</div>
    </section>`;
  }

  function reviewItem(result, q, index, open = false) {
    const answer = result.answers[index];
    const status = answer === null ? 'empty' : answer === q.correct ? 'correct' : 'wrong';
    return `<details class="review-item ${status}" ${open ? 'open' : ''}>
      <summary><span class="review-number">${index + 1}</span><span><b>${SUBJECTS[q.subject].short}</b><small>${escapeHtml(q.topic)}${result.consulted[index] ? ' · resposta consultada' : ''}</small></span><span class="review-answer">${answer === null ? 'Em branco' : status === 'correct' ? `${icon('check', 16)} Correta` : `Sua resposta: ${LETTERS[answer]}`}</span>${icon('arrow', 18)}</summary>
      <div class="review-content"><span class="origin-chip ${q.authored ? 'authored-chip' : ''}">${escapeHtml(q.origin)}</span><div class="review-prompt">${questionVisual(q)}${q.prompt}</div><div class="review-options">${q.options.map((option, optionIndex) => `<p class="${optionIndex === q.correct ? 'right' : optionIndex === answer ? 'chosen-wrong' : ''}"><b>${LETTERS[optionIndex]}</b>${escapeHtml(option)}</p>`).join('')}</div><div class="review-explanation"><b>Explicação · resposta ${LETTERS[q.correct]}</b><p>${escapeHtml(q.explanation)}</p>${questionSourceLink(q.source)}</div></div>
    </details>`;
  }

  function aggregateSubjects(items) {
    const total = {};
    Object.keys(SUBJECTS).forEach((key) => { total[key] = { right: 0, count: 0 }; });
    items.forEach((attempt) => {
      attempt.questions?.forEach((q, index) => {
        if (!total[q.subject] || attempt.consulted?.[index]) return;
        total[q.subject].count += 1;
        if (attempt.answers?.[index] === q.correct) total[q.subject].right += 1;
      });
    });
    return Object.fromEntries(Object.entries(total).map(([key, data]) => [key, data.count ? Math.round(data.right / data.count * 100) : 0]));
  }

  function sparkline(items) {
    const scores = [...items].reverse().slice(-10).map((item) => Math.round(((item.cleanScore ?? item.score) / item.questions.length) * 100));
    if (scores.length < 2) return '<div class="chart-empty">Faça pelo menos dois simulados para ver a linha de evolução.</div>';
    const width = 600, height = 150, pad = 12;
    const step = (width - pad * 2) / (scores.length - 1);
    const points = scores.map((score, index) => `${pad + index * step},${height - pad - (score / 100) * (height - pad * 2)}`).join(' ');
    return `<svg class="sparkline" viewBox="0 0 ${width} ${height}" role="img" aria-label="Evolução das notas"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3859a8" stop-opacity=".22"/><stop offset="1" stop-color="#3859a8" stop-opacity="0"/></linearGradient></defs><path d="M${points.split(' ').join(' L')} L${width - pad},${height - pad} L${pad},${height - pad} Z" fill="url(#chartFill)"/><polyline points="${points}" fill="none" stroke="#3859a8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${scores.map((score, index) => `<circle cx="${pad + index * step}" cy="${height - pad - (score / 100) * (height - pad * 2)}" r="5" fill="#fff" stroke="#3859a8" stroke-width="3"><title>${score}%</title></circle>`).join('')}</svg>`;
  }

  function historyView() {
    stopTimer();
    const items = history();
    const stats = calculateStats(items);
    const performance = aggregateSubjects(items);
    const content = `
      <main class="page history-page">
        <section class="page-intro history-intro"><div><span class="eyebrow">EVOLUÇÃO</span><h1>Histórico de resultados</h1><p>Veja os avanços, descubra os conteúdos que merecem atenção e retome cada resposta.</p></div><div class="backup-actions"><button class="button ghost compact" data-action="import">${icon('upload', 17)} Restaurar</button><button class="button secondary compact" data-action="export">${icon('download', 17)} Fazer backup</button></div></section>
        ${items.length ? `
          <section class="stat-cards">
            <div class="stat-card"><span>Simulados feitos</span><b>${stats.attempts}</b><small>histórico local</small></div>
            <div class="stat-card"><span>Média das tentativas</span><b>${stats.average}%</b><small>percentual por treino</small></div>
            <div class="stat-card"><span>Melhor resultado</span><b>${stats.best}%</b><small>de aproveitamento</small></div>
            <div class="stat-card"><span>Tempo de prática</span><b>${Math.max(1, Math.round(stats.totalTime / 60))}<small> min</small></b><small>tempo acumulado</small></div>
          </section>
          <section class="history-grid">
            <div class="panel evolution-panel"><div class="panel-heading"><div><span class="eyebrow">NOTA SEM CONSULTA</span><h2>Sua evolução</h2></div><span class="muted">Últimos 10</span></div>${sparkline(items)}</div>
            <div class="panel history-subjects"><div class="panel-heading"><div><span class="eyebrow">PRECISÃO</span><h2>Por matéria</h2></div></div>${Object.entries(SUBJECTS).map(([key, subject]) => `<div class="subject-progress"><span class="subject-dot" style="--dot:${subject.color}"></span><b>${subject.short}</b><div class="bar"><i style="width:${performance[key]}%;--bar:${subject.color}"></i></div><strong>${performance[key]}%</strong></div>`).join('')}</div>
          </section>
          <section class="attempts-section"><div class="section-heading"><div><span class="eyebrow">ARQUIVO</span><h2>Simulados e revisões</h2></div><button class="text-button danger-text" data-action="clear-history">${icon('trash', 16)} Limpar histórico</button></div><div class="attempt-table"><div class="attempt-head"><span>Data</span><span>Nota</span><span>Tentativa registrada</span><span>Tempo</span><span></span></div>${items.map((item) => `<div class="attempt-line"><button class="attempt-row" data-action="history-detail" data-id="${item.id}"><span><b>${formatDate(item.finishedAt, true)}</b><small>${escapeHtml(item.studentName || 'Estudante')} · ${item.mix === 'review' ? 'Revisão' : 'Simulado'}</small></span><span><b>${item.score}/${item.questions.length}</b><small>${Math.round(item.score / item.questions.length * 100)}%</small></span><span><b>${item.cleanScore ?? item.score}/${item.questions.length}</b><small>${item.consultedCount || 0} consulta(s)</small></span><span>${formatDuration(item.durationUsed)}</span><span>${icon('arrow', 18)}</span></button><button class="text-button danger-text attempt-delete" data-action="delete-attempt" data-id="${item.id}" aria-label="Excluir este resultado">${icon('trash', 16)} Excluir</button></div>`).join('')}</div></section>
        ` : `
          <section class="empty-state large-empty"><div class="empty-illustration">${icon('chart', 34)}</div><h2>Nenhum resultado ainda</h2><p>Quando você concluir um simulado, a nota, as respostas e o desempenho por matéria aparecerão aqui.</p><button class="button primary" data-action="create">Criar primeiro simulado</button></section>
        `}
      </main>`;
    app.innerHTML = appShell(content, 'history');
  }

  function historyDetailView(id) {
    const item = history().find((attempt) => attempt.id === id);
    if (!item) return historyView();
    state.historyDetail = item;
    const pct = Math.round(item.score / item.questions.length * 100);
    const content = `
      <main class="page detail-page">
        <button class="back-button" data-action="history">${icon('back', 18)} Voltar ao histórico</button>
        <section class="detail-header panel"><div><span class="eyebrow">${formatDate(item.finishedAt, true)}</span><h1>${item.mix === 'review' ? 'Resultado da revisão' : 'Resultado do simulado'}</h1><p>${escapeHtml(item.studentName || 'Estudante')} · ${formatDuration(item.durationUsed)} · ${item.consultedCount || 0} consulta(s)</p></div><div class="detail-score"><b>${item.score}</b><span>/${item.questions.length}</span><small>${pct}%</small></div><button class="text-button danger-text" data-action="delete-attempt" data-id="${item.id}">${icon('trash', 16)} Excluir este resultado</button></section>
        <section class="result-breakdown panel"><div class="panel-heading"><div><span class="eyebrow">MATÉRIAS</span><h2>Desempenho</h2></div><b>Tentativa registrada: ${item.cleanScore ?? item.score}/${item.questions.length}</b></div><div class="breakdown-grid">${Object.entries(SUBJECTS).map(([key, subject]) => { const data = item.bySubject[key]; if (!data?.total) return ''; const value = Math.round(data.correct / data.total * 100); return `<div class="breakdown-item"><div><span class="subject-dot" style="--dot:${subject.color}"></span><b>${subject.short}</b><strong>${data.correct}/${data.total}</strong></div><div class="bar"><i style="width:${value}%;--bar:${subject.color}"></i></div></div>`; }).join('')}</div></section>
        ${errorAnalysis(item)}
        <section class="review-section"><div class="section-heading"><div><span class="eyebrow">RESPOSTAS</span><h2>Revisão completa</h2></div></div><div class="review-list">${item.questions.map((q, index) => reviewItem(item, q, index)).join('')}</div></section>
      </main>`;
    app.innerHTML = appShell(content, 'history');
    scrollToTop();
  }

  function reviewView(sourceAttempt = null) {
    stopTimer();
    state.view = 'review';
    state.reviewAttempts = sourceAttempt ? [sourceAttempt] : history();
    const errors = missedQuestions(state.reviewAttempts);
    const topics = new Map();
    errors.forEach(({ q }) => {
      const key = `${q.subject}::${q.topic}`;
      const entry = topics.get(key) || { q, count: 0 };
      entry.count++;
      topics.set(key, entry);
    });
    const content = `<main class="page review-page">
      <section class="page-intro"><span class="eyebrow">REVISÃO PERSONALIZADA</span><h1>Entenda e supere cada erro.</h1>
      <p>${sourceAttempt ? 'Erros deste resultado.' : 'Erros ainda pendentes no histórico. Quando você refaz e acerta uma questão, ela sai desta lista.'} Veja sua resposta, o gabarito e a explicação antes de escolher o treino.</p></section>
      ${errors.length ? `<section class="panel review-overview"><h2>${errors.length} questão(ões) para revisar · ${topics.size} assunto(s)</h2>
        <p>O treino traz até duas questões por assunto, sem acrescentar matérias que você não errou. Se faltar outra questão no acervo, o aplicativo identifica a original para refazer.</p>
        <div class="review-actions"><button class="button primary" data-action="practice-related">Treinar questões semelhantes ${icon('arrow', 18)}</button><button class="button secondary" data-action="practice-retry">Refazer os erros originais</button></div></section>
        <section class="review-topics"><div class="section-heading"><h2>Escolha um assunto</h2></div><div class="topic-cards">${[...topics.entries()].map(([key, { q, count }]) => `<article class="panel topic-card"><small>${SUBJECTS[q.subject].label}</small><h3>${escapeHtml(q.topic)}</h3><p>${count} erro(s) ou resposta(s) em branco</p><button class="text-button" data-action="practice-topic" data-topic="${escapeHtml(key)}">Treinar este assunto ${icon('arrow', 16)}</button></article>`).join('')}</div></section>
        <section class="review-section"><div class="section-heading"><h2>Seus erros específicos</h2></div><div class="review-list">${errors.map(({ q, index, attempt }) => reviewItem(attempt, q, index, true)).join('')}</div></section>` : `<section class="empty-state large-empty"><div class="empty-illustration">${icon('check', 32)}</div><h2>Nenhum erro pendente</h2><p>Depois de concluir um simulado, os erros e respostas em branco aparecerão aqui.</p><button class="button primary" data-action="create">Criar simulado</button></section>`}
      </main>`;
    app.innerHTML = appShell(content, 'review');
    scrollToTop();
  }

  function archiveView() {
    stopTimer();
    state.view = 'archive';
    const entries = window.CPM_ARCHIVE || [];
    const visible = entries.filter(entry => state.archiveRegion === 'all' || entry.region === state.archiveRegion);
    const content = `<main class="page archive-page"><section class="page-intro"><span class="eyebrow">ACERVO ORIGINAL · 6º ANO</span><h1>Provas reais, do começo ao fim.</h1><p>Leia os cadernos completos sem internet: textos, charges, gráficos, tabelas e todos os tipos de questão. Os DOCX fornecidos estão preservados e disponíveis para abrir ou compartilhar.</p></section>
      <div class="archive-filters" aria-label="Filtrar provas">${[['all','Todas'],['PR','Paraná'],['PE','Pernambuco'],['DF','Distrito Federal'],['MG','Minas Gerais'],['RS','Rio Grande do Sul']].map(([value,label]) => `<button class="button ${state.archiveRegion === value ? 'primary' : 'secondary'} compact" data-action="archive-filter" data-region="${value}" aria-pressed="${state.archiveRegion === value}">${label}</button>`).join('')}</div>
      <div class="archive-grid">${[...visible].reverse().map(entry => `<article class="panel archive-card"><span class="eyebrow">${entry.region} · ${escapeHtml(entry.year)} · ORIGINAL</span><h2>${escapeHtml(entry.title)}</h2><p>${escapeHtml(entry.description)}</p><small>${entry.pages.length} páginas · ${escapeHtml(entry.sourceLabel)}</small>
        <div class="archive-actions"><button class="button primary compact" data-action="read-document" data-id="${entry.id}">Ler prova completa ${icon('book',16)}</button><button class="button ghost compact" data-action="open-document" data-path="${escapeHtml(entry.original)}">${entry.original.endsWith('.docx') ? 'Abrir / compartilhar DOCX' : 'Abrir / compartilhar PDF'} ${icon('download',16)}</button></div>
        ${entry.answerKey ? `<button class="text-button" data-action="read-key" data-id="${entry.id}">Ver gabarito · ${escapeHtml(entry.answerKey.label)}</button>` : '<small class="muted">Gabarito não fornecido neste acervo.</small>'}
        ${entry.sourceUrl ? `<a class="source-link" href="${entry.sourceUrl}" target="_blank" rel="noreferrer">Fonte da instituição ${icon('external',14)}</a>` : ''}</article>`).join('')}</div>
      <p class="archive-note">As provas antigas e de outros estados podem incluir redação, questões de certo/errado e quantidades diferentes de alternativas. Os documentos mantêm essas diferenças. Os DOCX locais estão preservados; o leitor usa os PDFs completos da instituição. Para 2025 do Paraná, o leitor usa o gabarito definitivo; o DOCX fornecido era preliminar.</p></main>`;
    app.innerHTML = appShell(content, 'archive');
    scrollToTop();
  }

  function documentView(id = state.archiveDoc?.id, key = state.archiveKey) {
    const entry = (window.CPM_ARCHIVE || []).find(item => item.id === id);
    if (!entry || (key && !entry.answerKey)) return archiveView();
    stopTimer();
    state.view = 'document';
    state.archiveDoc = entry;
    state.archiveKey = key;
    const document = key ? entry.answerKey : entry;
    const page = Math.max(0, Math.min(state.archivePage, document.pages.length - 1));
    state.archivePage = page;
    const controls = `<div class="document-controls"><button class="button secondary compact" data-action="document-prev" ${page === 0 ? 'disabled' : ''}>${icon('back',16)} Anterior</button><label>Página <select class="document-page-select" aria-label="Escolher página">${document.pages.map((_, i) => `<option value="${i}" ${i === page ? 'selected' : ''}>${i + 1}</option>`).join('')}</select> de ${document.pages.length}</label><button class="button secondary compact" data-action="document-next" ${page === document.pages.length - 1 ? 'disabled' : ''}>Próxima ${icon('arrow',16)}</button></div>`;
    app.innerHTML = appShell(`<main class="page document-page"><button class="back-button" data-action="archive">${icon('back',18)} Voltar às provas reais</button><h1>${escapeHtml(entry.title)}${key ? ' · Gabarito' : ''}</h1>${key ? `<p>${escapeHtml(document.label)}</p>` : ''}<div class="document-tools"><button class="text-button" data-action="document-zoom">${state.archiveZoom ? 'Ajustar à tela' : 'Ampliar para ler'}</button><button class="text-button" data-action="open-document" data-path="${escapeHtml(document.original)}">Abrir / compartilhar original ${icon('download',16)}</button>${entry.answerKey ? `<button class="text-button" data-action="document-toggle">${key ? 'Voltar à prova' : 'Consultar gabarito'}</button>` : ''}</div>${controls}<div class="document-sheet ${state.archiveZoom ? 'zoomed' : ''}"><img src="${escapeHtml(document.pages[page])}" alt="${escapeHtml(entry.title)}${key ? ', gabarito' : ''}, página ${page + 1} de ${document.pages.length}" /></div>${controls}</main>`, 'archive');
  }

  function questionSourceLink(source) {
    if (!source?.url) return '';
    const entry=(window.CPM_ARCHIVE||[]).find(entry=>entry.pdf===source.url);
    if (entry) return `<button class="text-button" data-action="read-document" data-id="${escapeHtml(entry.id)}">${escapeHtml(source.label)}</button>`;
    return `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)} ${icon('external',14)}</a>`;
  }
  async function openDocument(documentPath) {
    const allowed = (window.CPM_ARCHIVE || []).flatMap(entry => [entry.original, entry.pdf, entry.answerKey?.original, entry.answerKey?.pdf]).filter(Boolean);
    if (!allowed.includes(documentPath)) return;
    try {
      if (window.mobile?.isNative) await window.mobile.shareDocument(documentPath);
      else if (window.desktop?.openDocument) {
        const error = await window.desktop.openDocument(documentPath);
        if (error) throw new Error(error);
      } else {
        const link = document.createElement('a');
        link.href = documentPath;
        link.download = documentPath.split('/').pop();
        link.click();
      }
    } catch (_error) { toast('Não foi possível abrir o original. Use o leitor de páginas dentro do aplicativo.'); }
  }

  function sourcesView() {
    stopTimer();
    const content = `
      <main class="page sources-page">
        <section class="page-intro narrow"><span class="eyebrow">BASE DE ESTUDO</span><h1>O que cai na prova</h1><p>Resumo fiel ao Anexo A do edital de 2027 para ingresso no 6º ano. Use esta página para orientar a revisão entre os simulados.</p><button class="button secondary" data-action="open-edital">${icon('book', 18)} Abrir edital completo</button></section>
        <section class="source-principles">
          <div class="principle-card">${icon('check', 23)}<div><b>Questões oficiais</b><p>O aplicativo identifica o ano e usa o gabarito publicado pela banca.</p></div></div>
          <div class="principle-card">${icon('bulb', 23)}<div><b>Questões inéditas</b><p>Limitadas aos tópicos do edital, com explicação objetiva e conta demonstrada quando necessário.</p></div></div>
          <div class="principle-card">${icon('external', 23)}<div><b>Links de apoio</b><p>Prioridade para instituições públicas e fontes educacionais reconhecidas. O link só abre quando você clicar.</p></div></div>
        </section>
        <section class="syllabus-list">
          ${syllabusCard('portugues', '15 questões', ['Interpretação, tema, finalidade, fato e opinião', 'Narrativa, coesão, causa e consequência, humor', 'Sílabas, tonicidade, ortografia e pontuação', 'Classes de palavras, sujeito e predicado', 'Variedades linguísticas e norma-padrão', 'Leitura: A Extraordinária Jornada de Edward Tulane'])}
          ${syllabusCard('matematica', '10 questões', ['Números naturais, frações, decimais e porcentagem', 'Quatro operações e expressões numéricas', 'Múltiplos, divisores, MMC e MDC', 'Figuras, perímetro, área e sólidos geométricos', 'Comprimento, área, volume, massa, tempo e dinheiro', 'Interpretação de gráficos e tabelas'])}
          ${syllabusCard('ciencias', '4 questões', ['Universo, Sistema Solar e Terra primitiva', 'Ecossistemas, cadeias alimentares, animais e plantas', 'Corpo humano e funcionamento dos sistemas', 'Higiene, vacinas, nutrição e prevenção de doenças', 'Solo, ar, água e problemas ambientais'])}
          ${syllabusCard('geografia', '3 questões', ['Urbanização e população do Paraná', 'Regiões do Brasil, com ênfase na Região Sul', 'População, clima, vegetação, relevo e hidrografia', 'Estados brasileiros', 'Mapas e coordenadas geográficas'])}
          ${syllabusCard('historia', '3 questões', ['Povos tupis e chegada dos portugueses', 'Pau-brasil, capitanias e governos-gerais', 'Revoltas nativistas e separatistas', 'Vinda da família real e Independência', 'Primeiro Reinado, Regências e Segundo Reinado'])}
        </section>
        <section class="source-footer panel"><div><span class="eyebrow">TRANSPARÊNCIA</span><h2>Encontrou algo estranho?</h2><p>Questões oficiais permanecem identificadas. Nas inéditas, a explicação mostra o raciocínio usado. O histórico guarda inclusive quando a resposta foi consultada, evitando uma evolução artificial.</p></div><button class="button ghost" data-action="create">Praticar agora ${icon('arrow', 17)}</button></section>
      </main>`;
    app.innerHTML = appShell(content, 'sources');
  }

  function syllabusCard(subject, count, items) {
    const info = SUBJECTS[subject];
    return `<article class="syllabus-card" style="--subject:${info.color}"><header><span class="subject-index">${Object.keys(SUBJECTS).indexOf(subject) + 1}</span><div><h2>${info.label}</h2><span>${count}</span></div></header><ul>${items.map((item) => `<li>${icon('check', 15)}${escapeHtml(item)}</li>`).join('')}</ul></article>`;
  }

  async function openEdital() {
    if (window.mobile?.isNative) {
      await window.mobile.openExternal('https://processoclassificatoriocpm.com.br/');
      return;
    }
    if (window.desktop?.openEdital) {
      const error = await window.desktop.openEdital();
      if (error) toast(`Não foi possível abrir o edital: ${error}`);
    } else {
      window.open('../DECProcessoClassificatorio2027Edital001Abertura.pdf', '_blank');
    }
  }

  async function exportBackup() {
    const payload = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), history: history() }, null, 2);
    if (window.mobile?.isNative) {
      try {
        await window.mobile.exportBackup(payload);
        toast('Backup pronto para salvar ou compartilhar.', 'success');
      } catch (_error) {
        toast('Não foi possível compartilhar o backup.');
      }
      return;
    }
    if (window.desktop?.saveBackup) {
      const result = await window.desktop.saveBackup(payload);
      if (!result.canceled) toast('Backup salvo com sucesso.', 'success');
    } else {
      const blob = new Blob([payload], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `rumo-cpm-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }

  function validateBackup(data) {
    return data && data.version === 1 && Array.isArray(data.history) && data.history.every((item) => item.id && Array.isArray(item.questions) && Array.isArray(item.answers));
  }

  async function importBackup() {
    try {
      let content;
      if (window.mobile?.isNative) {
        toast('Para restaurar no Android, use por enquanto a versão para computador.');
        return;
      }
      if (window.desktop?.loadBackup) {
        const result = await window.desktop.loadBackup();
        if (result.canceled) return;
        content = result.content;
      } else {
        toast('A restauração está disponível no aplicativo desktop.');
        return;
      }
      const data = JSON.parse(content);
      if (!validateBackup(data)) throw new Error('Formato de backup inválido');
      if (!window.confirm(`Restaurar ${data.history.length} resultado(s)? O histórico atual será substituído.`)) return;
      saveJson(STORAGE.history, data.history);
      toast('Histórico restaurado.', 'success');
      historyView();
    } catch (_error) {
      toast('Não foi possível restaurar: o arquivo não é um backup válido.');
    }
  }

  function deleteAttempt(id) {
    const items = history();
    const item = items.find((attempt) => attempt.id === id);
    if (!item) return;
    if (!window.confirm('Excluir este resultado do histórico? A nota e as respostas dele serão apagadas. As questões voltam a contar como ainda não vistas.')) return;
    saveJson(STORAGE.history, items.filter((attempt) => attempt.id !== id));
    // Releasing the draw keeps the rotation from treating deleted attempts as seen.
    const keys = item.questions.map(window.CPM_PRACTICE.fingerprint).join('|');
    const draws = loadJson(STORAGE.draws, []);
    if (Array.isArray(draws)) saveJson(STORAGE.draws, draws.filter((draw) => (draw.keys || []).join('|') !== keys));
    state.result = null;
    state.historyDetail = null;
    toast('Resultado excluído do histórico.');
    state.view = 'history';
    historyView();
  }

  function clearHistory() {
    if (!window.confirm('Apagar todo o histórico? Essa ação não pode ser desfeita, a menos que você tenha um backup.')) return;
    localStorage.removeItem(STORAGE.history);
    toast('Histórico apagado.');
    historyView();
  }

  function navigate(view) {
    if (state.view === 'exam' && state.exam && view !== 'exam') {
      if (!window.confirm('Sair do simulado? Seu progresso ficará salvo para continuar depois.')) return;
      saveCurrent();
    }
    state.view = view;
    state.result = null;
    if (view === 'home') homeView();
    if (view === 'create') createView();
    if (view === 'history') historyView();
    if (view === 'sources') sourcesView();
    if (view === 'review') reviewView();
    if (view === 'archive') archiveView();
    scrollToTop();
  }

  app.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    if (action === 'zoom-visual') return zoomVisual(target.dataset.visual);
    if (['home', 'create', 'history', 'sources', 'review', 'archive'].includes(action)) return navigate(action);
    if (action === 'open-edital') return openEdital();
    if (action === 'resume') return resumeExam(target.dataset.id || null);
    if (action === 'discard-exam') return discardExam(target.dataset.id);
    if (action === 'delete-attempt') return deleteAttempt(target.dataset.id);
    if (action === 'set-mix') {
      state.draftMix = target.dataset.mix;
      const input = document.getElementById('student-name');
      if (input) state.draftName = input.value;
      return createView();
    }
    if (action === 'start') return startExam();
    if (action === 'start-review') return reviewView(state.result || state.historyDetail);
    if (action === 'practice-related') return startReviewExam();
    if (action === 'practice-retry') return startReviewExam(true);
    if (action === 'practice-topic') return startReviewExam(false, target.dataset.topic);
    if (action === 'archive-filter') { state.archiveRegion = target.dataset.region; return archiveView(); }
    if (action === 'read-document' || action === 'read-key') {
      state.archivePage = 0;
      state.archiveZoom = false;
      return documentView(target.dataset.id, action === 'read-key');
    }
    if (action === 'open-document') return openDocument(target.dataset.path);
    if (action === 'document-prev' || action === 'document-next') {
      state.archivePage += action === 'document-prev' ? -1 : 1;
      documentView();
      return scrollToTop();
    }
    if (action === 'document-toggle') { state.archivePage = 0; return documentView(state.archiveDoc.id, !state.archiveKey); }
    if (action === 'document-zoom') { state.archiveZoom = !state.archiveZoom; return documentView(); }
    if (action === 'answer') return answerQuestion(Number(target.dataset.index));
    if (action === 'reveal') return revealAnswer();
    if (action === 'toggle-explanation') {
      state.exam.explanationOpen[state.exam.index] = !state.exam.explanationOpen[state.exam.index];
      saveCurrent();
      return examView();
    }
    if (action === 'previous') return navigateQuestion(state.exam.index - 1);
    if (action === 'next') return state.exam.index === state.exam.questions.length - 1 ? finishExam(false) : navigateQuestion(state.exam.index + 1);
    if (action === 'goto-question') return navigateQuestion(Number(target.dataset.index));
    if (action === 'finish') return finishExam(false);
    if (action === 'history-detail') return historyDetailView(target.dataset.id);
    if (action === 'export') return exportBackup();
    if (action === 'import') return importBackup();
    if (action === 'clear-history') return clearHistory();
  });

  app.addEventListener('change', event => {
    if (!event.target.classList.contains('document-page-select')) return;
    state.archivePage = Number(event.target.value);
    documentView();
    scrollToTop();
  });

  document.addEventListener('keydown', (event) => {
    if (app.hidden || state.view !== 'exam' || !state.exam || document.querySelector('dialog[open]')) return;
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (['1', '2', '3', '4'].includes(event.key)) answerQuestion(Number(event.key) - 1);
    if (event.key === 'ArrowLeft') navigateQuestion(state.exam.index - 1);
    if (event.key === 'ArrowRight') navigateQuestion(state.exam.index + 1);
  });

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="http"]');
    if (!anchor || !window.mobile?.isNative) return;
    event.preventDefault();
    window.mobile.openExternal(anchor.href);
  }, true);

  if (window.mobile?.isNative) {
    document.documentElement.classList.add('native-platform');
    window.mobile.onBack(() => {
      if (app.hidden && window.CEP_APP) { window.CEP_APP.back(); return; }
      if (state.view === 'home') {
        window.mobile.exit();
        return;
      }
      navigate('home');
    });
  }

  window.addEventListener('beforeunload', saveCurrent);
  homeView();
})();
