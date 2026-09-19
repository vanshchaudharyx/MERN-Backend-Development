const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
  .then(() => console.log("Connected Successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationship");
}

//We take example of user and address for One to few relationship.

const userSchema = new Schema({
  username: String,
  addresses: [
    {
      Location: String,
      city: String,
    },
  ],
});
const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  let user1 = new User({
    username: "Vansh",
    addresses: [
      {
        // _id:false,
        Location: "LKO",
        city: "221B",
      },
      {
        Location: "LMP",
        city: "221BCC",
      },
    ],
  });
  let result = await user1.save();
  console.log(result);
};

addUsers();
//After adding user we observe that there is objectId for users as well as for individual address.
//If we dont want to create id for each address then we can use _id:false
