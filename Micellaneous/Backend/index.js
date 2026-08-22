const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true })); //For parsing
app.use(express.json); //For parsing JSON data

app.listen(port, () => {
  console.log("Listening to port:", port);
});
app.get("/register", (req, res) => {
  let { user, password } = req.query;
  res.send(`Standard GET response Welcome ${user}!`);
});
app.post("/register", (req, res) => {
  res.send("Standard POST response");
  console.log(req.body); //At this point express don't understand what we sent,so we need to parse it for express.
  // Handling Post Request-
  // Set up POST request route to get some response.

  //Parse POST request data.
}); //In post request we have body , we dont observe that body in url but this recieved at the backend of server.
//Let try with forms.
//How to get body in post requests.
// In post method data not sent through query strings ,sent through request body
