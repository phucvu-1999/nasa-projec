const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const path = require("path");

const planetsRouter = require("./routes/planets/planets.router");
const { launchesRouter } = require("./routes/launches/launches.router");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
app.get("/*", (req, res) => {
  res.send(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/messages", (req, res) => {
  res.status(200).json({ message: "Hello world !!!" });
});

module.exports = app;
