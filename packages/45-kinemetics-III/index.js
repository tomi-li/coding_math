const IKSystem = require('./IKSystem');

window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = drawingCanvas.width = window.innerWidth,
    height = canvas.height = drawingCanvas.height = window.innerHeight;

  const ik = new IKSystem(width / 2, height / 2);

  for (let i = 0; i < 30; i++) {
    ik.addArm(10);
  }

  window.addEventListener('mousemove', e => {
    ik.dragTo(e.clientX, e.clientY);
  });

  function update() {
    context.clearRect(0, 0, width, height);
    ik.render(context);
    requestAnimationFrame(update);
  }

  update();
};