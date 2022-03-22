class StackItem {
  constructor(value) {
    (this.prev = null), (this.value = value);
  }
}

export class Stack {
  constructor(capacity = null) {
    this.capacity = +capacity || null; //it's optional - max size
    this.lastItem = null;
    this.size = 0;
  }

  sizeStack() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.capacity ? this.size === this.capacity : false;
  }

  push(item) {
    if (!this.isFull()) {
      const newItem = new StackItem(item);

      if (!this.isEmpty()) {
        newItem.prev = this.lastItem;
      }

      this.lastItem = newItem;
      this.size++;
    }
  }

  pop() {
    let removedItem = null;

    if (!this.isEmpty()) {
      removedItem = this.lastItem.value;
      this.lastItem = this.lastItem.prev;
      this.size--;
    }

    return removedItem;
  }

  peek() {
    return this.lastItem.value;
  }

  print() {
    if (this.isEmpty()) {
      return '';
    }

    let current = this.lastItem;
    let str = `${current.value}`;

    while (current.prev) {
      current = current.prev;
      str = `${current.value},${str}`;
    }

    return console.log(str);
  }
}
