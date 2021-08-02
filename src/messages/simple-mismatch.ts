import { Hint, Received, Result } from "../classes";

import { colors, errorExplanation, labels } from "./shared";

export function simpleMismatchMessage(
  hint: Hint,
  received: Received,
  result: Result
): string[] {
  const lines = [hint.text, ""];

  const printedError = errorExplanation(result.error);
  lines.push(labels.received + " " + colors.received(received.input));
  lines.push(labels.expected + " " + colors.expected(printedError));

  return lines;
}
