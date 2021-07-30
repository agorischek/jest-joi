import * as Joi from "joi";

import { isSimple } from "../utils";

export class Schema {
  submitted: Joi.SchemaLike;
  submittedIsSimple: boolean;
  compiled: Joi.Schema;
  isValid: boolean;
  error: string;
  constructor(submittedSchema: Joi.SchemaLike) {
    this.submitted = submittedSchema;
    this.submittedIsSimple = isSimple(this.submitted);

    try {
      this.compiled = Joi.compile(this.submitted);
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
