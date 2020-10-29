module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended",
    ],
    settings: {
      react: {
        version: 'detect'
      },
      "import/resolver": {
        "typescript": {}
      }
    },
    env: {
      browser: true,
      node: true,
      es6: true
    },
    plugins: ['@typescript-eslint', 'react', "prettier", "react-hooks"],
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: ".",
      createDefaultProgram: true,    
    },
    rules: {
      'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      "prettier/prettier": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/explicit-module-boundary-types": 'off',
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [
            ".tsx"
          ]
        }
      ],
      "import/prefer-default-export": "off",
    },
    overrides: [
      // Override some TypeScript rules just for .js files
      {
        files: ['*.js'],
        rules: {
          '@typescript-eslint/no-var-requires': 'off' //
        }
      }
    ],
  };