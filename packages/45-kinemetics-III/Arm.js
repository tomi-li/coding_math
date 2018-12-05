class Arm {
  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.length = length;
    this.parent = null;
  }

  getEndX() {
    return this.x + Math.cos(this.angle) * this.length;
  }

  getEndY() {
    return this.y + Math.sin(this.angle) * this.length;
  }

  pointTo(x, y) {
    const
      dx = x - this.x,
      dy = y - this.y;
    this.angle = Math.atan2(dy, dx);
  }

  dragTo(x, y) {
    this.pointTo(x, y);
    this.x = x - Math.cos(this.angle) * this.length;
    this.y = y - Math.sin(this.angle) * this.length;
  }

  render(context) {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.getEndX(), this.getEndY());
    context.stroke();
  }
}

module.exports = Arm;