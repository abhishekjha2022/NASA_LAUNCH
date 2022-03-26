const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadDataOnStartup } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://NASA_API:2gjXWSbfZ2yxTeFs@nasacluster.mco7g.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadDataOnStartup();
  server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
}

startServer();
