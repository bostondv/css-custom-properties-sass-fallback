var fs = require('fs');
var postcss = require('postcss');
var customProperties = require('postcss-custom-properties');
var discardDuplicates = require('postcss-discard-duplicates');
var sass = require('node-sass');

var output;
var css = fs.readFileSync('input.scss', 'utf8');

output = sass.renderSync({
  data: css,
  outputStyle: 'expanded'
});

output = output.css.toString('utf-8');

output = postcss()
  .use(customProperties({preserve: true}))
  .use(discardDuplicates())
  .process(output)
  .css;

fs.writeFileSync('output.css', output, 'utf-8', function(err) {
  if (err) throw err;
  console.log('CSS file was written');
});
