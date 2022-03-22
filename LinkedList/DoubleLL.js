class DoubleLLNode {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  listSize() {
    return this.size;
  }

  get(index = -1) {
    if (index < 0 || index >= this.size) return console.log('Wrong index');

    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  push(item) {
    const element = new DoubleLLNode(item);

    if (this.head === null) {
      this.head = element;
      this.tail = element;
    } else {
      this.tail.next = element;
      element.prev = this.tail;
      this.tail = element;
    }

    this.size++;
  }

  insertAt(item, index = 0) {
    if (index < 0 || index > this.size) return console.log('Wrong index');

    const element = new DoubleLLNode(item);

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

    this.size++;
  }

  removeAt(index = 0) {
    if (index < 0 || index >= this.size) return console.log('Wrong index');

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

    if (!this.head || !this.tail) {
      this.head = null;
      this.tail = null;
    }

    this.size--;
    return removedElement.element;
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

  reverse() {
    let current = this.head;
    this.head = this.tail;
    this.tail = current;

    while (current) {
      const prev = current.prev;
      const next = current.next;

      current.prev = next;
      current.next = prev;
      current = next;
    }
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

  isEmpty() {
    return this.size == 0;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
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
}
