import { Hint, Schema } from ".";
import { negatedSchemaMessage, notSchemaMessage } from "../messages";
import { print, stack } from "../messages/shared";

export class BeMessage {
  fn: () => string;
  lines: string[];
  text: string;

  constructor(context: jest.MatcherContext, name: string, received: Schema) {
    const hint = new Hint(name, context);

    if (context.isNot && received.input.isCompiled)
      this.lines = negatedSchemaMessage(hint, received);
    else this.lines = notSchemaMessage(hint, received);

    this.text = stack(this.lines);
    this.fn = print(this.text);
  }
}
