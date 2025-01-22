import Tree from "./tree.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const root = Tree.buildFrom(arr);
const t = new Tree(root);

t.prettyPrint();

t.insert(66)
t.insert(65)

t.prettyPrint();
