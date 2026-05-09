const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
function resize() {
  canvas.width  = innerWidth;   
  canvas.height = innerHeight;  
}
function initStars() {
  stars = []; 
  for (let i = 0; i < 120; i++) {
    stars.push({
      x:  Math.random() * canvas.width,   
      y:  Math.random() * canvas.height,  
      r:  Math.random() * 1.5 + 0.3,     
      o:  Math.random(),                  
      do: (.002 + Math.random() * .005) * (Math.random() < .5 ? 1 : -1)
    });
  }
}
function animStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  stars.forEach(s => {
    s.o += s.do; 
    if (s.o > 1 || s.o < 0) s.do *= -1;
    ctx.beginPath();
    ctx.arc(
      s.x, s.y,        
      s.r,             
      0, Math.PI * 2   
    );
    ctx.fillStyle = `rgba(255,255,255,${s.o})`; 
    ctx.fill(); 
  });
  requestAnimationFrame(animStars);
}
resize();
initStars();
animStars();
window.addEventListener('resize', () => {
  resize();
  initStars();
});
const sections = ['s0','s1','s2','s3','s4','s5','s6','s7','s8'];
const navDots = document.getElementById('navDots');
sections.forEach((id, i) => {
  const b = document.createElement('button'); 
  b.className = 'nav-dot';
  b.title = 'Sección ' + (i + 1);   
  b.onclick = () => document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  navDots.appendChild(b); 
});
const dots = navDots.querySelectorAll('.nav-dot');
function updateDots() {
  const mid = innerHeight / 2; 
  let best = 0;                
  let bestD = Infinity;        
  sections.forEach((id, i) => {
    const rect = document.getElementById(id).getBoundingClientRect();
    
    const d = Math.abs(rect.top + rect.height / 2 - mid);
    
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });

  dots.forEach((d, i) => d.classList.toggle('active', i === best));
}
window.addEventListener('scroll', updateDots, { passive: true });
updateDots();
const ro = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      
      if (e.isIntersecting) {
        e.target.classList.add('visible'); 
      }
    });
  },
  { threshold: .15 }
);
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
const obs = [
  { t: 'Esta es la respuesta correcta',
    b: 'La vida ofrece muchas respuestas correctas. Tener una sola idea nos hace vulnerables. Hay que buscar múltiples soluciones y reestructurar los modelos existentes.' },

  { t: 'Eso es ilógico',
    b: 'Las decisiones humanas se basan en lo percibido, no solo en la lógica. A veces actuar "ilógicamente" abre puertas inesperadas. Usa metáforas para ver el problema desde otra perspectiva.' },

  { t: 'Siga las instrucciones al pie de la letra',
    b: 'Casi todos los avances en arte, ciencia y negocios ocurrieron porque alguien desafió las reglas. Einstein, Picasso, Gandhi rompieron convencionalismos en sus campos.' },

  { t: 'Sea práctico',
    b: 'La actitud práctica es buena para evaluar ideas, pero pésima para generarlas. Pregúntate ¿qué pasaría si...? y usa las respuestas como trampolín para nuevas ideas.' },

  { t: 'Evite la ambigüedad',
    b: 'En la generación de ideas, un exceso en lo específico ahoga la imaginación. La ambigüedad permite ver algo e imaginar algo diferente.' },

  { t: 'Equivocarse es vergonzoso',
    b: 'Es mejor tener ideas equivocadas que no tener ninguna. Los errores nos muestran lo que no funciona. Edison falló cientos de veces antes de inventar el foco.' },

  { t: 'Juguetear es mera frivolidad',
    b: 'El juego es el laboratorio de las ideas. Muchas ideas "ridículas" sirven de trampolín para llegar a ideas valiosas que no habrían surgido de otra manera.' },

  { t: 'Esa no es mi especialidad',
    b: 'La creatividad cruza fronteras. Mirar un problema desde una disciplina distinta a la propia puede generar soluciones que los especialistas no ven.' },

  { t: 'No quiero hacer el ridículo',
    b: 'La complacencia frena el progreso. La cultura japonesa lo dice claro: "Esto es perfecto, por tanto, ahora mejorémoslo." Lo que va bien puede ir aún mejor.' },

  { t: 'No tengo creatividad',
    b: 'Todos somos creativos. Probablemente somos diez veces más creativos de lo que pensamos. La creatividad se practica y se mejora con técnicas concretas.' }
];

const obsList = document.getElementById('obsList');

obs.forEach((o, i) => {
  const d = document.createElement('div');
  d.className = 'obs-item';
  d.innerHTML = `
    <span class="obs-num">0${i + 1}</span>
    <div style="flex:1">
      <div class="obs-title">${o.t}</div>
      <div class="obs-body">${o.b}</div>
    </div>
    <span class="obs-arrow">›</span>
  `;
  d.onclick = () => { d.classList.toggle('open'); };

  obsList.appendChild(d);
});

const petals = [
  { label: 'Curiosidad',       color: '#e0b85a', angle: -90,
    tip: 'Hazte preguntas que inicien con qué, quién, cómo, cuándo, dónde, por qué. Escríbelas sin preocuparte si conoces la respuesta.' },

  { label: 'Experimentación',  color: '#9b6dff', angle: -37,
    tip: 'No aceptes ideas ajenas por fe. Piensa por ti mismo, aprende de los errores y persevera. La experimentación es la verdadera maestra.' },

  { label: 'Sentidos',         color: '#3bbfae', angle: 14,
    tip: 'Agudiza el oído, vista, tacto, olfato y gusto. Como un atleta entrena músculos, Leonardo entrenó sus sentidos y facultades de observación.' },

  { label: 'Ambigüedad',       color: '#e0506e', angle: 66,
    tip: 'Tolera la incertidumbre. El subconsciente funciona mejor si tras un trabajo intenso tomamos un descanso. La serenidad ante la paradoja es clave.' },

  { label: 'Arte / Ciencia',   color: '#4dd4c8', angle: 118,
    tip: '"Estudiemos la ciencia del arte y el arte de la ciencia." El cerebro creativo usa los dos hemisferios: lógica e imaginación juntos.' },

  { label: 'Ejercitar cuerpo', color: '#ff9a7a', angle: 170,
    tip: 'Leonardo practicaba equitación, natación y esgrima. La mente creativa vive en un cuerpo activo. Mueve el cuerpo para mover las ideas.' },

  { label: 'Conectar dispares', color: '#b89af0', angle: 222,
    tip: 'La habilidad de ver relaciones y patrones entre elementos dispares es la esencia de la creatividad. Este principio contempla el enfoque sistémico.' },
];

const wheel = document.getElementById('davinciWheel');
const cx = 190, cy = 190, r = 145;
petals.forEach(p => {
  const rad = (p.angle - 90) * Math.PI / 180;
  const x = cx + r * Math.cos(rad) - 50;
  const y = cy + r * Math.sin(rad) - 20;

  const el = document.createElement('div');
  el.className = 'petal'; 
  el.style.cssText = `
    left: ${x}px;
    top: ${y}px;
    background: ${p.color}28;       
    border: 1px solid ${p.color}77; 
    color: ${p.color};
    transform: rotate(${p.angle}deg); 
  `;
  el.innerHTML = `
    <span class="petal-label" style="transform:rotate(${-p.angle}deg); font-size:9.5px; font-weight:700;">
      ${p.label}
    </span>
    <div class="petal-tip" style="transform:translateX(-50%) rotate(${-p.angle}deg);">
      ${p.tip}
    </div>
  `;
  wheel.appendChild(el);
});

const hats = [
  { icon: '⚪', name: 'Blanco',   role: 'Hechos e Información' },
  { icon: '🔴', name: 'Rojo',     role: 'Emociones y Sentimientos' },
  { icon: '⚫', name: 'Negro',    role: 'Juicio Negativo' },
  { icon: '🟡', name: 'Amarillo', role: 'Juicio Positivo' },
  { icon: '🟢', name: 'Verde',    role: 'Creatividad y Nuevas Ideas' },
  { icon: '🔵', name: 'Azul',     role: 'Control y Organizacion' },
];

const hatsRow = document.getElementById('hatsRow');
hats.forEach(h => {
  const d = document.createElement('div');
  d.className = 'hat-card';
  d.innerHTML = `
    <span class="hat-icon">${h.icon}</span>
    <div class="hat-name">${h.name}</div>
    <div class="hat-role">${h.role}</div>
  `;
  hatsRow.appendChild(d);
});
const mm = document.getElementById('mindmap');
const mmData = [
  { label: 'Creatividad',        x: 360, y: 215, r: 50, fill: 'rgba(155,109,255,.28)', stroke: '#9b6dff', fs: 15 },
  { label: 'Persona',            x: 160, y:  80, r: 36, fill: 'rgba(224,184,90,.18)',  stroke: '#e0b85a', fs: 12 },
  { label: 'Campo',              x: 580, y:  80, r: 36, fill: 'rgba(59,191,174,.18)',  stroke: '#3bbfae', fs: 12 },
  { label: 'Obstáculos',         x:  80, y: 230, r: 38, fill: 'rgba(224,80,110,.18)',  stroke: '#e0506e', fs: 11 },
  { label: 'Principios\nDa Vinci', x: 160, y: 365, r: 38, fill: 'rgba(224,184,90,.18)', stroke: '#e0b85a', fs: 11 },
  { label: 'Técnicas\nDe Bono',  x: 560, y: 365, r: 38, fill: 'rgba(155,109,255,.18)', stroke: '#9b6dff', fs: 11 },
  { label: 'Ámbito',             x: 645, y: 230, r: 36, fill: 'rgba(255,154,122,.18)', stroke: '#ff9a7a', fs: 12 },
  { label: 'Mapas\nMentales',    x: 360, y: 375, r: 38, fill: 'rgba(59,191,174,.18)',  stroke: '#3bbfae', fs: 11 },
];

const connections2 = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]];
let svgStr = `
  <defs>
    <marker id="ma" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="#9b6dff"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
`;

connections2.forEach(([a, b]) => {
  const na = mmData[a]; 
  const nb = mmData[b]; 
  svgStr += `
    <line
      x1="${na.x}" y1="${na.y}"
      x2="${nb.x}" y2="${nb.y}"
      stroke="rgba(155,109,255,.35)"
      stroke-width="1.2"
      stroke-dasharray="5 4"
      marker-end="url(#ma)"
    />
  `;
});

mmData.forEach(n => {
  
  const lines = n.label.split('\n');
  const ly = lines.length > 1 ? n.y - 8 : n.y;  
  svgStr += `
    <circle
      cx="${n.x}" cy="${n.y}" r="${n.r}"
      fill="${n.fill}"
      stroke="${n.stroke}"
      stroke-width="1.5"
    />
  `;  
  lines.forEach((l, i) => {
    svgStr += `
      <text
        x="${n.x}"
        y="${ly + i * 15 + 5}"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="Space Mono,monospace"
        font-size="${n.fs}"
        fill="${n.stroke}"
        font-weight="700"
      >${l}</text>
    `;
  });
});

mm.innerHTML = svgStr;