const {
  getAllLaunches,
  abortLaunches,
  hasLaunchId,
  scheduleNewLaunch,
} = require("../models/launches.model");

async function httpGetAllLaunches(req, res) {
  res.status(200).json(await getAllLaunches());
}

async function httpPostLaunch(req, res) {
  const launch = req.body;
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
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Date is incorrect",
    });
  }

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunches(req, res) {
  const launchId = Number(req.params.id);

  const existsLaunch = await hasLaunchId(launchId);
  if (!existsLaunch) {
    return res.status(400).json({
      error: "Flight number doesnot match",
    });
  }
  const abortedLaunch = await abortLaunches(launchId);
  if (!abortLaunches) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpPostLaunch,
  httpAbortLaunches,
};
