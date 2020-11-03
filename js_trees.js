const myTree = ['A', [['B', [['E'], ['F']]], ['C'], ['D', [['G'], ['J'], ['K']]]]];


// ONE

const depthFirstSearch = tree => {
  const [name, children] = tree;

  console.log(name);

  if (!children) {
    return;
  }

  return children.map(depthFirstSearch);
}

depthFirstSearch(myTree);


// TWO

const treeToLowerCase = tree => {
  const [name, children] = tree;

  const lowerCaseName = name.toLowerCase();

  if (!children) {
    return [lowerCaseName];
  }

  return [lowerCaseName, children.map(treeToLowerCase)];
}

console.log(JSON.stringify(treeToLowerCase(myTree)));


// THREE - BINARY SEARCH TREE

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const node = new Node(data);

    if (!this.root) {
      this.root = node;
      return this;
    }

    let current = this.root;

    while(current) {
      if (data.id < current.data.id) {
        // Move Left
        if (!current.left) {
          current.left = node;
          return this;
        } else {
          current = current.left;
        }
      } else {
        // Move Right
        if (!current.right) {
          current.right = node;
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  lookup(id) {
    if (!this.root) {
      console.log('noop');
      return null;
    }

    if (this.root.data.id === id) {
      return this.root;
    } else {
      let current = this.root;

      while (current) {
        if (id < current.data.id) {
          if (!current.left) {
            return null;
          } else {
            current = current.left;
          }
        } else if (id > current.data.id) {
          if (!current.right) {
            return null;
          } else {
            current = current.right;
          }
        } else {
          return current;
        }
      }
    }
  }

  delete(id) {
    const removeNode = (node, id) => {
      if (!node) {
        return null;
      }

      if (id === node.data.id) {
        // node has no children
        if (!node.left && !node.right) {
          return null;
        }
        // node has no left child
        if (!node.left) {
          return node.right;
        }
        // node has no right childe
        if (!node.right) {
          return node.left;
        }
        // node has two children
        let tempNode = node.right;
        while (tempNode.left) {
          tempNode = tempNode.left;
        }
        node.data.id = tempNode.data.id;
        node.right = removeNode(node.right, tempNode.data.id);
        return node;
      } else if (id < node.data.id) {
        node.left = removeNode(node.left, id);
        return node;
      } else {
        node.right = removeNode(node.right, id);
      }
    }
    this.root = removeNode(this.root, id);
  }

  findMin() {
    let current = this.root;

    while (current.left) {
      current = current.left;
    }

    return current;
  }

  findMax() {
    let current = this.root;

    while (current.right) {
      current = current.right;
    }

    return current;
  }
}

const bst = new BST();
const data = {
  JOHN: {
    name: 'John',
    age: 24,
    position: 'Software Engineer',
    id: 20,
  },
  STEVE: {
    name: 'Steve',
    age: 34,
    position: 'Software Engineer',
    id: 10,
  },
  RUBEN: {
    name: 'Ruben',
    age: 31,
    position: 'Software Engineer',
    id: 15,
  },
  MAGGIE: {
    name: 'Maggie',
    age: 38,
    position: 'Senior Software Engineer',
    id: 5,
  },
  YOON: {
    name: 'Yoon',
    age: 48,
    position: 'CTO',
    id: 25,
  },
};

bst.insert(data.JOHN).insert(data.STEVE).insert(data.MAGGIE).insert(data.RUBEN).insert(data.YOON);

console.log(bst.lookup(25));
console.log(bst.findMin());
bst.delete(5);
console.log(bst.findMin());
console.log(bst);