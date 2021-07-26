const jestJoi = require("../../dist");
const chalk = require("chalk");

const passText = " PASS ";
const failText = " FAIL ";

function pass() {
  console.log(chalk.black.bgGreen(passText));
}

function fail(message) {
  console.log(chalk.black.bgRed(failText) + "\n\n" + message);
}

function makeMatcher(context, received) {
  return function toMatchSchema(schema) {
    const result = jestJoi.toMatchSchema.call(context, received, schema);
    if (result.pass && context.not === false) pass();
    else fail(result.message());
  };
}

function expect(received) {
  return {
    toMatchSchema: makeMatcher({ not: false, promise: null }, received),
    not: {
      toMatchSchema: makeMatcher({ not: true, promise: null }, received),
    },
  };
}

module.exports = expect;
