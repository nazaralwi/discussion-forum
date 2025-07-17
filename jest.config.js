export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: "jest-environment-jsdom",
  extensionsToTreatAsEsm: ['.ts'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: './tsconfig.json', // pastikan ini menunjuk file yang benar
    },
  },
};
