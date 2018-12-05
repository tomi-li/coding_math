const IKSystem = require('./IKSystem');

window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const ik1 = new IKSystem(100, height / 2);
  const ik2 = new IKSystem(width - 100, height / 2);

  for (let i = 0; i < 30; i++) {
    ik1.addArm(10);
    ik2.addArm(10);
  }

  window.addEventListener('mousemove', e => {
    ik1.reachTo(e.clientX, e.clientY);
    ik2.reachTo(e.clientX, e.clientY);
  });

  function update() {
    context.clearRect(0, 0, width, height);
    ik1.render(context);
    ik2.render(context);
    requestAnimationFrame(update);
  }

  update();
};