class BSTNode {
  constructor(val) {
    this.val = val;
    this.right = null;
    this.left = null;
    this.count = 0;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  create(val) {
    const newNode = new BSTNode(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;

    const addSide = side => {
      if (!current[side]) {
        current[side] = newNode;
        return this;
      }
      current = current[side];
    };

    while (true) {
      if (val === current.val) {
        current.count++;
        return this;
      }
      if (val < current.val) addSide('left');
      else addSide('right');
    }
  }

  find(val) {
    if (!this.root) return undefined;
    let current = this.root,
      found = false;

    while (current && !found) {
      if (val < current.val) current = current.left;
      else if (val > current.val) current = current.right;
      else found = true;
    }

    if (!found) return 'Nothing Found!';
    return current;
  }

  delete(val) {
    if (!this.root) return undefined;
    let current = this.root,
      parent;

    const pickSide = side => {
      if (!current[side]) return 'No node found!';

      parent = current;
      current = current[side];
    };

    const deleteNode = side => {
      if (current.val === val && current.count > 1) current.count--;
      else if (current.val === val) {
        const children = this.BFS(current.val);
        parent[side] = null;
        children.splice(0, 1);
        children.forEach(child => this.create(child));
      }
    };

    while (current.val !== val) {
      if (val < current.val) {
        pickSide('left');
        deleteNode('left');
      } else {
        pickSide('right');
        deleteNode('right');
      }
    }

    return current;
  }

  bfs(start = this.root) {
    let data = [],
      queue = [],
      current = start ? this.find(start) : this.root;

    queue.push(current);
    while (queue.length) {
      current = queue.shift();
      data.push(current.val);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return data;
  }

  //dfs traversals:
  *inOrderTraversal(node = this.root) {
    if (node.left) yield* this.inOrderTraversal(node.left);
    yield node;
    if (node.right) yield* this.inOrderTraversal(node.right);
  }

  *postOrderTraversal(node = this.root) {
    if (node.left) yield* this.postOrderTraversal(node.left);
    if (node.right) yield* this.postOrderTraversal(node.right);
    yield node;
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.left) yield* this.preOrderTraversal(node.left);
    if (node.right) yield* this.preOrderTraversal(node.right);
  }
}

const t = new BST();
t.create(10);
t.create(15);
t.create(5);
t.create(6);
t.create(3);
t.create(11);
t.create(20);
// console.log(t)
console.log([...t.inOrderTraversal()].map(e => e.val));
console.log([...t.preOrderTraversal()].map(e => e.val));
console.log([...t.postOrderTraversal()].map(e => e.val));
console.log(t.bfs());
