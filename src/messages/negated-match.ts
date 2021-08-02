import { Hint, Received, Schema } from "../classes";
import { colors, isMultiline, labels, printObject } from "./shared";

export function negatedMatchMessage(
  hint: Hint,
  schema: Schema,
  received: Received
): string[] {
  const lines = [hint.text, ""];

  const printedReceived = printObject(received.input);
  if (isMultiline(printedReceived)) {
    lines.push(labels.received);
    lines.push(colors.received(printedReceived));
  } else {
    lines.push(labels.received + " " + colors.received(printedReceived));
  }

  const printedSchema = printObject(schema.description);
  if (isMultiline(printedSchema)) {
    lines.push(labels.schema);
    lines.push(colors.expected(printedSchema));
  } else {
    lines.push(labels.schema + " " + colors.expected(printedSchema));
  }

  return lines;
}
