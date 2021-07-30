import * as Joi from "joi";

import { Message, Options, Schema, Received, Result } from "../classes";
import {} from "../classes/received";

export function toMatchSchema(
  this: jest.MatcherContext,
  receivedInput: unknown,
  schemaInput: Joi.Schema,
  optionsInput: Joi.ValidationOptions
): jest.CustomMatcherResult {
  const name = "toMatchSchema";
  const received = new Received(receivedInput);
  const options = new Options(optionsInput);
  const schema = new Schema(schemaInput);
  const result = new Result(received, schema, options);
  const message = new Message(this, name, result, received, schema);

  return {
    message: message.fn,
    pass: result.pass,
  };
}
