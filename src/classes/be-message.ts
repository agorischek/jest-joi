import { Hint, Received, Result, Schema } from ".";
import { print, stack } from "../utils";
import { notSchemaMessage, notSchemaLikeMessage } from "../messages";
import { negatedSchemaMessage } from "../messages/negated-schema";

export class BeMessage {
  fn: () => string;
  text: string;

  constructor(context: jest.MatcherContext, name: string, received: Schema) {
    const hint = new Hint(name, context);

    const messageLines: string[] = context.isNot
      ? negatedSchemaMessage(hint, received)
      : notSchemaMessage(hint, received);

    this.text = stack(messageLines);
    this.fn = print(this.text);
  }
}
