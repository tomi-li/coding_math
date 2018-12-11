var a = "10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101"
var b = "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"

var addBinary = function(a, b) {
  var carry = 0;
  var longest = a.length > b.length ? a.length : b.length;
  var results = [];

  for (var i = 0, j = a.length - 1, k = b.length - 1; i < longest; i++, j--, k--) {
    var r = (+a[j] || 0) + (+b[k] || 0);

    if (carry !== 0) {
      r += carry;
      carry = 0;
    }

    if (r >= 2) {
      r = r % 2;
      carry = 1;
    }

    results.unshift(r);
  }
  if (carry) {
    results.unshift(carry);
  }
  return results.join('');
};