window.onload = () => {
  const
    canvas  = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width   = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const springPoint = new Vector(width / 2, height / 2);
  const p = new Partical(Math.random() * width, Math.random() * height, 30, Math.random() * 2 * Math.PI, 0.5);
  const k = 0.1;
  const SpringDistance = 100;

  p.friction = 0.02;

  window.addEventListener('mousemove', e => {
    springPoint.setX(e.clientX);
    springPoint.setY(e.clientY);
  });

  function update() {
    context.clearRect(0, 0, width, height);

    const distance = new Vector(springPoint.getX() - p.position.getX(), springPoint.getY() - p.position.getY());
    distance.setLength(distance.getLength() - SpringDistance);
    const springForce = distance.multiply(k);

    p.velocity.addTo(springForce.getX(), springForce.getY());
    p.update();

    context.beginPath();
    context.arc(p.position.getX(), p.position.getY(), 20, 0, 2 * Math.PI);
    context.fill();


    context.beginPath();
    context.arc(springPoint.getX(), springPoint.getY(), 4, 0, 2 * Math.PI);
    context.fill();

    context.beginPath();
    context.moveTo(p.position.getX(), p.position.getY());
    context.lineTo(springPoint.getX(), springPoint.getY());
    context.stroke();

    requestAnimationFrame(update);
  }

  update();
};
