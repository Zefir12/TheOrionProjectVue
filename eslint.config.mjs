import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintJsPlugin from "@eslint/js";

export default [
    {
        rules: eslintJsPlugin.configs.recommended.rules
    },
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsParser,
            globals: globals.node
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            prettier: prettierPlugin
        },
        rules: {
            ...tsPlugin.configs.recommended.rules
            //"no-console": "error"
        }
    },
    {
        files: ["test/**/*.ts"],
        languageOptions: {
            globals: globals.mocha
        }
    }
];
