const http = require("http");

const app = require("./app");
const { loadPlanetsDatas } = require("./models/planets.model");

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

async function startServer() {
  await loadPlanetsDatas();

  server.listen(PORT, () => {
    console.log("Listen on port " + PORT);
  });
}

startServer();
