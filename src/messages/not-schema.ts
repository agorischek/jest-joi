import { Hint, Schema } from "../classes";
import { invalidSchemaExplanation, invalidSchema, labels } from "./shared";

export function notSchemaMessage(hint: Hint, schema: Schema): string[] {
  return [
    hint.text,
    "",
    schema.error
      ? labels.error + " " + invalidSchemaExplanation(schema.error)
      : null,
    schema.input.isSimple
      ? labels.received + " " + invalidSchema(schema.input.value)
      : labels.received,
    schema.input.isSimple ? null : invalidSchema(schema.input.value),
  ];
}
