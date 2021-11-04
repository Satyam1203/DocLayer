const router = require("express").Router();

router.route("/save").post((req, res) => {
  // save to db
});

router.route("/find/all").post((req, res) => {
  // find by email
});

router.route("/find").post((req, res) => {
  // find by file name and email
});

router.route("/update").post((req, res) => {
  // update a file
});

router.route("/remove").post((req, res) => {
  // delete a file
});

router.route("/").get((req, res) => res.send("Hello from Doc Layer"));

module.exports = router;
