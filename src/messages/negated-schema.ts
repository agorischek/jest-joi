import { Hint, Schema } from "../classes";
import { colors, labels, printObject } from "./shared";

export function negatedSchemaMessage(hint: Hint, schema: Schema): string[] {
  const lines = [hint.text, ""];

  const printedSchema = printObject(schema.description);
  lines.push(labels.schema);
  lines.push(colors.received(printedSchema));

  return lines;
}
