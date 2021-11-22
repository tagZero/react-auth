import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import html from '@rollup/plugin-html';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import ts from "rollup-plugin-ts";

const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <base href="http://localhost:3000/" />
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="color-scheme" content="dark light">
    <title>ReactAuth Test</title>
  </head>
  <body>
    <div id="root"></div>
    
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-router-dom@5.2.1/umd/react-router-dom.min.js"></script>
    <script src="example.js"></script>
  </body>
</html>
`;

export default {
  input: './src/examples/Example.tsx',
  output: {
    dir: 'dist',
    name: 'ReactAuth',
    sourcemap: true,
    format: 'umd',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router-dom': 'ReactRouterDOM'
    },
  },
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
      use: ['sass']
    }),
    ts(),
    commonjs(),
    resolve({
      browser: true
    }),
    html({
      template: () => template
    }),
    copy({
      targets: [
        { src: 'assets/*', dest: 'dist/assets/' }
      ]
    })
  ]
};
