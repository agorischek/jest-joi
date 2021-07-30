import { Hint, Received, Schema } from "../classes";
import { expectedSchema, labels, validReceived } from "./shared";

export function negatedMatchMessage(
  hint: Hint,
  schema: Schema,
  received: Received
): string[] {
  return [
    hint.text,
    "",
    received.isSimple
      ? labels.received + " " + validReceived(received.input)
      : labels.received,
    received.isSimple ? null : validReceived(received.input),
    "",
    labels.schema,
    expectedSchema(schema.compiled),
  ];
}
