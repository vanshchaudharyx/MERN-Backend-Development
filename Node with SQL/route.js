const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

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

app.listen("8080", () => {
  console.log("Server is listening to 8080");
});
