require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());

app.use("/todos", require("./api"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.use("*", (error, req, res, next) => {
  const status = error.status ? error.status : 500;
  res.status(status);
  res.json(error.message);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
