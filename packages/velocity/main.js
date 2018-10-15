window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;


  const ps = new Array(100).fill('').map(() =>
    new Partical(width / 2, height / 2, Math.random() * 4, Math.random() * Math.PI * 2)
  );

  function update() {
    context.clearRect(0, 0, width, height);
    for (const p of ps) {
      p.update();
      context.beginPath();
      context.arc(p.position.getX(), p.position.getY(), 5, 0, 2 * Math.PI);
      context.fill();
    }

    requestAnimationFrame(update);
  }

  update();


};