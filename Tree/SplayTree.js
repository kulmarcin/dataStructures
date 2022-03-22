class SplayTree {
  constructor() {
    this._root = null;
    this._size = 0;
  }

  insert(key, value) {
    let root = this._root;
    let p = null;

    const node = {
      parent: null,
      right: null,
      left: null,
      key: key,
      value: !value ? key : value
    };

    if (!root) {
      this._root = node;
      root = node;
      this._size++;
      return this._root;
    } else {
      while (root) {
        p = root;
        if (root.key === key) {
          return false;
        } else {
          root = key > root.key ? root.right : root.left;
        }
      }

      node.parent = p;
      root = node;

      if (key > p.key) p.right = node;
      else p.left = node;
    }

    this.splay(root);
    this._size++;
    return root;
  }

  splay(x) {
    let p, gp, ggp, l, r;

    while (x.parent) {
      p = x.parent;
      gp = p.parent;

      if (gp && gp.parent) {
        ggp = gp.parent;
        if (ggp.left === gp) ggp.left = x;
        else ggp.right = x;
        x.parent = ggp;
      } else {
        x.parent = null;
        this._root = x;
      }

      l = x.left;
      r = x.right;

      if (x === p.left) {
        if (gp) {
          if (gp.left === p) {
            if (p.right) {
              gp.left = p.right;
              gp.left.parent = gp;
            } else gp.left = null;

            p.right = gp;
            gp.parent = p;
          } else {
            if (l) {
              gp.right = l;
              l.parent = gp;
            } else gp.right = null;

            x.left = gp;
            gp.parent = x;
          }
        }
        if (r) {
          p.left = r;
          r.parent = p;
        } else p.left = null;

        x.right = p;
        p.parent = x;
      } else {
        if (gp) {
          if (gp.right === p) {
            if (p.left) {
              gp.right = p.left;
              gp.right.parent = gp;
            } else gp.right = null;

            p.left = gp;
            gp.parent = p;
          } else {
            if (r) {
              gp.left = r;
              r.parent = gp;
            } else gp.left = null;

            x.right = gp;
            gp.parent = x;
          }
        }
        if (l) {
          p.right = l;
          l.parent = p;
        } else p.right = null;

        x.left = p;
        p.parent = x;
      }
    }
  }

  search(key) {
    let r = this._root;

    while (r) {
      if (key === r.key) {
        this.splay(r);
        return r;
      }

      if (key > r.key) {
        if (r.right) r = r.right;
        else {
          this.splay(r);
          return null;
        }
      } else {
        if (r.left) r = r.left;
        else {
          this.splay(r);
          return null;
        }
      }
    }
  }

  delete(key) {
    const result = this.search(key);

    if (!result) return false;

    let r = this._root;

    if (!r.left && !r.right) {
      this._root = null;
    } else if (!r.left) {
      this._root = this._root.right;
      this._root.parent = null;
    } else if (!r.right) {
      this._root = this._root.left;
      this._root.parent = null;
    } else {
      const leftMax = this.maxNode(r.left);
      this.splay(leftMax);
      this._root.right = this._root.right.right;
      this._root.right.parent = this._root;
    }
    this._size--;
  }

  maxNode(n = this._root) {
    if (n) {
      while (n.right) n = n.right;
    }
    return n;
  }

  minNode(n = this._root) {
    if (n) {
      while (n.left) n = n.left;
    }
    return n;
  }

  keys() {
    const keysArray = [];
    inorderTraverse(this._root, keysArray);
    return keysArray;
  }

  isEmpty() {
    return this._root === null;
  }

  get size() {
    return this._size;
  }

  get root() {
    return this._root;
  }
}

function inorderTraverse(node, array) {
  if (node === null) return;
  inorderTraverse(node.left, array);
  array.push(node.key);
  inorderTraverse(node.right, array);
}
