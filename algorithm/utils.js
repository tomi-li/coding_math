const Utils = {
  normalize(val, min, max) {
    return (val - min) / (max - min);
  },
  lerp(val, min, max) {
    return (max - min) * val + min;
  },
  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  },
  random(min, max) {
    return Math.random() * (max - min) + min;
  },
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  round(val, decimal) {
    const pow = 10 ** decimal;
    return Math.round(val * pow) / pow;
  }
};


// console.log(Utils.normalize(20, 0, 100));
// console.log(Utils.lerp(0.2, 0, 100));
// console.log(Utils.clamp(-10, 0, 100));
// console.log(Utils.randomInt(0, 100));
// console.log(Utils.round(15.1163, -1));

module.exports = Utils;