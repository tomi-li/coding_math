window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  let ps = new Array(100).fill('').map(() =>
    new Partical(width / 2, height / 2, Math.random() * 4 + 2, Math.random() * Math.PI * 2)
  );

  function update() {
    context.clearRect(0, 0, width, height);

    for (const p of ps) {
      p.update();
      context.beginPath();
      context.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2);
      context.fill();
    }

    ps = ps.filter(each => !(
      each.position.getX() > width ||
      each.position.getX() < 0 ||
      each.position.getY() > height ||
      each.position.getY() < 0
    ));
    console.log(ps.length);

    requestAnimationFrame(update);
  }


  update();
};
