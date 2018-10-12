module.exports = {
  _x: 0,
  _y: 1,

  create(x, y) {
    const obj = Object.create(this);
    obj.setX(x);
    obj.setY(y);
    return obj;
  },

  setX(x) {
    this._x = x;
  },

  getX() {
    return this._x
  },

  setY(y) {
    this._y = y;
  },

  getY() {
    return this._y
  },

  setLength(length) {
    const angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  },

  setAngle(angle) {
    const length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  },

  getLength() {
    return Math.sqrt(this._x ** +this._y **);
  },

  getAngle() {
    return Math.atan2(this._y, this._x);
  }

};


