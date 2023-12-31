import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
  testEnvironment: "node"
};

export default config;
