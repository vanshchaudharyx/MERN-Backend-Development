// For using math.js values so we use require keyword.
const someVal = require("./math"); // . means same we accesing file from same directory
console.log(someVal); //Print an object
//require-> a builtin function to include external modules that exists in separate files.

//We also use the function of math file.
console.log(someVal.sum(2, 5));
console.log(someVal.PI);
