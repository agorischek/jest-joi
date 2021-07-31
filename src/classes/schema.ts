import * as Joi from "joi";

import { isSimple } from "../utils";

export class Schema {
  input: {
    value: unknown;
    isSimple: boolean;
    isCompiled: boolean;
  };
  compiled: Joi.Schema;
  description: Joi.Description;
  isValid: boolean;
  error: string;
  constructor(schemaInput: unknown) {
    this.input = {
      value: schemaInput,
      isSimple: isSimple(schemaInput),
      isCompiled: Joi.isSchema(schemaInput),
    };

    try {
      this.compiled = Joi.compile(this.input.value as Joi.SchemaLike);
      this.isValid = true;
      this.error = null;
      this.description = this.compiled.describe();
    } catch (error) {
      this.compiled = null;
      this.error = buildErrorMessage(error);
      this.isValid = false;
      this.description = {
        value: null,
        isSimple: null,
      };
    }
  }
}

export const buildErrorMessage = (error: unknown): string => {
  const errorString = error.toString();
  const errorContentMatch = errorString.match(/^Error: (.+)$/);
  const errorContent = errorContentMatch ? errorContentMatch[1] : errorString;
  return errorContent;
};
