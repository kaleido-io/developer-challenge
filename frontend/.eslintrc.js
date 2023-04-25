module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    ignorePatterns: ['UIDev.jsx', 'Lobby.jsx', 'ControlCenter.jsx', '*.test.js'],
    rules: {
        'comma-dangle': ['error', 'never'],
        'quotes': ['error', 'single'],
        'indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'func-style': 'off',
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
        'react/jsx-props-no-spreading': 'off',
        'default-param-last': 'off',
        'no-use-before-define': 'off',
        'radix': 'off',
        'no-case-declarations': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react/forbid-prop-types': 'off',
        'no-plusplus': 'off',
        'quote-props': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/no-array-index-key': 'off', // stupid
        'no-bitwise': 'off', // stupid
        'no-param-reassign': 'off', //stupid
        'max-len': 'off', // will fix
        'no-mixed-operators': 'off', // will fix
        'react/prop-types': 'off', // will fix
        'react/require-default-props': 'off', // will fix
        'no-unused-vars': 'off' // will fix
    }
};
