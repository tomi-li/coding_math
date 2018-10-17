window.onload = () => {
  const
    canvas  = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width   = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const p = new Partical(width / 2, height / 2, 5, Math.random() * 2 * Math.PI, 0.5, 30);
  const ratio = 0.9;

  function update() {
    context.clearRect(0, 0, width, height);

    p.update();

    context.beginPath();
    context.arc(p.position.getX(), p.position.getY(), p.size, 0, Math.PI * 2);
    context.fill();

    if ((p.position.getX() - p.size) < 0) {
      p.position.setX(p.size);
      p.velocity.setX(p.velocity.getX() * -ratio);
    }
    if ((p.position.getX() + p.size) > width) {
      p.position.setX(width - p.size);
      p.velocity.setX(p.velocity.getX() * -ratio);
    }
    if ((p.position.getY() - p.size) < 0) {
      p.position.setY(p.size);
      p.velocity.setY(p.velocity.getY() * -ratio);
    }
    if ((p.position.getY() + p.size) > height) {
      p.position.setY(height - p.size);
      p.velocity.setY(p.velocity.getY() * -ratio);
    }

    requestAnimationFrame(update);
  }

  update();
};
