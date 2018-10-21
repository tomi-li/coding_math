window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const springPoint = new Vector(width / 2, height / 2);
  const
    p1 = new Partical(Math.random() * width, Math.random() * height, 10, Math.random() * 2 * Math.PI),
    p2 = new Partical(Math.random() * width, Math.random() * height, 10, Math.random() * 2 * Math.PI);

  const k = 0.1;
  const seperation = 60;
  p1.friction = 0.1;
  p2.friction = 0.1;

  function update() {
    context.clearRect(0, 0, width, height);

    spring(p1, p2, seperation);
    spring(p2, p1, seperation);

    p1.update();
    p2.update();

    drawCircle(p1, context, 20);
    drawCircle(p2, context, 20);

    context.beginPath();
    context.moveTo(p1.position.getX(), p1.position.getY());
    context.lineTo(p2.position.getX(), p2.position.getY());
    context.stroke();


    requestAnimationFrame(update);
  }



  function drawCircle(p, context, radius) {
    context.beginPath();
    context.arc(p.position.getX(), p.position.getY(), radius, 0, Math.PI * 2)
    context.fill();
  }

  function spring(springPoint, weight, seperation) {
      const distance = springPoint.position.substract(weight.position.getX(), weight.position.getY());
      distance.setLength(distance.getLength() - seperation);
      const springForce = distance.multiply(k);

      weight.velocity.substractFrom(springForce.getX(), springForce.getY());
  }

  update();
};