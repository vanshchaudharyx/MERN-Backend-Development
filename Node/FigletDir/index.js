//If we want to use the figlet then create this file inside figlet directory.,const figlet = require('figlet');
const figlet = require("figlet");
figlet("Hello World!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
