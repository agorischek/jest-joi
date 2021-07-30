export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSchema(schema: unknown, options?: unknown): R;
      toBeSchema(): R;
      toBeSchemaLike(): R;
    }
  }
}
