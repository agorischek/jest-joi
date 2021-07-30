import { matcherHint } from "jest-matcher-utils";

export class Hint {
  text: string;
  constructor(
    matcherName: string,
    matcherHintOptions: jest.MatcherHintOptions
  ) {
    this.text = matcherHint(
      matcherName,
      "received",
      "schema",
      matcherHintOptions
    );
  }
}
