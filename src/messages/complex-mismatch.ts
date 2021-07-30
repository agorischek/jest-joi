import { Hint, Result } from "../classes";
import { complexErrorExplanation, labels } from "./shared";

export function complexMisMatchMessage(hint: Hint, result: Result): string[] {
  return [
    hint.text,
    "",
    labels.received,
    complexErrorExplanation(result.error),
  ];
}
