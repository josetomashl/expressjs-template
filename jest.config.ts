import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  passWithNoTests: true
};

export default config;
