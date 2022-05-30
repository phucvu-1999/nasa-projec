const {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  res.status(200).json(getAllLaunches());
}

function httpCreateLaunch(req, res) {
  const launch = req.body;

  const isRequestValid =
    !launch.mission || !launch.rocket || !launch.launchDate || launch.target;

  if (!isRequestValid) {
    return res
      .status(400)
      .json({ message: "Missing some required infomation !!!" });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ message: "Invalid date" });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  if (!existLaunchWithId(launchId))
    return res.status(404).json({ message: "Can not find the launch" });

  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpCreateLaunch,
  httpAbortLaunch,
};
