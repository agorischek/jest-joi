import { matcherHint, MatcherHintOptions } from "jest-matcher-utils";

export class Hint {
  text: string;
  options: MatcherHintOptions;
  constructor(matcherName: string, context: jest.MatcherContext) {
    switch (matcherName) {
      case "toMatchSchema":
        this.options = {
          isNot: context.isNot,
          promise: context.promise,
        };
        this.text = matcherHint(
          matcherName,
          "received",
          "schema",
          this.options
        );
        break;
      case "toBeSchema":
        this.options = {
          isNot: context.isNot,
          promise: context.promise,
        };
        this.text = matcherHint(matcherName, "received", "", this.options);
        break;
      case "toBeSchemaLike":
        this.options = {
          isNot: context.isNot,
          promise: context.promise,
          comment: "Schema-like means accepted by Joi.compile()",
        };
        this.text = matcherHint(matcherName, "received", "", this.options);
        break;
    }
  }
}
