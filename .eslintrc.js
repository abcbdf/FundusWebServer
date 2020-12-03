module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 6,//也就是ES6语法支持的意思
      "sourceType": "module",
      "ecmaFeatures": {
          "modules": true
      },
      "project": "./tsconfig.json"
    },
    "plugins": ["@typescript-eslint", 'typescript'],
    rules: {
        // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
        'eqeqeq': [
            'error',
            'always',
            {
                null: 'ignore'
            }
        ],
        // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
        'typescript/class-name-casing': 'error',
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/camelcase": 'error',
        "@typescript-eslint/type-annotation-spacing": ['error', { "before": false, "after": true }],
    }
}