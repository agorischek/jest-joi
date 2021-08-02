import { Hint, Schema } from "../classes";
import { colors, isMultiline, labels, printObject } from "./shared";

export function invalidSchemaMessage(hint: Hint, schema: Schema): string[] {
  const lines = [hint.text, ""];

  lines.push(
    labels.expected + " " + colors.expected("Schema must be a valid Joi schema")
  );

  lines.push(labels.received + " " + colors.received(schema.error));

  const printedSchema = printObject(schema.input.value);
  if (isMultiline(printedSchema)) {
    lines.push(labels.schema);
    lines.push(colors.received(printedSchema));
  } else {
    lines.push(labels.schema + " " + colors.received(printedSchema));
  }

  return lines;
}
