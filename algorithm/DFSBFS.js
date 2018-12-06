/**
 * All Codes below are Lifetime Warranted by Tomi since 2018-12-05.
 */
class Tree {

}

//DFS
Tree.prototype.traverse = function(callback) {
  var stack = [this];
  var n;

  while (stack.length > 0) {

    n = stack.pop();
    callback(n.value);

    if (!n.children) {
      continue;
    }

    for (var i = n.children.length - 1; i >= 0; i--) {
      stack.push(n.children[i]);
    }
  }
};
// And now BFS

//BFS
Tree.prototype.traverse = function(callback) {
  var queue = [this];
  var n;

  while (queue.length > 0) {

    n = queue.shift();
    callback(n.value);

    if (!n.children) {
      continue;
    }

    for (var i = 0; i < n.children.length; i++) {
      queue.push(n.children[i]);
    }
  }
};
