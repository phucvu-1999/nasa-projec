const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  upcoming: true,
  flightNumber: 100,
  launchDate: new Date("December 12, 2021"),
  destination: "Kepler-442 b",
  mission: "Mission 01",
  target: "Target 01",
  rocket: "Rocket 01",
  customers: ["Tien Phuc", "Thanh Ha"],
  success: true,
};

launches.set(launch.flightNumber, launch);

function existLaunchWithId(launchId) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(latestFlightNumber, {
    ...launch,
    flightNumber: latestFlightNumber,
    customers: ["Tien Phuc", "NASA"],
    upcoming: true,
    success: true,
  });
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
};
