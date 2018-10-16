window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  let
    turningLeft = false,
    turningRight = false,
    boosting = false,
    angle = 0,
    accl = new Vector(0, 0);


  window.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 37:
        turningLeft = true;
        break;
      case 38:
        boosting = true;
        break;
      case 39:
        turningRight = true;
        break;
      case 40:
        break;
      default:
        break;
    }
  });

  window.addEventListener('keyup', e => {
    switch (e.keyCode) {
      case 37:
        turningLeft = false;
        break;
      case 38:
        boosting = false;
        break;
      case 39:
        turningRight = false;
        break;
      case 40:
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


    if (turningLeft) {
      angle -= 0.05;
    }
    if (turningRight) {
      angle += 0.05;
    }


    if (boosting) {
      accl.setLength(0.1);
      accl.setAngle(angle);
    } else {
      accl.setLength(0);
    }

    partial.acclerate(accl);
    partial.update();
    context.save();
    context.beginPath();
    context.translate(partial.position.getX(), partial.position.getY());
    context.rotate(angle);
    context.lineTo(0, 0);
    context.lineTo(0, 10);
    context.lineTo(10, 0);
    context.lineTo(0, -10);
    context.lineTo(0, 0);
    context.stroke();
    context.restore();

    requestAnimationFrame(update);
  }

  update();


};