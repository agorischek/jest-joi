import { Hint, Schema } from "../classes";
import { validSchema } from "./shared";

export function negatedSchemaMessage(hint: Hint, schema: Schema): string[] {
  return [
    hint.text,
    "",
    schema.input.isSimple ? "Schema: " + validSchema(schema) : "Schema:",
    schema.input.isSimple ? null : validSchema(schema),
  ];
}
