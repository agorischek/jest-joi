import * as Joi from "joi";

import { MatchMessage, Options, Schema, Received, Result } from "../classes";

export function toMatchSchema(
  this: jest.MatcherContext,
  receivedInput: unknown,
  schemaInput: unknown,
  optionsInput: Joi.ValidationOptions
): jest.CustomMatcherResult {
  const name = "toMatchSchema";
  const received = new Received(receivedInput);
  const options = new Options(optionsInput);
  const schema = new Schema(schemaInput);
  const result = new Result(received, schema, options);
  const message = new MatchMessage(this, name, result, received, schema);

  return {
    message: message.fn,
    pass: result.pass,
  };
}
