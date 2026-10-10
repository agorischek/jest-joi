import { Hint, Received, Schema } from "../classes";
import { colors, labels, pushLabeled } from "./shared";

export function negatedMatchMessage(
  hint: Hint,
  schema: Schema,
  received: Received
): string[] {
  const lines = [hint.text, ""];

  pushLabeled(lines, labels.received, colors.received, received.input);
  pushLabeled(lines, labels.schema, colors.expected, schema.description);

  return lines;
}
