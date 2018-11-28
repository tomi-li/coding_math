function createWithMagnitudeAndAngle(magnitude, angle) {
  const x = Math.cos(angle) * magnitude;
  const y = Math.sin(angle) * magnitude;
  return new Vector(x, y);
}

class Partical {

  constructor(x, y, speed = 0, direction = 0, size) {
    this.x = x;
    this.y = y;

    const velocity = createWithMagnitudeAndAngle(speed, direction);

    this.vx = velocity.x;
    this.vy = velocity.y;

    this.size = size;
  }

  distanceTo(p) {
    const
      dx = p.x - this.x,
      dy = p.y - this.y;

    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}
