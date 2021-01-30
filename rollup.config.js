import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";
import ts from "@wessberg/rollup-plugin-ts";
import filesize from 'rollup-plugin-filesize';

const production = process.env.NODE_ENV === 'production';

const output = {
  sourcemap: !production,
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
  },
}

export default {
  input: 'src/index.ts',
  output: [
    {
      ...output,
      file: 'dist/cjs/index.js',
      format: 'cjs'
    },
    {
      ...output,
      file: 'dist/es/index.js',
      format: 'es'
    },
    {
      ...output,
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'AuthProvider'
    }
  ],
  external: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    postcss({
      extract: false,
      use: ['sass']
    }),
    ts({ exclude: 'src/examples/*' }),
    commonjs(),
    resolve({
      browser: true
    }),
    production ? terser() : null,
    filesize()
  ]
};
