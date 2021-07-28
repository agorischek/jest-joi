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
      this.error = error;
      this.isValid = false;
    }
  }
}
