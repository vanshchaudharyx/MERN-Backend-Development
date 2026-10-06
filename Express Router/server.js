const express = require("express");
const app = express();
const users = require("./routes/user.js"); //We require it but we also use it.
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.get("/getcookies", (req, res) => {
  res.cookie("greet", "hello"); //Greet is the name of cookie and hello is the value.
  res.send("Send you some cookies");
});
app.get("/greet", (req, res) => {
  let { name = "anonymous" } = req.cookies;
  res.send(`Hello ${name}`);
});
app.get("/", (req, res) => {
  console.dir(req.cookies); //We cannot directly parse cookie from request is not possible so we use a middleware "cookieparser".
  res.send("Hii! i m root");
});
app.use("/users", users); //We want our all paths use users.
app.use("/posts", posts);

app.listen(3000, () => {
  console.log("Server is listening to 3000");
});
// Now we seprate our routes based upon our models.
