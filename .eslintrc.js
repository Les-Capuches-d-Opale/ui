// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'on',
        'unused-imports/no-unused-imports-ts': 'on',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    String: false,
                    Boolean: false,
                    Number: false,
                    Symbol: false,
                    '{}': false,
                    Object: false,
                    object: false,
                    Function: false,
                },
                extendDefaults: true,
            },
        ],
    },
};
