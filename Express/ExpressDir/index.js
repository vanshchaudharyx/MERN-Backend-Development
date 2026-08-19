const express = require("express"); //This is actually a function, we execute it
const app = express(); // We store that value in a variable named as app.
//This app is actually a object.
// console.dir(app);
//app.listen is a method that listen for incoming requests
let port = 3000; //By default port that we use for making custom servers.
// *Port- are the logical end point of a network connection that is used to exchange information bw a web server and a web client.
//Listen make a web server that listen for incoming API requests.
app.listen(port, () => {
  //When this web server starts the we print this.
  console.log(`app is listening on port ${3000}`);
});
// After this request a server is started and continously listening for request.
//We send requests on this server by opening localhost:3000 in our system.

// Use method in app listen all requests.
app.use((req, res) => {
  //   console.log(req); //This print a object in which differnt types of methods and properties.
  console.log("new incoming request");
  //   res.send("This is a basic response");
  //We can also send object,html
  res.send({
    name: "Vansh",
    //Express convert the JS object in JSON notation.
  });
});
// For sending object we see 2 objects on detail.
// request objects , response object
// Whenever we send a https request these are basically text based request, but express converted this request in to an object.

//Routing--->It is process for selecting a path for traffic in a network between or accross multiple networks.
// There are multiple routes in websites.
// In app.use same response for every route and listen all requests.
// app.get("path",callback)

// There is only one response for one path.
app.get("/", (req, res) => {
  res.send("You contacted root path");
});
