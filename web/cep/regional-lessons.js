(function () {
  const R=window.CEP_REGIONAL,L=window.CEP_LESSONS;
  const enrich=(id,paragraphs)=>{const lesson=L.lessons.find(l=>l.id===id);lesson.concept.push(...paragraphs);lesson.regional=true;};
  enrich('historia-local',[
    R.texts.marcos,
    R.texts.tropas,
    'Ao comparar duas fontes sobre uma data, verifique se ambas tratam do mesmo acontecimento: povoamento, instalação de uma vila e criação de uma província são marcos distintos. A confiabilidade depende da origem e da evidência, não de qual número é mais antigo. Para calcular duração, subtraia o ano inicial do final; para comparar duas durações, calcule primeiro cada intervalo e só então a diferença.'
  ]);
  enrich('territorio',[
    R.texts.urbano,
    'Curitiba estar na Região Sul do Brasil não significa que esteja no sul de cada recorte estadual: a referência muda. Região, estado e município têm escalas diferentes. Relações de trabalho, transporte e água podem atravessar limites municipais, sem que esses limites desapareçam. Um mapa de um estado não fornece automaticamente os detalhes das ruas de sua capital.'
  ]);
  enrich('ambiente',[
    R.texts.ambiente,
    'Ao ler tabelas ambientais, compare a mesma unidade e a mesma área. Mais infiltração e menos escoamento são mudanças de destino da água; não significam menos chuva. Um percentual maior de araucárias também pode resultar da retirada de outras árvores, sem plantio de nenhuma araucária. Confira quantidade, total e distribuição antes de aceitar uma conclusão sobre conservação.'
  ]);
})();
