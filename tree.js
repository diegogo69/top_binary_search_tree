import Node from "./node.js";
import Queue from "./queue.js";

class Tree {
  constructor(arr = null) {
    this.root = Tree.buildFrom(arr);
  }

  #callbackErr =
    "ARGUMENT ERROR: A callback function is required as first argument";

  // Helper function that receives a sorted array as argument
  // Builds a tree based on the given start and end indices
  // Calculating the middle point, to create a node with its value
  // Recursively builds its left and right subtree
  static #createBST(arr, start, end) {
    if (arr == null) return null;
    
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

  // Helper function that takes an array as argument
  // And creates a sorted copy with no duplicate values
  static #sortArr(arr) {
    if (arr == null) return null;

    const sorted = [];

    for (let el of arr) {
      if (sorted.includes(el)) continue;
      sorted.push(el);
    }

    return sorted.sort((a, b) => a - b);
  }

  // takes any array of data and turns it into a balanced binary tree
  // The tree is populate with Node objects appropriately placed
  // With no duplicate values. Returns the level-0 root node.
  static buildFrom(arr) {
    if (arr === null) return null;

    const sorted = Tree.#sortArr(arr);
    console.log(sorted);

    return Tree.#createBST(sorted, 0, sorted.length - 1);
  }

  // Helper functions to find the maximun and miniminum value
  // Of a given subtree starting from the given node
  // Node is instance Tree root node by default
  static max(node = this.root) {
    if (node.right === null) return node;

    node = this.max(node.right);

    return node;
  }

  static min(node = this.root) {
    if (node.left === null) return node;

    node = this.min(node.left);

    return node;
  }

  deleteItem(value, node = this.root) {
    // Item with no children
    if (node === null) return null;

    // Compare given value with the value stored in current node
    // If greater delete recursively in right node
    // If lesser delete recursively in left node
    // If equal eval cases based on the node children:
    // leaf node, single child or two children
    if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
      return node;
    }

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
      return node;
    }

    // Node with no children
    if (!node.left && !node.right) {
      return null;
    }

    // Node with single child
    if (!node.left) {
      return node.right;
    }

    if (!node.right) {
      return node.left;
    }

    // Node with two children

    // Find the minimun node from the node's right child
    // Store its value and remove the node (it's a single child removal)
    // Replace node's value with stored value
    const minimunNode = Tree.min(node.right);
    const minimunVal = minimunNode.data;
    node = this.deleteItem(minimunVal, node);
    node.data = minimunVal;

    return node;
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

  find(value, node = this.root) {
    if (node === null) {
      console.log("Not found");
      return null;
    }

    if (value > node.data) {
      return this.find(value, node.right);
    } else if (value < node.data) {
      return this.find(value, node.left);
    } else {
      console.log("Found!");
      return node;
    }
  }

  levelOrder(fn) {
    if (typeof fn !== "function") throw this.#callbackErr;

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

  inOrder(fn, node = this.root) {
    if (typeof fn !== "function") throw this.#callbackErr;

    if (node === null) return;

    this.inOrder(fn, node.left);

    fn(node);

    this.inOrder(fn, node.right);
  }

  preOrder(fn, node = this.root) {
    if (typeof fn !== "function") throw this.#callbackErr;

    if (node === null) return;

    fn(node);

    this.inOrder(fn, node.left);

    this.inOrder(fn, node.right);
  }

  postOrder(fn, node = this.root) {
    if (typeof fn !== "function") throw this.#callbackErr;

    if (node === null) return;

    this.inOrder(fn, node.left);

    this.inOrder(fn, node.right);

    fn(node);
  }

  height(node = this.root) {
    if (node === null) return 0;

    let left = 0;
    let right = 0;

    if (node.left) left += 1;
    if (node.right) right += 1;

    left += this.height(node.left);
    right += this.height(node.right);

    return (left > right) ? left : right;
  }

  depth(node, current = this.root, count = 0) {
    if (node === null) return null;

    if (current === null) return null;

    // Compare node to current
    // If they're equal return count
    if (node === current) {
      return count;
    }

    // Check both right and left subtrees recursively
    // Until a match is found wich return the count
    // Or until the whole tree is searched but no match found
    // Each time the function is called recursively for a child node
    // It pass the current count of edges plus 1, that between current and child node
    return (
      this.depth(node, current.left, count + 1) ||
      this.depth(node, current.right, count + 1)
    );
  }

  // Write an isBalanced function that checks if the tree is balanced.
  // A balanced tree is one where the difference between heights
  // of the left subtree and the right subtree of every node
  // is not more than 1.
  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftH = this.height(node.left);
    const rightH = this.height(node.right);

    const difference = leftH - rightH;
    if (difference >= -1 && difference <= 1) {
      return true;
    }

    return false;
  }

  // Write a rebalance function that rebalances an unbalanced tree.
  // Tip: You’ll want to use a traversal method to provide
  // a new array to the buildTree function.

  rebalance() {
    // Create array for tree values
    const treeValues = [];

    // Traverse tree and populate array
    this.inOrder((node) => treeValues.push(node.data));

    // build a new balanced tree
    this.root = Tree.buildFrom(treeValues);
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
