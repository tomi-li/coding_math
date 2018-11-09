const PI = Math.PI;

window.onload = function() {
  const
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    bg = document.getElementById('canvas1'),
    bgctx = bg.getContext('2d'),
    width = canvas.width = bg.width = document.body.clientWidth,
    height = canvas.height = bg.height = document.body.clientHeight,
    blockNumber = 10,
    size = 30;

  const emitPoint = { x: width / 2, y: height };
  let slope = 0;
  let particals = [];

  initSetup();

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
    console.log('!');
    particals.push(new Partical(emitPoint.x, emitPoint.y, 12, angle / 180 * PI));
  });

  function update() {
    const y = slope * (width / 2);
    ctx.clearRect(0, 0, width, height);

    // calculateLength(height - Math.abs(y), width / 2);
    drawSecondLine(y, Math.atan(slope) * 180 / PI);

    if (!_.isEmpty(particals)) {
      particals.forEach(p => {
        p.update();
        drawPartical(p);

        if (bgctx.getImageData(p.position.getX(), p.position.getY(), 1, 1).data[3] !== 0) {
          p.velocity.setX(-p.velocity.getX());
        }

        console.log();

        if (p.position.getX() > width
          || p.position.getX() < 0) {
          p.velocity.setX(-p.velocity.getX());
        }

        if (p.position.getY() < 0) {
          p.velocity.setY(-p.velocity.getY());
        }

        if (p.position.getY() > height) {
          _.remove(particals, p);
        }
      })
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

      if (newY < 0) {
        return;
      }

      const x = Math.tan((90 - angle) * PI / 180) * newY;
      ctx.beginPath();
      ctx.moveTo(0, newY);
      ctx.lineTo(x, 0);
      ctx.stroke();
    } else {
      const newY = (height + y);

      if (newY < 0) {
        return;
      }

      const x = Math.tan((90 + angle) * PI / 180) * newY;
      ctx.beginPath();
      ctx.moveTo(width, newY);
      ctx.lineTo(width - x, 0);
      ctx.stroke();
    }
  }

  update();


  function initSetup() {
    const rectPositions = _.range(blockNumber)
      .map(() => {
        const x = _.random(0, width);
        const y = _.random(0, height);
        return { x, y };
      });

    function drawRects(positions) {
      positions.forEach(position => {
        bgctx.save();
        bgctx.translate(position.x, position.y);
        bgctx.fillRect(0, 0, size, size);
        bgctx.restore();
      });
    }

    drawRects(rectPositions);
  }

};


