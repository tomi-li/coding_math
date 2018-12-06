window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const
    p0 = { x: 300, y: 200, r: 20 },
    p1 = { x: 100, y: 100, r: 20 },
    p2 = { x: 500, y: 300, r: 20 };

  let activePoint = null;

  window.addEventListener('mousedown', onMouseDown);

  function vector(p0, p1) {
    return { x: p1.x - p0.x, y: p1.y - p0.y };
  }

  function magnitude(v) {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
  }

  function normalize(v) {
    const mag = magnitude(v);
    return { x: v.x / mag, y: v.y / mag };
  }

  function dotProduct(v0, v1) {
    return v0.x * v1.x + v0.y * v1.y;
  }

  function angle(v0, v1) {
    const
      dp = dotProduct(v0, v1),
      ma = magnitude(v0),
      mb = magnitude(v1);
    return Math.acos(dp / (ma * mb));
  }

  (function render() {
    context.clearRect(0, 0, width, height);
    drawCiecle(p0);
    drawCiecle(p1);
    drawCiecle(p2);
    lineUp(p0, p1);
    lineUp(p0, p2);

    const v0 = vector(p1, p0);
    const v1 = vector(p2, p0);
    const text = dotProduct(normalize(v0), normalize(v1));
    const aText = angle(v0, v1);
    context.font = '48px serif';
    context.strokeText(Math.round(aText * 180 / Math.PI), 50, 50);

    requestAnimationFrame(render);
  })();


  function findP(eventX, eventY) {
    if (inRange(p0, eventX, eventY)) return p0;
    if (inRange(p1, eventX, eventY)) return p1;
    if (inRange(p2, eventX, eventY)) return p2;
    return null;
  }

  function inRange(p, x, y) {
    const
      minx = p.x - p.r,
      maxx = p.x + p.r,
      miny = p.y - p.r,
      maxy = p.y + p.r;
    return x > minx && x < maxx && y > miny && y < maxy;
  }

  function lineUp(p0, p1) {
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.stroke();
  }

  function drawCiecle(p) {
    context.beginPath();
    context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    context.stroke();
  }

  function onMouseDown(e) {
    activePoint = findP(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    if (activePoint) {
      activePoint.x = e.clientX;
      activePoint.y = e.clientY;
    }
  }

  function onMouseUp() {
    window.removeEventListener('mousemove', onMouseMove);
  }

};