import { Hint, Received, Schema } from "../classes";
import { expectedSchema, validReceived } from "./shared";

export function negatedMatchMessage(
  hint: Hint,
  schema: Schema,
  received: Received
): string[] {
  return [
    hint.text,
    "",
    received.isSimple
      ? "Received: " + validReceived(received.input)
      : "Received:",
    received.isSimple ? null : validReceived(received.input),
    "",
    "Schema:",
    expectedSchema(schema.compiled),
  ];
}
