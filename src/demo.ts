import * as jestJoi from ".";
import * as chalk from "chalk";

const passText = " PASS ";
const failText = " FAIL ";

function pass() {
  console.log(chalk.black.bgGreen(passText));
}

function fail(message: string) {
  console.log(chalk.black.bgRed(failText) + "\n\n" + message);
}

function asyncUnsupported() {
  console.log(
    "This demo environment doesn't support async tests. Install jest-joi in your local environment instead!"
  );
}

function makeMatcher(
  context: { isNot: boolean; promise: string },
  received: unknown
) {
  return function toMatchSchema(schema: unknown) {
    const result = jestJoi.toMatchSchema.call(context, received, schema);
    if (result.pass && context.isNot === false) pass();
    else fail(result.message.call(context));
  };
}

function expect(received: unknown) {
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

function test(name: string, fn: () => void) {
  console.log(chalk.bold(name + "\n"));
  fn();
  console.log("\n");
}

export function demo() {
  console.log(
    chalk.bold.yellow.inverse(
      "\nThis is a demo environment for Jest Joi. Do not call `.demo()` in your actual project. See npmjs.com/package/jest-joi for setup instructions.\n"
    )
  );
  return { expect, test };
}
