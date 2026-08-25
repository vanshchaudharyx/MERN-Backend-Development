// This script.js contains exactly same code as index.js but with better explanation.\



// ============================================================
// 1. IMPORTING REQUIRED PACKAGES
// ============================================================

// Express is a Node.js framework used to create web servers
// and handle HTTP requests and responses.
const express = require("express");

// Creating an Express application
const app = express();

// Port on which our server will run
const port = 8080;

// Path module helps us create correct file/folder paths
const path = require("path");

// uuid package is used to generate unique IDs
// v4 is the UUID version/function we are using.
const { v4: uuidv4 } = require("uuid");

// method-override allows us to send HTTP methods like
// PATCH and DELETE from HTML forms.
//
// HTML forms normally support only GET and POST.
// method-override helps us use PATCH and DELETE.
const methodOverride = require("method-override");


// ============================================================
// 2. MIDDLEWARE
// ============================================================

// express.urlencoded() is middleware.
//
// HTML forms send their data in URL-encoded format.
// This middleware reads that data and puts it inside:
//
// req.body
//
// Example:
// username=Vansh&content=I+love+coding
//
// After middleware:
// req.body = {
//     username: "Vansh",
//     content: "I love coding"
// }
app.use(express.urlencoded({ extended: true }));


// methodOverride middleware
//
// It checks for "_method" in the request and allows us
// to convert a POST request into PATCH or DELETE.
//
// Example form:
//
// <form method="post" action="/posts/123?_method=PATCH">
//
// Express will treat it as:
// PATCH /posts/123
app.use(methodOverride("_method"));


// ============================================================
// 3. EJS CONFIGURATION
// ============================================================

// Tell Express that we are using EJS as our template/view engine.
//
// This allows us to write:
//
// res.render("index.ejs");
//
// and use JavaScript inside HTML.
app.set("view engine", "ejs");


// Tell Express where our EJS files are located.
//
// __dirname = current folder of this JavaScript file
//
// path.join() creates the correct path to the views folder.
app.set("views", path.join(__dirname, "views"));


// ============================================================
// 4. SERVING STATIC FILES
// ============================================================

// public folder contains static files such as:
//
// CSS
// JavaScript
// Images
//
// Express will make these files available to the browser.
//
// Example:
//
// public/style.css
//
// can be accessed as:
//
// /style.css
app.use(express.static(path.join(__dirname, "public")));


// ============================================================
// 5. HOME ROUTE
// ============================================================

// GET request for the home page
//
// When browser requests:
//
// GET /
//
// this function runs.
//
// req = request coming from client/browser
// res = response that server sends back
app.get("/", (req, res) => {

  // Send plain text response to browser
  res.send("Server working well");

});


// ============================================================
// 6. OUR DATA
// ============================================================

// This is an array containing posts.
//
// IMPORTANT:
// This data is currently stored only in server memory.
//
// If we stop/restart the server, this data will be recreated.
//
// Later, a database like MongoDB can be used instead.
let posts = [

  {
    // Generate a unique ID for this post
    id: uuidv4(),

    username: "Apna college",

    content: "I love coding",
  },

  {
    id: uuidv4(),

    username: "Vansh chaudhary",

    content: "Hardwork is important to achieve success",
  },

  {
    id: uuidv4(),

    username: "Vansh Chaudhary",

    content: "I got selected for my first internship and i got PPO",
  },

];


// ============================================================
// 7. READ - GET ALL POSTS
// ============================================================

// GET /posts
//
// Purpose:
// Get/read all posts.
//
// Browser requests:
//
// GET /posts
//
// Server sends all posts to index.ejs.
app.get("/posts", (req, res) => {

  // Render index.ejs
  //
  // { posts } means:
  // { posts: posts }
  //
  // We are sending the posts array to EJS.
  res.render("index.ejs", { posts });

});


// ============================================================
// 8. CREATE - SHOW NEW POST FORM
// ============================================================

// GET /posts/new
//
// Purpose:
// Show the form where user can create a new post.
//
// Important:
// This route only SHOWS the form.
// It does not create the post.
app.get("/posts/new", (req, res) => {

  // Render the form
  res.render("new.ejs");

});


// ============================================================
// 9. CREATE - ADD NEW POST
// ============================================================

// POST /posts
//
// Purpose:
// Receive form data and create a new post.
//
// Flow:
//
// HTML form
//      ↓
// POST /posts
//      ↓
// req.body
//      ↓
// create new object
//      ↓
// posts.push()
//      ↓
// redirect to /posts
app.post("/posts", (req, res) => {

  // Data submitted by the HTML form is available in req.body.
//
// Example:
//
// req.body = {
//     username: "Vansh",
//     content: "Learning REST"
// }
//
// Destructuring gets these two values.
  let { username, content } = req.body;


  // Generate a unique ID for the new post
  let id = uuidv4();


  // Add the new post object to the posts array
  posts.push({
    id,
    username,
    content
  });


  // Redirect user to the page containing all posts
  //
  // Instead of sending another HTML response here,
  // browser is told to go to /posts.
  res.redirect("/posts");

});


// ============================================================
// 10. READ - GET ONE PARTICULAR POST
// ============================================================

// GET /posts/:id
//
// :id is a route parameter.
//
// Example:
//
// /posts/123
//
// Here:
// req.params.id = "123"
//
// We use the ID to find one specific post.
app.get("/posts/:id", (req, res) => {

  // Get id from URL
  let { id } = req.params;


  // Print ID in terminal
  console.log(id);


  // Find the post whose ID matches the ID from URL.
//
// find() returns the first matching object.
//
// p = each post inside posts array
//
// Example:
//
// URL ID:
// "123"
//
// post ID:
// "123"
//
// Both match → that post is returned.
  let post = posts.find((p) => id === p.id);


  // Send the selected post to show.ejs
  //
  // Now EJS can access:
  //
  // post.id
  // post.username
  // post.content
  res.render("show.ejs", { post });

});


// ============================================================
// 11. UPDATE - PATCH REQUEST
// ============================================================

// PATCH /posts/:id
//
// Purpose:
// Update a specific post.
//
// PATCH is generally used when we want to modify
// part of an existing resource.
//
// Example:
//
// PATCH /posts/123
//
// Body:
// content = "New content"
app.patch("/posts/:id", (req, res) => {

  // Get post ID from URL
  let { id } = req.params;


  // Print ID in terminal
  console.log(id);


  // Get new content from request body
  //
  // req.body comes from the form/request data.
  let newContent = req.body.content;


  // Find the post that we want to update
  let post = posts.find((p) => id === p.id);


  // Replace old content with new content
  post.content = newContent;


  // Print updated post in terminal
  console.log(post);


  // Redirect to all posts after updating
  res.redirect("/posts");

});


// ============================================================
// 12. UPDATE - SHOW EDIT FORM
// ============================================================

// GET /posts/:id/edit
//
// Purpose:
// Show an edit form for a particular post.
//
// IMPORTANT:
// This route does NOT update the post.
//
// It only displays the edit form.
//
// Example:
//
// /posts/123/edit
app.get("/posts/:id/edit", (req, res) => {

  // Get ID from URL
  let { id } = req.params;


  // Find the post using its ID
  let post = posts.find((p) => id === p.id);


  // Send that post to edit.ejs
  //
  // EJS can now show the existing:
  //
  // post.id
  // post.username
  // post.content
  //
  // User can edit the content.
  res.render("edit.ejs", { post });

});


// ============================================================
// 13. DELETE - DESTROY ROUTE
// ============================================================

// DELETE /posts/:id
//
// Purpose:
// Delete one specific post.
//
// Example:
//
// DELETE /posts/123
app.delete("/posts/:id", (req, res) => {

  // Get ID from URL
  let { id } = req.params;


  // filter() creates a new array.
//
// We keep every post whose ID is NOT equal
// to the ID we want to delete.
//
// Example:
//
// Current:
// [A, B, C]
//
// Delete B
//
// Result:
// [A, C]
//
// Therefore the selected post is removed.
  posts = posts.filter((p) => id !== p.id);


  // Redirect to all posts after deletion
  res.redirect("/posts");

});


// ============================================================
// 14. START SERVER
// ============================================================

// Start the Express server.
//
// Server will listen on port 8080.
//
// Once server starts, this callback runs.
app.listen(port, () => {

  console.log(`listening on port ${port}`);

});