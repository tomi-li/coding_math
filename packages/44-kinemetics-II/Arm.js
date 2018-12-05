class Arm {

  constructor(length, startAngle, angleRange) {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.length = length;
    this.parent = null;
    this.startAngle = startAngle;
    this.angleRange = angleRange;
  }

  setPhase(phase) {
    this.angle = this.startAngle + Math.sin(phase) * this.angleRange;
  }

  getEndX() {
    return this.x + Math.cos(this.angle + this.startAngle) * this.length;
  }

  getEndY() {
    return this.y + Math.sin(this.angle + this.startAngle) * this.length;
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