"""Gera a apostila a partir dos capítulos autorais em UTF-8. Requer reportlab e pymupdf."""
from pathlib import Path
import re, html, math, json, hashlib, itertools
import fitz
from reportlab.pdfgen import canvas
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
    Spacer, PageBreak, KeepTogether, Table, TableStyle, Image, Flowable)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.graphics.shapes import Drawing, Rect, Line, Circle, String, Polygon

ROOT = Path(__file__).resolve().parents[1]
HERE = Path(__file__).resolve().parent
OUT = ROOT / 'Apostila-CPM-CEP-6ano-2027.pdf'
ART = ROOT / 'artifacts' / 'apostila'
ART.mkdir(parents=True, exist_ok=True)
W, H = A4
M = 19*mm
CW = W-2*M
NAVY = colors.HexColor('#17334D')
TEAL = colors.HexColor('#117D87')
GOLD = colors.HexColor('#D07630')
INK = colors.HexColor('#253546')
GRAY = colors.HexColor('#566677')
LIGHT = colors.HexColor('#EDF5F6')
FONT_DIR = Path('C:/Windows/Fonts')
for name, fn in [('Study','arial.ttf'),('Study-Bold','arialbd.ttf'),
                 ('Study-Italic','ariali.ttf'),('Study-BoldItalic','arialbi.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONT_DIR/fn)))
pdfmetrics.registerFontFamily('Study', normal='Study', bold='Study-Bold',
                             italic='Study-Italic', boldItalic='Study-BoldItalic')

styles = {
 'body': ParagraphStyle('body', fontName='Study', fontSize=10.5, leading=15,
     textColor=INK, spaceAfter=7, allowWidows=0, allowOrphans=0),
 'part': ParagraphStyle('part', fontName='Study-Bold',fontSize=24,leading=28,
     textColor=NAVY,spaceBefore=4,spaceAfter=16,keepWithNext=True),
 'chapter': ParagraphStyle('chapter',fontName='Study-Bold',fontSize=16,leading=21,
     textColor=TEAL,spaceBefore=14,spaceAfter=9,keepWithNext=True),
 'sub': ParagraphStyle('sub',fontName='Study-Bold',fontSize=11.4,leading=16,
     textColor=NAVY,spaceBefore=9,spaceAfter=5,keepWithNext=True),
 'bullet': ParagraphStyle('bullet',fontName='Study',fontSize=10.5,leading=15,
     textColor=INK,leftIndent=12,firstLineIndent=-9,spaceAfter=5,
     allowWidows=0,allowOrphans=0),
 'small': ParagraphStyle('small',fontName='Study',fontSize=8.6,leading=12,
     textColor=GRAY,spaceAfter=6),
 'table': ParagraphStyle('table',fontName='Study',fontSize=9.1,leading=12.7,textColor=INK),
 'tablehead': ParagraphStyle('tablehead',fontName='Study-Bold',fontSize=9.1,
     leading=12.7,textColor=colors.white),
 'box': ParagraphStyle('box',fontName='Study',fontSize=10.1,leading=14.4,
     textColor=INK,spaceAfter=5),
 'caption': ParagraphStyle('caption',fontName='Study',fontSize=8.5,leading=12,
     textColor=GRAY,spaceBefore=3,spaceAfter=10),
}
ANCHORS = itertools.count(1)

def rich(s):
    s=html.escape(s)
    s=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s)
    s=re.sub(r'(?<!\*)\*([^*]+?)\*(?!\*)',r'<i>\1</i>',s)
    s=re.sub(r'`([^`]+)`',r'<font color="#117D87">\1</font>',s)
    s=re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)',r'<a href="\2" color="#117D87">\1</a>',s)
    return s

def para(s, style='body'):
    return Paragraph(rich(s),styles[style])

class Cover(Flowable):
    def __init__(self):
        super().__init__(); self.width=CW; self.height=H-2*M-5*mm
    def draw(self):
        c=self.canv; x=0; y=self.height
        c.setFillColor(TEAL); c.rect(0,y-7,CW,7,fill=1,stroke=0)
        c.setFont('Study-Bold',11); c.setFillColor(TEAL)
        c.drawString(0,y-45,'RUMO AO 6º ANO  /  INGRESSO 2027')
        c.setFillColor(NAVY); c.setFont('Study-Bold',42)
        c.drawString(0,y-116,'Apostila')
        c.drawString(0,y-166,'de estudo')
        c.setFont('Study-Bold',30); c.drawString(0,y-223,'CPM + CEP')
        c.setFillColor(GOLD); c.rect(0,y-251,58,5,fill=1,stroke=0)
        c.setFont('Study',13); c.setFillColor(INK)
        for i,line in enumerate(['Teoria para compreender.','Exemplos para aprender a resolver.',
                                 'Revisão para lembrar com segurança.']):
            c.drawString(0,y-288-21*i,line)
        for i,(label,color) in enumerate([('Português',NAVY),('Matemática',TEAL),
            ('Ciências',GOLD),('Geografia',NAVY),('História',TEAL)]):
            yy=y-405-i*30
            c.setFillColor(color); c.circle(5,yy+3,3,fill=1,stroke=0)
            c.setFillColor(INK); c.setFont('Study',12); c.drawString(18,yy,label)
        c.setFillColor(LIGHT); c.roundRect(0,61,CW,76,7,fill=1,stroke=0)
        c.setFillColor(NAVY); c.setFont('Study-Bold',11)
        c.drawString(15,112,'Base: editais e provas do acervo')
        c.setFont('Study',10)
        c.drawString(15,92,'CPM Paraná 2018–2025 • Edital CPM nº 001/2026')
        c.drawString(15,75,'CEP: Edital nº 005/2026, Anexo II')
        c.setFont('Study',8.5); c.setFillColor(GRAY)
        c.drawString(0,27,'Material independente de preparação • edição de 25/10/2026')
        c.drawString(0,12,'Conteúdo autoral organizado a partir das fontes identificadas ao final.')

class StudyDoc(BaseDocTemplate):
    def __init__(self,filename):
        super().__init__(str(filename),pagesize=A4,leftMargin=M,rightMargin=M,
            topMargin=20*mm,bottomMargin=18*mm,title='Apostila de estudo — CPM e CEP — 6º ano 2027',
            author='Rumo ao 6º ano',subject='Preparação com base nos editais CPM e CEP e nas provas do acervo')
        self.current_part='Guia de estudo'; self.headings=[]
        frame=Frame(M,18*mm,CW,H-38*mm,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
        self.addPageTemplates(PageTemplate(id='Study',frames=frame,onPage=self.decorate,onPageEnd=self.footer))
    def beforeDocument(self):
        self.current_part='Guia de estudo'; self.headings=[]
    def decorate(self,c,doc):
        if doc.page==1: return
        c.saveState(); c.setStrokeColor(colors.HexColor('#D5E1E7')); c.setLineWidth(.5)
        c.line(M,H-13.5*mm,W-M,H-13.5*mm)
        c.setFont('Study-Bold',8); c.setFillColor(TEAL)
        c.drawString(M,H-11*mm,'RUMO AO 6º ANO  •  CPM + CEP')
        c.setFont('Study',8); c.setFillColor(GRAY)
        c.drawRightString(W-M,H-11*mm,'EDIÇÃO 2027')
        c.restoreState()
    def footer(self,c,doc):
        if doc.page==1: return
        c.saveState(); c.setStrokeColor(colors.HexColor('#D5E1E7')); c.setLineWidth(.5)
        c.setFillColor(GRAY)
        c.line(M,13*mm,W-M,13*mm)
        c.setFont('Study',7.8); c.drawString(M,8.8*mm,self.current_part[:83])
        c.setFont('Study-Bold',9); c.drawRightString(W-M,8.5*mm,str(doc.page))
        c.restoreState()
    def afterFlowable(self,f):
        if getattr(f,'toclevel',None) is not None:
            title=f.getPlainText(); key=f.anchor
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(title,key,level=f.toclevel,closed=False)
            self.notify('TOCEntry',(f.toclevel,title,self.page,key))
            self.headings.append({'level':f.toclevel,'title':title,'page':self.page})
            if f.toclevel==0: self.current_part=title

def text_d(d,x,y,s,size=10,color=INK,anchor='middle',bold=False):
    d.add(String(x,y,s,fontName='Study-Bold' if bold else 'Study',fontSize=size,
                 fillColor=color,textAnchor=anchor))

def arrow(d,x1,y1,x2,y2,color=TEAL):
    d.add(Line(x1,y1,x2,y2,strokeColor=color,strokeWidth=1.5))
    ang=math.atan2(y2-y1,x2-x1); ll=6
    d.add(Polygon([x2,y2,x2-ll*math.cos(ang-.45),y2-ll*math.sin(ang-.45),
                  x2-ll*math.cos(ang+.45),y2-ll*math.sin(ang+.45)],fillColor=color,strokeColor=color))

def figure(name):
    d=Drawing(CW,160)
    if name in ('brasil','parana'):
        src=ROOT/'web'/'fiel'/('brasil-regioes.svg' if name=='brasil' else 'parana-cidades.svg')
        if name=='brasil':
            # O SVG do acervo omite a sigla do DF para evitar sobreposição com GO.
            # Reaplicamos sua projeção à geometria do DF e acrescentamos uma chamada.
            data=json.loads((ROOT/'web'/'cep'/'br-uf.geojson').read_text(encoding='utf-8'))
            f=next(f for f in data['features'] if f['properties']['codarea']=='53')
            polygons=f['geometry']['coordinates'] if f['geometry']['type']=='MultiPolygon' else [f['geometry']['coordinates']]
            points=[point for polygon in polygons for ring in polygon for point in ring]
            lon=sum(p[0] for p in points)/len(points); lat=sum(p[1] for p in points)/len(points)
            k=math.cos((-34+5.5)/2*math.pi/180); s=min(540/(40*k),560/39.5)
            xx=(560-40*k*s)/2+(lon+74)*k*s; yy=(580-39.5*s)/2+(5.5-lat)*s
            callout=(f'<path d="M{xx:.1f},{yy:.1f} L{xx+29:.1f},{yy-20:.1f}" stroke="#17334D" stroke-width="1.3" fill="none"/>'
                f'<circle cx="{xx:.1f}" cy="{yy:.1f}" r="2.2" stroke="#17334D" fill="#fff"/>'
                f'<rect x="{xx+27:.1f}" y="{yy-33:.1f}" width="27" height="18" fill="#fffefa"/>'
                f'<text x="{xx+30:.1f}" y="{yy-20:.1f}" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#17334D">DF</text>')
            svg_text=src.read_text(encoding='utf-8').replace('</svg>',callout+'</svg>')
            src=ART/'brasil-com-df.svg'; src.write_text(svg_text,encoding='utf-8')
        temp=ART/(name+'.png')
        with fitz.open(src) as svg:
            svg[0].get_pixmap(matrix=fitz.Matrix(2,2),alpha=False).save(temp)
        img=Image(str(temp)); ratio=min(CW/img.imageWidth, (325 if name=='brasil' else 275)/img.imageHeight)
        img.drawWidth=img.imageWidth*ratio; img.drawHeight=img.imageHeight*ratio; img.hAlign='CENTER'
        return img
    if name=='fracoes':
        d=Drawing(CW,100)
        for y,n,k,label in [(63,4,3,'3/4'),(20,8,6,'6/8')]:
            for j in range(n):
                d.add(Rect(100+j*280/n,y,280/n,25,fillColor=TEAL if j<k else LIGHT,strokeColor=NAVY))
            text_d(d,64,y+8,label,12,bold=True)
        return d
    if name=='area':
        d=Drawing(CW,200)
        pts=[60,20,300,20,300,80,210,80,210,170,60,170]
        d.add(Polygon(pts,fillColor=LIGHT,strokeColor=TEAL,strokeWidth=2))
        d.add(Line(210,20,210,170,strokeColor=GOLD,strokeDashArray=[4,3]))
        text_d(d,180,4,'8 m'); text_d(d,43,85,'5 m',anchor='end')
        text_d(d,257,95,'3 m'); text_d(d,223,129,'3 m',anchor='start')
        text_d(d,130,77,'Retângulo maior',9); text_d(d,130,60,'menos recorte',9)
        text_d(d,370,53,'A = 8 × 5 − 3 × 3',11,bold=True)
        text_d(d,370,32,'A = 31 m²',11,bold=True)
        return d
    if name=='volume':
        d=Drawing(CW,185)
        a,b,cx,dy=90,30,190,65
        for points in [[a,b,a+cx,b,a+cx,b+70,a,b+70],
                       [a,b+70,a+55,b+70+dy,a+cx+55,b+70+dy,a+cx,b+70],
                       [a+cx,b,a+cx+55,b+dy,a+cx+55,b+70+dy,a+cx,b+70]]:
            d.add(Polygon(points,fillColor=LIGHT,strokeColor=TEAL,strokeWidth=1.5))
        text_d(d,180,12,'60 cm'); text_d(d,60,65,'25 cm')
        text_d(d,341,53,'40 cm'); text_d(d,384,118,'V = c × l × h',10,bold=True)
        text_d(d,384,96,'60.000 cm³ = 60 L',10)
        return d
    if name=='agua':
        d=Drawing(CW,150)
        for x,y,label in [(55,35,'Água líquida'),(240,110,'Vapor de água'),(420,35,'Nuvens / gotículas')]:
            d.add(Rect(x-54,y-14,116,34,fillColor=LIGHT,strokeColor=TEAL,rx=5))
            text_d(d,x+4,y,label,9)
        arrow(d,112,57,195,102); text_d(d,108,102,'Evaporação',9)
        arrow(d,301,102,365,58); text_d(d,387,105,'Condensação',9)
        arrow(d,363,25,116,25); text_d(d,244,7,'Precipitação • escoamento • infiltração',9)
        return d
    if name=='cadeia':
        d=Drawing(CW,115)
        for i,t in enumerate(['Capim','Gafanhoto','Sapo','Serpente']):
            x=56+i*125; d.add(Rect(x-46,61,92,30,fillColor=LIGHT,strokeColor=TEAL,rx=5))
            text_d(d,x,72,t,10,bold=True)
            if i<3: arrow(d,x+47,76,x+77,76)
        text_d(d,CW/2,38,'A seta indica o alimento indo para quem o consome.',9)
        text_d(d,CW/2,17,'Decompositores atuam sobre restos de todos os níveis.',9)
        return d
    if name=='sistemas':
        d=Drawing(CW,160)
        for x,y,title,sub in [(105,120,'Digestório','nutrientes'),(388,120,'Respiratório','oxigênio'),
                              (246,65,'Circulatório','transporte'),(246,10,'Células','uso de energia e matéria')]:
            d.add(Rect(x-74,y-9,148,41,fillColor=LIGHT,strokeColor=TEAL,rx=5))
            text_d(d,x,y+15,title,10,bold=True); text_d(d,x,y+1,sub,9)
        arrow(d,170,112,204,96); arrow(d,324,112,288,96); arrow(d,246,55,246,44)
        return d
    if name=='terra':
        d=Drawing(CW,140)
        d.add(Circle(85,72,35,fillColor=GOLD,strokeColor=GOLD)); text_d(d,85,20,'Sol',11,bold=True)
        for yy in [47,72,97]: arrow(d,135,yy,300,yy,GOLD)
        d.add(Circle(350,72,37,fillColor=LIGHT,strokeColor=TEAL,strokeWidth=2))
        d.add(Line(331,19,369,125,strokeColor=NAVY,strokeWidth=2))
        text_d(d,412,115,'Eixo inclinado',9); text_d(d,350,7,'Terra (esquema)',10)
        text_d(d,216,119,'Luz solar',10)
        text_d(d,CW/2,-12,'Estações: inclinação do eixo + translação. Fora de escala.',9)
        d.height=160; d.translate(0,20)
        return d
    if name=='cartografia':
        d=Drawing(CW,155)
        for x,label in [(120,'Latitude'),(365,'Longitude')]:
            d.add(Circle(x,83,52,fillColor=LIGHT,strokeColor=TEAL))
            if label=='Latitude':
                for yy in [62,83,104]:
                    d.add(Line(x-45,yy,x+45,yy,strokeColor=GOLD if yy==83 else TEAL,strokeWidth=1.2))
                text_d(d,x,143,'Equador = 0°',10)
            else:
                for xx in [x-21,x,x+21]: d.add(Line(xx,35,xx,131,strokeColor=GOLD if xx==x else TEAL,strokeWidth=1.2))
                text_d(d,x,143,'Greenwich = 0°',10)
            text_d(d,x,10,label,11,bold=True)
        return d
    if name=='grafico':
        d=Drawing(CW,180)
        for k in range(0,26,5):
            yy=27+k*4.5; d.add(Line(62,yy,438,yy,strokeColor=colors.HexColor('#D4DEE4')))
            text_d(d,50,yy-3,str(k),9,anchor='end')
        for i,(t,n) in enumerate([('Seg',12),('Ter',18),('Qua',15),('Qui',20),('Sex',10)]):
            xx=85+i*69; d.add(Rect(xx,27,35,n*4.5,fillColor=TEAL,strokeColor=TEAL))
            text_d(d,xx+17,12,t,9); text_d(d,xx+17,33+n*4.5,str(n),9)
        text_d(d,CW/2,161,'Livros emprestados em uma semana (dados fictícios)',10,bold=True)
        return d
    if name=='linha':
        d=Drawing(CW,125)
        vals=[('1500','Chegada'),('1530','Colonização'),('1808','Corte'),('1822','Independência'),('1888','Abolição'),('1889','República')]
        d.add(Line(30,63,CW-25,63,strokeColor=TEAL,strokeWidth=2))
        for i,(a,b) in enumerate(vals):
            xx=35+i*(CW-70)/5; d.add(Circle(xx,63,4,fillColor=GOLD,strokeColor=GOLD))
            text_d(d,xx,83,a,10,bold=True); text_d(d,xx,39,b,8)
        text_d(d,CW/2,5,'Linha esquemática: os intervalos do desenho não são proporcionais.',8.5)
        return d
    raise ValueError('Figura desconhecida: '+name)

def table(lines):
    rows=[]
    for line in lines:
        vals=[v.strip() for v in line.strip().strip('|').split('|')]
        if all(re.fullmatch(r'[:\- ]+',v or '-') for v in vals): continue
        rows.append(vals)
    n=len(rows[0]); widths=[CW/n]*n
    if n==2: widths=[CW*.32,CW*.68]
    if n==3: widths=[CW*.23,CW*.38,CW*.39]
    if n==4: widths=[CW*.21,CW*.26,CW*.26,CW*.27]
    t=Table([[para(v,'tablehead' if i==0 else 'table') for v in row] for i,row in enumerate(rows)],
            colWidths=widths,repeatRows=1,hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),NAVY),('VALIGN',(0,0),(-1,-1),'TOP'),
        ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),
        ('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),
        ('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.HexColor('#F0F5F7'),colors.white]),
        ('LINEBELOW',(0,1),(-1,-1),.35,colors.HexColor('#D9E3E8'))]))
    return [t,Spacer(1,9)]

def parse(text):
    lines=text.splitlines(); result=[]; i=0
    while i<len(lines):
        ln=lines[i].strip()
        if not ln or ln.startswith('<!--'): i+=1; continue
        if ln=='@page': result.append(PageBreak()); i+=1; continue
        if ln.startswith('@figure '):
            _,name,caption=ln.split(' ',2)
            result.append(KeepTogether([figure(name),para(caption,'caption')]))
            i+=1; continue
        if ln.startswith('# '):
            result.append(PageBreak()); p=para(ln[2:],'part'); p.toclevel=0
            p.anchor='part-'+str(next(ANCHORS))
            result.append(p); i+=1; continue
        if ln.startswith('## '):
            p=para(ln[3:],'chapter'); p.toclevel=1; p.anchor='chapter-'+str(next(ANCHORS))
            result.extend([Spacer(1,3),p]); i+=1; continue
        if ln.startswith('### '):
            heading=para(ln[4:],'sub'); j=i+1
            while j<len(lines) and not lines[j].strip(): j+=1
            if j<len(lines) and lines[j].strip().startswith('@figure '):
                _,name,caption=lines[j].strip().split(' ',2)
                result.append(KeepTogether([heading,figure(name),para(caption,'caption')]))
                i=j+1; continue
            result.append(heading); i+=1; continue
        if ln.startswith(':::'):
            title=ln[3:].strip(); inner=[]; i+=1; block=[]
            while i<len(lines) and lines[i].strip()!=':::':
                if lines[i].strip(): block.append(lines[i].strip())
                elif block: inner.append(para(' '.join(block),'box')); block=[]
                i+=1
            if block: inner.append(para(' '.join(block),'box'))
            ptitle=para('**'+title+'**','box')
            t=Table([[ [ptitle]+inner ]],colWidths=[CW],hAlign='LEFT')
            t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),LIGHT),
                ('BOX',(0,0),(-1,-1),.4,colors.HexColor('#CEE0E4')),
                ('LINEBEFORE',(0,0),(0,-1),3,GOLD if 'Atenção' in title else TEAL),
                ('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12),
                ('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),7)]))
            result.extend([t,Spacer(1,9)]); i+=1; continue
        if ln.startswith('|'):
            chunk=[]
            while i<len(lines) and lines[i].strip().startswith('|'):
                chunk.append(lines[i]); i+=1
            result.extend(table(chunk)); continue
        if ln.startswith('- '): result.append(para('• '+ln[2:],'bullet')); i+=1; continue
        if ln.startswith('Fonte:') or ln.startswith('Base:'):
            result.append(para(ln,'small')); i+=1; continue
        chunk=[ln]; i+=1
        while i<len(lines) and lines[i].strip() and not lines[i].strip().startswith(('#','- ','|',':::','@','Fonte:','Base:')):
            chunk.append(lines[i].strip()); i+=1
        p=para(' '.join(chunk))
        if re.match(r'^\*\*[PMCGHL]\d+\.',ln):
            j=i; choices=[]
            while j<len(lines):
                if not lines[j].strip(): j+=1; continue
                if lines[j].strip().startswith('- '):
                    choices.append(para('• '+lines[j].strip()[2:],'bullet')); j+=1
                else: break
            if choices:
                result.append(KeepTogether([p]+choices)); i=j; continue
        result.append(p)
    return result

def build():
    story=[Cover(),PageBreak(),para('Sumário','part'),
           para('Os títulos e os números de página são clicáveis. O painel de marcadores do leitor de PDF também permite navegar por matéria e capítulo.','small')]
    toc=TableOfContents(); toc.dotsMinLevel=0
    toc.tableStyle.add('TOPPADDING',(0,0),(-1,-1),1)
    toc.tableStyle.add('BOTTOMPADDING',(0,0),(-1,-1),1)
    toc.levelStyles=[
        ParagraphStyle('toc0',fontName='Study-Bold',fontSize=10.1,leading=14.6,textColor=NAVY,spaceBefore=7,leftIndent=0,rightIndent=20),
        ParagraphStyle('toc1',fontName='Study',fontSize=8.8,leading=12.3,textColor=INK,leftIndent=10,rightIndent=20)]
    story.append(toc)
    files=sorted(HERE.glob('[0-9][0-9]-*.md'))
    for p in files: story.extend(parse(p.read_text(encoding='utf-8')))
    doc=StudyDoc(OUT); doc.multiBuild(story,maxPasses=5)
    (ART/'sumario.json').write_text(json.dumps(doc.headings,ensure_ascii=False,indent=2),encoding='utf-8')
    with fitz.open(OUT) as pdf:
        text='\n'.join(p.get_text() for p in pdf)
        (ART/'texto-pdf.txt').write_text(text,encoding='utf-8')
        report={'pdf':OUT.name,'pages':len(pdf),'words':len(text.split()),
            'chapters':sum(h['level']==1 for h in doc.headings),'parts':sum(h['level']==0 for h in doc.headings),
            'bookmarks':len(pdf.get_toc()),'links':sum(len(p.get_links()) for p in pdf),
            'sha256':hashlib.sha256(OUT.read_bytes()).hexdigest()}
    (ART/'geracao.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False))

if __name__=='__main__': build()
