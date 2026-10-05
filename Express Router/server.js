const express = require("express");
const app = express();
const users = require("./routes/user.js"); //We require it but we also use it.
const posts = require("./routes/post.js");
app.get("/", (req, res) => {
  res.send("Hii! i m root");
});
app.use("/users", users); //We want our all paths use users.
app.use("/posts", posts); 

// // Suppose we have multiple routes in this file.
// // Index-users
// app.get("/users", (req, res) => {
//   res.send("Get for user");
// });
// // Show users
// app.get("/users/:id", (req, res) => {
//   res.send("Get for user id");
// });
// // Post users
// app.post("/users", (req, res) => {
//   res.send("Post for users");
// });
// // Delete Users
// app.delete("/users", (req, res) => {
//   res.send("Post for user id");
// });

// // For posts
// // Index
// app.get("/posts", (req, res) => {
//   res.send("Get for posts");
// });
// // Show
// app.get("/posts/:id", (req, res) => {
//   res.send("Get for post id");
// });
// // POST
// app.post("/posts", (req, res) => {
//   res.send("POST for posts");
// });
// // Delete
// app.delete("/posts", (req, res) => {
//   res.send("Post for posts id");
// });

app.listen(3000, () => {
  console.log("Server is listening to 3000");
});
// Now we seprate our routes based upon our models.
