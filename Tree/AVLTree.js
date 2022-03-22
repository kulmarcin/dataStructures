class AVLNode {
  constructor(key = 0, height = 1, left, right) {
    this.key = key;
    this.height = height;
    this.left = left;
    this.right = right;
  }

  getBalanceFactor() {
    const lHeight = this.left ? this.left.height : 0;
    const rHeight = this.right ? this.right.height : 0;
    return rHeight - lHeight;
  }

  fixHeight() {
    const lHeight = this.left ? this.left.height : 0;
    const rHeight = this.right ? this.right.height : 0;
    this.height = (lHeight > rHeight ? lHeight : rHeight) + 1;
  }
}

class AVLTree {
  constructor() {
    this.root = undefined;
  }

  rotateLeft(node) {
    const root = node.right;

    const left = node;
    left.right = root.left;
    root.left = left;

    left.fixHeight();
    root.fixHeight();

    return root;
  }

  rotateRight(node) {
    const root = node.left;

    const right = node;
    right.left = root.right;
    root.right = right;

    right.fixHeight();
    root.fixHeight();

    return root;
  }

  balance(node) {
    node.fixHeight();

    if (node.getBalanceFactor() === 2) {
      if (node.right.getBalanceFactor() < 0) {
        node.right = this.rotateRight(node.right);
      }
      return this.rotateLeft(node);
    }

    if (node.getBalanceFactor() === -2) {
      if (node.left.getBalanceFactor() > 0) {
        node.left = this.rotateLeft(node.left);
      }
      return this.rotateRight(node);
    }

    return node;
  }

  insert(node) {
    node = new AVLNode(node);
    if (!this.root) {
      this.root = node;
      return;
    }
    this.root = this._insert(this.root, node);
  }

  _insert(vertex, node) {
    if (node.key === vertex.key) {
      return vertex;
    }
    if (node.key < vertex.key) {
      if (!vertex.left) {
        vertex.left = node;
      } else {
        vertex.left = this._insert(vertex.left, node);
      }
    } else {
      if (!vertex.right) {
        vertex.right = node;
      } else {
        vertex.right = this._insert(vertex.right, node);
      }
    }

    return this.balance(vertex);
  }

  findMin(node) {
    return node.left ? this.findMin(node.left) : node;
  }

  removeMin(node = this.root) {
    if (!node.left) {
      return node.right;
    }
    node.left = this.removeMin(node.left);
    return this.balance(node);
  }

  remove(k) {
    this.root = this._remove(this.root, k);
    return this.root;
  }

  _remove(node, k) {
    if (!node) {
      return;
    }

    if (k < node.key) {
      node.left = this._remove(node.left, k);
    } else if (k > node.key) {
      node.right = this._remove(node.right, k);
    } else {
      const left = node.left;
      const right = node.right;

      if (!right) {
        return left;
      }

      const min = this.findMin(right);
      min.left = left;
      min.right = this.removeMin(right);

      node = this.balance(min);
    }

    return node;
  }

  find(k, node) {
    if (!node) {
      node = this.root;
    }

    if (k === node.key) {
      return node;
    } else if (k < node.key) {
      if (!node.left) {
        return;
      }
      return this.find(k, node.left);
    } else if (k > node.key) {
      if (!node.right) {
        return;
      }
      return this.find(k, node.right);
    }
  }
}

const t = new AVLTree();
t.insert(1);
t.insert(5);
t.insert(-1);
t.insert(20);
console.log(t);
