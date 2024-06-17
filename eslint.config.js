module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  ignorePatterns: ['node_modules/**/*.js', 'src/views/**/*.ejs'],
  rules: {
    'prettier/prettier': 'warn',
    'block-scoped-var': ['error'],
    'callback-return': ['error', ['done', 'proceed', 'next', 'onwards', 'callback', 'cb']],
    camelcase: [
      'warn',
      {
        properties: 'always',
      },
    ],
    'comma-style': ['warn', 'last'],
    curly: ['warn'],
    eqeqeq: ['error', 'always'],
    'eol-last': ['warn'],
    'handle-callback-err': ['error'],
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        MemberExpression: 'off',
        FunctionDeclaration: {
          body: 1,
          parameters: 'off',
        },
        FunctionExpression: {
          body: 1,
          parameters: 'off',
        },
        CallExpression: {
          arguments: 'off',
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ignoredNodes: ['ConditionalExpression'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'no-dupe-keys': ['error'],
    'no-duplicate-case': ['error'],
    'no-extra-semi': ['warn'],
    'no-labels': ['error'],
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    'no-redeclare': ['warn'],
    'no-return-assign': ['error', 'always'],
    'no-sequences': ['error'],
    'no-trailing-spaces': ['warn'],
    'no-undef': ['off'],
    'no-unexpected-multiline': ['warn'],
    'no-unreachable': ['warn'],
    'no-unused-vars': [
      'warn',
      {
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^unused($|[A-Z].*$)',
        argsIgnorePattern: '^unused($|[A-Z].*$)',
        varsIgnorePattern: '^unused($|[A-Z].*$)',
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    'one-var': ['warn', 'never'],
    'prefer-arrow-callback': [
      'warn',
      {
        allowNamedFunctions: true,
      },
    ],
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: false,
        allowTemplateLiterals: true,
      },
    ],
    semi: ['warn', 'always'],
    'semi-spacing': [
      'warn',
      {
        before: false,
        after: true,
      },
    ],
    'semi-style': ['warn', 'last'],
    'max-len': [
      'warn',
      {
        code: 120,
      },
    ],
  },
};
