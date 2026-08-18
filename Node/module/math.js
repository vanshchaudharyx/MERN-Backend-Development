const sum = (a, b) => a + b;
const mul = (a, b) => a * b;
const g = 9.8;
const PI = 3.14;
// if we want to use these properties in another file in same directory.

// module.exports = 123;
//module.exports is special object contain all things that a file want to send another file.
//If we want to send these all values .
let obj = {
  sum: sum,
  mul: mul,
  g: g,
  PI: PI,
};
module.exports = obj;
