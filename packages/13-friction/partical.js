class Partical {

  constructor(x, y, speed, direction, gravity = 0, size = 0, friction) {
    this.position = Vector.create(x, y);
    const velocity = Vector.create(0, 0);

    velocity.setLength(speed);
    velocity.setAngle(direction);

    this.velocity = velocity;
    this.gravity = new Vector(0, gravity);
    this.size = size;
    this.friction = friction;

    this.initVelocity = Vector.clone(velocity);
    this.initPosition = Vector.clone(this.position);
  }

  accelerate(accl) {
    this.velocity.addTo(accl.getX(), accl.getY());
  }

  applyFriction() {
    this.velocity.multiplyTo(1 - this.friction);
    if (this.velocity.getLength() < 0.01) {
      this.velocity.setLength(0);
    }
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

  reset() {
    this.velocity = Vector.clone(this.initVelocity);
    this.position = Vector.clone(this.initPosition);
  }

  update() {
    this.accelerate(this.gravity);
    if (this.friction !== undefined) this.applyFriction();
    this.position.addTo(this.velocity.getX(), this.velocity.getY());
  }
}
