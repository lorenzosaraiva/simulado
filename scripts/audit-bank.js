const fs=require('node:fs'),load=require('./read-bank');
const w=load(),shared=w.CHALLENGE_BANK.questions,cep=w.CEP_BANK,cpm=Object.values(w.CPM_DATA.buildQuestionBank()).flat();
const added=shared.filter(q=>q.examStyle),invalid=cep.flatMap(q=>w.CEP_ENGINE.validate(q).map(error=>({id:q.id,error})));
for(const q of added){
  const exam=w.CPM_ARCHIVE.find(e=>e.id===q.examReference.archiveId);
  if(!exam||q.references[0].url!==exam.pdf)invalid.push({id:q.id,error:'Referência não corresponde ao caderno identificado.'});
  if(!fs.existsSync('web/'+q.references[0].url))invalid.push({id:q.id,error:'Caderno offline ausente.'});
}
const bySubject=bank=>Object.fromEntries(['portugues','matematica','ciencias','geografia','historia'].map(s=>[s,bank.filter(q=>q.subject===s).length]));
const result={version:require('../package.json').version,date:'2026-10-12',cpm:cpm.length,cep:cep.length,shared:shared.length,newQuestions:added.length,newBySubject:bySubject(added),regional:w.CEP_REGIONAL.count,regionalBySubject:bySubject(cep.filter(q=>q.collection==='parana-curitiba')),hardCep:cep.filter(q=>q.difficulty==='difícil').length,revisedIds:w.EXAM_PR_BANK.revised,newVisualQuestions:added.filter(q=>q.visual).length,newVisualAssets:Object.keys(w.CHALLENGE_VISUALS).filter(k=>k.startsWith('pr_')).length,invalid,examMapping:added.map(q=>({id:q.id,subject:q.subject,topic:q.topic,exam:q.examReference,regional:q.collection==='parana-curitiba',schools:q.schools,visual:q.visual}))};
fs.writeFileSync('artifacts/exam-review/bank-audit.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({...result,examMapping:undefined},null,2));
if(invalid.length)process.exitCode=1;
