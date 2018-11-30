window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const
    tileWidth = 100,
    tileHeight = 50;


  const tiles = [
    ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue', 'yellow', 'yellow', 'blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue', 'yellow', 'yellow', 'blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue', 'yellow', 'yellow', 'blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
  ];

  tiles.forEach((row, rowIndex) => {
    row.forEach((color, columnIndex) => {
      tile(rowIndex, columnIndex, color);
    })
  });

  function tile(x, y, color) {
    context.save();
    context.translate(width / 2 + (x - y) * tileWidth / 2, 50 + (y + x) * tileHeight / 2);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(tileWidth / 2, tileHeight / 2);
    context.lineTo(0, tileHeight);
    context.lineTo(-tileWidth / 2, tileHeight / 2);
    context.closePath();
    context.fillStyle = color;
    context.fill();
    context.restore();
    console.log(context);
  }

};