import * as Joi from "joi";

import { toBeSchema, toBeSchemaLike, toMatchSchema } from "./matchers";
export * from "./matchers";
export { demo } from "./demo";

export const matchers = {
  toBeSchema,
  toBeSchemaLike,
  toMatchSchema,
};

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSchema(schema: unknown, options?: Joi.ValidationOptions): R;
      toBeSchema(): R;
      toBeSchemaLike(): R;
    }
  }
}
