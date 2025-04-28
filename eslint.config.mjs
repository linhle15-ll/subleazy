// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier'; 

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin, // <-- use the imported plugin
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
);
