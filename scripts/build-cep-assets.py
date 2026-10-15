"""Build original code-native visuals from the downloaded IBGE geographic mesh."""
import json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
data = json.loads((root/'web/cep/br-uf.geojson').read_text(encoding='utf-8'))
paths=[]
for feature in data['features']:
    geom=feature['geometry']
    polygons=geom['coordinates'] if geom['type']=='MultiPolygon' else [geom['coordinates']]
    rings=[]
    for polygon in polygons:
        for ring in polygon:
            rings.append('M'+' L'.join(f'{(lon+74)*11:.2f},{(6-lat)*11:.2f}' for lon,lat,*_ in ring)+' Z')
    pr=feature['properties']['codarea']=='41'
    paths.append(f'<path d="{" ".join(rings)}" fill="{"#3156a4" if pr else "#e2e7ee"}" stroke="#34455a" stroke-width="0.7"/>')
svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 515"><title>Brasil: unidades da federação, Paraná destacado</title><rect width="510" height="515" fill="#fffefa"/><text x="15" y="23" font-family="sans-serif" font-size="17">Brasil · unidades da federação</text>'+''.join(paths)+'<path d="M470 85V45m0 0-6 12m6-12 6 12" fill="none" stroke="#17223a" stroke-width="2"/><text x="463" y="36" font-family="sans-serif">N</text><rect x="15" y="466" width="14" height="14" fill="#3156a4"/><text x="38" y="478" font-family="sans-serif" font-size="14">Paraná</text><text x="15" y="504" font-family="sans-serif" font-size="11">Fonte: IBGE · malha de UFs, qualidade mínima · projeção simplificada</text></svg>'
(root/'web/cep/brazil.svg').write_text(svg, encoding='utf-8')
print('Map generated from 27 IBGE features; no invented borders or cities.')
