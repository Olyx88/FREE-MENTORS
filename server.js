const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index"); 
const InitiateMongoServer = require("./config/db");

InitiateMongoServer();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "Mentor API Working" });
});

app.use("/api/v1", routes);
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
