import Tree from "./tree.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 68, 6345, 324];
// const root = Tree.buildFrom(arr);
const t = new Tree(arr);

t.prettyPrint();

t.insert(65)
t.insert(323)

t.prettyPrint();

// t.root = Tree.deleteItem(3, t.root);
t.deleteItem(3);
console.log('Deleted 3')

t.prettyPrint();

// t.root = Tree.deleteItem(5, t.root);
t.deleteItem(5);
console.log('Deleted 5')

t.prettyPrint();

// t.root = Tree.deleteItem(67, t.root);
t.deleteItem(324);
console.log('Deleted 324')

t.prettyPrint();

// console.log(t.find(324))
// console.log(t.find(325))
// console.log(t.max());
// console.log(t.min());

// t.levelOrder();
// t.levelOrder(a => console.log(a.data));

console.log('--------------------------------')
// t.inOrder();
// t.inOrder(a => console.log(a.data));


console.log('Height: ' + t.height());

// const tt = new Tree();
// console.log('Height: ' + tt.height());

const n23 = t.find(23);
const n24 = t.find(24);
const n23h = t.depth(n23);
const n24h = t.depth(n24);
console.log(n23h);
console.log(n24h);

let b = t.isBalanced();
console.log(b);

t.insert(67)

t.prettyPrint();


b = t.isBalanced();
console.log(b);

console.log('--------------------------------')

t.rebalance();
t.prettyPrint();
console.log('--- REBALANCED ---');