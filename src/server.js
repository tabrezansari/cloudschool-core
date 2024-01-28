const express = require("express");
const app = express();
const sequelize = require("./models");
const fs = require("fs").promises;
const dotenv = require("dotenv");
const retrieveSecrets = require("./utils/retrieveSecrets");

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
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({
    version: "1.0.0",
    api: "Cloud SChoold API Services",
    health: "Running ✅",
  });
});

require("./routes/auth")(app);
require("./routes/users")(app);
require("./routes/common")(app);
require("./routes/organisation")(app);
require("./routes/class")(app);
require("./routes/exams")(app);
require("./routes/subjects")(app);
require("./routes/dashboard")(app);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, async () => {
  try {
    const secretsString = await retrieveSecrets();
    // console.log("env are:", secretsString);
    // write to .env file at root level of project:
    await fs.writeFile(".env", secretsString);

    dotenv.config();
    //
    console.log(`Example app listening at http://localhost:${port}`);
  } catch (error) {
    //log the error and crash the app
    console.log("Error in setting environment variables", error);
    process.exit(-1);
  }

  console.log(`Example app listening at http://localhost:${port}`);
});
