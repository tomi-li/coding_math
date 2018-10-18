window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const springPoint = new Vector(width / 2, height / 2);
  const p = new Partical(Math.random() * width, Math.random() * height, 30, Math.random() * 2 * Math.PI);
  const k = 0.1;

  p.friction = 0.02;

  function update() {
    context.clearRect(0, 0, width, height);

    const distance = new Vector(springPoint.getX() - p.position.getX(), springPoint.getY() - p.position.getY());
    const springForce = distance.multiply(k);

    p.velocity.addTo(distance.getX(), distance.getY());
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
