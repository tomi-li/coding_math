window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    characterCanvas = document.getElementById('characterCanvas'),
    characterContext = characterCanvas.getContext('2d'),
    width = characterCanvas.width = canvas.width = window.innerWidth,
    height = characterCanvas.height = canvas.height = window.innerHeight;

  const
    tileWidth = 100,
    tileHeight = 50;

  const blocks = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 4, 2, 2, 1, 1, 1],
    [1, 1, 4, 2, 2, 1, 1, 1],
    [1, 1, 4, 2, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];

  blocks.forEach((row, rowIndex) => {
    row.forEach((color, columnIndex) => {
      // tile(rowIndex, columnIndex, color);
      drawBlock(rowIndex, columnIndex, color)
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


  let coordinate = { x: 0, y: 0 };
  drawCharacter(coordinate.x, coordinate.y);

  function drawCharacter(x, y) {
    characterContext.save();
    const offset = +blocks[x][y] - 1;

    characterContext.translate(width / 2 + (x - y) * tileWidth / 2, 50 + (y + x) * tileHeight / 2 + 100 - offset * tileHeight);
    characterContext.beginPath();
    characterContext.arc(x, y - tileHeight / 2, 10, 0, 2 * Math.PI);
    characterContext.fill();
    characterContext.restore();
  }

  window.addEventListener('keydown', e => {
    characterContext.clearRect(0, 0, width, height);
    const nextMove = {};
    switch (e.key) {
      case 'ArrowDown':
        nextMove.y = 1;
        break;
      case 'ArrowUp':
        nextMove.y = -1;
        break;
      case 'ArrowLeft':
        nextMove.x = -1;
        break;
      case 'ArrowRight':
        nextMove.x = +1;
        break;
      default:
        break;
    }
    constrainMoveCoordinate(coordinate, nextMove);
    drawCharacter(coordinate.x, coordinate.y);
  });

  function constrainMoveCoordinate(coordinate, nextMove) {
    if (coordinate.x + nextMove.x < 0
      || coordinate.x + nextMove.x > (blocks.length - 1)
      || coordinate.y + nextMove.y < 0
      || coordinate.y + nextMove.y > (blocks[0].length - 1)
    ) return;

    coordinate.x += nextMove.x || 0;
    coordinate.y += nextMove.y || 0;
  }

  function update() {
    requestAnimationFrame(update);
  }

  update();
};