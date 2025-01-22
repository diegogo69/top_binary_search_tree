import Node from "./node.js";

class Tree {
  constructor(root) {
    this.root = root;
  }

  // takes an array of data and turns it into a balanced binary tree
  // The tree is populate with Node objects appropriately placed
  // (don’t forget to sort and remove duplicates!).
  // return the level-0 root node.
  static #createBST(arr, start, end) {
    if (start > end) return null

    const mid = Math.floor((start + end) / 2);
    if (mid < 0 || mid >= arr.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const rootNode = new Node(arr[mid]);
    rootNode.left = this.#createBST(arr, start, mid - 1);
    rootNode.right = this.#createBST(arr, mid + 1, end);
    return rootNode
  }

  static #sortArr(arr) {
    const sorted = [];

    for (let el of arr) {
     if (sorted.includes(el)) continue
     sorted.push(el);
    }

    return sorted.sort((a, b) => a - b);
  }

  static buildFrom(arr) {
    const sorted = this.#sortArr(arr);
    console.log(sorted)

    return this.#createBST(sorted, 0, sorted.length - 1);    
  }

  prettyPrint(node=this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

}

export default Tree