module.exports = {
  "roots": [
    "<rootDir>/test"
  ],
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testMatch": [
    "./*.+(ts|tsx|js)",
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "verbose": true,
  "moduleDirectories": [
    "node_modules"
  ],
  "transformIgnorePatterns": [],
  "testPathIgnorePatterns": [
    "cypress"
  ]
}
