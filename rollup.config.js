import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";
import ts from "@wessberg/rollup-plugin-ts";
import filesize from 'rollup-plugin-filesize';
import copy from 'rollup-plugin-copy';

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
      file: production ? 'dist/cjs/react-auth.min.js' : 'dist/cjs/react-auth.js',
      format: 'cjs'
    },
    {
      ...output,
      file: production ? 'dist/es/react-auth.min.js' : 'dist/es/react-auth.js',
      format: 'es'
    },
    {
      ...output,
      file: production ? 'dist/umd/react-auth.min.js' : 'dist/umd/react-auth.js',
      format: 'umd',
      name: 'ReactAuth'
    }
  ],
  external: ['react', 'react-dom', 'react-router-dom'],
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
    filesize(),
    copy({
      targets: [
        { src: 'assets/*', dest: 'dist/assets/' }
      ]
    })
  ]
};
