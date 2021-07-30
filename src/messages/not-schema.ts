import { Hint, Schema } from "../classes";
import { invalidSchemaExplanation, invalidSchema } from "./shared";

export function notSchemaMessage(hint: Hint, schema: Schema): string[] {
  return [
    hint.text,
    "",
    "Error: " + invalidSchemaExplanation(schema.error),
    schema.input.isSimple
      ? "Received: " + invalidSchema(schema.input.value)
      : "Received:",
    schema.input.isSimple ? null : invalidSchema(schema.input.value),
  ];
}
