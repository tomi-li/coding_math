function inRange(val, min, max) {
  return val > min && val < max;
}

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  var t = x.toString().split('');
  var isNagetive = t[0] === '-';

  if (isNagetive) t.shift();
  var result = isNagetive
    ? +('-' + t.reverse().join(''))
    : +t.reverse().join('');
  return inRange(result, -Math.pow(2, 31), Math.pow(2, 31))
    ? result
    : 0;
};

console.log(reverse(1534236469));
