import { Hint, Schema } from "../classes";
import {
  invalidSchema,
  invalidSchemaExplanation,
  validSchemaExplanation,
} from "./shared";

export function invalidSchemaMessage(hint: Hint, schema: Schema): string[] {
  return [
    hint.text,
    "",
    "Expected: " + validSchemaExplanation("Schema must be a valid Joi schema"),
    "Receieved: " + invalidSchemaExplanation(schema.error),
    schema.submittedIsSimple
      ? "Schema: " + invalidSchema(schema.submitted)
      : "Schema:",
    schema.submittedIsSimple ? null : invalidSchema(schema.submitted),
  ];
}
