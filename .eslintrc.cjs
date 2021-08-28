module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": ["tsconfig.all.json"],
        "sourceType": "module",
        "tsconfigRootDir": __dirname
    },
    "plugins": [
        "@typescript-eslint",
        "eslint-plugin-import"
    ],
    "rules": {
        "comma-dangle": "off",
        "dot-notation": "off",
        "indent": "off",
        "quotes": "off",
        "semi": "off",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/await-thenable": "warn",
        "@typescript-eslint/ban-types": "error",
        "@typescript-eslint/comma-dangle": "warn",
        "@typescript-eslint/dot-notation": "warn",
        "@typescript-eslint/indent": ["warn", 4, { "SwitchCase": 1 }],
        "@typescript-eslint/member-delimiter-style": [
            "warn",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/naming-convention": [
            "warn",
            {
                "selector": "default",
                "format": ["camelCase", "PascalCase", "UPPER_CASE"]
            },
            {
                "selector": "typeLike",
                "format": ["PascalCase"]
            },
            {
                "selector": ["variable", "function"],
                "types": ["function"],
                "format": ["camelCase", "PascalCase"]
            },
            {
                "selector": "classMethod",
                "format": ["camelCase"]
            },
            {
                "selector": "variable",
                "types": ["boolean"],
                "format": ["PascalCase"],
                "prefix": ["is"]
            },
            {
                "selector": ["enumMember"],
                "format": ["PascalCase", "UPPER_CASE"]
            },
            {
                "selector": "parameter",
                "modifiers": ["unused"],
                "filter": "^_",
                "format": null
            },
            {
                "selector": "property",
                "format": null
            }
        ],
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-shadow": ["error", { "hoist": "all" }],
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-as-const": "warn",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-includes": "warn",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/prefer-readonly": "warn",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/quotes": ["warn", "double", { "avoidEscape": true }],
        "@typescript-eslint/restrict-template-expressions": "error",
        "@typescript-eslint/return-await": ["error", "always"],
        "@typescript-eslint/semi": ["warn", "always"],
        "@typescript-eslint/unbound-method": "error",
        "arrow-body-style": ["warn", "as-needed"],
        "constructor-super": "error",
        "curly": ["warn", "multi"],
        "eol-last": "warn",
        "eqeqeq": ["error", "always"],
        "import/no-default-export": "error",
        "linebreak-style": "warn",
        "new-parens": "warn",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "warn",
        "no-invalid-this": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-param-reassign": "error",
        "no-sequences": "warn",
        "no-trailing-spaces": [ "warn", { "ignoreComments": true }],
        "no-var": "error",
        "prefer-arrow-callback": ["error", { "allowNamedFunctions": true }],
        "prefer-const": "error",
        "prefer-object-spread": "error"
    }
};
