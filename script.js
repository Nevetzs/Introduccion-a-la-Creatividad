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
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
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
