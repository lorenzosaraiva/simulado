(function () {
  'use strict';
  // Preserve IDs and correct alternatives used by existing sessions. Replace weak distractors.
  const changes={
    'desafio-p028':[
      ['Mostra que a troca de lugar garantiu atendimento imediato à moça.','A primeira fila era de senhas, não de atendimento imediato.'],
      ['Apresenta a confusão como motivo suficiente para desfazer a gentileza.','O desfecho preserva a satisfação de Raul com o gesto.'],
      ['Faz Raul valorizar apenas a vantagem de obter uma senha mais cedo.','Ele cedeu a posição e ficou contente por a moça sentar antes dele.']],
    'desafio-p030':[
      ['Apresentam ações como hipóteses independentes, sem sequência recomendada.','O texto ordena etapas para realizar a pintura.'],
      ['Expressam desejos do autor sobre atividades já concluídas.','As formas no imperativo orientam ações ainda a realizar.'],
      ['Indicam hábitos passados de todos os participantes da oficina.','Não são formas de passado habitual; instruem o leitor.']],
    'desafio-p031':[
      ['As duas garantem autorização para entregar o trabalho depois do prazo.','São pedidos; não informam que foram aprovados.'],
      ['A segunda acrescenta que a impressão era proibida pela escola.','A causa é falta de energia, não proibição.'],
      ['A primeira pede entrega no mesmo dia, enquanto a segunda pede adiamento.','“Amanhã” na mensagem pede um prazo posterior.']],
    'desafio-p033':[
      ['Nilo aceita o plantio desde que as cadeiras de rodas deixem de usar o terreno.','Ele pretende preservar o acesso, não retirar seus usuários.'],
      ['Iara propõe planejar a passagem somente depois de plantar as árvores.','Ela propõe desenhar o caminho antes do plantio.'],
      ['A solução depende de escolher entre oferecer sombra e permitir acesso.','As falas buscam conciliar as duas necessidades.']],
    'desafio-m001':[
      ['R$ 1.200.','Dez pacotes atendem o grupo, mas nove pacotes e três entradas avulsas custam menos.'],
      ['R$ 1.080.','Nove pacotes fornecem apenas 90 entradas para 93 pessoas.'],
      ['R$ 1.302.','É o custo de 93 entradas avulsas, sem aproveitar os pacotes mais baratos.']],
    'desafio-m002':[
      ['90 peças.','Esse valor recupera apenas a quantidade anterior à segunda retirada: 54 ÷ 3/5.'],
      ['108 peças.','Duplica o resto, mas a fração final é 9/20 do total inicial, não 1/2.'],
      ['154 peças.','As frações são sucessivas: o resto equivale a (3/4) × (3/5) do total inicial.']],
    'desafio-m003':[
      ['Na primeira loja, por R$ 5.','A diferença é cinco reais, mas a primeira cobra 180 e a segunda 175.'],
      ['As duas cobram R$ 175.','Somar descontos como 30% ignora que o segundo incide sobre 200, não 250.'],
      ['Na segunda loja, por R$ 25.','Aplica só o primeiro desconto e deixa de retirar 10% de 200.']],
    'desafio-m004':[
      ['9,6 minutos.','Soma as vazões de 6 e 4 L/min, mas desconsidera o vazamento.'],
      ['16 minutos.','Considera apenas 6 L/min, ignorando o efeito conjunto das duas torneiras e do vazamento.'],
      ['8 minutos.','Somar o vazamento às entradas dá 12 L/min; ele deve ser subtraído.']],
    'desafio-c001':[
      ['Gotículas do interior se evaporam, atravessam o vidro e depois se acumulam fora.','O vidro íntegro não permite esse trajeto; o vapor já está no ar externo.'],
      ['O vapor do ar sofre solidificação na superfície e forma diretamente gotas líquidas.','Vapor para líquido é condensação; solidificação é líquido para sólido.'],
      ['Água já existente na superfície externa evapora ao receber calor do copo.','A superfície estava seca e o copo frio favorece condensação, não essa origem proposta.']],
    'desafio-c002':[
      ['A água passa diretamente do solo para a tampa sem entrar na fase de vapor.','Evaporação e transpiração levam vapor ao ar antes da condensação.'],
      ['As gotas resultam de evaporação na tampa e retornam ao solo por solidificação.','Formar gotas na tampa envolve condensação; cair não exige virar sólido.'],
      ['A água da tampa comprova que o terrário recebe matéria nova pela luz.','Luz fornece energia, sem representar entrada de água no recipiente fechado.']],
    'desafio-c003':[
      ['Cada usuário passou a consumir 20% menos.','A redução do total acompanhou a redução de usuários; ambas as médias são dez litros.'],
      ['A queda total demonstra, por si, que os vazamentos diminuíram.','Não há medições dos vazamentos que permitam essa conclusão.'],
      ['O consumo por usuário caiu de 12,5 para 8 L por dia.','As divisões corretas usam 100 usuários antes e 80 depois.']],
    'desafio-c005':[
      ['A diferença demonstra que esses insetos são o único modo possível de polinização.','Formação menor de frutos não prova exclusividade.'],
      ['O resultado identifica a espécie de inseto responsável pela polinização.','A tela separa acesso de insetos, sem identificar uma espécie.'],
      ['O resultado permite atribuir a redução exclusivamente à falta de luz.','O enunciado informa que a tela deixa a luz passar.']],
    'desafio-c006':[
      ['A e C são invertebrados; B é vertebrado.','Inverte o critério da coluna vertebral descrito na ficha.'],
      ['A e B são vertebrados; C é invertebrado.','B não tem coluna e C tem, apesar de terem coberturas corporais diferentes.'],
      ['A é vertebrado; B e C são invertebrados.','C também apresenta coluna vertebral; penas não retiram essa condição.']],
    'desafio-c007':[
      ['As raízes produzem a matéria orgânica com luz, e as folhas só absorvem sais do solo.','Inverte fotossíntese nas folhas e absorção pelas raízes.'],
      ['As folhas absorvem toda a água diretamente do ar e dispensam transporte pelo caule.','O enunciado registra água e minerais absorvidos nas raízes.'],
      ['As raízes armazenam oxigênio, e as folhas transportam minerais diretamente do solo.','Não descreve as funções nem o percurso apresentados.']],
    'desafio-g002':[
      ['A escola está ao sul e a biblioteca, ao norte.','Assume norte no topo em vez de seguir a seta à direita.'],
      ['A escola está a oeste e a biblioteca, a leste.','Com norte à direita, oeste fica acima e leste abaixo.'],
      ['A escola está ao norte e a biblioteca, ao sul.','Confunde posições verticais da folha com o eixo norte-sul indicado.']],
    'desafio-g004':[
      ['O rio permaneceu, por isso os usos econômicos do lugar também são os mesmos.','Galpões e expansão comercial indicam transformação dos usos.'],
      ['A nova ponte modifica apenas um elemento natural, sem intervenção humana.','Ponte é uma construção humana que transforma a paisagem.'],
      ['A troca da estrada por novas estruturas impede reconhecer permanências.','O rio continua reconhecível nas duas imagens.']],
    'desafio-g005':[
      ['O asfalto amplia a infiltração e reduz a chegada rápida de água ao córrego.','Inverte o efeito de uma superfície menos permeável.'],
      ['O escoamento maior exige que a intensidade da chuva também tenha aumentado.','A comparação descreve chuvas semelhantes e mudança da cobertura.'],
      ['A falta de raízes elimina todo transporte de água superficial pela bacia.','A observação é justamente de maior escoamento superficial.']],
    'desafio-g006':[
      ['A chuva de terça permite substituir a série climática por um novo padrão invernal.','Um episódio não estabelece padrão de longo prazo.'],
      ['A média do verão obriga todo dia dessa estação a ser mais chuvoso que qualquer dia de inverno.','Padrões de médias não determinam cada comparação diária.'],
      ['O relatório compara previsão para terça e não observações históricas.','A série de 30 anos reúne registros climáticos; terça descreve um episódio.']],
    'desafio-g007':[
      ['O rio sobe da planície à nascente, acumulando sedimentos onde ganha altitude.','A sequência informada vai de 900 a 100 m.'],
      ['O rio perde 800 m de altitude, mas só pode depositar sedimentos no ponto mais alto.','A perda está certa; a deposição pode ocorrer onde diminui a capacidade de transporte.'],
      ['A chegada à planície impede qualquer depósito por o terreno ter menor declive.','Menor declive pode favorecer a deposição, em vez de impedir.']],
    'desafio-h001':[
      ['A quantidade de pessoas enquadradas permite calcular a jornada da fábrica.','O registro não informa duração do trabalho.'],
      ['Estarem diante da mesma fábrica prova que recebiam salários iguais.','Local comum não determina remuneração.'],
      ['A ausência de salários impede utilizar a imagem para estudar vestuário e espaço.','Uma fonte pode esclarecer alguns aspectos e não outros.']],
    'desafio-h002':[
      ['A divergência de avaliação exige que um relato seja falso, mesmo sem cruzar fontes.','Ganhos e perdas podem coexistir para moradores diferentes.'],
      ['O benefício no transporte invalida o relato sobre a perda da horta.','Uma consequência não exclui a outra.'],
      ['O relato sobre a horta demonstra que nenhum morador teve transporte facilitado.','Uma perda particular não exclui benefícios para outras pessoas.']],
    'desafio-h004':[
      ['A compra do terreno em 1878 prova que as aulas começaram naquele mesmo ano.','O início das aulas está registrado em 1884.'],
      ['A abertura em 1884 torna inúteis os documentos das obras iniciadas em 1881.','Os documentos ajudam a reconstruir a preparação anterior.'],
      ['Preparação e abertura são sinônimos obrigatórios em qualquer fonte histórica.','O próprio registro distingue etapas com sentidos diferentes.']],
    'desafio-h005':[
      ['A divulgação digital preserva o evento, mas necessariamente elimina os cantos anteriores.','O relato mantém os cantos e acrescenta divulgação.'],
      ['Uma referência transmitida pelos avós só é tradição se não admitir nenhuma adaptação.','Tradições podem ser recriadas e manter vínculos.'],
      ['Instrumentos novos demonstram que a festa começou apenas com a geração atual.','Os cantos e a festa têm vínculos com gerações anteriores.']],
    'desafio-h007':[
      ['A palavra descoberta prova que o território estava vazio no momento do encontro.','A narrativa indígena e o território habitado contrariam essa inferência.'],
      ['A diferença de termos permite comparar apenas datas e dispensa análise de autoria.','A autoria e a posição dos narradores explicam perspectivas.'],
      ['A narrativa do habitante torna toda informação europeia automaticamente inútil.','Fontes distintas podem ser analisadas em contexto, sem descarte automático.']]
  };
  for(const [id,wrong] of Object.entries(changes)) {
    const q=window.CHALLENGE_BANK.questions.find(q=>q.id===id);
    if(!q)throw new Error(`Questão ausente na revisão: ${id}`);
    q.options=[q.options[0],...wrong.map(([text,explanation],i)=>({id:'bcd'[i],text,explanation}))];
    q.contentRevision=4;
    window.EXAM_PR_BANK.revised.push(id);
  }
})();
