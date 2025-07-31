import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import betterTailwindCss from "eslint-plugin-better-tailwindcss";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      prettierConfig,
      ...tailwindcssPlugin.configs["flat/recommended"],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      // "react-hooks": reactHooks,
      // "react-refresh": reactRefresh,
      prettier: prettierPlugin,
      "better-tailwindcss": betterTailwindCss,
      tailwindcss: tailwindcssPlugin,
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "prettier/prettier": "error",

      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",

      "better-tailwindcss/multiline": "warn",
      "better-tailwindcss/sort": "off",
    },

    // Tailwind CSS 插件配置，用于提取与校验类名
    settings: {
      tailwindcss: {
        // 指定配置文件位置
        config: "./tailwind.config.js",
        // 在哪些属性/函数中提取 class
        callees: ["className", "clsx", "ctl", "tw"],
        // 扫描哪些 CSS 文件
        cssFiles: [
          "**/*.css",
          "!**/node_modules/**",
          "!**/dist/**",
          "!**/build/**",
        ],
        removeDuplicates: true,
      },
    },
  },
  {
    files: ["src/context/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
]);
