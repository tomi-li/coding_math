const digit = 10;
let seed = 1234567890;

function nextRand(s = seed) {
  const n = s * s;
  const a = n.toString().split('');
  while (a.length < digit * 2) {
    a.unshift('0')
  }
  seed = a.slice(digit / 2, digit / 2 + digit).join('');
  return +seed;
}

for (let i = 0; i < 20; i++) {
  console.log(nextFloatRand());
}

function nextFloatRand() {
  let n = '';
  for (let i = 0; i < digit; i++) {
    n += '9';
  }
  return nextRand() / +n;
}


window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

  for (let i = 0; i < 600; i++) {
    for (let j = 0; j < 600; j++) {
      if (nextFloatRand() < 0.5) {
        context.fillRect(j, i, 1, 1);
      }
    }
  }
};