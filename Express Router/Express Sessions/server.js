const express = require("express");
const app = express();
const session = require("express-session"); //This is a middleware
const flash = require("connect-flash");
const path = require("path");

// app.use(
//   session({
//     secret: "mysupersecretstring",
//     resave: false,
//     saveUninitialized: true,
//   }),
// );
// app.get("/reqcount", (req, res) => {
//   req.session.count; //req.session tracks count of each session in which we madee our count variable.
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//   res.send(`You sent a request ${req.session.count} times`);
// });
// app.get("/test", (req, res) => {
//   res .send("Test successful");
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());
app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  // res.send(name);
  req.session.name = name;
  //Using connect-flash
  req.flash("success", "User registered successfully");
  res.redirect("/hello");
});
app.get("/hello", (req, res) => {
  // let { name = "anonymous" } = req.query;
  // console.log(req.session);
  // res.send(`Hello ${name}`);
  res.render("page.ejs", { name: req.session.name, msg: req.flash("success") }); //We will use this msg for showing the msg exactly once.
});
app.listen(3000, () => {
  console.log("Server is listening to 3000");
});
