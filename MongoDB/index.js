const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/test"); //This is the method takes time according to itself, These all are asynchronus process that takes time.
//27017 is the byu default port number for mongoDB

main()
  .then((res) => {
    //If main successfully run then result come
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
//Once our connections is succesfully established with mongo then we can apply crud operations.

// For defining schema we use mongoose.schama method.

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  //This is the blueprint for user collection.
});
//How we store document on mongoose.
// Models==> Model in mongoose is a class with which we construct documents

// const User = mongoose.model("User", userSchema); //Mongosdb automatically convert singular collection into plural.
const Employee = mongoose.model("Employee", userSchema);