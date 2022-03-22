class LLNode {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  get(index = -1) {
    if (index < 0 || index >= this.size) return console.log('Wrong index');

    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  push(element) {
    const node = new LLNode(element);

    let current;

    if (this.head == null) this.head = node;
    else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.size++;
  }

  insertAt(element, index) {
    if (index < 0 || index > this.size) return console.log('Wrong index');
    else {
      const node = new LLNode(element);
      let curr, prev;

      curr = this.head;

      if (index == 0) {
        node.next = this.head;
        this.head = node;
      } else {
        curr = this.head;
        let it = 0;

        while (it < index) {
          it++;
          prev = curr;
          curr = curr.next;
        }

        node.next = curr;
        prev.next = node;
      }
      this.size++;
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) return console.log('Wrong index');
    else {
      let curr,
        prev,
        it = 0;

      curr = this.head;
      prev = curr;

      if (index === 0) {
        this.head = curr.next;
      } else {
        while (it < index) {
          it++;
          prev = curr;
          curr = curr.next;
        }

        prev.next = curr.next;
      }
      this.size--;

      return curr.element;
    }
  }

  indexOf(element) {
    let count = 0;
    let current = this.head;

    while (current != null) {
      if (current.element === element) return count;
      count++;
      current = current.next;
    }

    return -1;
  }

  isEmpty() {
    return this.size == 0;
  }

  listSize() {
    return this.size;
  }

  listPrint() {
    let curr = this.head;
    let str = '';
    while (curr) {
      str += curr.element + ' ';
      curr = curr.next;
    }
    console.log(str);
  }

  reverse() {
    let previous = this.head;
    let current = this.head.next;
    previous.next = null;

    while (current) {
      const next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }

    this.head = previous;
  }

  toArray() {
    let len = this.listSize();

    let arr = new Array(len);

    let index = 0;
    var curr = this.head;

    while (curr != null) {
      arr[index++] = curr.element;
      curr = curr.next;
    }

    return arr;
  }

  clear() {
    this.head = null;
    this.size = 0;
  }
}
