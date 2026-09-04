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

const User = mongoose.model("User", userSchema); //Mongosdb automatically convert singular collection into plural.
// const Employee = mongoose.model("Employee", userSchema);

//Insert==> Inserting one
// const user1 = new User({ name: "Adam", email: "adam@yahoo.in", age: 22 });
// const user2 = new User({ name: "Eve", email: "eve@google.com", age: 22 });
//At this time this only load in memory but not in db.
// user1.save(); //This save is also an asynchronus function return an promise.
// user2
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//Inserting Multiple==>
// User.insertMany([
//   { name: "Tony", email: "tony@gmail.com", age: 21 },
//   { name: "Bruce", email: "bruce@gmail.com", age: 22 },
//   { name: "Peter", email: "peter@gmail.com", age: 22 },
// ]).then((data) => {
//   console.log(data);
// });

//Note
// Mongoose uses Operation Buffering
// Mongoose lets you start using your models immediately,without waiting for mongoose to establish a connection to MongoDB.

//Find operation==>
// Model .find() //returns a Query Object(thennable).
// * Mongoose Queries are not promises.But they have a .then().
User.find({})
  .then((res) => {
    console.log(res); //we can also console.log(res[0].name);
  })
  .catch((err) => {
    console.log(err);
  });

// Update==> model.updateOne()  ,,model.updateMany()
//This method also return a thennable object.
User.updateOne({ name: "Bruce" }, { age: 23 })
  .then((res) => {
    console.log(res); //Gives object in result.
  })
  .catch((err) => {
    console.log(err);
  });

// Model.findOneAndUpdate()
User.findOneAndUpdate(
  { name: "Bruce" },
  { email: "bruce1233@gmail.com" },
  { new: true },
)
  //New returns the modified document rather than the original document.
  .then((res) => {
    console.log(res); //Gives object in result.
  })
  .catch((err) => {
    console.log(err);
  });

//Also we can do that model.findByIdAndUpdate()

// DELETE==>
// Model.deleteOne() //return count
// Model.deleteMany() //return count
User.deleteOne({ name: "Peter" }).then((res) => {
  console.log(res);
});
//This above delete method do not showed that what is deleted

// These methods shows which value is deleted
// Model.findByIdAndDelete()
// model.findOneAndDelete()


