import * as jestJoi from ".";
import * as chalk from "chalk";
import Joi = require("joi");

let env = "";

function log(content: string): void {
  if (env !== "test") console.log(content);
}

function logBreak(): void {
  if (env !== "runkit" && env !== "test") console.log("");
}

function passText(): string {
  if (env === "runkit") return "[PASS]";
  else return " PASS ";
}

function failText(): string {
  if (env === "runkit") return "[FAIL]";
  else return " FAIL ";
}

function pass() {
  console.log(chalk.black.bgGreen(passText()));
}

function fail(message: string) {
  log(chalk.black.bgRed(failText()));
  logBreak();
  log(message);
}

function asyncUnsupported(expected?: unknown) {
  log(
    "This demo environment doesn't support async tests. Install jest-joi in your local environment instead!"
  );
  expected;
}

function makeMatcher(
  context: { isNot: boolean; promise: string },
  received: unknown
): Matcher {
  return function toMatchSchema(
    schema: unknown,
    options?: Joi.ValidationOptions
  ) {
    const result = jestJoi.toMatchSchema.call(
      context,
      received,
      schema,
      options
    );
    if (result.pass && context.isNot === false) pass();
    else fail(result.message.call(context));
  };
}

type Exit = (received?: unknown) => void;

type Matcher = (schema: unknown, options?: Joi.ValidationOptions) => void;

type Expect = (received: unknown) => {
  resolves: {
    toMatchSchema: Exit;
    not: {
      toMatchSchema: Exit;
    };
  };
  rejects: {
    toMatchSchema: Exit;
    not: {
      toMatchSchema: Exit;
    };
  };
  toMatchSchema: Matcher;
  not: {
    toMatchSchema: Matcher;
  };
};

const expect: Expect = (received: unknown) => {
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
};

type Test = (name: string, fn: () => void) => void;

const test: Test = (name, fn) => {
  log(chalk.bold(name));
  logBreak();
  fn();
  logBreak();
};

export function demo(envInput?: string): { expect: Expect; test: Test } {
  env = envInput;
  logBreak();
  log(
    chalk.bold.yellow.inverse(
      "This is a demo environment for Jest Joi. Do not call `.demo()` in your actual project. See npmjs.com/package/jest-joi for setup instructions."
    )
  );
  logBreak();
  return { expect, test };
}
