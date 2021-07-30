import { Hint, Schema } from "../classes";
import { validSchema } from "./shared";

export function negatedSchemaMessage(hint: Hint, schema: Schema): string[] {
  return [
    hint.text,
    "",
    schema.description.isSimple ? "Schema: " + validSchema(schema) : "Schema:",
    schema.description.isSimple ? null : validSchema(schema),
  ];
}
