class Arm {
  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.length = length;
    this.parent = null;
  }

  setAngle(angle) {
    this.angle = angle;
  }

  getEndX() {
    return this.x + Math.cos(this.angle) * this.length;
  }

  getEndY() {
    return this.y + Math.sin(this.angle) * this.length;
  }

  update() {
    if (this.parent) {
      this.x = this.parent.getEndX();
      this.y = this.parent.getEndY();
      this.angle = this.parent.angle + this.angle;
    }
  }

  render(context) {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.getEndX(), this.getEndY());
    context.stroke();
  }

  chain(arm) {
    arm.parent = this;
  }
}

module.exports = Arm;