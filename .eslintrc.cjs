/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:@cspell/recommended"
  ],
  overrides: [{
    "files": ["*.test.*"],
    "rules": {
      "@cspell/spellchecker": "off",
    }
  }],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: { attributes: false },
      },
    ],
    "@typescript-eslint/dot-notation": "off",
    '@cspell/spellchecker': ['warn', {
      checkIdentifiers: false,
      cspell: {
        ignoreWords: [
          // Our Site Vernacular
          "Chessground",
          "Chessimprovia",
          "chessperson",
          "chesspersons",

          // Workarounds
          "gtag",
          "HLBR",
          "ndjson",
        ]
      }
    }]
  },
};

module.exports = config;
