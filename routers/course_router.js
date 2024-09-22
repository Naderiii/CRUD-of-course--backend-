const router = require("express");

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
