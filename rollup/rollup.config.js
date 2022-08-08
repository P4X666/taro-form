import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import json from '@rollup/plugin-json'
import less from 'rollup-plugin-less'

const overrides = {
  compilerOptions: { declaration: true },
  exclude: ["src/pages", "src/utils"],
  include: [
    "src/component/**/*.ts",
    "src/component/**/*.tsx"
  ],
}

const config = {
  input: 'index.ts',
  plugins: [
    nodeResolve(),
    commonjs(),
    // json(),
    typescript({ tsconfigOverride: overrides }),
    less({ output: 'dist/index.css' })
  ],
}

export default config

