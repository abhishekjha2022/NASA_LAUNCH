const express = require("express");
const {
  httpGetAllLaunches,
  httpPostLaunch,
  httpAbortLaunches,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", httpGetAllLaunches);
launchesRouter.post("/launches", httpPostLaunch);
launchesRouter.delete("/launches/:id", httpAbortLaunches);

module.exports = launchesRouter;
