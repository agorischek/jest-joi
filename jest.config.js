module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  testPathIgnorePatterns: ["dist", "out-ts"],
  coveragePathIgnorePatterns: ["demo", "src/__test__/utils.ts", "node_modules"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
