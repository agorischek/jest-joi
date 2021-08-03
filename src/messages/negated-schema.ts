import { Hint, Schema } from "../classes";
import { colors, isMultiline, labels, printObject } from "./shared";

export function negatedSchemaMessage(hint: Hint, schema: Schema): string[] {
  const lines = [hint.text, ""];

  const printedSchema = printObject(schema.description);
  if (isMultiline(printedSchema)) {
    lines.push(labels.schema);
    lines.push(colors.received(printedSchema));
  } else {
    lines.push(labels.schema + " " + colors.received(printedSchema));
  }

  return lines;
}
