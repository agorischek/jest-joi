import * as Joi from "joi";

import { isSimple } from "../utils";

export class Schema {
  input: {
    value: unknown;
    isSimple: boolean;
    isCompiled: boolean;
  };
  compiled: Joi.Schema;
  isValid: boolean;
  error: string;
  private _description: Joi.Description;

  get description(): Joi.Description {
    if (!this._description && this.compiled) {
      this._description = this.compiled.describe();
    }
    return this._description;
  }

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
