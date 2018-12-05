class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
}

window.onload = () => {

  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    circles = [],
    min = 10,
    max = 50;


  function drawCircle(c) {
    context.beginPath();
    context.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    context.fill();
  }

  function isValid({ x, y, r }) {
    for (const circle of circles) {
      const
        dx = x - circle.x,
        dy = y - circle.y,
        dist = Math.sqrt(dx ** 2 + dy ** 2);

      if (dist < (r + circle.r)) {
        return false
      }
    }
    return true;
  }

  let count = 0;

  function update() {
    const newCircle = new Circle(Math.random() * width, Math.random() * height, Math.random() * (max - min) + min);
    if (!isValid(newCircle)) {
      count++;
      setTimeout(update, 5);
      return;
    }
    circles.push(newCircle);
    drawCircle(newCircle);
    if (count > 1000) {
      // break;
      console.log('running out');
      return;
    }
    setTimeout(update, 5);
  }

  update();
};