const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

// Using EJS.
app.set("view engine", "ejs"); //View means templates, Viewengine means used to render templates.
// We require express but we dont require ejs because ejs is automatically bydefault required by express.
//By the help of ejs we dont send responses we render responses.(String,array,boolean,obj,html).
//Now we create EJS file.
//Now we dont use response.send we use response.render and send our home.ejs file.
app.get("/", (req, res) => {
  res.render("home.ejs"); //Searches only on the basis of name not affected with .ejs.
});
//Now we think how response.render knows where our home.ejs is located, this is because express by default search views directory.
//Tp tackle this problem we use=>
app.set("views", path.join(__dirname, "/views")); //This path is a package and nened to require.
//This __dirname is the current working directory of index.js. This both combine and gives exact path to express.
app.get("/hello", (req, res) => {
  console.log("This is root");
  res.send("hello");
});
//If we run server from parent directory then there is error because this try to searches views in parent directory.
app.listen(port, () => {
  console.log("Listening on port", port);
});

// Passing data to EJS==>
app.get("/rolldice", (req, res) => {
  //Alternate way=>
  res.render("rolldice.ejs");
  // let diceVal=Math.floor(Math.random()*6)+1;
  //res.render("rolldice.ejs",{num:diceVal});
  //Now we access key in ejs file.
  // We dont generate data in EJS file.
  // we store data here
});
app.get("/getSix", (req, res) => {
  let diceVal = Math.floor(Math.random() * 6) + 1;
  res.render("getSixDice.ejs", { diceVal });
});

//Route for instagram.
app.get("/ig/:username", (req, res) => {
  let { username } = req.params;
  // console.log(username);
  res.render("instagram.ejs", { username });
});
