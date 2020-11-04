// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    testEnvironment: "jsdom",
    projects: [
      {
        displayName: "JavaScript",
        moduleFileExtensions: ['js', 'mjs'],
 
        "transform": {
            "^.+\\.js$": "babel-jest",
            "^.+\\.mjs$": "babel-jest"
          },
        "testPathIgnorePatterns" : [
            "<rootDir>/jest.config.js" 
          ],
          "setupFilesAfterEnv": ["./setupTests.js"] 


      }
    ],

  };
  