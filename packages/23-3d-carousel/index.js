const _ = require('lodash');

window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    fl = 1000,
    numberOfCards = 7,
    dx = 300;
  let angle = 0;

  const rects = new Array(numberOfCards).fill(0).map((val, index) => ({
    x: Math.sin(2 * Math.PI / numberOfCards * index) * dx,
    y: 0,
    z: Math.cos(2 * Math.PI / numberOfCards * index) * dx,
  }));

  context.translate(width / 2, height / 2);
  context.clearRect(0, 0, width, height);

  function update() {
    context.clearRect(-width / 2, -height / 2, width, height);
    angle += 0.01;
    rects.forEach((rect, index) => {
      rect.x = Math.sin(2 * Math.PI / numberOfCards * index + angle) * dx;
      rect.z = Math.cos(2 * Math.PI / numberOfCards * index + angle) * dx;
      drawRect(rect);
    });

    requestAnimationFrame(update);
  }

  function drawRect(rect) {
    const perspective = fl / (fl + rect.z);
    context.save();
    context.beginPath();
    context.translate(rect.x * perspective, rect.y * perspective);
    context.scale(perspective, perspective);
    context.fillRect(-10, -10, 20, 20);
    context.restore();
  }

  let lastScrollTop = 0;
  window.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 38:
        rects.forEach((rect, index) => {
          rect.y -= 1
        });
        break;
      case 40:
        rects.forEach((rect, index) => {
          rect.y += 1
        });
        break;
    }
  });
  update();
};
