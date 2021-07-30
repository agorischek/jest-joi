import { Hint, Received, Result } from "../classes";
import { invalidReceived, labels, simpleErrorExplanation } from "./shared";

export function simpleMismatchMessage(
  hint: Hint,
  received: Received,
  result: Result
): string[] {
  return [
    hint.text,
    "",
    labels.received + " " + invalidReceived(received.input),
    labels.expected + " " + simpleErrorExplanation(result.error),
  ];
}
