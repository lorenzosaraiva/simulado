"""Package unmodified originals and render every PDF page for the offline reader."""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import fitz

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'web' / 'documents'
DEST.mkdir(exist_ok=True)

ONLINE = [
    ('rs-2025', 'Colégio Militar de Porto Alegre · ingresso 2026', 'RS', '2025/2026',
     'https://www.cursosazambuja.com.br/provas-e-gabaritos-cursos-azambuja/1257/colegio-militar-cmpa-fundamental-6-ano',
     'https://www.cursosazambuja.com.br/storage/app/media/PROVA%20E%20GABARITOS/2025-26/2025-26-cmpa-fund-matematica-e-portuguessite.pdf',
     'https://www.cursosazambuja.com.br/storage/app/media/PROVA%20E%20GABARITOS/2025-26/2025-26%20-%20CMPA%20FUND%20-%20GABARITO.pdf',
     '40 questões · matemática e português · 35 páginas · cópia pública do CMPA', 'Gabarito CMPA · acervo Cursos Azambuja'),
    ('rs-2024', 'Colégio Militar de Porto Alegre · ingresso 2025', 'RS', '2024/2025',
     'https://www.cursosazambuja.com.br/provas-e-gabaritos-cursos-azambuja/1257/colegio-militar-cmpa-fundamental-6-ano',
     'https://www.cursosazambuja.com.br/storage/app/media/PROVA%20E%20GABARITOS/1.%20NOVAS/2024-25-cmpa-fund-matematica-e-portugues-reparado.pdf',
     'https://www.cursosazambuja.com.br/storage/app/media/PROVA%20E%20GABARITOS/2024-25/CMS%20%20FUNDAMENTAL/2024-25%20-%20CMPA%20FUND%20-%20GABARITO.pdf',
     '40 questões · matemática e português · 33 páginas · cópia pública do CMPA', 'Gabarito CMPA · acervo Cursos Azambuja'),
    ('mg-2024', 'Colégio Militar de Belo Horizonte · ingresso 2025', 'MG', '2024/2025',
     'https://cursosazambuja.com.br/provas-e-gabaritos-cursos-azambuja/477/colegio-militar-de-belo-horizonte-cmbh',
     'https://cursosazambuja.com.br/storage/app/media/PROVA%20E%20GABARITOS/2024-25/CMS%20%20FUNDAMENTAL/2024-25-cmbh-fund-matematica-e-portugues.pdf',
     'https://cursosazambuja.com.br/storage/app/media/PROVA%20E%20GABARITOS/2024-25/CMS%20%20FUNDAMENTAL/2024-25%20CMBH%20-%20FUND%20-%20GABARITO.pdf',
     '40 questões · matemática e português · cópia pública do caderno CMBH, 32 páginas', 'Gabarito do CMBH · cópia do acervo Cursos Azambuja'),
    ('pe-2025', 'CPM Pernambuco · ingresso 2025', 'PE', '2025',
     'https://www.upenet.com.br/concursos/25_CPM25/',
     'https://www.upenet.com.br/concursos/25_CPM25/Provas/CADERNO%20DE%20PROVA%20FUNDAMENTAL.pdf',
     'https://www.upenet.com.br/concursos/25_CPM25/Gabaritos/GABARITO%20DEFINITIVO%20-%20REPUBLICADO.pdf',
     '20 questões · 5 alternativas · textos e quadrinhos', 'Definitivo republicado'),
    ('df-2025', 'Colégio Militar Tiradentes · ingresso 2026', 'DF', '2025/2026',
     'https://www.colegiomilitartiradentes.com.br/acervo/',
     'https://www.colegiomilitartiradentes.com.br/wp-content/uploads/2026/04/PROVA-6-ANO-2025_2026.pdf',
     'https://www.colegiomilitartiradentes.com.br/wp-content/uploads/2026/08/GABARITO-DEFINITIVO-DO-6o-ANO.pdf',
     '30 questões · múltipla escolha e certo/errado · textos e imagens', 'Definitivo'),
]

# Prefer the institution's PDF for the reader: the supplied DOCX files contain
# floating objects whose converted layout can overlap. DOCX downloads stay intact.
PARANA_PDFS = {
    '2018': 'https://cpmlondrina.com.br/wp-content/uploads/2018/11/Prova_Fundamental_2CPM_18_19.pdf',
    '2019': 'https://cpmmaringa.com.br/wp-content/uploads/2020/11/Prova-Ensino-Fundamental.pdf',
    '2020': 'https://cpmlondrina.com.br/wp-content/uploads/2020/12/prova-fundamental-2020_cpm_oficial.pdf',
    '2021': 'https://cpmmaringa.com.br/wp-content/uploads/2021/12/carderno-de-prova-ensino-fundamentalpdf-1636375706.pdf',
    '2022': 'https://www.cpmfoz.com.br/_files/ugd/02760c_0d770212b6444a00943eb28ec2583670.pdf',
    '2023': 'https://www.cpmfoz.com.br/_files/ugd/02760c_7d04671eaf1a4967bd0425e25f598ced.pdf',
    '2024': 'https://www.cpmfoz.com.br/_files/ugd/02760c_8c359d217abc47e081d8570577edab57.pdf',
    '2025': 'https://www.cpmfoz.com.br/_files/ugd/02760c_3247279bfd964750a3f68e4b75ffcc90.pdf',
}
PARANA_KEYS = {
    '2018': 'https://cpmlondrina.com.br/wp-content/uploads/2018/12/edital-no-004-ceac-2018-gabarito-oficial-definitivo-fundamentalpdf-1544468928.pdf',
    '2024': 'https://cpmmaringa.com.br/wp-content/uploads/2025/03/EDITAL-CEAC-004-2024-GABARITO-DEFINITIVO.pdf',
    '2025': 'https://cpmmaringa.com.br/wp-content/uploads/2026/04/Gabaritos-fundamental-e-medio-2025.pdf',
}

def render(pdf, identifier):
    folder = DEST / identifier
    folder.mkdir(exist_ok=True)
    pages = []
    with fitz.open(pdf) as document:
        for number, page in enumerate(document, 1):
            filename = f'page-{number:02}.jpg'
            target = folder / filename
            if not target.exists() or target.stat().st_mtime < Path(pdf).stat().st_mtime:
                page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), alpha=False).save(target, jpg_quality=84)
            pages.append(f'documents/{identifier}/{filename}')
    return pages

def download(url, filename):
    target = DEST / filename
    if not target.exists():
        temporary = target.with_suffix('.part')
        subprocess.run(['curl.exe', '-fL', '--retry', '2', '--connect-timeout', '15', '--max-time', '120',
                        '-A', 'Mozilla/5.0', url, '-o', str(temporary)], check=True, capture_output=True)
        if not temporary.read_bytes().startswith(b'%PDF'):
            raise ValueError(f'Not a PDF: {url}')
        temporary.replace(target)
    return target

entries = []
for docx in sorted(ROOT.glob('*.docx')):
    if 'gabarito' in docx.name.lower():
        continue
    year = docx.name[:4]
    identifier = f'pr-{year}'
    pdf = DEST / f'{docx.stem}.pdf'
    official_url = PARANA_PDFS.get(year)
    if official_url:
        pdf = download(official_url, identifier+'-official.pdf')
    if not pdf.exists():
        raise FileNotFoundError(f'Convert the DOCX with LibreOffice first: {pdf}')
    shutil.copy2(docx, DEST / docx.name)
    keys = [p for p in ROOT.glob(f'{year}*.docx') if 'gabarito' in p.name.lower()]
    entry = dict(id=identifier, title=f'CPM Paraná · prova {year}', region='PR', year=year,
                 description='Caderno completo do Ensino Fundamental · textos, imagens e todas as questões',
                 sourceLabel='DOCX fornecido no acervo local', original=f'documents/{docx.name}',
                 sha256=hashlib.sha256(docx.read_bytes()).hexdigest(),
                 pdf=f'documents/{pdf.name}', pages=render(pdf, identifier), answerKey=None)
    if keys:
        key = keys[0]
        shutil.copy2(key, DEST / key.name)
        key_pdf = DEST / f'{key.stem}.pdf'
        entry['answerKey'] = dict(original=f'documents/{key.name}', pdf=f'documents/{key_pdf.name}',
                                 pages=render(key_pdf, identifier+'-key'),
                                 label='Preliminar (documento fornecido)' if year == '2025' else 'Gabarito fornecido')
    entries.append(entry)
    if official_url:
        entry['sourceLabel'] = 'PDF da instituição · DOCX local preservado'
        entry['sourceUrl'] = official_url
    if year in PARANA_KEYS:
        official_key = download(PARANA_KEYS[year], identifier+'-official-key.pdf')
        entry['answerKey'] = dict(original=f'documents/{official_key.name}', pdf=f'documents/{official_key.name}',
                                  pages=render(official_key, identifier+'-key'), label='Definitivo publicado pela instituição')

# These are statewide CPM exams, including Londrina, rather than separate exams
# for each city. The uploaded '2021' cover explicitly says 2020/2021.
local_exams = {'2020': '2021', '2022': '2022', '2023': '2023', '2024': '2024', '2025': '2025'}
for entry in entries:
    year = entry['year']
    if year in local_exams:
        supplied = ROOT / f'prova curitiba londrina {local_exams[year]}.pdf'
        if supplied.exists():
            target = DEST / supplied.name
            shutil.copy2(supplied, target)
            entry.update(original=f'documents/{target.name}', pdf=f'documents/{target.name}',
                         sha256=hashlib.sha256(target.read_bytes()).hexdigest(),
                         pages=render(target, entry['id']),
                         sourceLabel='PDF fornecido · seleção estadual, incluindo Curitiba e Londrina')
    key_year = {'2019': '2020', '2020': '2021', '2022': '2022', '2023': '2023', '2024': '2024', '2025': '2025'}.get(year)
    matches = list(ROOT.glob(f'prova curitiba londrina {key_year} *.pdf')) if key_year else []
    if matches:
        supplied = matches[0]
        target = DEST / supplied.name
        shutil.copy2(supplied, target)
        entry['answerKey'] = dict(original=f'documents/{target.name}', pdf=f'documents/{target.name}',
                                 pages=render(target, entry['id']+'-key'), label='Definitivo · PDF fornecido')

for identifier, title, region, year, source, exam_url, key_url, description, label in ONLINE:
    pdf = download(exam_url, identifier+'.pdf')
    key_pdf = download(key_url, identifier+'-key.pdf')
    entries.append(dict(id=identifier, title=title, region=region, year=year, description=description,
                        sourceLabel='Documento do colégio · cópia pública em Cursos Azambuja' if region in ('MG', 'RS') else 'Caderno publicado pela instituição', sourceUrl=source,
                        original=f'documents/{pdf.name}', pdf=f'documents/{pdf.name}',
                        sha256=hashlib.sha256(pdf.read_bytes()).hexdigest(),
                        pages=render(pdf, identifier),
                        answerKey=dict(original=f'documents/{key_pdf.name}', pdf=f'documents/{key_pdf.name}',
                                       pages=render(key_pdf, identifier+'-key'), label=label)))

(ROOT / 'web' / 'archive.js').write_text('window.CPM_ARCHIVE = '+json.dumps(entries, ensure_ascii=False, indent=2)+';\n', encoding='utf-8')
print(f'Archive: {len(entries)} complete exams, {sum(len(e["pages"]) for e in entries)} pages; originals preserved.')
