// Decorative canvas: pointer events are observed passively; links and scrolling stay native.
(() => {
  const canvas = document.querySelector('#grid-bg');
  const context = canvas?.getContext('2d');
  if (!context) return;
  const pointer = {x: -1000, y: -1000};
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let points = [], waves = [], width = 0, height = 0, frame = 0;
  const active = () => document.documentElement.dataset.motion === 'true' && !document.hidden;
  function draw() {
    const now = performance.now();
    waves = waves.filter(wave => now - wave.start < 1200);
    context.clearRect(0, 0, width, height);
    let moving = false;
    for (const p of points) {
      let tx = p.ox, ty = p.oy;
      const dx = p.ox - pointer.x, dy = p.oy - pointer.y;
      const distance = Math.hypot(dx, dy);
      const influence = active() && fine.matches ? Math.max(0, 1 - distance / 150) : 0;
      if (influence) { tx += dx / (distance || 1) * influence * 28; ty += dy / (distance || 1) * influence * 28; }
      let glow = 0;
      for (const wave of waves) {
        const age = (now - wave.start) / 1200;
        const wx = p.ox - wave.x, wy = p.oy - wave.y;
        const radius = Math.hypot(wx, wy);
        const strength = Math.exp(-(((radius - age * 650) / 42) ** 2)) * (1 - age);
        tx += wx / (radius || 1) * strength * 32;
        ty += wy / (radius || 1) * strength * 32;
        glow = Math.max(glow, strength);
      }
      p.x += (tx - p.x) * .13; p.y += (ty - p.y) * .13;
      if (Math.abs(tx - p.x) + Math.abs(ty - p.y) > .1) moving = true;
      context.fillStyle = `rgba(${dotColor},${.17 + Math.max(influence, glow) * .55})`;
      context.beginPath(); context.arc(p.x, p.y, 1 + Math.max(influence, glow) * .9, 0, Math.PI * 2); context.fill();
    }
    frame = (moving || waves.length) && active() ? requestAnimationFrame(draw) : 0;
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
  function reset() {
    cancelAnimationFrame(frame); frame = 0;
    pointer.x = pointer.y = -1000;
    waves = [];
    points.forEach(p => { p.x = p.ox; p.y = p.oy; });
    draw();
  }
  function resize() {
    width = innerWidth; height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * ratio; canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    points = [];
    for (let y = 14; y < height; y += 30) for (let x = 14; x < width; x += 30) points.push({ox:x, oy:y, x, y});
    reset();
  }
  const dotColor = getComputedStyle(document.documentElement).getPropertyValue('--dot-rgb').trim() || '169,190,178';
  addEventListener('pointermove', event => { if (!active() || !fine.matches || event.pointerType === 'touch') return; pointer.x = event.clientX; pointer.y = event.clientY; schedule(); }, {passive:true});
  addEventListener('pointerdown', event => {
    if (!active() || (event.pointerType === 'mouse' && event.button !== 0)) return;
    waves.push({x:event.clientX, y:event.clientY, start:performance.now()});
    if (waves.length > 6) waves.shift();
    schedule();
  }, {passive:true});
  document.addEventListener('pointerleave', () => { pointer.x = pointer.y = -1000; schedule(); });
  document.addEventListener('motionchange', reset);
  document.addEventListener('visibilitychange', reset);
  fine.addEventListener('change', reset);
  addEventListener('resize', resize);
  resize();
})();
