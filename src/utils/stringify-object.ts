const stringify = require("@aitodotai/json-stringify-pretty-compact");

export function stringifyObject(object: unknown, options: unknown): string {
  return stringify(object, options);
}
