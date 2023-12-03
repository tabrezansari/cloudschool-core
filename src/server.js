const express = require("express");
const app = express();
const sequelize = require("./models");
const fs = require("fs").promises;
const dotenv = require("dotenv");

const port = 4000;

const cors = require("cors");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
  })
);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({
    version: "1.0.0",
    api: "R-Estate API Services",
    health: "Running ✅",
  });
});

require("./routes/auth")(app);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
