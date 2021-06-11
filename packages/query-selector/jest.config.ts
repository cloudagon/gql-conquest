import fs from 'fs'
import { pathsToModuleNameMapper } from 'ts-jest/utils'
import JSON5 from 'json5'

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(
      JSON5.parse(fs.readFileSync('tsconfig.json', 'utf-8')).compilerOptions.paths ?? {},
      {
        prefix: '<rootDir>',
      },
    ),
  },
  modulePaths: ['node_modules', '<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
}
