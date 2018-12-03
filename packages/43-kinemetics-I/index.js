const Arm = require('./Arm');

window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    drawingCanvas = document.getElementById('drawingCanvas'),
    drawingContext = drawingCanvas.getContext('2d'),
    width = canvas.width = drawingCanvas.width = window.innerWidth,
    height = canvas.height = drawingCanvas.height = window.innerHeight;

  let angle = 0;
  let drawing = true;
  const
    arm = new Arm(width / 2, height / 2, 100),
    arm2 = new Arm(arm.getEndX(), arm.getEndY(), 100);

  arm.chain(arm2);

  let drawStarPoint = { x: arm2.getEndX(), y: arm2.getEndY() };


  function update() {
    context.clearRect(0, 0, width, height);

    arm.setAngle(Math.sin(angle));
    arm2.setAngle(Math.cos(angle));

    arm.update();
    arm2.update();
    arm.render(context);
    arm2.render(context);

    angle += 0.05;

    if (drawing) {
      drawingContext.beginPath();
      drawingContext.moveTo(drawStarPoint.x, drawStarPoint.y);
      drawingContext.lineTo(arm2.getEndX(), arm2.getEndY());
      drawStarPoint.x = arm2.getEndX();
      drawStarPoint.y = arm2.getEndY();
      drawingContext.stroke();
    }

    requestAnimationFrame(update);
  }

  update();
};