const Arm = require('./Arm');

class IKSystem {
  constructor(x = 0, y = 0) {
    this.startPoint = { x, y };
    this.arms = [];
    this.lastArm = null;
  }

  addArm(length) {
    const newArm = this.lastArm
      ? new Arm(this.lastArm.getEndX(), this.lastArm.getEndY(), length)
      : new Arm(this.startPoint.x, this.startPoint.y, length);
    this.arms.push(newArm);
    newArm.parent = this.lastArm;
    this.lastArm = newArm;
  }

  dragTo(x, y) {
    this.lastArm.dragTo(x, y);
  }

  render(context) {
    for (const arm of this.arms) {
      arm.render(context);
    }
  }
}

module.exports = IKSystem;