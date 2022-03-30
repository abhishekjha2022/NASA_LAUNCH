const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadDataOnStartup } = require("./models/planets.model");
const { mongoConnect } = require("../src/services/mongo");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadDataOnStartup();
  server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
}

startServer();
