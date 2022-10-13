const { JSDOM } = require('jsdom');
const Pug = require('pug');
const fs = require('fs');

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:3000'
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.pug'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf-8');

  module.exports = Pug.compile(contents);
}
require.extensions['.scss'] = function () {
  module.exports = () => ({});
}
require.extensions['.svg'] = function () { }