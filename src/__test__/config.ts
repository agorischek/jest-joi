// When set to false, the wrap helpers in utils.ts guard assertions with expect().toThrow().
// When set to true, assertions run directly so error messages can be inspected manually.
// Must be false before merging to mainline.
export const manualErrorInspection = false;
