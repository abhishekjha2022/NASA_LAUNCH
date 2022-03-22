const express = require("express");
const cors = require("cors");
const path = require("path");
const planetsRouter = require("./routes/planets.router");
const launchesRouter = require("./routes/launches.router");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cors());

app.use(planetsRouter);
app.use(launchesRouter);
app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
