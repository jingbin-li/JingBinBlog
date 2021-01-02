function A() {
  this.test = function () {
    console.log(this === A);
    console.log(this); //A { test: [Function] }
    console.log(A); // [Function: A]
  };
}

const a = new A();
a.test(); //false
