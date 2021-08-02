import { Hint, Result } from "../classes";
import { errorExplanation, labels } from "./shared";

export function complexMisMatchMessage(hint: Hint, result: Result): string[] {
  const lines = [hint.text, ""];

  lines.push(labels.received);
  const printedError = errorExplanation(result.error);
  lines.push(printedError);

  return lines;
}
