import { Hint, Schema } from "../classes";
import {
  invalidSchema,
  invalidSchemaExplanation,
  labels,
  validSchemaExplanation,
} from "./shared";

export function invalidSchemaMessage(hint: Hint, schema: Schema): string[] {
  return [
    hint.text,
    "",
    labels.expected +
      " " +
      validSchemaExplanation("Schema must be a valid Joi schema"),
    labels.received + " " + invalidSchemaExplanation(schema.error),
    schema.input.isSimple
      ? labels.schema + " " + invalidSchema(schema.input.value)
      : labels.schema,
    schema.input.isSimple ? null : invalidSchema(schema.input.value),
  ];
}
