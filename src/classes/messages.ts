import { Hint, Received, Result, Schema } from ".";
import { messages } from "../messages";
import { print, stack } from "../messages/shared";

class Message {
  fn: () => string;
  lines: string[];
  text: string;
}

export class MatchMessage extends Message {
  constructor(
    context: jest.MatcherContext,
    name: string,
    result: Result,
    received: Received,
    schema: Schema
  ) {
    super();
    const hint = new Hint(name, context);

    if (!schema.isValid) this.lines = messages.invalidSchema(hint, schema);
    else if (result.pass)
      this.lines = messages.negatedMatch(hint, schema, received);
    else if (received.isSimple)
      this.lines = messages.simpleMismatch(hint, received, result);
    else this.lines = messages.complexMismatch(hint, result);

    this.text = stack(this.lines);
    this.fn = print(this.text);
  }
}

export class BeMessage extends Message {
  constructor(context: jest.MatcherContext, name: string, received: Schema) {
    super();
    const hint = new Hint(name, context);

    if (context.isNot && received.input.isCompiled)
      this.lines = messages.negatedSchema(hint, received);
    else this.lines = messages.notSchema(hint, received);

    this.text = stack(this.lines);
    this.fn = print(this.text);
  }
}

export class BeLikeMessage extends Message {
  constructor(context: jest.MatcherContext, name: string, received: Schema) {
    super();
    const hint = new Hint(name, context);

    if (context.isNot && received.isValid)
      this.lines = messages.negatedSchema(hint, received);
    else this.lines = messages.notSchema(hint, received);

    this.text = stack(this.lines);
    this.fn = print(this.text);
  }
}
