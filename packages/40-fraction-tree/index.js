window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const
    p0 = {
      x: width / 2,
      y: height
    },
    p1 = {
      x: width / 2,
      y: 50
    },
    branchAngle = Math.PI / 4,
    trunkRatio = 0.5;

  drawPoint(p0);
  drawPoint(p1);

  drawTree(p0, p1, 4);

  function drawTree(p0, p1, limit) {
    const
      dx = p1.x - p0.x,
      dy = p1.y - p0.y,
      dist = Math.sqrt(dx ** 2 + dy ** 2),
      angle = Math.atan2(dy, dx),
      branchLength = dist * (1 - trunkRatio),
      pA = {
        x: p0.x + dx * trunkRatio,
        y: p0.y + dy * trunkRatio,
      },
      pB = {
        x: pA.x + Math.cos(angle + branchAngle) * branchLength,
        y: pA.y + Math.sin(angle + branchAngle) * branchLength,
      },
      pC = {
        x: pA.x + Math.cos(angle - branchAngle) * branchLength,
        y: pA.y + Math.sin(angle - branchAngle) * branchLength,
      };

    // drawPoint(pB);
    // console.log('------');
    // console.log(angle * 180 / Math.PI);
    // console.log(dist);
    // console.log(branchLength);
    // console.log('------');

    context.save();
    context.moveTo(p0.x, p0.y);
    context.lineTo(pA.x, pA.y);
    context.stroke();

    if (limit > 0) {
      drawTree(pA, pB, limit - 1);
      drawTree(pA, pC, limit - 1);
    }
    else {
      context.beginPath();
      context.moveTo(pB.x, pB.y);
      context.lineTo(pA.x, pA.y);
      context.lineTo(pC.x, pC.y);
      context.stroke();
    }
  }

  function drawPoint(p) {
    context.beginPath();
    context.arc(p.x, p.y, 5, 0, 2 * Math.PI);
    context.fill();
  }
};