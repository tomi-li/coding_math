window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const p = new Partical(width / 2, height / 2, 5, Math.random() * 2 * Math.PI);
  const friction = new Vector(0, 0);
  friction.setLength(0.1);

  function update() {
    context.clearRect(0, 0, width, height);

    friction.setAngle(p.velocity.getAngle());
    p.velocity.substractFrom(friction.getX(), friction.getY());
    p.update();

    context.beginPath();
    context.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2);
    context.fill();

    p.update();
    requestAnimationFrame(update);
  }

  update();
};
