const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // get the token
  next();
  // const token = req.header("Authorization");
  // if (!token) {
  //   return res.status(401).send("Access Denied");
  // }

  // // verify the token

  // try {
  //   const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  //   req.user = verified;
  // } catch (err) {
  //   return res.status(400).send("Invalid Token");
  // }

  // next();
};
