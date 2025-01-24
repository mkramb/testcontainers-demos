module.exports = {
  testEnvironment: "node",
  testTimeout: 30000,
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  globalSetup: "./jest.setup.js",
  globalTeardown: "./jest.teardown.js",
};
