// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  extends: [path.join(__dirname, '../../.eslintrc.js')],
  ignorePatterns: ['dist'],

  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
