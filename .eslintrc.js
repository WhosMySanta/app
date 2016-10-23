module.exports = {
  extends: 'airbnb-base',
  env: {
    jest: true,
    node: true,
  },
  plugins: ['flowtype'],
  parser: 'babel-eslint',
  rules: {
    'flowtype/boolean-style': 'error',
    'flowtype/define-flow-type': 'error',
    'flowtype/delimiter-dangle': ['error', 'always-multiline'],
    'flowtype/generic-spacing': 'error',
    'flowtype/no-weak-types': 'error',
    'flowtype/require-parameter-type': 'off',
    'flowtype/require-return-type': 'off',
    'flowtype/require-valid-file-annotation': 'error',
    'flowtype/semi': 'error',
    'flowtype/space-after-type-colon': 'error',
    'flowtype/space-before-generic-bracket': 'error',
    'flowtype/space-before-type-colon': 'error',
    'flowtype/type-id-match': ['error', '^[A-Z][a-z]+(?:[A-Z][a-z]+)*$'],
    'flowtype/union-intersection-spacing': 'error',
    'flowtype/use-flow-type': 'error',
    'flowtype/valid-syntax': 'error',
  }
};
