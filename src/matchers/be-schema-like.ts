import * as Joi from "joi";

import { BeLikeMessage, Schema } from "../classes";

export function toBeSchemaLike(
  this: jest.MatcherContext,
  received: Joi.SchemaLike
): jest.CustomMatcherResult {
  const name = "toBeSchemaLike";
  const schema = new Schema(received);

  const message = new BeLikeMessage(this, name, schema);

  return {
    message: message.fn,
    pass: schema.isValid,
  };
}
