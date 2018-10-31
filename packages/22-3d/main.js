window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    fl = 100;

  const rects = new Array(100).fill(0).map(() => ({
    x: _.random(-300, 300),
    y: _.random(-300, 300),
    z: _.random(100, 200),
  }));

  context.translate(width / 2, height / 2);
  context.clearRect(0, 0, width, height);

  function update() {
    context.clearRect(-width / 2, -height / 2, width, height);
    for (const rect of rects) {
      drawRect(rect);
      rect.z += _.random(0, 3);

      if (rect.z > 400) {
        rect.z = 0;
      }
    }
    requestAnimationFrame(update);
  }

  function drawRect(rect) {
    const perspective = fl / (fl + rect.z);
    context.save();
    context.beginPath();
    context.translate(rect.x * perspective, rect.y * perspective);
    context.scale(perspective, perspective);
    context.fillRect(-30, -30, 60, 60);
    context.restore();
  }

  update();
};