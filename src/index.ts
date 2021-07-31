import * as Joi from "joi";

export * from "./matchers";
export * from "./demo";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSchema(schema: unknown, options?: Joi.ValidationOptions): R;
      toBeSchema(): R;
      toBeSchemaLike(): R;
    }
  }
}
