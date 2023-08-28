module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'jest': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint',
		'tailwindcss'
	],
	'rules': {
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'@typescript-eslint/no-shadow': 'error',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/comma-dangle': 'error',
		'tailwindcss/classnames-order': 'error',
		'tailwindcss/no-custom-classname': 'off',
		'tailwindcss/no-contradicting-classname': 'error',
		'react/jsx-no-literals': 'error',
		'no-eval': 'error',
		'no-floating-decimal': 'error',
		'no-return-await': 'error',
		'no-script-url': 'error',
		'no-sequences': 'error',
		'no-shadow': 'off',
		'no-throw-literal': 'error',
		'no-undef-init': 'error',
		'no-unused-vars': 'off',
		'no-undefined': 'error',
		'no-underscore-dangle': 'error',
		'no-unneeded-ternary': 'error',
		'no-unused-expressions': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-concat': 'error',
		'no-useless-constructor': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'object-shorthand': 'error',
		'prefer-arrow-callback': 'error',
		'prefer-const': 'error',
		'prefer-regex-literals': 'error',
		'prefer-template': 'error',
		'radix': 'error',
		'require-await': 'error',
		'require-unicode-regexp': 'error',
		'sort-keys': 'error',
		'sort-vars': 'error',
		'spaced-comment': ['error', 'always', { 'markers': ['/'] }],
		'yoda': 'error',
		'jsx-quotes': 'error',
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'no-extra-parens': 'error',
		'no-multi-spaces': 'error',
		'no-multiple-empty-lines': 'error',
		'no-trailing-spaces': 'error',
		'space-in-parens': 'error',
		'space-infix-ops': 'error',
		'switch-colon-spacing': 'error',
		'template-curly-spacing': 'error',
		'react/react-in-jsx-scope': 'off'
}
}
