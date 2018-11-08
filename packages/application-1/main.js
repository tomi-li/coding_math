const PI = Math.PI;

window.onload = function() {
  const
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = document.body.clientWidth,
    height = canvas.height = document.body.clientHeight;

  const emitPoint = { x: width / 2, y: height };
  let slope = 0;

  canvas.addEventListener('mousemove', e => {
    const dx = e.clientX - emitPoint.x;
    const dy = e.clientY - emitPoint.y;
    slope = dy / dx;
  });

  function update() {
    const y = slope * (width / 2);
    ctx.clearRect(0, 0, width, height);

    // calculateLength(height - Math.abs(y), width / 2);
    drawSecondLine(y, slope * 180 / PI);


    ctx.beginPath();
    ctx.moveTo(emitPoint.x, emitPoint.y);

    if (slope < 0) {
      ctx.lineTo(width, y + height);
    }
    if (slope === -Infinity) {
      ctx.lineTo(width / 2, 0);
    }
    if (slope > 0) {
      ctx.lineTo(0, -y + height);
    }
    ctx.stroke();
    requestAnimationFrame(update);
  }


  function drawSecondLine(y, angle) {
    if (Math.abs(y) > height) {
      console.log('！！！');
      return;
    }

    const newY = (height - y);
    // console.log(90 - angle);
    // console.log(Math.tan(90 - angle));

    // console.log(Math.tan(45 * PI / 180));
    const x = Math.tan((90 - angle) * PI / 180) * newY;
    console.log(x);
    ctx.beginPath();
    ctx.moveTo(0, newY);
    ctx.lineTo(x, 0);
    ctx.stroke();
    // console.log(y, x);
  }

  function calculateLength(height, width) {
    console.log(height);
    if (height < 0) {

    }
  }

  update();

};