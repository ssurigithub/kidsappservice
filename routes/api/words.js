const express = require("express");
const utils = require("../../utils");
const verify = require("../../Middleware/verifyToken");
const moment = require("moment");
const words = require("./../../Models/words");

const router = express.Router();

// before after months
router.get("/months", verify, (req, res) => {
  const mon = utils.getRandomIntInclusive(0, 12);
  return res.status(200).json({
    before: moment()
      .add(mon - 1, "months")
      .format("MMMM"),
    current: moment().add(mon, "months").format("MMMM"),
    after: moment()
      .add(mon + 1, "months")
      .format("MMMM"),
  });
});

// before after days
router.get("/days", verify, (req, res) => {
  const mon = utils.getRandomIntInclusive(0, 7);
  return res.status(200).json({
    before: moment()
      .add(mon - 1, "days")
      .format("dddd"),
    current: moment().add(mon, "days").format("dddd"),
    after: moment()
      .add(mon + 1, "days")
      .format("dddd"),
  });
});

// before after planets
router.get("/planets", verify, (req, res) => {
  const planets = [
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
  ];
  const mon = utils.getRandomIntInclusive(1, 7);

  return res.status(200).json({
    before: planets[mon - 1],
    current: planets[mon],
    after: planets[mon == 7 ? 0 : mon + 1],
  });
});

// get three letter words for start / middle / end
router.get("/threeletterwords", verify, (req, res) => {
  const mon = utils.getRandomIntInclusive(1, 140);

  return res.status(200).json({
    word: words.three_letter_words()[mon],
    begin: words.three_letter_words()[mon][0],
    middle: words.three_letter_words()[mon][1],
    end: words.three_letter_words()[mon][2],
  });
});

// get three letter words for start / middle / end
router.get("/jumbled", verify, (req, res) => {
  const mon = utils.getRandomIntInclusive(0, 12);

  return res.status(200).json({
    word: words.jumbledwords()[mon],
    options: [
      utils.shuffleString(words.jumbledwords()[mon]),
      utils.reverseString(words.jumbledwords()[mon]),
      utils.shuffleString(words.jumbledwords()[mon]),
      words.jumbledwords()[mon],
      utils.shuffleString(words.jumbledwords()[mon]),
      utils.shuffleString(words.jumbledwords()[mon]),
    ],
  });
});

module.exports = router;
