const tree = {
  value: 1,
  leftNode: {
    value: 2,
    leftNode: {
      value: 4,
      leftNode: null,
      rightNode: null,
    },
    rightNode: {
      value: 5,
      leftNode: null,
      rightNode: null,
    },
  },
  rightNode: {
    value: 3,
    leftNode: {
      value: 6,
      leftNode: null,
      rightNode: null,
    },
    rightNode: {
      value: 7,
      leftNode: null,
      rightNode: null,
    },
  },
};
//先序遍历
const res = [];
const preorderTraversal = function (node) {
  if (node !== null) {
    res.push(node.value);
    preorderTraversal(node.leftNode);
    preorderTraversal(node.rightNode);
  }
};
preorderTraversal(tree);
console.log("先序遍历======>", res);
//中序遍历
const res2 = [];
const middleOrderTraversal = function (node) {
  if (node !== null) {
    middleOrderTraversal(node.leftNode);
    res2.push(node.value);
    middleOrderTraversal(node.rightNode);
  }
};
middleOrderTraversal(tree);
console.log("中序遍历======>", res2);

//后续遍历
const res3 = [];
postorderTraversal = function (node) {
  if (node !== null) {
    postorderTraversal(node.leftNode);
    postorderTraversal(node.rightNode);
    res3.push(node.value);
  }
};
postorderTraversal(tree);
console.log("后序遍历======>", res3);
