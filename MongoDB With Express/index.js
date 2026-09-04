const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main().then(() => {
  console.log("Connection Successful");
});
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
// let chat1 = new Chat({
//   from: "neha",
//   to: "priya",
//   msg: "send me your sheets",
//   created_at: new Date(), //This is a date class that generate a random date.
// });
// chat1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Index route
// Get /chats--> show all chats.
app.get("/chats", async (req, res) => {
  let chats = await Chat.find(); //This is function that take data from database , it is an asynchronus funtion and return a promise.
  // console.log(chats);
  // console.log(chats[0].from);
  // res.send("working");
  res.render("index.ejs", { chats });
});
app.get("/", (req, res) => {
  res.send("root is working");
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
