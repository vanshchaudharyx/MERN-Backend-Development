const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

main().then(() => {
  console.log("Connection Successful");
});
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
Chat.insertMany([
  {
    from: "neha",
    to: "priya",
    msg: "send me your sheets",
    created_at: new Date(), //This is a date class that generate a random date.
  },
  {
    from: "rohit",
    to: "mohit",
    msg: "teach me JS callbacks",
    created_at: new Date(), //This is a date class that generate a random date.
  },
  {
    from: "amit",
    to: "sumit",
    msg: "all the best",
    created_at: new Date(), //This is a date class that generate a random date.
  },
  {
    from: "anita",
    to: "ramesh",
    msg: "bring me some fruits",
    created_at: new Date(), //This is a date class that generate a random date.
  },
  {
    from: "tony",
    to: "peter",
    msg: "send me your exam sheets",
    created_at: new Date(), //This is a date class that generate a random date.
  },
]);
