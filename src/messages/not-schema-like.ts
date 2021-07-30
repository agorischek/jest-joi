import { Hint, Schema } from "../classes";
import { invalidSchema, invalidSchemaExplanation, labels } from "./shared";

export function notSchemaLikeMessage(hint: Hint, schema: Schema): string[] {
  return [
    hint.text,
    "",
    labels.received + " " + invalidSchemaExplanation(schema.error),
    schema.input.isSimple
      ? labels.schema + " " + invalidSchema(schema.input.value)
      : labels.schema,
    schema.input.isSimple ? null : invalidSchema(schema.input.value),
  ];
}
