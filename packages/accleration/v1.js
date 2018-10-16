window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const thrust = new Vector(0, 0);

  window.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 37:
        thrust.setX(-0.1);
        break;
      case 38:
        thrust.setY(-0.1);
        break;
      case 39:
        thrust.setX(0.1);
        break;
      case 40:
        thrust.setY(0.1);
        break;
      default:
        break;
    }
  });

  window.addEventListener('keyup', e => {
    switch (e.keyCode) {
      case 37:
        thrust.setX(0);
        break;
      case 38:
        thrust.setY(0);
        break;
      case 39:
        thrust.setX(0);
        break;
      case 40:
        thrust.setY(0);
        break;
      default:
        break;
    }
  });

  const partial = new Partical(width / 2, height / 2, 0, 0);

  function update() {
    context.clearRect(0, 0, width, height);

    if (partial.position.getX() > width) {
      partial.position.setX(0);
    }

    if (partial.position.getX() < 0) {
      partial.position.setX(width);
    }

    if (partial.position.getY() > height) {
      partial.position.setY(0);
    }

    if (partial.position.getY() < 0) {
      partial.position.setY(height);
    }

    partial.acclerate(thrust);
    partial.update();
    context.beginPath();
    context.arc(partial.position.getX(), partial.position.getY(), 10, 0, 2 * Math.PI);
    context.fill();

    requestAnimationFrame(update);
  }

  update();


};