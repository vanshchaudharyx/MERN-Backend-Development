const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
app.listen(port, () => {
  console.log("Listening on port", port);
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/ig/:username", (req, res) => {
  //We want data only for specific username.So we deconstruct the object.
  let { username } = req.params;
  const instaData = require("./data.json"); //We store all data from data.json into instaData, and this instaData is a JS object.
  const data = instaData[username]; //Stores only username specific data.
  //   console.log(username);
  if (data) {
    res.render("insta.ejs", { data });
  } else {
    res.render("error.ejs");
  }
});
