var foo = "global";
let bar = "global";

console.log(this.foo); // global
console.log(this.bar); // undefined
function test() {
  console.log(this);
}
test();
