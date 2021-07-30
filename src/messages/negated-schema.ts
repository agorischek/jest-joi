import { Hint, Schema } from "../classes";
import { labels, validSchema } from "./shared";

export function negatedSchemaMessage(hint: Hint, schema: Schema): string[] {
  return [
    hint.text,
    "",
    schema.description.isSimple
      ? labels.schema + " " + validSchema(schema)
      : labels.schema,
    schema.description.isSimple ? null : validSchema(schema),
  ];
}
