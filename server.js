// File : index.js

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Mentor API is connected well" });
});

app.listen(PORT, (req, res) => {
  console.log(`Server Started at OG Port ${PORT}`);
});
