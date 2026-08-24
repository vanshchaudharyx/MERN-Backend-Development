const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
// uuidv4(); We use this function where we want to create id
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Server working well");
});

let posts = [
  {
    id: uuidv4(),
    username: "apna college",
    content: "I love coding",
  },
  {
    id: uuidv4(),
    username: "vansh chaudhary",
    content: "Hardwork is important to achieve success",
  },
  {
    id: uuidv4(),
    username: "rahul kumar",
    content: "I got selected for my first internship",
  },
];
// Get data of all posts.
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//Implement :Post /post
// Create Route
// Post /posts  to add new post
// 2 routes
//* Serve the form    Get   /posts/new
//* Add the new post  Post  /posts

//We get all new info in the form of form and send to backend and from this form we accept a post request and add new post.
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  // console.log(req.body);
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
  // res.send("post request working");
});

// For connecting different pages we use redirect
// res.redirect(url);

// Implement:Get/post/:id=> to get one post (using id).
// Show route

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  // res.send("req working");
  let post = posts.find((p) => id === p.id); //Find function.
  // console.log(post);
  res.render("show.ejs", { post });
});

// Give id to new posts
// UUID Package==> Universally unique identifier npm install uuid

// Implement : Patch/posts/:id
// Update Route
// Patch request /posts/:id to update specific post.
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  // console.log(newContent); //we sent new content in body.
  // res.send("patch req working"); //We send patch req using hopscotch.
  res.redirect("/posts");
});
//Edit
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
