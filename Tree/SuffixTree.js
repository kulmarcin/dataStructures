class SuffixNode {
  constructor() {
    this.transition = {};
    this.suffixLink = null;
  }

  addTransition(node, [start, end], t) {
    this.transition[t] = [node, start, end];
  }

  isLeaf() {
    return Object.keys(this.transition).length === 0;
  }
}

export class SuffixTree {
  constructor() {
    this.text = '';

    this.root = new SuffixNode();
    this.bottom = new SuffixNode();
    this.root.suffixLink = this.bottom;

    this.s = this.root;
    this.k = 0;
    this.i = -1;
  }

  addString(str) {
    let temp = this.text.length;
    this.text += temp ? '⚇' + str : str;

    let [s, k, i] = [this.s, this.k, this.i];

    for (let j = temp; j < this.text.length; j++) {
      this.bottom.addTransition(this.root, [j, j], this.text[j]);
    }

    while (this.text[i + 1]) {
      i++;
      [s, k] = this.update(s, [k, i]);
      [s, k] = this.canonize(s, [k, i]);
    }

    [this.s, this.k, this.i] = [s, k, i];
    return this;
  }

  update(s, [k, i]) {
    let oldr = this.root;
    let [endPoint, r] = this.testAndSplit(s, [k, i - 1], this.text[i]);

    while (!endPoint) {
      r.addTransition(new SuffixNode(), [i, Infinity], this.text[i]);

      if (oldr != this.root) {
        oldr.suffixLink = r;
      }

      oldr = r;
      [s, k] = this.canonize(s.suffixLink, [k, i - 1]);
      [endPoint, r] = this.testAndSplit(s, [k, i - 1], this.text[i]);
    }

    if (oldr != this.root) {
      oldr.suffixLink = s;
    }

    return [s, k];
  }

  testAndSplit(s, [k, p], t) {
    if (k <= p) {
      let [s2, k2, p2] = s.transition[this.text[k]];

      if (t == this.text[k2 + p - k + 1]) {
        return [true, s];
      } else {
        let r = new SuffixNode();
        s.addTransition(r, [k2, k2 + p - k], this.text[k2]);
        r.addTransition(s2, [k2 + p - k + 1, p2], this.text[k2 + p - k + 1]);
        return [false, r];
      }
    } else {
      if (!s.transition[t]) return [false, s];
      else return [true, s];
    }
  }

  canonize(s, [k, p]) {
    if (p < k) return [s, k];
    else {
      let [s2, k2, p2] = s.transition[this.text[k]];

      while (p2 - k2 <= p - k) {
        k = k + p2 - k2 + 1;
        s = s2;

        if (k <= p) {
          [s2, k2, p2] = s.transition[this.text[k]];
        }
      }

      return [s, k];
    }
  }

  findLongestRepeatedSubstrings(n = 3) {
    let [text, root] = [this.text, this.root];
    let longestSubstrings = [];

    (function traverse(node, curStr = '') {
      if (node.isLeaf()) return;

      for (let t in node.transition) {
        let [s, a, b] = node.transition[t];
        if (!s.isLeaf()) {
          let curCurStr = curStr;
          let curSubStr = text.substring(a, b + 1);
          curCurStr = node === root ? curSubStr : curCurStr + curSubStr;

          longestSubstrings.push(curCurStr);
          traverse(s, curCurStr);
        }
      }
    })(root);

    return longestSubstrings.sort((a, b) => b.length - a.length).slice(0, n);
  }

  toString() {
    let text = this.text;

    function traverse(node, offset = '', ret = '') {
      for (let t in node.transition) {
        let [s, a, b] = node.transition[t];
        ret +=
          offset +
          '["' +
          text.substring(a, b + 1) +
          '", ' +
          a +
          ', ' +
          b +
          ']' +
          '\r\n';
        ret += traverse(s, offset + '\t');
      }
      return ret;
    }
    let res = traverse(this.root);
    return res;
  }

  print() {
    console.log(this.toString());
  }

  toArray() {
    // all substrings
    let text = this.text;

    function flatten(arr) {
      return arr.reduce(function (flat, toFlatten) {
        return flat.concat(
          Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
        );
      }, []);
    }

    function traverse(node) {
      let ret = [];
      for (let t in node.transition) {
        let [s, a, b] = node.transition[t];

        ret.push([text.substring(a, b + 1), a, b]);

        ret.push(traverse(s));
      }
      return ret;
    }

    let res = traverse(this.root);
    res = flatten(res);
    let temp = [];

    for (let i = 0; i < res.length; i++) {
      temp[i] = res.splice(0, 3);
    }

    for (let i = 0; i < temp.length; i++) {
      let temporary = temp[i][0];
      for (let j = i + 1; j < temp.length; j++) {
        if (temporary === temp[j][0]) {
          temp.splice(j, 1);
        }
      }
    }
    res = temp;
    return res;
  }
}
