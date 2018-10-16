class Planet extends Partical {

  constructor(x, y, speed, direction, mass = 1) {
    super(x, y, speed, direction);
    this.mass = mass;
  }

  gravitateTo(p2) {
    const
      dist = this.distanceTo(p2),
      grav = new Vector(0, 0);

    grav.setLength(p2.mass / dist ** 2);
    grav.setAngle(this.angleTo(p2));

    this.velocity.addTo(grav)
  }

}