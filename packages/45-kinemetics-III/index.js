const Arm = require('./Arm');

window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = drawingCanvas.width = window.innerWidth,
    height = canvas.height = drawingCanvas.height = window.innerHeight;

  const arm = new Arm(width / 2, height / 2, 100);

  window.addEventListener('mousemove', e => {
    arm.dragTo(e.clientX, e.clientY);
  });

  function update() {
    context.clearRect(0, 0, width, height);
    arm.render(context);
    requestAnimationFrame(update);
  }

  update();
};