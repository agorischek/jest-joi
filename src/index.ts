export * from "./match-schema";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSchema(schema: unknown, options?: unknown): R;
    }
  }
}
