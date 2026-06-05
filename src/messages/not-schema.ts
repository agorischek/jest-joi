import { Hint, Schema } from "../classes";
import { colors, labels, pushLabeled } from "./shared";

export function notSchemaMessage(hint: Hint, schema: Schema): string[] {
  const lines = [hint.text, ""];

  if (schema.error) {
    lines.push(labels.error + " " + colors.received(schema.error));
  }

  pushLabeled(lines, labels.received, colors.received, schema.input.value);

  return lines;
}
