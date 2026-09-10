const express = require("express");
const app = express();

//Middleware-->response send
// app.use(middleware)
//app.use executes this with every incoming request. so it sends same response to every route,thats why we dont reach to the next paths.
app.use((req, res, next) => {
  console.log("Hii i m 1st middleware"); // If this sends a response then middlewares stop or it can call next middleware or next control.
  //   res.send("Middleware finished");
  next();
  //   console.log("This is after next()");--> This shows u r not a giid progrmmer
});

app.use((req, res, next) => {
  console.log("Hii i m 2nd middleware"); // If this sends a response then middlewares stop or it can call next middleware or next control.
  //   res.send("Middleware finished");
  next();
});

app.get("/", (req, res) => {
  res.send("Hii! I m root");
});

app.get("/random", (req, res) => {
  res.send("This is a random page");
});

app.listen(8080, () => {
  console.log("Server listening to port 8080");
});
