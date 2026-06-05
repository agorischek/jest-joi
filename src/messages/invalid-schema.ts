import { Hint, Schema } from "../classes";
import { colors, labels, pushLabeled } from "./shared";

export function invalidSchemaMessage(hint: Hint, schema: Schema): string[] {
  const lines = [hint.text, ""];

  lines.push(
    labels.expected + " " + colors.expected("Schema must be a valid Joi schema")
  );

  lines.push(labels.received + " " + colors.received(schema.error));

  pushLabeled(lines, labels.schema, colors.received, schema.input.value);

  return lines;
}
