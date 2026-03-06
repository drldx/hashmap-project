class Node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  prepend(value) {
    this.head = new Node(value, this.head);
  }

  append(value) {
    if (this.head === null) {
      this.prepend(value);
      return;
    }
    let tmp = this.head;
    while (tmp.nextNode !== null) {
      tmp = tmp.nextNode;
    }
    tmp.nextNode = new Node(value);
  }

  toString() {
    let arr = [];
    let tmp = this.head;
    while (tmp !== null) {
      arr.push(tmp.value);
      tmp = tmp.nextNode;
    }
    return arr.join(" ->");
  }
}

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
      //doubt in using key.length or baseSize of array 16;
    }
    return hashCode;
  }

  set(key, value) {
    let hash = this.hash(key);
    let list = new LinkedList();
    list.append({ key, value });

    if (this.buckets[hash]) {
      let tmp = this.buckets[hash].head;

      while (tmp.nextNode !== null) {
        tmp = tmp.nextNode;
      }

      if (tmp.value.key === key) {
        this.buckets[hash] = list;
        return;
      }
      this.buckets[hash].append({ key, value });
      return;
    }
    this.buckets[hash] = list;
  }

}

const map = new HashMap();
map.set('Rama', 'Pottan');
map.set('Sita', 'Baddie');
map.set('Carlos', 'Player');
map.set('Carlos', 'Fyunda');
console.log(map.buckets);
console.log(map.buckets[12]);

console.log(map.buckets.length);
