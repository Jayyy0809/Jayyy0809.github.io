// Decorative canvas: no click handling, no animation loop while idle or disabled.
(() => {
  const canvas = document.querySelector('#grid-bg');
  const context = canvas?.getContext('2d');
  if (!context) return;
  const pointer = {x: -1000, y: -1000};
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let points = [], width = 0, height = 0, frame = 0;
  const active = () => document.documentElement.dataset.motion === 'true' && fine.matches && !document.hidden;
  function draw() {
    context.clearRect(0, 0, width, height);
    let moving = false;
    for (const p of points) {
      let tx = p.ox, ty = p.oy;
      const dx = p.ox - pointer.x, dy = p.oy - pointer.y;
      const distance = Math.hypot(dx, dy);
      const influence = active() ? Math.max(0, 1 - distance / 150) : 0;
      if (influence) { tx += dx / (distance || 1) * influence * 28; ty += dy / (distance || 1) * influence * 28; }
      p.x += (tx - p.x) * .13; p.y += (ty - p.y) * .13;
      if (Math.abs(tx - p.x) + Math.abs(ty - p.y) > .1) moving = true;
      context.fillStyle = `rgba(169,190,178,${.17 + influence * .4})`;
      context.beginPath(); context.arc(p.x, p.y, 1 + influence * .7, 0, Math.PI * 2); context.fill();
    }
    frame = moving && active() ? requestAnimationFrame(draw) : 0;
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
  function reset() {
    cancelAnimationFrame(frame); frame = 0;
    pointer.x = pointer.y = -1000;
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
  addEventListener('pointermove', event => { if (!active()) return; pointer.x = event.clientX; pointer.y = event.clientY; schedule(); }, {passive:true});
  document.addEventListener('pointerleave', () => { pointer.x = pointer.y = -1000; schedule(); });
  document.addEventListener('motionchange', reset);
  document.addEventListener('visibilitychange', reset);
  fine.addEventListener('change', reset);
  addEventListener('resize', resize);
  resize();
})();
