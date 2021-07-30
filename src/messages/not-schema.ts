import { Hint, Schema } from "../classes";
import { receivedColor } from "./shared";

export function notSchemaMessage(hint: Hint, schema: Schema): string[] {
  return [hint.text, "", "Received: " + receivedColor(schema.input.value)];
}
