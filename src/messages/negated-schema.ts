import { Hint, Schema } from "../classes";
import { colors, labels, pushLabeled } from "./shared";

export function negatedSchemaMessage(hint: Hint, schema: Schema): string[] {
  const lines = [hint.text, ""];

  pushLabeled(lines, labels.schema, colors.received, schema.description);

  return lines;
}
