import { Hint, Received, Result } from "../classes";
import { invalidReceived, simpleErrorExplanation } from "./shared";

export function simpleMismatchMessage(
  hint: Hint,
  received: Received,
  result: Result
): string[] {
  return [
    hint.text,
    "",
    "Received: " + invalidReceived(received.input),
    "Expected: " + simpleErrorExplanation(result.error),
  ];
}
