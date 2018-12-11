const obj = {
  foo: ['bar1', 'bar2', 'bar3'],
  bar: ['ttt1', 'ttt2', 'ttt3'],
  foo1: ['fff1', 'fff2', 'fff3'],
  bar1: ['aaa', 'bbb']
};

function Node(val, deep = 0) {
  this.val = val;
  this.deep = deep;
  this.children = null;
}

function traverse(node, callback) {
  callback(node);
  if (node.children) {
    node.children.forEach(each => {
      traverse(each, callback);
    })
  }
}

function log(node) {
  console.log(new Array(node.deep).fill(0).map(() => '  ').join('') + node.val);
}

function buildTree(obj) {
  const root = new Node('root');
  const keys = Object.keys(obj);
  const deletedNodes = [];

  root.children = keys.map(key => {
    const childnode = new Node(key, 1);
    obj[key].forEach(k => {
      if (obj[k] !== undefined) {
        childnode.children = obj[k].map(e => new Node(e, 2));
        deletedNodes.push(k);
      }
    });
    return childnode;
  });

  root.children = root.children.filter(each => !deletedNodes.includes(each.val));
  return root;
}

function main() {
  const root = buildTree(obj);
  traverse(root, log);
}

main();