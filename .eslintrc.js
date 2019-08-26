module.exports = {
    "extends": ["react-app", "eslint-config-airbnb"],
    "env": {
      "browser": true,
      "node": true,
      "jest": true,
      "es6": true
    },
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "semi": "error",
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [
            ".js",
            ".jsx"
          ]
        }
      ],
      "react/jsx-props-no-spreading": 0,
      "import/prefer-default-export": 0,
    }
}