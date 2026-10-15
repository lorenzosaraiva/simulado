(function () {
  function select(school) {
    const cep=school==='cep';
    document.getElementById('app').hidden=cep;
    document.getElementById('cep-app').hidden=!cep;
    document.getElementById('school-cpm').setAttribute('aria-pressed',String(!cep));
    document.getElementById('school-cep').setAttribute('aria-pressed',String(cep));
    try {localStorage.setItem('rumo.school',school);} catch {}
    if(cep)window.CEP_APP?.show();
  }
  document.getElementById('school-cpm').addEventListener('click',()=>select('cpm'));
  document.getElementById('school-cep').addEventListener('click',()=>select('cep'));
  select(localStorage.getItem('rumo.school')||'cpm');
})();
