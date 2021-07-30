import { Hint, Schema } from "../classes";
import { invalidSchema, invalidSchemaExplanation } from "./shared";

export function notSchemaLikeMessage(hint: Hint, schema: Schema): string[] {
  return [
    hint.text,
    "",
    "Receieved: " + invalidSchemaExplanation(schema.error),
    schema.input.isSimple
      ? "Schema: " + invalidSchema(schema.input.value)
      : "Schema:",
    schema.input.isSimple ? null : invalidSchema(schema.input.value),
  ];
}
