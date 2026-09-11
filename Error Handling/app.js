const express = require("express");
const app = express();

app.get("/err", (req, res) => {
  abcd = abcd;
});

//Error Handling Middleware-->
app.use((err, req, res, next) => {
  console.log("======");
  //   next(); //Whenever we call next then the next will search for non error handling middleware.
  next(err); //If we want to trigger the express's defalut error handler
});

app.listen(8080, () => {
  console.log("Server listening to port 8080");
});
