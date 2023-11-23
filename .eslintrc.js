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
      'plugin:react/recommended',
      "eslint:recommended",
    ],
    rules: {
        "react/prop-types": 0,
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