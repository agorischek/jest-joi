import { BeMessage, Schema } from "../classes";

export function toBeSchema(
  this: jest.MatcherContext,
  received: unknown
): jest.CustomMatcherResult {
  const name = "toBeSchema";
  const schema = new Schema(received);
  const message = new BeMessage(this, name, schema);

  return {
    message: message.fn,
    pass: schema.input.isCompiled,
  };
}
