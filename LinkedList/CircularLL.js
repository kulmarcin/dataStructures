class CircularLLNode {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  push(item) {
    const element = new CircularLLNode(item);

    if (this.head === null) {
      this.head = element;
      this.tail = element;
    } else {
      this.tail.next = element;
      element.prev = this.tail;
      this.tail = element;
    }

    this.tail.next = this.head;
    this.head.prev = this.tail;

    this.size++;
  }

  get(index = -1) {
    let current;
    if (index < 0 || index >= this.size) return 'Wrong index';

    current = this.head;

    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current; // returns CircularLLNode
  }

  insertAt(item, index = 0) {
    if (index < 0 || index > this.size) return 'Wrong index';

    const element = new CircularLLNode(item);

    if (index === 0) {
      element.next = this.head;

      if (this.head) {
        this.head.prev = element;
      } else {
        this.tail = element;
      }

      this.head = element;
    } else if (index === this.size) {
      this.tail.next = element;
      element.prev = this.tail;
      this.tail = element;
    } else {
      let previous = this.head;

      for (let i = 0; i < index - 1; i++) {
        previous = previous.next;
      }

      element.next = previous.next;
      previous.next.prev = element;
      previous.next = element;
      element.prev = previous;
    }

    this.tail.next = this.head;
    this.head.prev = this.tail;

    this.size++;
  }

  removeAt(index = 0) {
    if (index < 0 || index >= this.size) return 'Wrong index';

    let removedElement = this.head;

    if (index === 0) {
      this.head.next.prev = null;
      this.head = this.head.next;
    } else if (index === this.size - 1) {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      let previous = this.head;

      for (let i = 0; i < index - 1; i++) {
        previous = previous.next;
      }

      removedElement = previous.next;
      previous.next = removedElement.next;
      removedElement.next.prev = previous;
    }

    if (this.head && this.tail) {
      this.tail.next = this.head;
      this.head.prev = this.tail;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size--;
    return removedElement.element;
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
    while (curr.next != this.head) {
      str += curr.element + ' ';
      curr = curr.next;
    }
    str += this.tail.element;
    console.log(str);
  }

  toArray() {
    let len = this.listSize();

    let arr = new Array(len);

    let index = 0;
    let curr = this.head;

    while (curr.next != this.head) {
      arr[index++] = curr.element;
      curr = curr.next;
    }

    arr[len - 1] = this.tail.element;

    return arr;
  }

  indexOf(element) {
    let count = 0;
    let current = this.head;

    while (current.next != this.head) {
      if (current.element === element) return count;
      count++;
      current = current.next;
    }

    if (this.tail.element === element) return this.size - 1;

    return -1;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}
