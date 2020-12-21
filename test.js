function test() {
  this.a = new test1();

  this.a.test2( ()=> {
    console.log(this);
  });
}
function test1() {
  this.test2 = function (a) {
    a();
  };
}
const x1 = new test();
