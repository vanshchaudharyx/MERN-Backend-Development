const express = require("express");
const app = express();
let port = 3000;

app.listen(port, () => {
  //When this web server starts the we print this.
  console.log(`app is listening on port ${3000}`);
});
//Routing--->It is process for selecting a path for traffic in a network between or accross multiple networks.
// There are multiple routes in websites.
// In app.use same response for every route and listen all requests.
// app.get("path",callback)

// There is only one response for one path.
app.get("/", (req, res) => {
  res.send("Hello i m root");
});
app.get("/help", (req, res) => {
  res.send("You contacted help path");
});
app.get("/search", (req, res) => {
  res.send("You contacted search path");
});
//If a user request on a route that not exists then,there is a standard response or custom response.
app.get("*", (req, res) => {
  res.send("Invalid request");
});

app.post("/", (req, res) => {
  res.send("You send a post request to root");
  // We can post request by using hoppscotch.
});
 
