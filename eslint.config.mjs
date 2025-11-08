import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["src/generated/**", ".next/**"],
  },
  {
    rules: {
      "react/no-unescaped-entities": 0,
      "@typescript-eslint/no-unused-vars": [
        1,
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "props",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/ban-types": 0,
    },
  },
];

export default eslintConfig;
