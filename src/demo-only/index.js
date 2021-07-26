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

function asyncUnsupported() {
  console.log(
    "This demo environment doesn't support async tests. Install jest-joi in your local environment instead!"
  );
}

function makeMatcher(context, received) {
  return function toMatchSchema(schema) {
    const result = jestJoi.toMatchSchema.call(context, received, schema);
    if (result.pass && context.isNot === false) pass();
    else fail(result.message.call(context));
  };
}

function expect(received) {
  return {
    resolves: {
      toMatchSchema: asyncUnsupported,
      not: {
        toMatchSchema: asyncUnsupported,
      },
    },
    rejects: {
      toMatchSchema: asyncUnsupported,
      not: {
        toMatchSchema: asyncUnsupported,
      },
    },
    toMatchSchema: makeMatcher({ isNot: false, promise: "" }, received),
    not: {
      toMatchSchema: makeMatcher({ isNot: true, promise: "" }, received),
    },
  };
}

function test(name, fn) {
  console.log(chalk.bold(name + "\n"));
  fn();
  console.log("\n");
}

module.exports = { expect, test };
