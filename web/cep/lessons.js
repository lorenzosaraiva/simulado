(function () {
  'use strict';
  const lessons=[],byItem={};
  function add(id,items,title,concept,method,base,prompt,answer,steps,compare,pitfall,question,task) {
    const [checkBase,checkPrompt,correct,explanation,...wrong]=question;
    const check={id:id+'-check',base:checkBase,prompt:checkPrompt,correctId:'a',explanation,options:[{id:'a',text:correct,explanation},...wrong.map((text,i)=>{const parts=text.split('§');return {id:'bcd'[i],text:parts[0],explanation:parts[1]};})]};
    const lesson={id,items:items.split(' '),title,concept:concept.split('\n'),method,example:{base,prompt,answer,steps},compare,pitfall,check,task,origin:'Aula e exemplos autorais; não são questões oficiais.'};
    lessons.push(lesson);lesson.items.forEach(item=>byItem[item]=lesson);
  }
  window.CEP_LESSONS={lessons,byItem,add};
})();
