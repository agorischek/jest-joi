import { isSimple } from "../utils";

export class Received {
  input: unknown;
  isSimple: boolean;
  constructor(receivedInput: unknown) {
    this.input = receivedInput;
    this.isSimple = isSimple(this.input);
  }
}
