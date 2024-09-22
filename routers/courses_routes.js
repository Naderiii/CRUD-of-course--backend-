const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send();
});

router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

router.post("", (req, res) => {
  res.send("");
});

router.put("/:id", (req, res) => {
  res.send("");
});

router.put("/:id", (req, res) => {
  res.send("");
});

module.exports = router;