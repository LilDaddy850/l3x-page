// L3X fx — laser grid, reveals, marquee. Loop period P is capture-locked: render.html
// records exactly one P for the seamless hero-loop.mp4 export. Don't change P casually.
export const P = 4000;

export function initGrid(canvas, fixed) {
  const ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, raf = 0, running = false;

  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    w = fixed ? fixed.w : canvas.clientWidth;
    h = fixed ? fixed.h : canvas.clientHeight;
    canvas.width = w * d;
    canvas.height = h * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  }

  function draw(now) {
    const ph = (now % P) / P;
    const hy = h * 0.44;
    ctx.clearRect(0, 0, w, h);

    // night sky
    const sky = ctx.createLinearGradient(0, 0, 0, hy);
    sky.addColorStop(0, '#05000F');
    sky.addColorStop(0.72, '#1B0640');
    sky.addColorStop(1, '#3D0B55');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, hy);

    // stars (deterministic, twinkle on loop phase)
    for (let i = 0; i < 70; i++) {
      const sx = ((i * 137.5) % 360) / 360 * w;
      const sy = ((i * 73.1) % 100) / 100 * hy * 0.85;
      const tw = 0.25 + 0.75 * Math.abs(Math.sin(Math.PI * ((ph + i / 70) % 1)));
      ctx.fillStyle = `rgba(244,239,255,${0.12 + 0.3 * tw})`;
      ctx.fillRect(sx, sy, i % 7 === 0 ? 1.6 : 1, i % 7 === 0 ? 1.6 : 1);
    }

    // sun with blinds
    const sr = Math.min(w, h) * 0.21;
    const sg = ctx.createLinearGradient(0, hy - sr, 0, hy);
    sg.addColorStop(0, '#FF9E1F');
    sg.addColorStop(1, '#FF2D95');
    ctx.save();
    ctx.beginPath();
    ctx.arc(w / 2, hy, sr, Math.PI, 0);
    ctx.closePath();
    ctx.fillStyle = sg;
    ctx.shadowColor = 'rgba(255,45,149,0.75)';
    ctx.shadowBlur = 70;
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#0A0118';
    for (let i = 1; i < 7; i++) {
      const y = hy - sr + (sr / 7) * i + sr / 14;
      ctx.fillRect(w / 2 - sr - 4, y, sr * 2 + 8, 1.5 + i * 0.85);
    }

    // floor
    ctx.fillStyle = '#0A0118';
    ctx.fillRect(0, hy, w, h - hy);

    // horizon glow line
    const hg = ctx.createLinearGradient(0, hy - 2, 0, hy + 6);
    hg.addColorStop(0, 'rgba(255,158,31,0.9)');
    hg.addColorStop(1, 'rgba(255,45,149,0)');
    ctx.fillStyle = hg;
    ctx.fillRect(0, hy - 2, w, 8);

    // horizontals marching toward viewer
    for (let i = 0; i < 22; i++) {
      const f = ((i + ph) % 22) / 22;
      const y = hy + (h - hy) * Math.pow(f, 2.6);
      ctx.strokeStyle = `rgba(255,45,149,${0.06 + 0.5 * f})`;
      ctx.lineWidth = 1 + f * 1.4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // verticals converging on the vanishing point
    for (let i = -15; i <= 15; i++) {
      const xb = w / 2 + i * (w / 13);
      const g = ctx.createLinearGradient(w / 2, hy, xb, h);
      g.addColorStop(0, 'rgba(255,45,149,0)');
      g.addColorStop(1, 'rgba(255,45,149,0.38)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w / 2, hy);
      ctx.lineTo(xb, h);
      ctx.stroke();
    }

    if (running) raf = requestAnimationFrame(draw);
  }

  function start() {
    if (running || reduced) return;
    running = true;
    raf = requestAnimationFrame(draw);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  size();
  addEventListener('resize', () => {
    if (fixed) return;
    size();
    if (!running) draw(0);
  });

  if (reduced) {
    draw(0);
  } else {
    start();
    new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()))
      .observe(canvas);
  }
  return { P, draw, stop, start };
}

export function initReveals() {
  const obs = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
}

export function initMarquee(track) {
  // triple the content so translateX(-33.333%) loops seamlessly
  const original = [...track.children];
  for (let i = 0; i < 2; i++) original.forEach((n) => track.append(n.cloneNode(true)));
}
