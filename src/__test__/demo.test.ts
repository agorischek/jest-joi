import * as Joi from "joi";

import { demo } from "..";

const { test: demoTest, expect: demoExpect } = demo("test");

test("The demo test runner executes", () => {
  const demoTestCase = () => demoTest("This is a demo test", () => true);
  expect(demoTestCase).not.toThrow();
});

test("The demo test runner executes passing test cases", () => {
  const demoExpectStatement = () => demoExpect("a").toMatchSchema(Joi.string());
  expect(demoExpectStatement).not.toThrow();

  const demoExpectStatement2 = () => demoExpect(Joi.string()).toBeSchema();
  expect(demoExpectStatement2).not.toThrow();

  const demoExpectStatement3 = () => demoExpect("a").toBeSchemaLike();
  expect(demoExpectStatement3).not.toThrow();
});

test("The demo test runner executes passing negated test cases", () => {
  const demoExpectStatement = () =>
    demoExpect(1).not.toMatchSchema(Joi.string());
  expect(demoExpectStatement).not.toThrow();

  const demoExpectStatement2 = () => demoExpect(1).not.toBeSchema();
  expect(demoExpectStatement2).not.toThrow();

  const demoExpectStatement3 = () =>
    demoExpect(BigInt("1")).not.toBeSchemaLike();
  expect(demoExpectStatement3).not.toThrow();
});

test("The demo test runner executes failing test cases", () => {
  const demoExpectStatement = () => demoExpect(1).toMatchSchema(Joi.string());
  expect(demoExpectStatement).not.toThrow();

  const demoExpectStatement2 = () => demoExpect(1).toBeSchema();
  expect(demoExpectStatement2).not.toThrow();

  const demoExpectStatement3 = () => demoExpect(BigInt("1")).toBeSchemaLike();
  expect(demoExpectStatement3).not.toThrow();
});

test("The demo test runner exits async test calls", () => {
  const demoExpectStatement1 = () =>
    demoExpect(1).resolves.toMatchSchema(Joi.string());
  expect(demoExpectStatement1).not.toThrow();

  const demoExpectStatement2 = () =>
    demoExpect(1).resolves.not.toMatchSchema(Joi.string());
  expect(demoExpectStatement2).not.toThrow();

  const demoExpectStatement3 = () =>
    demoExpect(1).rejects.toMatchSchema(Joi.string());
  expect(demoExpectStatement3).not.toThrow();

  const demoExpectStatement4 = () =>
    demoExpect(1).rejects.not.toMatchSchema(Joi.string());
  expect(demoExpectStatement4).not.toThrow();
});
