const http = require("http");
const app = require("./app");
const { loadDataOnStartup } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await loadDataOnStartup();
  server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
}

startServer();
