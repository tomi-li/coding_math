window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  let ps = new Array(100).fill('').map(() =>
    new Partical(width / 2, height, Math.random() * 8 + 2, (Math.random() / 3 + 1 / 3) * -Math.PI, 0.1, Math.random() * 10)
  );

  function update() {
    context.clearRect(0, 0, width, height);

    for (const p of ps) {
      p.update();
      context.beginPath();
      context.arc(p.position.getX(), p.position.getY(), p.size, 0, Math.PI * 2);
      context.fill();
    }

    ps.filter(each =>
      each.position.getX() > width ||
      each.position.getX() < 0 ||
      each.position.getY() > height ||
      each.position.getY() < 0
    ).forEach(each => {
      each.reset();
    });
    requestAnimationFrame(update);
    
  }

  update();
};
