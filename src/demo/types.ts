import Joi = require("joi");

export type Exit = (received?: unknown) => void;

export type MatchSchemaMatcher = (
  schema: unknown,
  options?: Joi.ValidationOptions
) => void;

export type BeSchemaMatcher = () => void;

export type BeSchemaLikeMatcher = () => void;

export type Context = { isNot: boolean; promise: string };

export type ExitSet = {
  toMatchSchema: Exit;
  toBeSchema: Exit;
  toBeSchemaLike: Exit;
  not: {
    toMatchSchema: Exit;
    toBeSchema: Exit;
    toBeSchemaLike: Exit;
  };
};

export type Expect = (received: unknown) => {
  resolves: ExitSet;
  rejects: ExitSet;
  toMatchSchema: MatchSchemaMatcher;
  toBeSchema: BeSchemaMatcher;
  toBeSchemaLike: BeSchemaLikeMatcher;
  not: {
    toMatchSchema: MatchSchemaMatcher;
    toBeSchema: BeSchemaMatcher;
    toBeSchemaLike: BeSchemaLikeMatcher;
  };
};

export type Test = (name: string, fn: () => void) => void;
