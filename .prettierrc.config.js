const prettierTailwind = require("prettier-plugin-tailwindcss");

module.exports = {
  default: {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "none",
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: "avoid",
  },
  tailwind: {
    plugins: [prettierTailwind],
    printWidth: 200,
  },
};
