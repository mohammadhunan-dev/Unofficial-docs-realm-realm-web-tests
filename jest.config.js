// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    testEnvironment: "jsdom",
    projects: [
      {
        displayName: "Web-JavaScript",
        moduleFileExtensions: ['js', 'mjs'],

        "transform": {
            "^.+\\.js$": "babel-jest",
            "^.+\\.mjs$": "babel-jest"
          },
        "testPathIgnorePatterns" : [
            "<rootDir>/jest.config.js" 
          ],
          "setupFilesAfterEnv": ["./setupTests.js"] 
      },
      {
        displayName: "Web-TypeScript",
        moduleFileExtensions: ['ts', 'js'],
        preset: 'ts-jest/presets/js-with-ts',
        testMatch: [
          "<rootDir>/__tests__/**/*.ts",
        ],
        "transform": {
          "^.+\\.ts$": "ts-jest"
        },
      },
    ],

  };
  