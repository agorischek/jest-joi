import { Hint, Schema } from "../classes";
import { labels, validSchema } from "./shared";

export function negatedSchemaMessage(hint: Hint, schema: Schema): string[] {
  return [hint.text, "", labels.schema, validSchema(schema)];
}
