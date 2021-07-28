import * as Joi from "joi";

export class Schema {
  submitted: Joi.SchemaLike;
  compiled: Joi.Schema;
  isValid: boolean;
  error: string;
  constructor(submittedSchema: Joi.SchemaLike) {
    this.submitted = submittedSchema;

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
