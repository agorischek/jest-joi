import { Hint, Received, Result, Schema } from ".";
import {
  complexMisMatchMessage,
  simpleMismatchMessage,
  invalidSchemaMessage,
  negatedMatchMessage,
} from "../messages";
import { print, stack } from "../messages/shared";

export class MatchMessage {
  fn: () => string;
  lines: string[];
  text: string;

  constructor(
    context: jest.MatcherContext,
    name: string,
    result: Result,
    received: Received,
    schema: Schema
  ) {
    const hint = new Hint(name, context);

    if (!schema.isValid) this.lines = invalidSchemaMessage(hint, schema);
    else if (result.pass)
      this.lines = negatedMatchMessage(hint, schema, received);
    else if (received.isSimple)
      this.lines = simpleMismatchMessage(hint, received, result);
    else this.lines = complexMisMatchMessage(hint, result);

    this.text = stack(this.lines);
    this.fn = print(this.text);
  }
}
