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
    if (!this.head) return false;
    while (tmp !== null) {
      arr.push(`${tmp.value.key}: ${tmp.value.value}`);
      tmp = tmp.nextNode;
    }
    arr.push('null');
    return arr.join(" -> ");
  }

  length() {
    let count = 0;
    if (this.head === null) return 0;
    let tmp = this.head;
    while (tmp !== null) {
      count++;
      tmp = tmp.nextNode;
    }
    return count;
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
    }
    return hashCode;
  }

  set(key, value) {
    let hash = this.hash(key);

    if (this.buckets[hash]) {
      let tmp = this.buckets[hash].head;

      while (tmp !== null) {
        if (tmp.value.key === key) {
          tmp.value = { key, value };
          return;
        }
        tmp = tmp.nextNode;
      }

      this.buckets[hash].append({ key, value });
      return;
    }

    let list = new LinkedList();
    list.append({ key, value });
    this.buckets[hash] = list;
  }

  get(key) {
    let hash = this.hash(key);

    if (this.buckets[hash]) {
      let tmp = this.buckets[hash].head;
      while (tmp !== null) {
        if (tmp.value.key === key) {
          return tmp.value.value;
        }
        tmp = tmp.nextNode;
      }
    } else {
      return null;
    }
  }

  has(key) {
    let hash = this.hash(key);
    if (!this.buckets[hash]) return false;

    let tmp = this.buckets[hash].head;
    while (tmp !== null) {
      if (tmp.value.key === key) {
        return true;
      }
      tmp = tmp.nextNode;
    }
    return false;
  }

  remove(key) {
    let hash = this.hash(key);
    let index = this.buckets[hash];
    if (!index) return false;
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (index.length() === 1) {
      this.buckets[hash] = null;
      return true;
    }

    let tmp = index.head;
    let prev;
    while (tmp !== null) {
      if (tmp.value.key === key) {
        prev.nextNode = tmp.nextNode;
        return true;
      }
      prev = tmp;
      tmp = tmp.nextNode;
    }
  }

}

const map = new HashMap();
map.set('Rama', 'Pottan');
map.set('Sita', 'Baddie');
map.set('Carlos', 'Player');

map.set("l", "Collision1");
map.set("Mario", "Another");
map.set("Carlos", "Updated");

console.log(map.buckets);

console.log(map.remove("l"));
console.log(map.buckets[12]);
console.log(map.buckets);

console.log(map.get('Rama'));
console.log(map.has('l'));

