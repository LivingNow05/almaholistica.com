"""Build the two book editions from the same HTML used by the reader.
Requires beautifulsoup4 and reportlab. Font paths can be overridden with BOOK_FONT_DIR.
"""
from pathlib import Path
import os,re,html
from bs4 import BeautifulSoup, NavigableString
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,PageBreak,KeepTogether,Flowable,Table,TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor,Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
ROOT=Path(__file__).resolve().parents[1]/'public/protocolo-nocturno'
FONT=Path(os.environ.get('BOOK_FONT_DIR','/System/Library/Fonts/Supplemental'))
for name,file in [('Book','Baskerville.ttc'),('Text','Arial.ttf'),('TextB','Arial Bold.ttf'),('TextI','Arial Italic.ttf')]:
 pdfmetrics.registerFont(TTFont(name,str(FONT/file)))
pdfmetrics.registerFontFamily('Text',normal='Text',bold='TextB',italic='TextI',boldItalic='TextB')
soup=BeautifulSoup((ROOT/'producto-digital.html').read_text(),'html.parser')
W,H=612,792
M=54; CW=W-2*M
PALETTES={'night':{'bg':'#142325','ink':'#F4EEE2','muted':'#C0CCC6','accent':'#E3B78E','line':'#425652','panel':'#233A39'},'paper':{'bg':'#FBF8F0','ink':'#23362F','muted':'#4C6055','accent':'#914C30','line':'#BFC9B9','panel':'#E8EDDF'}}

def clean(t):return t.replace('\u2011','-').replace('\u2013','-').replace('\u2014','-').replace('\u00a0',' ')
def inline(node):
 if isinstance(node,NavigableString):return html.escape(clean(str(node)))
 if node.name=='br':return '<br/>'
 if node.name in ['strong','b']:return '<b>'+''.join(inline(x) for x in node.contents)+'</b>'
 if node.name in ['em','i']:return '<i>'+''.join(inline(x) for x in node.contents)+'</i>'
 if node.name=='a' and node.get('href','').startswith('https:'):return '<link href="'+html.escape(node['href'])+'">'+''.join(inline(x) for x in node.contents)+'</link>'
 return ''.join(inline(x) for x in node.contents)

class Box(Flowable):
 def __init__(self,parts,pal,kind='note'):
  Flowable.__init__(self);self.parts=parts;self.pal=pal;self.kind=kind
 def wrap(self,availW,availH):
  self.width=availW;self.inner=availW-36;self.sizes=[x.wrap(self.inner,10000) for x in self.parts];self.height=sum(y for x,y in self.sizes)+32+8*(len(self.parts)-1);return self.width,self.height
 def draw(self):
  c=self.canv;c.setFillColor(self.pal['panel']);c.roundRect(0,0,self.width,self.height,4,stroke=0,fill=1);c.setFillColor(self.pal['accent']);c.rect(0,0,2,self.height,stroke=0,fill=1)
  y=self.height-16
  for p,(w,h) in zip(self.parts,self.sizes):y-=h;p.drawOn(c,18,y);y-=8
class Rule(Flowable):
 def __init__(self,pal):Flowable.__init__(self);self.pal=pal
 def wrap(self,w,h):self.width=w;return w,18
 def draw(self):self.canv.setStrokeColor(self.pal['line']);self.canv.setLineWidth(.5);self.canv.line(0,8,self.width,8)
class Lines(Flowable):
 def __init__(self,pal,n=3):Flowable.__init__(self);self.pal=pal;self.n=n
 def wrap(self,w,h):self.width=w;return w,self.n*32
 def draw(self):
  self.canv.setStrokeColor(self.pal['line']);self.canv.setLineWidth(.5)
  for i in range(self.n):self.canv.line(0,i*32+8,self.width,i*32+8)
class Marker(Flowable):
 def __init__(self,id,title,starts):Flowable.__init__(self);self.id=id;self.title=title;self.starts=starts
 def wrap(self,w,h):return 0,0
 def draw(self):
  self.starts[self.id]=self.canv.getPageNumber();self.canv.bookmarkPage(self.id);self.canv.addOutlineEntry(self.title,self.id,0)

def make(theme,target,starts_hint=None,total=0):
 pal={k:HexColor(v) for k,v in PALETTES[theme].items()};starts={};story=[]
 styles={
 'body':ParagraphStyle('body',fontName='Text',fontSize=13.6,leading=20.5,textColor=pal['muted'],spaceAfter=13),
 'small':ParagraphStyle('small',fontName='Text',fontSize=10.4,leading=15.5,textColor=pal['muted'],spaceAfter=10),
 'title':ParagraphStyle('title',fontName='Book',fontSize=37,leading=41,textColor=pal['ink'],spaceAfter=24,keepWithNext=True),
 'h4':ParagraphStyle('h4',fontName='TextB',fontSize=15,leading=20,textColor=pal['ink'],spaceBefore=10,spaceAfter=8,keepWithNext=True),
 'label':ParagraphStyle('label',fontName='TextB',fontSize=8.5,leading=13,textColor=pal['accent'],spaceAfter=16,tracking=1.4),
 'quote':ParagraphStyle('quote',fontName='Book',fontSize=19,leading=25,textColor=pal['ink'],spaceAfter=12),
 'noteTitle':ParagraphStyle('noteTitle',fontName='TextB',fontSize=12.8,leading=18,textColor=pal['ink']),
 'noteBody':ParagraphStyle('noteBody',fontName='Text',fontSize=12.3,leading=18.5,textColor=pal['muted']),
 'transcript':ParagraphStyle('transcript',fontName='Text',fontSize=12.8,leading=19.8,textColor=pal['muted'],spaceAfter=13),
 }
 def p(t,k='body'):return Paragraph(t,styles[k])
 def heading(num,title,sub=None,id=None):
  if id:story.append(Marker(id,title,starts))
  story.extend([p(f'CUADERNO DE NOCHE  /  {num}','label'),p(clean(title),'title')])
  if sub:story.extend([p(clean(sub)),Spacer(1,7)])
 def node(n):
  if isinstance(n,NavigableString):return []
  cl=n.get('class',[])
  if 'no-print' in cl:return []
  if n.name=='p':return [p(inline(n),'small' if 'small' in cl else 'body')]
  if n.name=='h4':return [p(inline(n),'h4')]
  if 'action-step' in cl:
   num=n.select_one('.step-number').get_text();head=n.select_one('h4').get_text();body=n.select_one('p')
   number=p(num,'title');number.style=ParagraphStyle('number',parent=styles['title'],fontSize=30,textColor=pal['accent'],leading=36)
   table=Table([[number,[p(html.escape(head),'h4'),p(inline(body))]]],colWidths=[42,CW-42],hAlign='LEFT')
   table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
   return [table]
  if 'gentle-note' in cl:
   return [Spacer(1,6),Box([p(inline(n.find('strong',recursive=False)),'noteTitle'),p(inline(n.find('p',recursive=False)),'noteBody')],pal),Spacer(1,17)]
  if 'example' in cl:return [KeepTogether([p(inline(n.select_one('.eyebrow')),'label'),p(inline(n.select_one('p')),'quote'),Rule(pal),Spacer(1,8)])]
  if 'source-item' in cl:
   a=n.find('a');return [p(inline(a),'h4'),p(html.escape(a['href']),'small'),p(inline(n.find('p'))),Spacer(1,8)]
  return [q for ch in n.children for q in node(ch)]
 def page_end():
  while story and isinstance(story[-1],Spacer):story.pop()
  story.append(PageBreak())
 # Cover is drawn by the page callback.
 story.append(Spacer(1,10));page_end()
 heading('EL MAPA','Abre por donde lo necesites.')
 story.append(p('Empieza por la página de esta noche o recorre el libro a tu ritmo. Cada capítulo te deja una práctica pequeña.'))
 for i,s in enumerate(soup.select('section.chapter:not(.cover)'),1):
  title=s.h2.get_text();pg=(starts_hint or {}).get(s['id'],'')
  titlelink=f'<link href="#{s["id"]}">{html.escape(title)}</link>'
  row=Table([[p(f'{i:02}','label'),p(titlelink,'body'),p(str(pg),'body')]],colWidths=[33,CW-66,33])
  row.setStyle(TableStyle([('LEFTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('LINEBELOW',(0,0),(-1,-1),.4,pal['line'])]));story.append(row)
 page_end()
 for i,s in enumerate(soup.select('section.chapter:not(.cover)'),1):
  id=s['id'];body=s.select_one('.chapter-body');papers=body.select('.paper-page')
  if papers:
   for j,pp in enumerate(papers):
    heading(f'{i:02}'+(' / CONTINÚA' if j else ''),pp.select_one('.page-title').get_text(),id=id if j==0 else None)
    for child in pp.children:
     if getattr(child,'get',lambda *_:[])('class',[])==['page-title']:continue
     story.extend(node(child))
    page_end()
  elif id=='audios-guiados':
   heading('07','Escucha y descansa.',id=id)
   story.append(p('Elige una sesión. Puedes descargar los audios desde el libro digital y escucharlos con la pantalla apagada.'))
   for j,(title,duration,desc) in enumerate([('Una pausa de madrugada','3 minutos','Para cuando despiertas con la cabeza llena de pendientes.'),('Un recorrido para descansar','12 minutos','Una guía pausada para soltar tensión, desde la cara hasta los pies.')],1):
    story.extend([Spacer(1,12),p(f'AUDIO {j:02}  /  {duration.upper()}','label'),p(title,'h4'),p(desc),Rule(pal)])
   story.extend([Spacer(1,20),Box([p('Escúchalo a tu manera.','noteTitle'),p('Usa un volumen cómodo. Si contar la respiración te incomoda, respira a tu ritmo. Los audios usan voz sintética en español; no son grabaciones de Vivian Velásquez.','noteBody')],pal)])
   page_end()
   # Verbatim text is included as an appendix, after the practical chapters.
  elif id=='recorrido-7-noches':
   nights=body.select('.night-item')
   for part,items in enumerate([nights[:3],nights[3:]]):
    heading('08'+(' / CONTINÚA' if part else ''),'Siete noches, poco a poco.' if not part else 'Quédate con lo que te sirve.',id=id if not part else None)
    if not part:story.append(p('Una práctica por noche. Marca lo que hagas. Si te saltas un día, retoma donde ibas.'))
    for item in items:
     content=item.find('span',recursive=False);title=content.find('strong').get_text();label=content.select_one('.eyebrow').get_text();detail=content.find_all('span',recursive=False)[-1].get_text();question=content.find('em').get_text()
     nightstyles={k:ParagraphStyle('night-'+k,parent=styles[k],spaceBefore=0,spaceAfter=6) for k in ['label','h4','body','small']}
     story.append(KeepTogether([Paragraph(f'[  ]  {label.upper()}',nightstyles['label']),Paragraph(title,nightstyles['h4']),Paragraph(detail,nightstyles['body']),Paragraph(question,nightstyles['small']),Rule(pal)]))
    page_end()
  elif id=='casos-aplicacion':
   cases=body.select('.case-study-card')
   # One case per page, with a reflection space: meaningful room to write.
   for j,case in enumerate(cases):
    heading(f'09 / EJEMPLO {j+1:02}',case.h3.get_text(),id=id if j==0 else None)
    story.append(p('Caso ficticio. Sirve para explicar la práctica; no es un testimonio.','small'))
    for pp in case.find_all('p',recursive=False):story.append(p(inline(pp)))
    story.extend([Spacer(1,18),p('Llévalo a tu vida.','h4'),p('¿Qué parte de este ejemplo te resulta familiar? ¿Qué paso pequeño podrías probar?','small'),Lines(pal,3)])
    page_end()
  elif id=='diario-privado':
   heading('11','Mi nota de esta noche.',id=id)
   story.append(p('Fecha: ______________________       Hora: ______________','small'))
   story.append(p('Una frase en cada espacio. No hace falta escribir mucho.'))
   for title,desc in [('1. ¿Qué me preocupa?','Nombra un solo asunto.'),('2. ¿Qué puede esperar?','Reconoce qué no puedes resolver ahora.'),('3. ¿Qué haré mañana?','Anota una acción pequeña y una hora posible.')]:
    story.extend([p(title,'h4'),p(desc,'small'),Lines(pal,2),Spacer(1,10)])
   page_end();heading('11 / MI PLAN','Mi acuerdo para esta semana.')
   for title in ['Antes de acostarme, escribiré a las…','Dejaré el teléfono y el reloj…','Si despierto a mitad de la noche, probaré…']:
    story.extend([p(title,'h4'),Lines(pal,3),Spacer(1,12)])
   story.extend([Spacer(1,18),Box([p('Haz un acuerdo posible.','noteTitle'),p('Elige algo sencillo que puedas repetir. Una noche difícil no borra lo que has practicado.','noteBody')],pal)])
   page_end()
 # Full audio transcripts as accessible reference, preserving every spoken word.
 for j,a in enumerate(soup.select('#audios-guiados .audio-suite-card'),1):
  heading(f'ANEXO / AUDIO {j:02}', 'Una pausa de madrugada.' if j==1 else 'Un recorrido para descansar.',sub='Transcripción completa · 3 minutos' if j==1 else 'Transcripción completa · 12 minutos')
  for pp in a.select('details p'):
   story.append(KeepTogether([p(inline(pp),'transcript')]))
  page_end()
 story.pop() # no trailing blank page
 def decorate(c,d):
  c.setFillColor(pal['bg']);c.rect(0,0,W,H,stroke=0,fill=1)
  if d.page==1:
   # A restrained book jacket with bespoke lunar landscape.
   bg=HexColor('#142325');ink=HexColor('#F4EEE2');accent=HexColor('#E3B78E')
   c.setFillColor(bg);c.rect(0,0,W,H,stroke=0,fill=1)
   c.setFillColor(accent);c.setFont('Text',9);c.drawString(M,H-63,'ALMA HOLÍSTICA  /  CUADERNO DE NOCHE')
   c.setFillColor(ink);c.setFont('Book',64);c.drawString(M,H-150,'Esta noche,');c.drawString(M,H-219,'baja el ritmo.')
   c.setFillColor(HexColor('#C0CCC6'));c.setFont('Text',15);c.drawString(M,H-264,'Deja los pendientes en el papel.');c.drawString(M,H-289,'Haz espacio para descansar.')
   c.setFillColor(HexColor('#233A39'));c.roundRect(278,123,268,310,128,stroke=0,fill=1)
   c.setFillColor(HexColor('#E8D1A5'));c.circle(409,323,48,fill=1,stroke=0);c.setFillColor(HexColor('#233A39'));c.circle(430,341,45,fill=1,stroke=0)
   c.setFillColor(HexColor('#42584E'));p=c.beginPath();p.moveTo(279,211);p.curveTo(359,263,429,161,544,213);p.lineTo(544,170);p.curveTo(475,110,352,109,279,170);p.close();c.drawPath(p,fill=1,stroke=0)
   c.setFillColor(HexColor('#BC946E'));p=c.beginPath();p.moveTo(279,171);p.curveTo(362,213,462,129,544,171);p.lineTo(544,155);p.curveTo(464,100,350,100,279,155);p.close();c.drawPath(p,fill=1,stroke=0)
   c.setFillColor(accent);c.circle(330,331,1.6,fill=1,stroke=0);c.circle(477,371,1.6,fill=1,stroke=0)
   c.setFont('Book',21);c.setFillColor(ink);c.drawString(M,220,'Lo de mañana');c.drawString(M,192,'puede esperar');c.drawString(M,164,'un poco.')
   c.setStrokeColor(HexColor('#425652'));c.line(M,86,W-M,86);c.setFillColor(accent);c.setFont('Text',9);c.drawString(M,64,'PROTOCOLO NOCTURNO 3-3-3');c.setFillColor(HexColor('#C0CCC6'));c.drawRightString(W-M,64,'Reconoce · Anota · Afloja')
  else:
   c.setStrokeColor(pal['line']);c.setLineWidth(.5);c.line(M,H-39,W-M,H-39);c.line(M,43,W-M,43)
   c.setFillColor(pal['muted']);c.setFont('Text',8);c.drawString(M,H-29,'ALMA HOLÍSTICA');c.drawRightString(W-M,H-29,'ESTA NOCHE, BAJA EL RITMO')
   c.drawString(M,27,'Protocolo nocturno 3-3-3');c.setFillColor(pal['accent']);c.drawRightString(W-M,27,f'{d.page:02}'+(f'  /  {total:02}' if total else ''))
 doc=SimpleDocTemplate(str(target),pagesize=(W,H),leftMargin=M,rightMargin=M,topMargin=65,bottomMargin=65,title='Esta noche, baja el ritmo · Protocolo nocturno 3-3-3',author='Alma Holística',pageCompression=1)
 doc.build(story,onFirstPage=decorate,onLaterPages=decorate)
 return starts,doc.page
if __name__=='__main__':
 for theme,name in [('night','guia-protocolo-nocturno-3-3-3.pdf'),('paper','guia-protocolo-nocturno-impresion.pdf')]:
  starts,count=make(theme,Path('/tmp')/f'nocturnal-{theme}-draft.pdf')
  starts,count=make(theme,ROOT/'descargas'/name,starts,count)
  print(name,count,'pages',starts)
