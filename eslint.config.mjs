import jest from "eslint-plugin-jest";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import importPlugin from "eslint-plugin-import";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	...compat.extends("plugin:@typescript-eslint/recommended"),
	js.configs.recommended,
	importPlugin.flatConfigs.recommended,
	{
		files: ["**/*.{js,mjs,cjs,ts}"],
		plugins: {
			"@typescript-eslint": typescriptEslint,
			prettier,
		},

		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},

			parser: tsParser,
			ecmaVersion: 12,
			sourceType: "module",
		},

		settings: {
			"import/resolver": {
				typescript: {},
			},
		},

		rules: {
			camelcase: "off",

			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "interface",
					format: ["PascalCase"],

					custom: {
						regex: "^I[A-Z]",
						match: true,
					},
				},
			],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "next",
					varsIgnorePattern: "next",
				},
			],

			"class-methods-use-this": "off",
			"import/prefer-default-export": "off",
			"no-await-in-loop": "off",
			"no-shadow": "off",
			"no-console": "off",
			"no-useless-constructor": "off",
			"no-empty-function": "off",
			"lines-between-class-members": "off",

			"no-restricted-syntax": [
				"off",
				{
					selector: "ForOfStatement",
					message: "for..of loops are not allowed",
				},
			],

			"no-unused-vars": ["error", { argsIgnorePattern: "next" }],

			"prettier/prettier": "error",
		},
	},
	{
		files: ["tests/**/*"],
		plugins: {
			jest,
		},
		languageOptions: {
			globals: {
				...jest.environments.globals.globals,
			},
		},
	},
];