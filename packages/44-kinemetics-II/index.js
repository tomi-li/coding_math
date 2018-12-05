const FKSystem = require('./FKSystem');

window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = drawingCanvas.width = window.innerWidth,
    height = canvas.height = drawingCanvas.height = window.innerHeight;

  const leg1 = new FKSystem(width / 2, height / 2);
  const leg2 = new FKSystem(width / 2, height / 2);
  leg2.phase = Math.PI;

  leg1.addArm(200, Math.PI / 4, Math.PI / 6);
  leg1.addArm(200, Math.PI / 4, Math.PI / 4);
  leg2.addArm(200, Math.PI / 4, Math.PI / 6);
  leg2.addArm(200, Math.PI / 4, Math.PI / 4);

  function update() {
    context.clearRect(0, 0, width, height);
    leg1.update();
    leg2.update();
    leg1.render(context);
    leg2.render(context);
    requestAnimationFrame(update);
  }

  update();
};