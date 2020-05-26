const express = require("express");
const utils = require("../../utils");
const verify = require("../../Middleware/verifyToken");
const moment = require("moment");
const words = require("./../../Models/words");

const router = express.Router();

const app = express();

// define an array of routes

const routes = [
  "/api/dates/today/date",
  "/api/dates/tomorrow/date",
  "/api/dates/yesterday/date",
  "/api/dates/today/day",
  "/api/dates/tomorrow/day",
  "/api/dates/yesterday/day",
  "/api/dates/month/current",
  "/api/dates/month/prev",
  "/api/dates/month/next",
  "/api/dates/year/current",
  "/api/dates/year/prev",
  "/api/dates/year/next",
];

function getRandomDate() {
  var d = new Date();
  var mon = utils.getRandomIntInclusive(0, 12);
  var year = utils.getRandomIntInclusive(
    d.getFullYear() - 5,
    d.getFullYear() + 2
  );
  var daysInMonth = getDaysInMonth(mon, year);

  console.log(
    `the days in the month ${mon} and year ${year} is ${daysInMonth}`
  );
  var currentMonth = new Date(year, mon, 1);
  var currentDate = utils.getRandomIntInclusive(1, daysInMonth);
  var date = new Date(year, mon, currentDate);
  return {
    currentMonth,
    date,
    format: moment(date).format("dddd DD MMM YYYY"),
    currentDate,
    daysInMonth,
  };
}

var getDaysInMonth = function (month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  //return new Date(year, month, 0).getDate();
  // Here January is 0 based
  return new Date(year, month + 1, 0).getDate();
};

// today's date
router.get("/today/date", verify, (req, res) => {
  //const date = req.query.date;
  var date = getRandomDate();
  return res.status(200).json({
    category: "calendar",
    date: date,
    question: {
      question: "What is Today's Date?",
      answers: [
        {
          answer: moment(date.date).format("DD"),
          selectedOption: 1,
          correct: [1],
          header: "A",
        },
        {
          answer: moment(date.date).format("MMMM"),
          selectedOption: 2,
          correct: [1],
          header: "B",
        },
        {
          answer: moment(date.date).add(1, "days").format("DD"),
          selectedOption: 3,
          correct: [1],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("dddd"),
          selectedOption: 4,
          correct: [1],
          header: "D",
        },
      ],

      correct: [1],
      hint: "Its highlighted",
    },
  });
});

// tomorrow's date
router.get("/tomorrow/date", verify, (req, res) => {
  var date = getRandomDate();

  return res.status(200).json({
    category: "calendar",
    date: date,
    question: {
      question: "What is Tomorrow's Date?",
      answers: [
        {
          answer: moment(date.date).format("DD"),
          selectedOption: 1,
          correct: [3],
          header: "A",
        },
        {
          answer: moment(date.date).format("MMMM"),
          selectedOption: 2,
          correct: [3],
          header: "B",
        },
        {
          answer: moment(date.date).add(1, "days").format("DD"),
          selectedOption: 3,
          correct: [3],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("dddd"),
          selectedOption: 4,
          correct: [3],
          header: "D",
        },
      ],

      correct: [3],
      hint: "What comes after highlighted date?",
    },
  });
});

// yesterday's date
router.get("/yesterday/date", verify, (req, res) => {
  var date = getRandomDate();

  return res.status(200).json({
    category: "calendar",
    date: date,
    question: {
      question: "What is Yesterday's Date:",
      answers: [
        {
          answer: moment(date.date).format("DD"),
          selectedOption: 1,
          correct: [4],
          header: "A",
        },
        {
          answer: moment(date.date).format("MMMM"),
          selectedOption: 2,
          correct: [4],
          header: "B",
        },
        {
          answer: moment(date.date).add(1, "days").format("dddd"),
          selectedOption: 3,
          correct: [4],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("DD"),
          selectedOption: 4,
          correct: [4],
          header: "D",
        },
      ],

      correct: [4],
      hint: "What comes before highlighted date?",
    },
  });
});

// Todays day
router.get("/today/day", verify, (req, res) => {
  var date = getRandomDate();

  return res.status(200).json({
    category: "calendar",
    date: date,
    question: {
      question: "What is Today's Day?",
      answers: [
        {
          answer: moment(date.date).format("dddd"),
          selectedOption: 1,
          correct: [1],
          header: "A",
        },
        {
          answer: moment(date.date).format("MMMM"),
          selectedOption: 2,
          correct: [1],
          header: "B",
        },
        {
          answer: moment(date.date).add(1, "days").format("DD"),
          selectedOption: 3,
          correct: [1],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("dddd"),
          selectedOption: 4,
          correct: [1],
          header: "D",
        },
      ],

      correct: [1],
      hint:
        "Sunday  Monday Tuesday Wednesday Thursday Friday Saturday are days of the week",
    },
  });
});

// tomorrow day
router.get("/tomorrow/day", verify, (req, res) => {
  var date = getRandomDate();

  return res.status(200).json({
    category: "calendar",
    date: date,
    question: {
      question: "What is Tomorrow's Day?",
      answers: [
        {
          answer: moment(date.date).format("dddd"),
          selectedOption: 1,
          correct: [3],
          header: "A",
        },
        {
          answer: moment(date.date).format("MMMM"),
          selectedOption: 2,
          correct: [3],
          header: "B",
        },
        {
          answer: moment(date.date).add(1, "days").format("dddd"),
          selectedOption: 3,
          correct: [3],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("DD"),
          selectedOption: 4,
          correct: [3],
          header: "D",
        },
      ],

      correct: [3],
      hint:
        "Sunday  Monday Tuesday Wednesday Thursday Friday Saturday are days of the week",
    },
  });
});

// yesterday day
router.get("/yesterday/day", verify, (req, res) => {
  var date = getRandomDate();

  return res.status(200).json({
    category: "calendar",
    date,
    question: {
      question: "What is Yesterday's Day?",
      answers: [
        {
          answer: moment(date.date).format("dddd"),
          selectedOption: 1,
          correct: [4],
          header: "A",
        },
        {
          answer: moment(date.date).format("MMMM"),
          selectedOption: 2,
          correct: [4],
          header: "B",
        },
        {
          answer: moment(date.date).add(1, "days").format("DD"),
          selectedOption: 3,
          correct: [4],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("dddd"),
          selectedOption: 4,
          correct: [4],
          header: "D",
        },
      ],

      correct: [4],
      hint:
        "Sunday  Monday Tuesday Wednesday Thursday Friday Saturday are days of the week",
    },
  });
});

// current month
router.get("/month/current", verify, (req, res) => {
  var date = getRandomDate();

  return res.status(200).json({
    category: "calendar",
    date,
    question: {
      question: "What is the current Month?",
      answers: [
        {
          answer: moment(date.date).format("dddd"),
          selectedOption: 1,
          correct: [2],
          header: "A",
        },
        {
          answer: moment(date.date).format("MMMM"),
          selectedOption: 2,
          correct: [2],
          header: "B",
        },
        {
          answer: moment(date.date).add(1, "days").format("DD"),
          selectedOption: 3,
          correct: [2],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("dddd"),
          selectedOption: 4,
          correct: [2],
          header: "D",
        },
      ],

      correct: [2],
      hint:
        "January  February March April May June July August September October November December are months of the year",
    },
  });
});

// prev month
router.get("/month/prev", verify, (req, res) => {
  var date = getRandomDate();

  return res.status(200).json({
    category: "calendar",
    date,
    question: {
      question: "What is the previous Month?",
      answers: [
        {
          answer: moment(date.date).add(1, "months").format("MMMM"),
          selectedOption: 1,
          correct: [3],
          header: "A",
        },
        {
          answer: moment(date.date).format("MMMM"),
          selectedOption: 2,
          correct: [3],
          header: "B",
        },
        {
          answer: moment(date.date).add(-1, "months").format("MMMM"),
          selectedOption: 3,
          correct: [3],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("dddd"),
          selectedOption: 4,
          correct: [3],
          header: "D",
        },
      ],

      correct: [3],
      hint:
        "January  February March April May June July August September October November December are months of the year",
    },
  });
});

// next month
router.get("/month/next", verify, (req, res) => {
  var date = getRandomDate();

  return res.status(200).json({
    category: "calendar",
    date,
    question: {
      question: "What is the next Month?",
      answers: [
        {
          answer: moment(date.date).add(1, "months").format("MMMM"),
          selectedOption: 1,
          correct: [1],
          header: "A",
        },
        {
          answer: moment(date.date).format("MMMM"),
          selectedOption: 2,
          correct: [1],
          header: "B",
        },
        {
          answer: moment(date.date).add(-1, "months").format("MMMM"),
          selectedOption: 3,
          correct: [1],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("dddd"),
          selectedOption: 4,
          correct: [1],
          header: "D",
        },
      ],

      correct: [1],
      hint:
        "January  February March April May June July August September October November December are months of the year",
    },
  });
});

// next year
router.get("/year/next", verify, (req, res) => {
  var date = getRandomDate();

  return res.status(200).json({
    category: "calendar",
    date,
    question: {
      question: "What is the Next Year?",
      answers: [
        {
          answer: moment(date.date).add(1, "years").format("YYYY"),
          selectedOption: 1,
          correct: [1],
          header: "A",
        },
        {
          answer: moment(date.date).format("MMMM"),
          selectedOption: 2,
          correct: [1],
          header: "B",
        },
        {
          answer: moment(date.date).add(-1, "months").format("YYYY"),
          selectedOption: 3,
          correct: [1],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("dddd"),
          selectedOption: 4,
          correct: [1],
          header: "D",
        },
      ],

      correct: [1],
      hint: `what is after ${moment(date.date).format("YY")}`,
    },
  });
});

// current year
router.get("/year/current", verify, (req, res) => {
  var date = getRandomDate();

  return res.status(200).json({
    category: "calendar",
    date,
    question: {
      question: "What is the Current Year?",
      answers: [
        {
          answer: moment(date.date).format("dddd"),
          selectedOption: 1,
          correct: [2],
          header: "A",
        },
        {
          answer: moment(date.date).format("YYYY"),
          selectedOption: 2,
          correct: [2],
          header: "B",
        },
        {
          answer: moment(date.date).add(-1, "years").format("YYYY"),
          selectedOption: 3,
          correct: [2],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("dddd"),
          selectedOption: 4,
          correct: [2],
          header: "D",
        },
      ],

      correct: [2],
      hint: `Look for the Year in the calendar`,
    },
  });
});

// prev year
router.get("/year/prev", verify, (req, res) => {
  var date = getRandomDate();

  return res.status(200).json({
    category: "calendar",
    date,
    question: {
      question: "What is the previous Year?",
      answers: [
        {
          answer: moment(date.date).add(1, "years").format("YYYY"),
          selectedOption: 1,
          correct: [3],
          header: "A",
        },
        {
          answer: moment(date.date).format("MMMM"),
          selectedOption: 2,
          correct: [3],
          header: "B",
        },
        {
          answer: moment(date.date).add(-1, "years").format("YYYY"),
          selectedOption: 3,
          correct: [3],
          header: "C",
        },
        {
          answer: moment(date.date).add(-1, "days").format("dddd"),
          selectedOption: 4,
          correct: [3],
          header: "D",
        },
      ],

      correct: [3],
      hint: `what is before ${moment(date.date).format("YY")}`,
    },
  });
});

module.exports = router;
