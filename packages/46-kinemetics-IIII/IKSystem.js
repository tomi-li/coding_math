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

  reachTo(x, y) {
    this.dragTo(x, y);
    for (const arm of this.arms) {
      if (arm.parent) {
        arm.x = arm.parent.getEndX();
        arm.y = arm.parent.getEndY();
      } else {
        arm.x = this.startPoint.x;
        arm.y = this.startPoint.y;
      }
    }
  }


  render(context) {
    for (const arm of this.arms) {
      arm.render(context);
    }
  }
}

module.exports = IKSystem;