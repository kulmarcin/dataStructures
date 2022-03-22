class QueueItem {
  constructor(item) {
    this.next = null;
    this.value = item;
  }
}

export class Queue {
  constructor(capacity = null) {
    this.capacity = +capacity || null; // optional - max size
    this.firstItem = null;
    this.lastItem = null;
    this.size = 0;
  }

  sizeQueue() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.capacity ? this.size === this.capacity : false;
  }

  enqueue(item) {
    if (!this.isFull()) {
      const newItem = new QueueItem(item);

      if (this.isEmpty()) {
        this.firstItem = newItem;
        this.lastItem = newItem;
      } else {
        this.lastItem.next = newItem;
        this.lastItem = newItem;
      }

      this.size++;
    }
  }

  dequeue() {
    let removedItem = null;

    if (!this.isEmpty()) {
      removedItem = this.firstItem.value;
      this.firstItem = this.firstItem.next;
      this.size--;
    }

    return removedItem;
  }

  peek() {
    return this.firstItem.value;
  }

  print() {
    if (this.isEmpty()) {
      return '';
    }

    let current = this.firstItem;
    let str = `${current.value}`;

    while (current.next) {
      current = current.next;
      str = `${str}, ${current.value}`;
    }

    return console.log(str);
  }
}
