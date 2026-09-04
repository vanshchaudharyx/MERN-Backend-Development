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
    //Validator custom error
    min: [1, "Price is too low for selling"], // price: ValidatorError: Price is too low for selling
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

// Sometimes we have errors in validators , we can also change errors

// Book.findByIdAndUpdate(
//   "6a9a453a3b49dc00f4186b5c",
//   { price: -500 },
//   { runValidators: true },
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   }); //price: ValidatorError: Price is too low for selling
