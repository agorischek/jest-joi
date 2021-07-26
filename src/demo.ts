import * as jestJoi from ".";
import * as chalk from "chalk";

let env = "";

function passText() {
  if (env === "runkit") return "[PASS]";
  else return " PASS ";
}

function failText() {
  if (env === "runkit") return "[FAIL]";
  else return " FAIL ";
}

function logBreak() {
  if (env !== "runkit") console.log("");
}

function pass() {
  console.log(chalk.black.bgGreen(passText()));
}

function fail(message: string) {
  console.log(chalk.black.bgRed(failText()));
  logBreak();
  console.log(message);
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
  console.log(chalk.bold(name));
  logBreak();
  fn();
  logBreak();
}

export function demo(envInput: string) {
  env = envInput;
  logBreak();
  console.log(
    chalk.bold.yellow.inverse(
      "This is a demo environment for Jest Joi. Do not call `.demo()` in your actual project. See npmjs.com/package/jest-joi for setup instructions."
    )
  );
  logBreak();
  return { expect, test };
}
