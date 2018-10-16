window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const
    sun = new Planet(width / 2, height / 2, 0, 0, 20000),
    earth = new Planet(width / 2 + 200, height / 2, 10, -Math.PI / 2);

  function update() {
    context.clearRect(0, 0, width, height);

    earth.gravitateTo(sun);
    earth.update();

    context.beginPath();
    context.arc(sun.position.getX(), sun.position.getY(), 20, 0, Math.PI * 2);
    context.fillStyle = 'yellow';
    context.fill();

    context.beginPath();
    context.arc(earth.position.getX(), earth.position.getY(), 10, 0, Math.PI * 2);
    context.fillStyle = 'green';
    context.fill();

    requestAnimationFrame(update);
  }

  update();


};