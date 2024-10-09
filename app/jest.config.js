/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'cjs', 'jsx'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{
      tsconfig: 'tsconfig.app.json',
      useESM: true,
    }],
  },
  rootDir: '.',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
};
