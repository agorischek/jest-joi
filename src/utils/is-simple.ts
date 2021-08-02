export const isSimple = (input: unknown): boolean =>
  !(typeof input === "object" && input !== null);
