const express = require("express");
const app = express();
let port = 3000;

app.listen(port, () => {
  //When this web server starts the we print this.
  console.log(`app is listening on port ${3000}`);
});
// Path Parameters=> This variable changes
app.get("/", (req, res) => {
  res.send("Hello i m root");
});
//This username is a variable info of this,saved in req
app.get("/:username/:id", (req, res) => {
  // console.log(req.params);//{ username: 'apna college', id: '123' }
  // we can also store these variables.
  let { username, id } = req.params;
  res.send(`Welcome to the page of ${username}`);
  //We can also send html
});

//Query Strings==>
// We send additional information in the form of query strings that info will store in query parameter of app.get's request object.
app.get("/search", (req, res) => {
  console.log(req.query); //{ q: '"Vansh"' }
  //we can also storein the form of ↓
  // let {q}=req.query;
  //res.send(q);
  res.send("No results"); //we can also send html based response.
  // res.send(`<h1> search result :${}`); Like this
});

