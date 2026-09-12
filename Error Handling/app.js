const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.get("/err", (req, res) => {
  abcd = abcd;
});

//Create an admin route and send an error with a 403 status code.
app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to admin is forbidden");
});

//Error Handling Middleware-->
// app.use((err, req, res, next) => {
//   console.log("======");
//   //   next(); //Whenever we call next then the next will search for non error handling middleware.
//   //   next(err); //If we want to trigger the express's defalut error handler
// });

const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  }
  throw new ExpressError(401, "Access Denied");
};
app.get("/api", checkToken, (req, res) => {
  res.send("data");
});
app.use((err, req, res, next) => {
  //   console.log("==Error==");
  //   res.send(err);
  let { status, message } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("Server listening to port 8080");
});
