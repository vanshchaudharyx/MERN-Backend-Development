const express = require("express");
// Now we have to create router object
const router = express.Router();
//  Now we don't need to write app.get write router.get
// Index-users
router.get("/", (req, res) => {
  res.send("GET for user");
});
// Show users
router.get("/:id", (req, res) => {
  res.send("GET for user id");
});
// Post users
router.post("/", (req, res) => {
  res.send("POST for users");
});
// Delete Users
router.delete("/:id", (req, res) => {
  res.send("DELETE for user id");
});

module.exports = router;
