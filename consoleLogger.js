const uuid = require("uuid");
const moment = require("moment");

module.exports.log = (msg, type) => {
  if (process.env.NODE_ENV === "DEV") {
    console.log(
      `${uuid.v4()}   ${moment().format(
        "MMMM Do YYYY, h:mm:ss a"
      )} ${type} ${msg}`
    );
  }
};
