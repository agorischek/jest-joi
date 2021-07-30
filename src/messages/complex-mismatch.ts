import { Hint, Result } from "../classes";
import { complexErrorExplanation } from "./shared";

export function complexMisMatchMessage(hint: Hint, result: Result): string[] {
  return [hint.text, "", "Received:", complexErrorExplanation(result.error)];
}
