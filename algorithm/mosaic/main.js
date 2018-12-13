async function ImageLoader(url) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onload = () => {
      resolve(img);
    };
  });
}

function Logger(limit = 100) {
  let count = 0;
  return (...args) => {
    if (count > limit) return;
    count++;
    console.log(...args)
  }
}

const log = Logger();

function divideBlocks(size, data, width, height) {
  const dx = Math.floor(width / size);
  const dy = Math.floor(height / size);
  const result = [];

  console.log(dx, dy);

  for (let x = 0; x < dx * dy * size; x++) {
    result.push(getBlock(size, data, width, height, x * size * 4));
  }
  console.log('blocks:', result.length);
  return result;
}

function getBlock(size, data, width, height, startIndex) {
  const result = [];
  for (let i = 0; i < size; i++) {
    const start = i * width * 4 + startIndex + 72000;
    const end = start + size * 4;
    // log(startIndex, start, end);
    result.push(...data.slice(start, end))
  }
  log(result.length);
  return result;
}

const avg = arr => arr.reduce((prev, next) => prev + next, 0) / arr.length;

function avgObj(data) {
  const obj = { 0: [], 1: [], 2: [], 3: [] };
  for (let i = 0; i < (data.length - 1) / 4; i++) {
    obj['0'].push(data[i * 4]);
    obj['1'].push(data[i * 4 + 1]);
    obj['2'].push(data[i * 4 + 2]);
    obj['3'].push(data[i * 4 + 3]);
  }
  return [avg(obj["0"]), avg(obj["1"]), avg(obj["2"]), avg(obj["3"])];
}

window.onload = async () => {
  const
    canvas = document.getElementById('canvas'),
    mosaicCanvas = document.getElementById('mosaic'),
    context = canvas.getContext('2d'),
    mosaicContext = mosaicCanvas.getContext('2d'),
    width = canvas.width = mosaicCanvas.width = window.innerWidth,
    height = canvas.height = mosaicCanvas.height = window.innerHeight;

  const img = await ImageLoader('./demo.png');
  const point = { x: 100, y: 100, width: img.width, height: img.height };
  context.drawImage(img, point.x, point.y);
  console.log('image size:', img.width, img.height);
  mosaic(point.x, point.y, point.width, point.height);
  canvas.remove();


  function mosaic(x, y, width, height) {
    mosaicContext.save();
    mosaicContext.translate(x, y);
    const imageData = context.getImageData(x, y, width, height);
    const size = 10;
    const blocks = divideBlocks(size, imageData.data, width, height);
    const avgBlock = blocks.map(block => avgObj(block));
    for (let i = 0; i < blocks.length; i++) {
      mosaicContext.fillStyle = `rgba(${avgBlock[i][0]},${avgBlock[i][1]},${avgBlock[i][2]})`;
      if (i === 72) {
        mosaicContext.fillStyle = `rgba(255, 0, 0)`;
      }
      mosaicContext.fillRect((i * size) % width, Math.floor((i * size) / width), size, size);
    }
    mosaicContext.restore();
  }
};

