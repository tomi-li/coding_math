class Partical {

  constructor(x, y, speed, direction) {
    this.position = Vector.create(x, y);
    const velocity = Vector.create(0, 0);

    velocity.setLength(speed);
    velocity.setAngle(direction);
    this.velocity = velocity;
  }

  update() {
    this.position.addTo(this.velocity.getX(), this.velocity.getY());
  }
}