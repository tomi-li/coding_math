window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    targetCanvas = document.getElementById('targetCanvas'),
    targetContext = targetCanvas.getContext('2d'),
    width = canvas.width = targetCanvas.width = window.innerWidth,
    height = canvas.height = targetCanvas.height = window.innerHeight;

  const p = new Partical(0, height / 2, Math.random() * 10, Math.random() * 0.2 - 0.1);

  targetContext.beginPath();
  targetContext.arc(width / 2, height / 2, 100, 0, 2 * Math.PI);
  targetContext.fill();

  function update() {
    context.clearRect(0, 0, width, height);

    p.update();

    context.beginPath();
    context.arc(p.position.getX(), p.position.getY(), 5, 0, 2 * Math.PI);
    context.fill();

    const data = targetContext.getImageData(p.position.getX(), p.position.getY(), 1, 1).data;
    //console.log(data);
    if (data[3] !== 0) {
      console.log(p.position);
      targetContext.globalCompositeOperation = 'destination-out';
      targetContext.beginPath();
      targetContext.arc(p.position.getX(), p.position.getY(), 5, 0, 2 * Math.PI);
      targetContext.fill();
      resetPartical(p);
    }

    requestAnimationFrame(update);
  }

  function resetPartical(p) {
    p.position.setX(0);
    p.position.setY(height / 2);
    p.velocity.setAngle(Math.random() * 0.2 - 0.1);
  }

  update();
};
