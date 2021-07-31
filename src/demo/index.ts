import * as jestJoi from "..";
import * as chalk from "chalk";
import Joi = require("joi");

import {
  BeSchemaMatcher,
  BeSchemaLikeMatcher,
  Context,
  ExitSet,
  Expect,
  MatchSchemaMatcher,
  Test,
} from "./types";

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
  log(chalk.black.bgGreen(passText()));
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

function assessResult(
  result: jest.CustomMatcherResult,
  context: Context
): void {
  if (result.pass && context.isNot === false) pass();
  else if (result.pass === false && context.isNot === true) pass();
  else fail(result.message.call(context));
}

function makeMatchSchemaMatcher(
  context: Context,
  received: unknown
): MatchSchemaMatcher {
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
    assessResult(result, context);
  };
}

function makeBeSchemaMatcher(
  context: Context,
  received: unknown
): BeSchemaMatcher {
  return function toBeSchema() {
    const result = jestJoi.toBeSchema.call(context, received);
    assessResult(result, context);
  };
}

function makeBeSchemaLikeMatcher(
  context: Context,
  received: unknown
): BeSchemaLikeMatcher {
  return function toBeSchemaLike() {
    const result = jestJoi.toBeSchemaLike.call(context, received);
    assessResult(result, context);
  };
}

const exitSet: ExitSet = {
  toMatchSchema: asyncUnsupported,
  toBeSchema: asyncUnsupported,
  toBeSchemaLike: asyncUnsupported,
  not: {
    toMatchSchema: asyncUnsupported,
    toBeSchema: asyncUnsupported,
    toBeSchemaLike: asyncUnsupported,
  },
};

const expect: Expect = (received: unknown) => {
  return {
    resolves: exitSet,
    rejects: exitSet,
    toMatchSchema: makeMatchSchemaMatcher(
      { isNot: false, promise: "" },
      received
    ),
    toBeSchema: makeBeSchemaMatcher({ isNot: false, promise: "" }, received),
    toBeSchemaLike: makeBeSchemaLikeMatcher(
      { isNot: false, promise: "" },
      received
    ),
    not: {
      toMatchSchema: makeMatchSchemaMatcher(
        { isNot: true, promise: "" },
        received
      ),
      toBeSchema: makeBeSchemaMatcher({ isNot: true, promise: "" }, received),
      toBeSchemaLike: makeBeSchemaLikeMatcher(
        { isNot: true, promise: "" },
        received
      ),
    },
  };
};

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
      "This is a demo environment for Jest Joi. Do not call `.demo()` in your actual project."
    )
  );
  logBreak();
  return { expect, test };
}
