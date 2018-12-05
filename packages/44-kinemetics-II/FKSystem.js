const Arm = require('./Arm');

class FKSystem {

  constructor(x, y) {
    this.point = { x, y };
    this.arms = [];
    this.lastArm = null;
    this.phase = 0;
    this.speed = 0.04;
    this.phaseOffset = 1.5;
  }

  addArm(length, startAngle, angleRange) {
    const newArm = new Arm(length, startAngle, angleRange);
    if (this.lastArm) newArm.parent = this.lastArm;
    this.arms.push(newArm);
    this.lastArm = newArm;
    this.update();
  }

  update() {
    this.arms.forEach((arm, index) => {
      arm.setPhase(this.phase - this.phaseOffset * index);
      arm.update();
    });
    this.phase += this.speed;
  }

  render(context) {
    for (const arm of this.arms) {
      context.save();
      context.translate(this.point.x, this.point.y);
      arm.render(context);
      context.restore();
    }
  }
}

module.exports = FKSystem;