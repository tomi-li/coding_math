const seed = require('seedrandom');
const string = 'hello world tomi';
const offset = seed(1).int32();

function encode(str, offset) {
  return str
    .split('')
    .map(char => String.fromCharCode(char.charCodeAt(0) + offset))
    .join('');
}

const encoded = encode(string, offset);
console.log(encoded);

function decode(str, offset) {
  return str
    .split('')
    .map(char => String.fromCharCode(char.charCodeAt(0) - offset))
    .join('');
}

const decoded = decode(encoded, offset);
console.log(decoded);
