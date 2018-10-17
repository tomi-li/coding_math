window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const p = new Partical(width / 2, height / 2, 5, Math.random() * 2 * Math.PI, 0, 30);

  function update() {
    context.clearRect(0, 0, width, height);

    p.update();

    context.beginPath();
    context.arc(p.position.getX(), p.position.getY(), p.size, 0, Math.PI * 2,);
    context.fill();


    if ((p.position.getX() - p.size) < 0) {
      p.velocity.setLength(p.velocity.getLength() * -1);
      p.velocity.setY(-p.velocity.getY());
    } else if ((p.position.getX() + p.size) > width) {
      p.velocity.setLength(p.velocity.getLength() * -1);
      p.velocity.setY(-p.velocity.getY());
    } else if ((p.position.getY() - p.size) < 0) {
      p.velocity.setLength(p.velocity.getLength() * -1);
      p.velocity.setX(-p.velocity.getX());
    } else if ((p.position.getY() + p.size) > height) {
      p.velocity.setLength(p.velocity.getLength() * -1);
      p.velocity.setX(-p.velocity.getX());
    }

    requestAnimationFrame(update);
  }

  update();
};
