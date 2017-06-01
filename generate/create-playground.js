let fs = require('fs-extra');
let path = require('path');
let rollup = require('rollup');
let rollupNodeResolver = require('rollup-plugin-node-resolve');
let rollupCommonJs = require('rollup-plugin-commonjs');
let rollupReplace = require('rollup-plugin-re');

const { DIST_FOLDER } = require('../lib/constants');

let distPath = path.resolve(__dirname, `../${ DIST_FOLDER }`);
let originalPlaygroundPath = path.resolve(__dirname, '../playground');
let distPlaygroundPath = `${ distPath }/playground`;

fs.copySync(originalPlaygroundPath, distPlaygroundPath);

rollup.rollup({
  entry: path.resolve(__dirname, '../playground/playground.js'),
  plugins: [
    rollupReplace({
      patterns: [
        {
          test: `require('./html-beautify')`,
          replace: '() => {}'
        }
      ]
    }),
    rollupNodeResolver({
      jsnext: true,
      main: true,
      browser: true
    }),
    rollupCommonJs({
      sourceMap: false
    })
  ]
})
  .then(bundle => {
    let result = bundle.generate({
      format: 'iife',
      moduleName: 'playground'
    });

    fs.writeFileSync(
      path.resolve(__dirname, `${ distPlaygroundPath }/playground.bundle.js`),
      result.code
    );
  })
  .catch(err => {
    console.log(err);
  });