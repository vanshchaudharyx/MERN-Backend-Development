// Process object=>
// -Process-This object provides information about,and control over,the current Node.js process.
// -Process.argv-returns an array containing the command-line arguements passed when the node.js process was launched

// let args = process.argv;
// for (let i = 2; i < args.length; i++) {
//   console.log("Hello to", args[i]);
// }
//If we want to access the information of fruits. So we make a special file in fruit directory

const info=require("./fruits");
console.log(info);