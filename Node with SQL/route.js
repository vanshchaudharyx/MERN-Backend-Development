const { faker, tr } = require("@faker-js/faker");
const mysql = require("mysql2");
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("__method"));
// We send a patch request and get form data to parse this data we use middleware.
app.use(express.urlencoded({ extended: true }));
app.set("viewengine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

//Home=>Fetch and show total number of users and show on our app
app.get("/", (req, res) => {
  // res.send("Welcome to homepage");
  let query = "Select count(*) from user";
  try {
    connection.query(query, (err, result) => {
      if (err) throw err;
      // console.log(result[0]);
      let count = result[0]["count(*)"];
      // console.log(count);
      res.render("home.ejs", { count });
    });
  } catch (err) {
    res.send("Some error occured:", err);
  }
});

//Get/user Fetch and show (userId,username,email) for all users.
app.get("/user", (req, res) => {
  let query = "Select id,username,email from user;";
  try {
    connection.query(query, (err, result) => {
      if (err) throw err;
      // res.send(result);
      res.render("showusers.ejs", { result });
    });
  } catch (err) {
    res.send("Some error occured:", err);
  }
});

// Edit Route==> /user/:id/edit==> To get form to edit the username,based on id This form will require a password.
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  //Search user on the basis of id.
  let query = `Select * from user where id='${id}'`;
  try {
    connection.query(query, (err, result) => {
      if (err) throw err;
      // console.log(result);
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    res.send("Some error occured:", err);
  }
});

// Update (DB) Route
app.patch("/user/:id", (req, res) => {
  // res.send("updated");
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  let query = `Select * from user where id='${id}'`;

  try {
    connection.query(query, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPass.trim() !== user.password.trim()) {
        res.render("wrongpassword.ejs");
      } else {
        let query2 = `Update user Set username='${newUsername}' where id='${id}'`;
        connection.query(query2, (err, result) => {
          if (err) throw err;
          // res.send(result);
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    res.send("Some error occured:", err);
  }
});

app.listen("8080", () => {
  console.log("Server is listening to 8080");
});
