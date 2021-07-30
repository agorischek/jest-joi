import { Hint, Schema } from ".";
import { negatedSchemaMessage, notSchemaMessage } from "../messages";
import { print, stack } from "../messages/shared";

export class BeMessage {
  fn: () => string;
  text: string;

  constructor(context: jest.MatcherContext, name: string, received: Schema) {
    const hint = new Hint(name, context);

    const messageLines: string[] =
      context.isNot && received.input.isCompiled
        ? negatedSchemaMessage(hint, received)
        : notSchemaMessage(hint, received);

    this.text = stack(messageLines);
    this.fn = print(this.text);
  }
}
