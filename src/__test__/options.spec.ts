import { Options } from "../classes";

test("Should set abortEarly without input options", () => {
  const options = new Options({});
  expect(options).toStrictEqual({
    abortEarly: false,
  });
});

test("Should add abortEarly with input options when missing", () => {
  const options = new Options({
    debug: true,
  });
  expect(options).toStrictEqual({
    abortEarly: false,
    debug: true,
  });
});

test("Should retain abortEarly as true with input options when present", () => {
  const options = new Options({
    abortEarly: true,
    debug: true,
  });
  expect(options).toStrictEqual({
    abortEarly: true,
    debug: true,
  });
});

test("Should retain abortEarly as false with input options when present", () => {
  const options = new Options({
    abortEarly: false,
    debug: true,
  });
  expect(options).toStrictEqual({
    abortEarly: false,
    debug: true,
  });
});
