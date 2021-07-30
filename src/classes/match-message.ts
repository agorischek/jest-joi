import { Hint, Received, Result, Schema } from ".";
import { print, stack } from "../utils";
import {
  complexMisMatchMessage,
  simpleMismatchMessage,
  invalidSchemaMessage,
  negatedMatchMessage,
} from "../messages";

export class MatchMessage {
  fn: () => string;
  text: string;

  constructor(
    context: jest.MatcherContext,
    name: string,
    result: Result,
    received: Received,
    schema: Schema
  ) {
    const hint = new Hint(name, context);

    const messageLines: string[] = !schema.isValid
      ? invalidSchemaMessage(hint, schema)
      : result.pass
      ? negatedMatchMessage(hint, schema, received)
      : received.isSimple
      ? simpleMismatchMessage(hint, received, result)
      : complexMisMatchMessage(hint, result);

    this.text = stack(messageLines);
    this.fn = print(this.text);
  }
}
