const {
  getAllLaunches,
  postLaunch,
  abortLaunches,
} = require("../models/launches.model");

function httpGetAllLaunches(req, res) {
  res.status(200).json(getAllLaunches());
}

function httpPostLaunch(req, res) {
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);
  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.target ||
    !launch.rocket
  ) {
    return res.status(400).json({
      error: "Not sufficient information",
    });
  }

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Date is incorrect",
    });
  }

  postLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunches(req, res) {
  const launchId = Number(req.params.id);
  const abortedLaunch = abortLaunches(launchId);
  return res.status(200).json(abortedLaunch);
}

module.exports = {
  httpGetAllLaunches,
  httpPostLaunch,
  httpAbortLaunches,
};
