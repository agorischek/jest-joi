import Joi = require("joi");
import { Options } from "./options";
import { Schema } from "./schema";

export class Result {
  pass: boolean;
  error: Joi.ValidationError;

  constructor(received: unknown, schema: Schema, options: Options) {
    this.error = schema.isValid
      ? schema.compiled.validate(received, options).error
      : null;
    this.pass = schema.isValid && !this.error;
  }
}
