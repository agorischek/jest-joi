import { Hint, Schema } from "../classes";
import { colors, isMultiline, labels, printObject } from "./shared";

export function notSchemaMessage(hint: Hint, schema: Schema): string[] {
  const lines = [hint.text, ""];

  if (schema.error) {
    lines.push(labels.error + " " + colors.received(schema.error));
  }

  const printedSchema = printObject(schema.input.value);

  if (isMultiline(printedSchema)) {
    lines.push(labels.received);
    lines.push(colors.received(printedSchema));
  } else {
    lines.push(labels.received + " " + colors.received(printedSchema));
  }

  return lines;
}
