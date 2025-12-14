module.exports = {
    preset: "ts-jest",
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
    },
    testEnvironment: "jsdom",
    transformIgnorePatterns: ["node_modules"],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '\\.(css|less|png)$': '<rootDir>/spec/__mocks__/styleMock.js',
      'src(.*)$': '<rootDir>/src$1'
    }
  };
  