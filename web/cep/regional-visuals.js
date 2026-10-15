(function () {
  const v=window.CEP_VISUALS;
  const svg=(title,desc,body)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="${title}"><title>${title}</title><desc>${desc}</desc><rect width="640" height="360" fill="#fff"/><g font-family="Arial,sans-serif" font-size="19" fill="#182c44">${body}</g></svg>`;
  v.regionalRain=svg('Destinos da água: dados fictícios','Dois conjuntos de barras com valores de infiltração, escoamento e retenção temporária. Todos os valores também aparecem no texto-base.',`
    <text x="24" y="32" font-size="23">Cada superfície recebe 100 L</text><text x="24" y="58" font-size="17">Dados fictícios · barras na mesma escala</text>
    <text x="24" y="96">Solo permeável</text><rect x="220" y="77" width="198" height="25" fill="#3156a4"/><text x="430" y="97">Infiltração: 55 L</text>
    <rect x="220" y="113" width="108" height="25" fill="#815c19"/><text x="340" y="133">Escoamento: 30 L</text><rect x="220" y="149" width="54" height="25" fill="#327767"/><text x="286" y="169">Retenção: 15 L</text>
    <text x="24" y="214">Pavimento</text><rect x="220" y="195" width="36" height="25" fill="#3156a4"/><text x="268" y="215">Infiltração: 10 L</text><rect x="220" y="231" width="288" height="25" fill="#815c19"/><text x="220" y="279">Escoamento: 80 L</text>
    <rect x="220" y="294" width="36" height="25" fill="#327767"/><text x="268" y="314">Retenção: 10 L</text>`);
  v.regionalTravel=svg('Deslocamentos: antes e depois','Tabela com três modos de transporte. Dados fictícios também transcritos integralmente no texto-base.',`
    <text x="26" y="38" font-size="23">Alunos por modo de transporte</text><text x="26" y="67" font-size="17">Dados fictícios · não são estatísticas de Curitiba</text>
    <rect x="25" y="90" width="590" height="44" fill="#e8edf6"/><path d="M25 90H615V326H25ZM25 134H615M25 182H615M25 230H615M25 278H615M260 90V326M430 90V326" fill="none" stroke="#57708b"/>
    <text x="42" y="119">Modo</text><text x="285" y="119">Antes</text><text x="454" y="119">Depois</text>
    <text x="42" y="165">Carro</text><text x="285" y="165">120</text><text x="454" y="165">80</text>
    <text x="42" y="213">Ônibus</text><text x="285" y="213">80</text><text x="454" y="213">100</text>
    <text x="42" y="261">Caminhada</text><text x="285" y="261">40</text><text x="454" y="261">60</text>
    <text x="42" y="309">Total</text><text x="285" y="309">240</text><text x="454" y="309">240</text>`);
  v.regionalRoute=svg('Planta fictícia de percurso escolar','A planta não representa Curitiba. Escola a oeste da praça; bosque ao norte da praça. Distâncias também descritas no texto-base.',`
    <text x="24" y="32" font-size="23">Percurso escolar fictício</text><text x="24" y="60" font-size="17">Não representa ruas reais · planta esquemática</text>
    <path d="M200 280H320V100" stroke="#3156a4" stroke-width="6" fill="none"/><circle cx="200" cy="280" r="8" fill="#182c44"/><circle cx="320" cy="280" r="8" fill="#182c44"/><circle cx="320" cy="100" r="8" fill="#182c44"/>
    <text x="153" y="310">Escola</text><text x="310" y="310">Praça</text><text x="345" y="107">Bosque</text><text x="224" y="262">400 m</text><text x="337" y="192">600 m</text>
    <path d="M570 146V88M560 102L570 88L580 102" stroke="#182c44" stroke-width="3" fill="none"/><text x="560" y="78">N</text>
    <path d="M28 330H88M28 324V336M88 324V336" stroke="#182c44" stroke-width="3"/><text x="101" y="337">Referência: 200 m</text>`);
})();
