/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs'
import { pathsToModuleNameMapper } from 'ts-jest/utils'
import JSON5 from 'json5'

export default {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: pathsToModuleNameMapper(
    JSON5.parse(fs.readFileSync('tsconfig.json', 'utf-8')).compilerOptions
      .paths ?? {},
  ),
  modulePaths: ['node_modules', 'src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
}
