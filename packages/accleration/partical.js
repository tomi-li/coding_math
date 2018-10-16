class Partical {

  constructor(x, y, speed, direction) {
    this.position = Vector.create(x, y);
    const velocity = Vector.create(0, 0);

    velocity.setLength(speed);
    velocity.setAngle(direction);
    this.velocity = velocity;
  }

  acclerate(accl) {
    this.velocity.addTo(accl.getX(), accl.getY());
  }

  update() {
    this.position.addTo(this.velocity.getX(), this.velocity.getY());
  }
}