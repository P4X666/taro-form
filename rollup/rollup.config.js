import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import less from 'less'

const overrides = {
  compilerOptions: { declaration: true },
  exclude: ["src/pages", "src/utils"],
  include: [
    "src/component/**/*.ts",
    "src/component/**/*.tsx"
  ],
}

const processLess = function(context, payload) {
  return new Promise(( resolve, reject ) => {
    less.render({
      file: context
    }, function(err, result) {
      if( !err ) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  })
}

const config = {
  input: 'index.ts',
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({ tsconfigOverride: overrides }),
    postcss({
      // 输出路径
      extract: 'index.css',
      // 是否压缩
      minimize: true,
      process: processLess,
    }),
    // terser(),
  ],
  external: ['react','react-dom', 'react-is', 'prop-types', 'classnames', '@tarojs/taro', '@tarojs/components', 'taro-ui','lodash']
}

export default config

