const express = require("express");
require('dotenv').config()
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const cors = require('cors')
const nbaRoutes = require('./routes/nbaRoutes')
const weatherRoutes = require('./routes/weatherRoutes')
const isDev = process.env.NODE_ENV !== "production";

const PORT = 5001;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  //Setup cors and jsonparser  middleware
  app.use(cors())
  app.use(express.json())

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

  // Answer API requests.
  app.use("/api/nba", nbaRoutes);
  app.use("/api/weather", weatherRoutes);

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", (request, response) => {
    response.sendFile(
      path.resolve(__dirname, "../react-ui/build", "index.html")
    );
  });

  app.listen(PORT, () => {
    console.error(
      `Node ${
        isDev ? "dev server" : `cluster worker ${process.pid}`
      }: listening on port ${PORT}`
    );
  });
}
