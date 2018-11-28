window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    distance = 120,
    numberOfNodes = 80;

  const particals = new Array(numberOfNodes).fill(0).map(() => {
    return new Partical(
      width * Math.random(),
      height * Math.random(),
      2 * Math.random() + 1,
      (Math.PI * 2) * Math.random(),
      2 * Math.random() + 2
    )
  });

  function drawClosedLines(p, all) {
    all
      .filter(each => Math.abs(p.distanceTo(each)) < distance)
      .forEach(each => drawLine(p, each, width))
  }

  function drawLine(p1, p2) {
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineWidth = 1 - p1.distanceTo(p2) / distance;
    context.stroke();
  }

  function update() {
    context.clearRect(0, 0, width, height);

    particals.forEach((p, index) => {
      p.update();
      if (p.x < 0) {
        p.x = width;
      }
      if (p.x > width) {
        p.x = 0;
      }
      if (p.y < 0) {
        p.y = height
      }
      if (p.y > height) {
        p.y = 0;
      }

      drawClosedLines(p, particals.slice(index, particals.length));
      drawPartical(p);
    });

    requestAnimationFrame(update);
  }

  function drawPartical(p) {
    context.beginPath();
    context.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
    context.fill();
  }

  update();
};
