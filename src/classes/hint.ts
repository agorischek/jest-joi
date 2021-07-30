import { matcherHint } from "jest-matcher-utils";

export class Hint {
  text: string;
  constructor(
    matcherName: string,
    matcherHintOptions: jest.MatcherHintOptions
  ) {
    switch (matcherName) {
      case "toMatchSchema":
        this.text = matcherHint(
          matcherName,
          "received",
          "schema",
          matcherHintOptions
        );
        break;
      case "toBeSchema":
        this.text = matcherHint(
          matcherName,
          "received",
          "",
          matcherHintOptions
        );
        break;
      case "toBeSchemaLike":
        this.text = matcherHint(
          matcherName,
          "received",
          "",
          matcherHintOptions
        );
        break;
      default:
        this.text = matcherHint(matcherName, null, null, matcherHintOptions);
    }
  }
}
