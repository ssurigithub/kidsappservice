const express = require("express");
const utils = require("../../utils");
const verify = require("../../Middleware/verifyToken");
const router = express.Router();

// missing numbers
// router.get("/missingnumbers", verify, (req, res) => {
//   const mon = utils.getRandomIntInclusive(0, 100);
//   const data = [];
//   [...Array(10).keys()]
//     .map((x) => x + mon)
//     .forEach((value, index) => {
//       data.push({ n: value, hidden: index % 3 == 0 ? true : false });
//     });
//   return res.status(200).json({
//     data,
//   });
// });

router.get("/missing/:count", verify, (req, res) => {
  const count = parseInt(req.params.count);
  if (count <= 0) {
    return res.status(400).json({
      msg: "Invalid parameter passed",
    });
  }

  console.log();
  const mon = utils.getRandomInRange(count, count * 10, count);
  let index = 1;

  const data = utils.take(utils.getRange(mon, mon * 10, count), 10).map((x) => {
    const container = {};
    (container.n = x),
      (container.hidden =
        index == 1 || index == 2 || index % 2 == 0 ? false : true);
    container.index = index;
    (container.answer = x), index++;
    return container;
  });

  var maxValue = utils.max(data, "answer");

  const correctAnswers = utils.filter(data, (u) => u.hidden);
  index = 1;
  const wrongAnswers = correctAnswers.map((x) => {
    var answer = {};
    answer.answer = maxValue.answer * 2 + x.answer; // add some random number for a wrong answer
    answer.n = maxValue.answer * 2 + x.answer;
    answer.index = maxValue.index + index;
    answer.hidden = false;
    index++;
    return answer;
  });
  selectedOption = 1;
  const headerArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const answers = utils
    .shuffle([...correctAnswers, ...wrongAnswers])
    .map((x) => {
      x.selectedOption = selectedOption;

      x.header = headerArray[selectedOption - 1];

      selectedOption++;
      return x;
    });

  return res.status(200).json({
    category: "numbers",
    data,
    question: {
      question: "Find the missing numbers...",
      answers: answers,
      correct: utils
        .filter(answers, (a) => a.hidden)
        .map((x) => x.selectedOption),
      hint: `Try counting by the ${count}`,
    },
  });
});

// ascending order
router.get("/ascendingorder", verify, (req, res) => {
  const data = [];
  const dataToSort = [];
  [...Array(5).keys()]
    .map((x) => x + utils.getRandomIntInclusive(0, 50))
    .forEach((value, index) => {
      data.push({ n: value });
      dataToSort.push(value);
    });
  const result = dataToSort.sort((a, b) => a - b);
  return res.status(200).json({
    data,
    result,
  });
});

// descending order
router.get("/descendingorder", verify, (req, res) => {
  const data = [];
  const dataToSort = [];
  [...Array(5).keys()]
    .map((x) => x + utils.getRandomIntInclusive(0, 50))
    .forEach((value, index) => {
      data.push({ n: value });
      dataToSort.push(value);
    });
  const result = dataToSort.sort((a, b) => b - a);
  return res.status(200).json({
    data,
    result,
  });
});

// big or more
router.get(["/big", "/more"], verify, (req, res) => {
  var x = getBigOrSmall("big");
  return res.status(200).json(x);
});

function getBigOrSmall(x) {
  const mon = utils.getRandomInRange(1, 10, 1);
  const data = utils.shuffle(utils.take(utils.getRange(mon, mon * 10, mon), 4));
  const headerArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let index = 1;
  console.log(`the value of mon : ${mon}, data : ${data}, ${typeof data}`);
  const answers = data.map((x) => {
    var answer = {};
    answer.answer = x;
    answer.selectedOption = index;
    answer.header = headerArray[index - 1];
    index++;
    return answer;
  });
  let correct = [];
  if (x == "big") {
    correct.push(utils.max(answers, "answer").selectedOption);
  } else {
    correct.push(utils.min(answers, "answer").selectedOption);
  }
  return {
    category: "numbers",

    question: {
      question:
        x == "big" ? "Find the bigger number..." : "Find the smaller number...",
      answers: answers,
      correct: correct,
      hint: `Which number comes after `,
    },
  };
}
// small or less
router.get(["/small", "/less"], verify, (req, res) => {
  var x = getBigOrSmall("small");
  return res.status(200).json(x);
});

router.get("/position", verify, (req, res) => {
  var x = getPosition();
  return res.status(200).json(x);
});

function getPosition() {
  const mon = utils.getRandomInRange(1, 10, 1);
  const data = utils.shuffle(
    utils.take(utils.getRange(mon, mon * 10, mon), 10)
  );
  const headerArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const questionArray = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Nineth",
    "Tenth",
  ];
  let index = 1;
  console.log(`the value of mon : ${mon}, data : ${data}, ${typeof data}`);
  const answers = data.map((x) => {
    var answer = {};
    answer.answer = x;
    answer.selectedOption = index;
    answer.header = headerArray[index - 1];
    index++;
    return answer;
  });
  let correct = [];
  correct.push(mon);

  return {
    category: "numbers",

    question: {
      question:
        mon == 10
          ? `Find the last box:`
          : `Find the ${questionArray[mon - 1]} box:`,
      answers: answers,
      correct: correct,
      hint: `Which number comes after `,
    },
  };
}

router.get("/after/:count", verify, (req, res) => {
  const count = parseInt(req.params.count);
  if (count <= 0) {
    return res.status(400).json({
      msg: "Invalid parameter passed",
    });
  }

  var x = getBeforeAfter("after", count);

  return res.status(200).json(x);
});

router.get("/before/:count", verify, (req, res) => {
  const count = parseInt(req.params.count);
  if (count <= 0) {
    return res.status(400).json({
      msg: "Invalid parameter passed",
    });
  }
  var x = getBeforeAfter("before", count);

  return res.status(200).json(x);
});

function getBeforeAfter(position, count) {
  console.log(count);
  const mon = utils.getRandomInRange(count, count * 10, count);
  let index = 1;

  const data = utils.take(utils.getRange(mon, mon * 10, count), 10).map((x) => {
    const container = {};
    (container.n = x), (container.hidden = false);
    container.index = index;
    (container.answer = x), index++;
    return container;
  });

  console.log(data);

  var randomNumber = utils.random(data);
  const indexes = data.map((x) => {
    if (x.index == 1 || x.index == data.length) return undefined;
    return x.index;
  });

  console.log(indexes);
  var randomIndex = utils.random(indexes.filter(Boolean));

  console.log(randomIndex);

  var correctAnswer = data[position == "after" ? randomIndex : randomIndex - 1];
  console.log(correctAnswer);
  var question = `What is ${position} ${
    position == "after"
      ? data[randomIndex - 1].answer
      : data[randomIndex].answer
  } ?`;

  index = 1;
  let answers = utils
    .take(
      utils.filter(data, (d) => d.index != correctAnswer.index),
      3
    )
    .map((d) => {
      var answer = {};
      answer.answer = d.answer; // add some random number for a wrong answer
      answer.n = d.answer;
      answer.index = d.index;

      answer.correct = false;
      return answer;
    });
  answers.push({
    answer: correctAnswer.answer,
    n: correctAnswer.answer,
    index: correctAnswer.index,

    correct: true,
  });

  selectedOption = 1;
  const headerArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
  answers = utils.shuffle(answers).map((x) => {
    x.selectedOption = selectedOption;

    x.header = headerArray[selectedOption - 1];

    selectedOption++;
    return x;
  });
  return {
    category: "numbers",
    data,
    question: {
      question: question,
      answers: answers,
      correct: utils
        .filter(answers, (a) => a.correct)
        .map((x) => x.selectedOption),
      hint: `What comes after ${count}`,
    },
  };
}

module.exports = router;
