const { points, sticks, faces } = require('./others');
const _ = require('lodash');

window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    fraction = 1,
    gravity = 0.2;

  function update() {
    context.clearRect(0, 0, width, height);
    updatePoints();
    updateSticks();
    constrainPoints();
    // renderPoints();
    renderSticks();
    renderFaces();
    requestAnimationFrame(update);
  }


  function constrainPoints() {
    for (const point of points) {
      const
        dx = point.x - point.oldx,
        dy = point.y - point.oldy;

      if (point.x > width) {
        point.x = width;
        point.oldx = point.x + dx;
      }
      if (point.x < 0) {
        point.oldx = point.x + dx;
      }
      if (point.y > height) {
        point.y = height;
        point.oldy = point.y + dy;
      }
      if (point.y < 0) {
        point.oldy = point.y + dy;
      }
    }
  }

  function updatePoints() {
    for (const point of points) {
      if (point.pinned) continue;
      const
        dx = (point.x - point.oldx) * fraction,
        dy = (point.y - point.oldy) * fraction;

      point.oldx = point.x;
      point.oldy = point.y;

      point.x += dx;
      point.y += dy;
      point.y += gravity;
    }
  }

  function updateSticks() {
    for (const stick of sticks) {
      const
        dx = stick.p0.x - stick.p1.x,
        dy = stick.p0.y - stick.p1.y,
        distance = Math.sqrt(dx ** 2 + dy ** 2),
        difference = stick.length - distance,
        percent = difference / stick.length / 2,
        offsetx = dx * percent,
        offsety = dy * percent;

      if (!stick.p0.pinned) {
        stick.p0.x += offsetx;
        stick.p0.y += offsety;
      }

      if (!stick.p1.pinned) {
        stick.p1.x -= offsetx;
        stick.p1.y -= offsety;
      }
    }
  }

  function renderPoints() {
    for (const point of points) {
      context.beginPath();
      context.arc(point.x, point.y, 10, 0, Math.PI * 2);
      context.fill();
    }
  }

  function renderFaces() {
    for (const face of faces) {
      const
        dx = face.p3.x - face.p0.x,
        dy = face.p3.y - face.p0.y,
        angle = Math.atan2(dy, dx),
        length = Math.sqrt(dx ** 2, dy ** 2);

      console.log(length);

      context.save();
      context.translate(face.p0.x, face.p0.y);
      context.rotate(angle);
      context.fillRect(0, 0, length, length);
      context.restore();
    }
  }

  function renderSticks() {
    for (const stick of sticks) {
      if (stick.hidden) continue;

      context.beginPath();
      context.moveTo(stick.p0.x, stick.p0.y);
      context.lineTo(stick.p1.x, stick.p1.y);
      context.stroke();
    }
  }

  update();
};
