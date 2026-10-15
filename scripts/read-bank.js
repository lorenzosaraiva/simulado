const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
module.exports=function loadBank(){
  const root=path.resolve(__dirname,'..'),c={window:{},Math,Date,JSON,Set,Map,console};vm.createContext(c);
  const allowed=new Set(['extra-questions.js','questions.js','practice.js','archive.js','cep/coverage.js','cep/bank-v2.js','cep/math-v2.js','cep/world-v2.js','cep/regional.js','cep/challenges.js','cep/exam-review.js','cep/visuals.js','cep/regional-visuals.js','cep/engine.js']);
  const scripts=Array.from(fs.readFileSync(path.join(root,'web/index.html'),'utf8').matchAll(/<script src="([^"]+)"/g),m=>m[1]).filter(f=>allowed.has(f)||f.startsWith('challenge-'));
  for(const file of scripts)vm.runInContext(fs.readFileSync(path.join(root,'web',file),'utf8'),c,{filename:file});
  return c.window;
};
