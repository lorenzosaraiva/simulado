"""Conferências independentes de cálculo, integridade textual e limites da página."""
from pathlib import Path
from fractions import Fraction as F
from decimal import Decimal as D
import math, json, re, hashlib, importlib.util
import fitz

ROOT=Path(__file__).resolve().parents[1]
HERE=Path(__file__).resolve().parent
ART=ROOT/'artifacts'/'apostila'
checks=[]
def check(name,actual,expected):
    assert actual==expected, f'{name}: {actual!r} != {expected!r}'
    checks.append({'item':name,'resultado':str(actual),'ok':True})

# Resolver a partir dos dados dos problemas; conferir resultados e unidades publicadas.
check('M1 valor do 7', (507084//1000%10)*1000,7000)
check('M2 expressão',F(630-174,12)+8*7,94)
check('M3 veículos',math.ceil(F(97,18)),6)
check('M3 lugares vazios',math.ceil(F(97,18))*18-97,11)
check('M4 intervalo',math.lcm(15,24),120)
check('M5 kits',math.gcd(72,96),24)
check('M5 composição',(72//24,96//24),(3,4))
check('M6 parte feita',F(5,8)+F(1,6),F(19,24))
check('M6 restante',1-F(5,8)-F(1,6),F(5,24))
check('M7 total',F(36)/F(3,7),84)
check('M7 restante',F(36)/F(3,7)-36,48)
check('M8 porções',F(3,2)/F(3,8),4)
check('M9 preço',D('3.25')*D('4.80'),D('15.60'))
check('M9 troco',D(20)-D('3.25')*D('4.80'),D('4.40'))
check('M10 preço final',D(320)*D('.75')*D('1.1'),D(264))
check('M10 comparação',D(320)*D('.85'),D(272))
check('M11 custo',(D(60)-D(60)*D('.35'))*D('6.20'),D('241.80'))
check('M12 arroz',F(450,6)*10,750)
check('M12 falta',F(450,6)*10-500,250)
check('M13 área',10*6-4*2,52)
check('M13 perímetro',10+(6-2)+4+2+(10-4)+6,32)
check('M14 capacidade',D('1.8')*D('.8')*D('.5')*1000,720)
check('M14 ocupado',F(720)*F(3,4),540)
check('M15 minutos',F(4800,60)+95+15,190)
check('M15 horas e minutos',divmod(190,60),(3,10))
check('M16 total',sum([14,20,18,12]),64)
check('M16 média',F(sum([14,20,18,12]),4),16)
check('M16 quinto dia',18*5-sum([14,20,18,12]),26)
check('M17 sequência',7+(12-1)*4,51)
check('M18 probabilidade inicial',F(3,2+3+5),F(3,10))
check('M18 sem reposição',F(3,2+3+5-1),F(1,3))
check('M19 cubo Euler',8-12+6,2)
check('M20 superfície',2*(24*15+24*10+15*10),1500)
check('M20 sem tampa',2*(24*15+24*10+15*10)-24*15,1140)

examples=[('Ingressos',136*8-275,813),('Divisão com resto',divmod(157,12),(13,1)),
 ('Expressão de exemplo',F(72,3*(8-4))+5*2,16),('MMC 18/24',math.lcm(18,24),72),
 ('MDC 18/24',math.gcd(18,24),6),('Ciclos 12/18',math.lcm(12,18),36),
 ('Kits 48/60',math.gcd(48,60),12),('Soma de frações',F(2,3)+F(1,4),F(11,12)),
 ('Produto de frações',F(2,3)*F(3,5),F(2,5)),('Divisão de frações',F(3,4)/F(1,2),F(3,2)),
 ('Parte de 120',120*F(3,5),72),('Meta de livros',24/F(3,5),40),
 ('Subtração decimal',D('8.4')-D('2.75'),D('5.65')),
 ('Produto decimal',D('1.2')*D('.35'),D('.42')),
 ('Divisão decimal',D('4.5')/D('.15'),30),('Frutas',D('2.4')*D('6.5'),D('15.6')),
 ('15% de 240',240*F(15,100),36),('Aumento e desconto',100*F(120,100)*F(80,100),96),
 ('Tanque 48 L',D(48)*D('.75')*D('6.4'),D('230.4')),
 ('Preço unitário 750 g',F(12)*F(1000,750),16),
 ('Duração de exemplo',(16*60+10)-(13*60+45),145),
 ('Temperatura',7-(-2),9),('Área em L',8*5-3*3,31),
 ('Perímetro em L',8+2+3+3+5+5,26),('Piso',D('4.5')*D('3.2')/D('.09'),160),
 ('Piso reserva',160*F(110,100),176),('Caixa volume cm³',60*40*25,60000),
 ('Caixa litros',F(60*40*25,1000),60),('Média gráfico',F(12+18+15+20+10,5),15),
 ('Sequência décimo',5+9*4,41),('Palitos',4+5*3,19),
 ('Densidades exemplo',(F(120000,600),F(90000,150)),(200,600)),
 ('Densidades G6',(F(80000,400),F(60000,150)),(200,400)),
 ('Escala G1 km',D('3.2')*250000/100000,8),('Anos 1808–1822',1822-1808,14)]
for label,actual,expected in examples: check('Exemplo: '+label,actual,expected)
calculation_count=len(checks)

questions=(HERE/'07-exercicios.md').read_text(encoding='utf-8')
answers=(HERE/'08-respostas.md').read_text(encoding='utf-8')
pattern=r'^\*\*([PMCGHL]\d+)\.'
qids=re.findall(pattern,questions,re.M); aids=re.findall(pattern,answers,re.M)
check('Quantidade de exercícios',len(qids),64)
check('IDs únicos',len(set(qids)),64)
check('Todos têm comentário',set(qids),set(aids))
check('Uma resposta por exercício',len(aids),64)
all_source='\n'.join(p.read_text(encoding='utf-8') for p in sorted(HERE.glob('[0-9][0-9]-*.md')))
used=set(re.findall(r'\[((?:E|S|L)\d+)\]',all_source))
defined=set(re.findall(r'\*\*\[((?:E|S|L)\d+)\]',all_source))
check('Referências definidas',used-defined,set())

spec=importlib.util.spec_from_file_location('apostila_build',HERE/'gerar_apostila.py')
build=importlib.util.module_from_spec(spec);spec.loader.exec_module(build)
vector_names=['fracoes','area','volume','agua','cadeia','sistemas','terra','cartografia','grafico','linha']
for name in vector_names:
    drawing=build.figure(name);x0,y0,x1,y1=drawing.getBounds()
    check('Esquema dentro da caixa: '+name,x0>=0 and y0>=0 and x1<=drawing.width and y1<=drawing.height,True)

inputs=[ROOT/'DECProcessoClassificatorio2027Edital001Abertura.pdf',ROOT/'edital-005-2026.pdf']
inputs+=sorted(p for p in ROOT.glob('*.docx') if 'gabarito' not in p.name.casefold())
inputs+=sorted(p for p in (ROOT/'web'/'documents').glob('pr-*-official.pdf'))
inventory=[]
for p in inputs:
    entry={'arquivo':str(p.relative_to(ROOT)),'bytes':p.stat().st_size,
           'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
    if p.suffix=='.pdf':
        with fitz.open(p) as source_pdf: entry['paginas']=len(source_pdf)
    inventory.append(entry)
(ART/'inventario-fontes.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2),encoding='utf-8')

pdf_path=ROOT/'Apostila-CPM-CEP-6ano-2027.pdf'
outside=[]; replacement=[]; sparse=[]; heading_checks=[]
with fitz.open(pdf_path) as pdf:
    headings=json.loads((ART/'sumario.json').read_text(encoding='utf-8'))
    check('Marcadores no PDF',len(pdf.get_toc()),len(headings))
    pages_text=[p.get_text() for p in pdf]
    for qid in ['P2','P4','P7','M19','C6']:
        first_page=next(t for t in pages_text if re.search(r'(?<![A-Z0-9])'+qid+r'\.',t))
        tail=first_page[re.search(r'(?<![A-Z0-9])'+qid+r'\.',first_page).start():]
        check('Alternativas juntas: '+qid,all(marker in tail for marker in ['A)','B)','C)','D)']),True)
    for item in headings:
        normalized=lambda s:re.sub(r'\s+',' ',s).strip()
        ok=normalized(item['title']) in normalized(pages_text[item['page']-1])
        assert ok, f"Título ausente na página indicada: {item}"
        heading_checks.append(item)
    for i,page in enumerate(pdf,1):
        text=pages_text[i-1]
        if '\ufffd' in text: replacement.append(i)
        if len(text)<150: sparse.append(i)
        for block in page.get_text('dict')['blocks']:
            for line in block.get('lines',[]):
                for span in line['spans']:
                    x0,y0,x1,y1=span['bbox']
                    if x0<40 or x1>page.rect.width-39 or y0<15 or y1>page.rect.height-14:
                        outside.append({'page':i,'bbox':list(span['bbox']),'text':span['text']})
    check('Texto fora dos limites seguros',len(outside),0)
    check('Caracteres de substituição',len(replacement),0)
    check('Páginas sem conteúdo suficiente',len(sparse),0)
    text='\n'.join(pages_text)
    for item in qids:
        assert len(re.findall(r'(?<![A-Z0-9])'+item+r'\.',text))>=2,item
    report={'pdf':pdf_path.name,'paginas':len(pdf),'palavras':len(text.split()),
            'exercicios':len(qids),'calculos_conferidos':calculation_count,
            'verificacoes':len(checks),'titulos_conferidos':len(heading_checks),'esquemas_vetoriais':len(vector_names),
            'links':sum(len(p.get_links()) for p in pdf),
            'sha256':hashlib.sha256(pdf_path.read_bytes()).hexdigest(),'resultado':'aprovado',
            'checks':checks,'limites':outside}
(ART/'conferencia.json').write_text(json.dumps(report,ensure_ascii=False,indent=2,default=str),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k not in ('checks','limites')},ensure_ascii=False))
