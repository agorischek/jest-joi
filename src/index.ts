import * as Joi from 'joi';

import {
    MatcherHintOptions,
    matcherHint
  } from 'jest-matcher-utils'

export const toMatchSchema = (received: unknown, schema: Joi.Schema, options: Joi.ValidationOptions) => {
  const { error } = schema.validate(received, options);
  
  if (error) {
      return { message: () => `expect(received).toMatchSchema()\n\nReceived:\n\n${error.annotate()}`, pass: false };
  }
  else return { message: () => 'Matched schema', pass: true };
};
