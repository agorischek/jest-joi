import { buildErrorMessage } from "../classes";

test("Should extract error content from schema validation error message with prefix", () => {
  const errorMessage = buildErrorMessage("Error: Invalid schema content");
  expect(errorMessage).toBe("Invalid schema content");
});

test("Should extract error content from schema validation error message without prefix", () => {
  const errorMessage = buildErrorMessage("Invalid schema content");
  expect(errorMessage).toBe("Invalid schema content");
});
