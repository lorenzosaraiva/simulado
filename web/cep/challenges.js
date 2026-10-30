(function () {
  'use strict';
  const C=window.CEP_COVERAGE;
  window.CEP_BANK.push(...window.CHALLENGE_BANK.questions.filter(q=>!q.schools||q.schools.includes('cep')).map(q=>{
    const skill=C.coverage.find(x=>x.id===q.items[0]);
    return {...q,id:`cep3-${q.id}`,topic:q.topic||skill.label,skill:skill.label,
      options:q.options.map(o=>({...o})),items:[...q.items],status:'revisada',revision:q.examStyle||q.contentRevision?4:3,
      evidence:q.explanation,origin:{type:'autoral',label:q.fiel?'⚑ Criada por IA · formato de prova':'⚑ Criada por IA · desafio de raciocínio',references:q.references},
      review:{date:q.fiel?'2026-10-25':q.examStyle||q.contentRevision?'2026-10-12':'2026-10-06',method:q.fiel?'Questões elaboradas a partir do estudo das provas anteriores; fatos conferidos em fontes públicas; resolução e confronto das alternativas. Sem revisão humana independente.':q.examStyle?'Comparação de conteúdo e formato com cadernos antigos identificados; resolução e confronto das quatro alternativas. Sem revisão humana independente.':'Resolução e confronto de alternativas na implementação; sem revisão humana independente.'},preserveOrder:!!q.fixed};
  }));
})();
