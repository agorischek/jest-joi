export const isSimple = (input: unknown): boolean =>
  !(typeof input === "object" && input !== null);

export const stack = (lines: Array<string>): string => {
  const reducer = (accumulator: string, value: string) => {
    return value === ""
      ? accumulator + "\n"
      : value === null
      ? accumulator
      : accumulator + "\n" + value;
  };
  return lines.reduce(reducer);
};

export const print =
  (message: string): (() => string) =>
  (): string =>
    message;
