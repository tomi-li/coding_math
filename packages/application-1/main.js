const PI = Math.PI;

window.onload = function() {
  const
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = document.body.clientWidth,
    height = canvas.height = document.body.clientHeight;

  const emitPoint = { x: width / 2, y: height };
  let slope = 0;
  let partical;

  canvas.addEventListener('mousemove', e => {
    const dx = e.clientX - emitPoint.x;
    const dy = e.clientY - emitPoint.y;
    slope = dy / dx;
  });

  canvas.addEventListener('click', () => {
    let angle = Math.atan(slope) * 180 / PI;
    if (angle > 0) {
      angle += 180;
    }
    console.log(angle);
    partical = new Partical(emitPoint.x, emitPoint.y, 12, angle / 180 * PI);
  });

  function update() {
    const y = slope * (width / 2);
    ctx.clearRect(0, 0, width, height);

    // calculateLength(height - Math.abs(y), width / 2);
    drawSecondLine(y, Math.atan(slope) * 180 / PI);

    if (partical) {
      partical.update();
      drawPartical(partical);

      if (partical.position.getX() > width
        || partical.position.getX() < 0) {
        partical.velocity.setX(-partical.velocity.getX());
      }

      if (partical.position.getY() < 0) {
        partical.velocity.setY(-partical.velocity.getY());
      }

      if (partical.position.getY() > height) {
        partical = null;
      }
    }

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

  function drawPartical(p) {
    ctx.beginPath();
    ctx.arc(p.position.getX(), p.position.getY(), 10, 0, 2 * PI);
    ctx.fill();
  }


  function drawSecondLine(y, angle) {
    if (angle > 0) {
      const newY = (height - y);

      console.log(newY);
      if (newY < 0) {
        console.log('！！！');
        return;
      }

      const x = Math.tan((90 - angle) * PI / 180) * newY;
      ctx.beginPath();
      ctx.moveTo(0, newY);
      ctx.lineTo(x, 0);
      ctx.stroke();

      // help line
      ctx.beginPath();
      ctx.moveTo(0, newY);
      ctx.lineTo(width, newY);
      ctx.stroke();
    } else {
      const newY = (height + y);

      if (newY < 0) {
        console.log('！！！');
        return;
      }

      const x = Math.tan((90 + angle) * PI / 180) * newY;
      ctx.beginPath();
      ctx.moveTo(width, newY);
      ctx.lineTo(width - x, 0);
      ctx.stroke();

      // help line
      ctx.beginPath();
      ctx.moveTo(0, newY);
      ctx.lineTo(width, newY);
      ctx.stroke();
    }
  }

  update();
};