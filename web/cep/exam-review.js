(function () {
  'use strict';
  // Recompute from the active content; local historical sources also appear in the module.
  const R=window.CEP_REGIONAL;
  R.count=window.CEP_BANK.filter(q=>q.collection===R.collection).length;
  const urls=new Set(R.references.map(r=>r.url));
  window.CEP_BANK.filter(q=>q.collection===R.collection&&q.examStyle).forEach(q=>q.references.forEach(r=>{
    if(!urls.has(r.url)){R.references.push({...r});urls.add(r.url);}
  }));
})();
