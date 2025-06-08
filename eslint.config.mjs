import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintJsPlugin from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierFlatConfig from "eslint-config-prettier/flat";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default [
    eslintJsPlugin.configs.recommended,

    prettierFlatConfig, // disables formatting rules

    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.mocha,
                ...globals.node,
                ...globals.browser
            },
            sourceType: "module"
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            prettier: prettierPlugin
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            "prettier/prettier": "error"
        }
    },

    {
        files: ["test/**/*.ts"],
        languageOptions: {
            globals: globals.mocha
        }
    },

    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueParser, // Use vue-eslint-parser here
            parserOptions: {
                parser: tsParser, // Delegate <script> parsing to tsParser
                extraFileExtensions: [".vue"],
                sourceType: "module",
                ecmaVersion: 2020
            },
            globals: {
                ...globals.mocha,
                ...globals.node,
                ...globals.browser
            }
        },
        plugins: {
            vue: vuePlugin
        },
        rules: {
            ...vuePlugin.configs["flat/essential"].rules
        }
    }
];
