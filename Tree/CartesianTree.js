class CartesianTreeNode {
  constructor(value, index) {
    this.value = value;
    this.index = index;
  }
}

class CartesianTree {
  constructor(array, compare) {
    if (array.length === 0) {
      return {
        root: null,
        nodes: []
      };
    }

    let count = array.length;
    let spine = [];
    let nodes = new Array(count);

    compare =
      compare ||
      function defaultCompare(a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      };

    for (let i = 0; i < count; ++i) {
      let node = new CartesianTreeNode(array[i], i);
      nodes[i] = node;
      let last = null;
      while (spine.length > 0) {
        let top = spine[spine.length - 1];
        if (compare(top.value, node.value) >= 0) {
          last = spine.pop();
        } else {
          break;
        }
      }
      if (last) {
        node.left = last;
      }
      if (spine.length > 0) {
        spine[spine.length - 1].right = node;
      }
      spine.push(node);
    }

    return {
      root: spine[0]
      //   nodes: nodes
    };
  }
}

function* inOrderTraversal(node) {
  if (node.left) yield* inOrderTraversal(node.left);
  yield node;
  if (node.right) yield* inOrderTraversal(node.right);
}

//console.log([...inOrderTraversal(tree.root)].map(x => x.value))
