module.exports = {
  presets: [
    ['@babel/preset-env', { targets: 'defaults' }],
    '@babel/preset-typescript',
  ],

  ignore: ['**/dist'],

  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts'],
      },
    ],
  ],
}
