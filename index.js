const express = require("express");
const logger = require("./consoleLogger");
const routes = require("./routes");
const dotenv = require("dotenv");
const utils = require("./utils");

const app = express();

app.use(express.json());

dotenv.config();

// initialize a middleware to allow CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  next();
});

app.get("/api/dates", (req, res) => {
  req.url = utils.getRandomRoute(routes.dateRoutes);

  req.method = "GET";
  logger.log("forwarding request", "INFO");
  return app._router.handle(req, res);
});

app.get("/api/numbers", (req, res) => {
  req.url = utils.getRandomRoute(routes.numberRoutes);

  req.method = "GET";
  logger.log("forwarding request", "INFO");
  return app._router.handle(req, res);
});

app.use("/api/words", require("./routes/api/words"));
app.use("/api/numbers", require("./routes/api/numbers"));
app.use("/api/dates", require("./routes/api/dates"));

logger.log(utils.getRandomDays(), "INFO");
logger.log(utils.shuffleString("HELLO"), "INFO");

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  logger.log(`the server is listening in the port: ${PORT}`, "INFO");
});
