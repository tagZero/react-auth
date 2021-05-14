import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";
import ts from "@wessberg/rollup-plugin-ts";
import filesize from 'rollup-plugin-filesize';
import copy from 'rollup-plugin-copy';
import autoprefixer from 'autoprefixer';

const production = process.env.NODE_ENV === 'production';

const output = {
  sourcemap: !production,
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
  },
}

export default {
  input: 'src/index.ts',
  output: [
    {
      ...output,
      file: 'dist/cjs/react-auth.js',
      format: 'cjs'
    },
    {
      ...output,
      file: 'dist/es/react-auth.js',
      format: 'es'
    },
    {
      ...output,
      file: 'dist/umd/react-auth.js',
      format: 'umd',
      name: 'ReactAuth'
    }
  ],
  external: ['react', 'react-dom', 'react-router-dom'],
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    postcss({
      extract: false,
      plugins: [
        autoprefixer()
      ]
    }),
    ts({ exclude: 'src/examples/*' }),
    commonjs(),
    resolve({
      browser: true
    }),
    production ? terser() : null,
    filesize(),
    copy({
      targets: [
        { src: 'assets/*', dest: 'dist/assets/' },
        { src: 'src/styles/*', dest: 'dist/assets/styles/' },
      ]
    })
  ]
};
