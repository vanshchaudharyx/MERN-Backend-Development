const mongoose = require("mongoose");

main()
  .then((res) => {
    //If main successfully run then result come
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}
// Schema Validations
// Basically,Rules for Schema==>

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, //Same as not null in SQL.
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
  //if we do not follow type conatraint then there is validation failed error.
});
//At this point book schema is available now.

//Creating model
const Book = mongoose.model("Book", bookSchema);
//Now insert data in this==>
let book1 = new Book({
  title: "Mathematics",
  author: "RD Sharma",
  price: 1200,
});
book1
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// Validation in Updation
// All rules that are defined in schema that work only time of insertion not in the time of updation
//if we want that rules will work in the time of updation then we have a option that need to set true.
// runValidators:true