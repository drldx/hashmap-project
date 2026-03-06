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
      arr.push(`${tmp.value.key}: ${tmp.value.value}`);
      tmp = tmp.nextNode;
    }
    return arr.join(" -> ");
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
    if (this.buckets[hash]) {

      let tmp = this.buckets[hash].head;
      while (tmp !== null) {
        if (tmp.value.key === key) {
          return true;
        }
        tmp = tmp.nextNode;
      }
    } else {
      return false;
    }
  }

}

const map = new HashMap();
map.set('Rama', 'Pottan');
map.set('Sita', 'Baddie');
map.set('Carlos', 'Player');
// map.set('Carlos', 'Fyunda');
// map.set('Carlos', 'Monna');
// map.set("Carlos", "Player");
map.set("l", "Collision1");
map.set("Mario", "Another");
map.set("Carlos", "Updated");
console.log(map.buckets);
console.log(map.buckets[3].toString());

console.log(map.get('Rama'));
console.log(map.has('l'));

