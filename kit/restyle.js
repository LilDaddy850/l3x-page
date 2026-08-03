/* L3X page glow-up for theblockorlando.com/l3x
 * Paste into: Wix Settings → Custom Code → Add Custom Code → Body (end),
 * set "Load on: Choose specific pages" → the L3X page only.
 * Safe by design: only runs on /l3x, wrapped in try/catch, and deleting
 * this one snippet instantly returns the page to stock.
 */
(function () {
  try {
    if (!/\/l3x/i.test(location.pathname)) return;
    if (document.getElementById('l3x-restyle')) return;

    // fonts
    var f = document.createElement('link');
    f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Mr+Dafoe&family=Anton&family=Oswald:wght@300;400;500;600&family=Share+Tech+Mono&display=swap';
    document.head.appendChild(f);

    // styles
    var css = [
      'body, #SITE_CONTAINER { background: #0A0118 !important; }',
      'main h1 span, main h2 span { font-family: Anton, sans-serif !important; letter-spacing: .02em !important; text-shadow: 0 0 26px rgba(255,45,149,.35); }',
      'main h3 span, main h4 span, main p span { font-family: Oswald, sans-serif !important; }',
      '.l3x-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; }',
      '.l3x-scan { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .045; background: repeating-linear-gradient(0deg, #000 0 1px, transparent 1px 3px); }',
      '#SITE_CONTAINER { position: relative; z-index: 2; }'
    ].join('\n');
    var s = document.createElement('style');
    s.id = 'l3x-restyle';
    s.textContent = css;
    document.head.appendChild(s);

    // animated laser-grid backdrop (shows in the gutters + any transparent areas)
    var cv = document.createElement('canvas');
    cv.className = 'l3x-grid';
    document.body.appendChild(cv);
    var sc = document.createElement('div');
    sc.className = 'l3x-scan';
    document.body.appendChild(sc);

    var ctx = cv.getContext('2d');
    var P = 4000, w, h, raf;
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function size() {
      var d = Math.min(devicePixelRatio || 1, 3);
      w = innerWidth; h = innerHeight;
      cv.width = w * d; cv.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    }
    function draw(now) {
      var ph = (now % P) / P, hy = h * 0.44, i, ff, y, g, xb;
      ctx.clearRect(0, 0, w, h);
      var sky = ctx.createLinearGradient(0, 0, 0, hy);
      sky.addColorStop(0, '#05000F'); sky.addColorStop(0.72, '#1B0640'); sky.addColorStop(1, '#3D0B55');
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, hy);
      ctx.fillStyle = '#0A0118'; ctx.fillRect(0, hy, w, h - hy);
      ctx.fillStyle = '#05000F'; ctx.fillRect(0, hy - 5, w, 5);
      var hg = ctx.createLinearGradient(0, hy - 2, 0, hy + 6);
      hg.addColorStop(0, 'rgba(255,158,31,0.9)'); hg.addColorStop(1, 'rgba(255,45,149,0)');
      ctx.fillStyle = hg; ctx.fillRect(0, hy - 2, w, 8);
      for (i = 0; i < 22; i++) {
        ff = ((i + ph) % 22) / 22; y = hy + (h - hy) * Math.pow(ff, 2.6);
        ctx.strokeStyle = 'rgba(255,45,149,' + (0.06 + 0.5 * ff) + ')';
        ctx.lineWidth = 1 + ff * 1.4;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      for (i = -15; i <= 15; i++) {
        xb = w / 2 + i * (w / 13);
        g = ctx.createLinearGradient(w / 2, hy, xb, h);
        g.addColorStop(0, 'rgba(255,45,149,0)'); g.addColorStop(1, 'rgba(255,45,149,0.38)');
        ctx.strokeStyle = g; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(w / 2, hy); ctx.lineTo(xb, h); ctx.stroke();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    }
    size();
    addEventListener('resize', function () { size(); if (reduced) draw(0); });
    if (reduced) draw(0); else raf = requestAnimationFrame(draw);
  } catch (e) { /* degrade silently to the stock page */ }
})();
