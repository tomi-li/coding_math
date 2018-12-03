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

  const blocks = [
    ['1', '1', '1', '1', '1', '1', '1', '1'],
    ['1', '1', '1', '1', '1', '1', '1', '1'],
    ['1', '1', '1', '2', '2', '1', '1', '1'],
    ['1', '1', '1', '2', '2', '1', '1', '1'],
    ['1', '1', '1', '2', '2', '1', '1', '1'],
    ['1', '1', '1', '1', '1', '1', '1', '1'],
    ['1', '1', '1', '1', '1', '1', '1', '1'],
  ];

  blocks.forEach((row, rowIndex) => {
    row.forEach((color, columnIndex) => {
      // tile(rowIndex, columnIndex, color);
      drawBlock(rowIndex, columnIndex, Math.floor(Math.random() * 4))
    })
  });


  function drawBlock(x, y, z) {
    const
      top = '#eeeeee',
      left = '#cccccc',
      right = '#999999';
    const comparingPoint = z * tileHeight;

    context.save();
    context.translate(width / 2 + (x - y) * tileWidth / 2, 50 + (y + x) * tileHeight / 2 + 100);

    // draw top
    context.beginPath();
    context.moveTo(0, -comparingPoint);
    context.lineTo(tileWidth / 2, tileHeight / 2 - comparingPoint);
    context.lineTo(0, tileHeight - comparingPoint);
    context.lineTo(-tileWidth / 2, tileHeight / 2 - comparingPoint);
    context.closePath();
    context.fillStyle = top;
    context.fill();

    // draw left
    context.beginPath();
    context.moveTo(-tileWidth / 2, tileHeight / 2 - comparingPoint);
    context.lineTo(-tileWidth / 2, tileHeight / 2);
    context.lineTo(0, tileHeight);
    context.lineTo(0, tileHeight - comparingPoint);
    context.closePath();
    context.fillStyle = left;
    context.fill();

    // draw left
    context.beginPath();
    context.moveTo(tileWidth / 2, tileHeight / 2 - comparingPoint);
    context.lineTo(tileWidth / 2, tileHeight / 2);
    context.lineTo(0, tileHeight);
    context.lineTo(0, tileHeight - comparingPoint);
    context.closePath();
    context.fillStyle = right;
    context.fill();


    context.restore();
  }


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