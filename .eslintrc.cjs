module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': 'off',
        "object-curly-spacing": ["error", "always"], // "always"选项意味着必须总是有空格
        'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
        '@typescript-eslint/no-explicit-any': 'off',
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'react-hooks/rules-of-hooks': 'off',
    },
}
