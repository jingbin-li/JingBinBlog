var moveZeroes = function (nums) {
  let startZeroIndex = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0 && startZeroIndex === -1) {
      startZeroIndex = i;
    }
    if (nums[i] !== 0 && startZeroIndex !== -1) {
      [nums[i], nums[startZeroIndex]] = [nums[startZeroIndex], nums[i]];
      startZeroIndex = i;
      console.log(nums);
    }
  }
};
/*
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
*/
const x = [0, 1, 0, 3, 12];
console.log(x);
console.log('=====');
const y = moveZeroes(x);
// console.log(x);
