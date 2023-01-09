const mongoose = require("mongoose");
const logger = require("../logger/api.logger");

const connect = () => {
  const url =
    "mongodb+srv://system:1234@cluster0.8be3g.mongodb.net/?retryWrites=true&w=majority";
  logger.info(
    "process.env.MONGO_CONNECTION_STRING :::" +
      process.env.MONGO_CONNECTION_STRING
  );

  mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  mongoose.connection.once("open", async () => {
    logger.info("Connected to database");
  });

  mongoose.connection.on("error", (err) => {
    logger.error("Error connecting to database  ", err);
  });
};

const disconnect = () => {
  if (!mongoose.connection) {
    return;
  }

  mongoose.disconnect();

  mongoose.once("close", async () => {
    // console.log("Diconnected  to database");
  });
};

module.exports = {
  connect,
  disconnect,
};
