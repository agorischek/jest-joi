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

  const errorMessage =
    isJoiSchemaError(error) && errorContent
      ? `${errorContent}`
      : "Invalid schema content";
  return errorMessage;
};

type JoiSchemaError = {
  path: string;
};

const isJoiSchemaError = (error: unknown): error is JoiSchemaError => {
  const hasPath = Object.prototype.hasOwnProperty.call(error, "path");
  return error && hasPath ? true : false;
};
