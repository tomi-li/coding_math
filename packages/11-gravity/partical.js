class Partical {

  constructor(x, y, speed, direction) {
    this.position = Vector.create(x, y);
    const velocity = Vector.create(0, 0);

    velocity.setLength(speed);
    velocity.setAngle(direction);
    this.velocity = velocity;
  }

  accelerate(accl) {
    this.velocity.addTo(accl.getX(), accl.getY());
  }

  distanceTo(p2) {
    const
      dx = p2.position.getX() - this.position.getX(),
      dy = p2.position.getY() - this.position.getY();

    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  angleTo(p2) {
    const
      dx = p2.position.getX() - this.position.getX(),
      dy = p2.position.getY() - this.position.getY();
    return Math.atan2(dy, dx);
  }

  update() {
    this.position.addTo(this.velocity.getX(), this.velocity.getY());
  }
}