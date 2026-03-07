export { HashMap };

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

    //loadfactor check
    if (this.length() / this.capacity >= this.loadFactor) {
      this.capacity *= 2;

      let currVals = this.entries();

      this.buckets = new Array(this.capacity);

      //cloning
      currVals.forEach(item => {
        this.set(item[0], item[1]);
      });
    }

    let hash = this.hash(key);
    //repeated key check;
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
    if (!this.buckets[hash]) return false;

    if (this.buckets[hash].length() === 1) {
      this.buckets[hash] = null;
      return true;
    }

    let tmp = this.buckets[hash].head;

    if (tmp.value.key === key) {
      this.buckets[hash].head = tmp.nextNode;
      return true;
    }

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

  //number of keys in the hashmap;
  length() {
    let lenArr = this.buckets.filter(item => item);
    let count = 0;

    lenArr.forEach(item => {
      let tmp = item.head;

      while (tmp !== null) {
        count++;
        tmp = tmp.nextNode;
      }
    });
    return count;
  }

  clear() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  keys() {
    let keyArr = [];
    let nodes = this.buckets.filter(item => item)
    nodes.forEach(item => {
      let tmp = item.head;
      while (tmp !== null) {
        keyArr.push(tmp.value.key);
        tmp = tmp.nextNode;
      }
    })
    return keyArr;
  }

  values() {
    let valArr = [];
    let nodes = this.buckets.filter(item => item)
    nodes.forEach(item => {
      let tmp = item.head;
      while (tmp !== null) {
        valArr.push(tmp.value.value);
        tmp = tmp.nextNode;
      }
    })
    return valArr;
  }

  entries() {
    let kvArr = [];
    let nodes = this.buckets.filter(item => item)
    nodes.forEach(item => {
      let tmp = item.head;
      while (tmp !== null) {
        kvArr.push([tmp.value.key, tmp.value.value]);
        tmp = tmp.nextNode;
      }
    })
    return kvArr;
  }

}

// const map = new HashMap();

// map.set('apple', 'red')
// map.set('banana', 'yellow')
// map.set('carrot', 'orange')
// map.set('dog', 'brown')
// map.set('elephant', 'gray')
// map.set('frog', 'green')
// map.set('grape', 'purple')
// map.set('hat', 'black')
// map.set('ice cream', 'white')
// map.set('jacket', 'blue')
// map.set('kite', 'pink')
// map.set('lion', 'golden')
// map.set('moon', 'silver')
//
// map.set('apple', 'green');
// map.set('banana', 'orange');
// map.set('hat', 'red');
//
//
// console.log(map.buckets.length);
//
// console.log(map.length());
// console.log(map.buckets[28].toString());
// console.log(map.buckets);
// console.log(map.remove('dhahhaha'));
