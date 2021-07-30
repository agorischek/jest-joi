import * as Joi from "joi";

import { isSimple } from "../utils";

export class Schema {
  input: {
    value: Joi.SchemaLike;
    isSimple: boolean;
    isCompiled: boolean;
  };
  compiled: Joi.Schema;
  isValid: boolean;
  error: string;
  constructor(schemaInput: Joi.SchemaLike) {
    this.input = {
      value: schemaInput,
      isSimple: isSimple(schemaInput),
      isCompiled: Joi.isSchema(schemaInput),
    };

    try {
      this.compiled = Joi.compile(this.input.value);
      this.isValid = true;
      this.error = null;
    } catch (error) {
      this.compiled = null;
      this.error = buildErrorMessage(error);
      this.isValid = false;
    }
  }
}

export const buildErrorMessage = (error: unknown): string => {
  const errorString = error.toString();
  const errorContentMatch = errorString.match(/^Error: (.+)$/);
  const errorContent = errorContentMatch ? errorContentMatch[1] : errorString;
  return errorContent;
};
