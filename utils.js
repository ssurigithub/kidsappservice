const moment = require("moment");
const routes = require("./routes");
const _ = require("lodash");

module.exports.getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

module.exports.getRandomMonth = function () {
  const mon = this.getRandomIntInclusive(0, 12);
  return moment().add(mon, "months").format("MMMM");
};

module.exports.getRandomDays = function () {
  const mon = this.getRandomIntInclusive(0, 7);
  return moment().add(mon, "days").format("dddd");
};

module.exports.reverseString = (str) => {
  return str.split("").reverse().join("");
};

module.exports.shuffleString = (str) => {
  return shuffle(str.split("")).join("");
};

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

module.exports.getRandomRoute = (array) => {
  const x = _.shuffle(array);
  return x[0];
};

module.exports.getRange = (start, count, step) => {
  return _.range(start, count + 1, step); // inclusive.
};

module.exports.getRandomInRange = (start, count, step) => {
  const x = _.range(start, count + 1, step);
  return _.sample(x);
};

module.exports.take = (array, count) => {
  return _.take(array, count);
};

module.exports.filter = (array, callback) => {
  return _.filter(array, callback);
};

module.exports.shuffle = (array) => {
  return _.shuffle(array);
};

module.exports.max = (array, propertyName) => {
  return _.maxBy(array, propertyName);
};

module.exports.min = (array, propertyName) => {
  return _.minBy(array, propertyName);
};

module.exports.random = (array) => {
  return _.sample(array);
};

module.exports.findIndex = (array, callback) => {
  return _.findIndex(array, callback);
};
