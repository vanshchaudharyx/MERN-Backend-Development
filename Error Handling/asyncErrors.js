const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const ExpressError = require("./expressError");

app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

main().then(() => {
  console.log("Connection Successful");
});
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
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
// New and Create Route==>
// GET --> /chats/new
// POST --> /chats
//For Creating new chat we create a button on main page from that button there is a get request on (/chats/new).
// And that /chats/new renders a form that will post message on /chats route.

// New route-->

app.get("/chats/new", (req, res) => {
  throw new ExpressError(404, "Page not found");
  //   res.render("new.ejs");
});

//Create Route-->
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body; //We dont directly get data from body we need to parse that data.
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("Chat was saved");
    })
    .then((err) => {
      console.log(err);
    });
  res.redirect("/chats");
  // console.log(newChat);
  // res.send("Working");
});
//Show route
app.get("/chat/:id", async (req, res, next) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  if (!chat) {
    //throw new expressError(404,"Chat now found"); //Whenever any error throw asynchronously then in that case express bydefault not calling to next.
    next(new expressError(404, "Chat now found")); //Now we explicitly call.
  }
  res.render("show.ejs", { chat });
});
//Edit Route
// Get /chats/:id/edit --> display a edit form-> msg edit next req is put request tp database
// Update route PUT /chats/:id
// Edit Route-->
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update Route-->
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: Newmsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: Newmsg },
    { runValidators: true, new: true },
  );
  console.log(updatedChat);
  res.redirect("/chats");
});
//Destroy Route-->
// DELETE--> /chats/:id
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let delChat = await Chat.findByIdAndDelete(id);
  console.log(delChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("root is working");
});

//Error Handling middleware-->
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occured" } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
