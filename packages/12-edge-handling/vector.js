class Vector {

  constructor(x = 0, y = 1) {
    this._x = x;
    this._y = y;
  }

  static create(x, y) {
    return new this(x, y);
  }

  static clone(v){
    return new this(v.getX(), v.getY());
  }

  setX(x) {
    this._x = x;
  }

  getX() {
    return this._x
  }

  setY(y) {
    this._y = y;
  }

  getY() {
    return this._y
  }

  setLength(length) {
    const angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  setAngle(angle) {
    const length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  getLength() {
    return Math.sqrt(this._x ** 2 + this._y ** 2);
  }

  getAngle() {
    return Math.atan2(this._y, this._x);
  }

  add(x, y) {
    return Vector.create(x + this._x, y + this._y);
  }

  addTo(x, y) {
    this._x += x;
    this._y += y;
  }

  substract(x, y) {
    return Vector.create(x - this._x, y - this._y);
  }

  substractFrom(x, y) {
    this._x -= x;
    this._y -= y;
  }

  multiply(num) {
    return Vector.create(this._x * num, this._y * num);
  }

  multiplyTo(num) {
    this._x *= num;
    this._y *= num;
  }

  devide(num) {
    return Vector.create(this._x / num, this._y / num);
  }

  devideBy(num) {
    this._x /= num;
    this._y /= num;
  }

}
