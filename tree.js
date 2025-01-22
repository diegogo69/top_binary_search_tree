import Node from "./node.js";
import Queue from "./queue.js";

class Tree {
  constructor(root) {
    this.root = root;
  }

  // takes an array of data and turns it into a balanced binary tree
  // The tree is populate with Node objects appropriately placed
  // (don’t forget to sort and remove duplicates!).
  // return the level-0 root node.
  static #createBST(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    if (mid < 0 || mid >= arr.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const rootNode = new Node(arr[mid]);
    rootNode.left = this.#createBST(arr, start, mid - 1);
    rootNode.right = this.#createBST(arr, mid + 1, end);
    return rootNode;
  }

  static #sortArr(arr) {
    const sorted = [];

    for (let el of arr) {
      if (sorted.includes(el)) continue;
      sorted.push(el);
    }

    return sorted.sort((a, b) => a - b);
  }

  static buildFrom(arr) {
    const sorted = this.#sortArr(arr);
    console.log(sorted);

    return this.#createBST(sorted, 0, sorted.length - 1);
  }

  static max(node = this.root) {
    if (node.right === null) return node

    node = this.max(node.right);

    return node;
  }

  static min(node = this.root) {
    if (node.left === null) return node

    node = this.min(node.left)

    return node
  }



  insert(value, node = this.root) {
    if (node === null) {
      // node = new Node(value);
      return true;
    }

    // No duplicates allowed
    if (value > node.data) {
      if (this.insert(value, node.right)) {
        node.right = new Node(value);
      }
    } else if (value < node.data) {
      if (this.insert(value, node.left)) {
        node.left = new Node(value);
      }
    }

    return;
  }

  static deleteItem(value, node) {
    // Item with no children
    if (node === null) return null;

    // Compare given value with the value stored in current node
    // If greater delete recursively in right node
    // If lesser delete recursively in left node
    // If equal eval cases based on the node children:
    // leaf node, single child or two children 
    if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else {

      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      // Remove Node with two children

      // First. Look for the minimun of the node's right child
      const minimunNode = this.min(node.right);
      
      // Take its value. And remove the node (single child removal)
      const minimunVal = minimunNode.data;
      node = this.deleteItem(minimunVal, node);

      // Replace node's value with picked value
      node.data = minimunVal;
    } 

    // Return node to keep the chain
    return node;
  }

  find(value, node = this.root) {
    if (node === null) {
      console.log('Not found')
      return null
    }

    if (value > node.data) {
      return this.find(value, node.right);

    } else if (value < node.data) {
      return this.find(value, node.left);

    } else { 
      console.log('Found!')
      return node
    }
  }

  levelOrder(fn) {
    const queue = new Queue();

    queue.add(this.root);

    let node = queue.get();

    while (node !== undefined) {
      if (node !== null) {
        // Visit node
        fn(node);
  
        // Add children to queue
        queue.add(node.left);
        queue.add(node.right);
      }

      node = queue.get();
    }
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

export default Tree;
