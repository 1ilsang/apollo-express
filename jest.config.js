module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest",
    "\\.(gql|graphql)$": "jest-transform-graphql"
  },
  testRegex: "\\.test\\.ts$",
  testEnvironment: 'node',
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'ts',
    'tsx',
  ],
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  globals: {

  }
}