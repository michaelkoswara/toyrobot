module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
      jest: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: 'module'
    },
    extends: [
      "eslint:recommended",
      'plugin:react/recommended',
      "prettier"
    ],
    rules: {
        "react/display-name":0,
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
    },
    settings: {
      "react": {
        "version": "detect"
      }
    }
}