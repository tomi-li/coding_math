const points = [
  new Point(100, 100, 50, 50),
  new Point(100, 200),
  new Point(200, 200),
  new Point(200, 100),
  new Point(200, 200),
  new Point(200, 300),
  new Point(200, 400, 200, 400, true),
];

const sticks = [
  new Stick(points[0], points[1]),
  new Stick(points[1], points[2]),
  new Stick(points[2], points[3]),
  new Stick(points[3], points[0]),
  new Stick(points[0], points[2], true),
  new Stick(points[6], points[5]),
  new Stick(points[5], points[4]),
  new Stick(points[4], points[0]),
];

const faces = [
  new ColorFace(0, 1, 2, 3, 'blue')
];

function distance(p1, p2) {
  const
    dx = p1.x - p2.x,
    dy = p1.y - p2.y;
  return Math.sqrt(dx ** 2 + dy ** 2);
}

function ColorFace(p0, p1, p2, p3, color = 'black') {
  this.p0 = points[p0];
  this.p1 = points[p1];
  this.p2 = points[p2];
  this.p3 = points[p3];
  this.color = color;
}

function Point(x, y, oldx = x, oldy = y, pinned = false) {
  this.x = x;
  this.y = y;
  this.oldx = oldx;
  this.oldy = oldy;
  this.pinned = pinned
}

function Stick(p0, p1, hidden) {
  this.p0 = p0;
  this.p1 = p1;
  this.length = distance(p0, p1);
  this.hidden = hidden;
}

module.exports = {
  points,
  sticks,
  faces
};

