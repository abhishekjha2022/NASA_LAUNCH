const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler-ISO",
  target: "Moon Exploration",
  rocket: "Kepler-1",
  launchDate: new Date("January 14 2030"),
  customers: ["Abhishek", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function postLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["Abhishek", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunches(id) {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  postLaunch,
  abortLaunches,
};
