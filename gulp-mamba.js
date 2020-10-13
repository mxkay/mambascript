// Generated by MambaScript
var present = console.log;
// Generated by MambaScript 
var KofuScript, PLUGIN_NAME, PluginError, replaceExtension, through;
through = require('through2');
cache$ = require('gulp-util');
PluginError = cache$.PluginError;
replaceExtension = cache$.replaceExtension;
KofuScript = require('./lib/module');
PLUGIN_NAME = 'gulp-kofu';
module.exports = function (opts) {
  return through.obj(function (file, enc, callback) {
    var csAst, input, js, jsAst;
    if (file.isNull())
      return callback();
    if (file.isStream())
      throw new PluginError(PLUGIN_NAME, 'Not supports Stream');
    if (!file.isBuffer())
      throw new PluginError(PLUGIN_NAME, 'Supports Buffer only');
    input = file.contents.toString('utf8');
    csAst = KofuScript.parse(input, opts.csAst);
    jsAst = KofuScript.compile(csAst, opts.jsAst);
    js = KofuScript.js(jsAst, opts.js);
    file.contents = Buffer.from(js, 'utf8');
    file.path = replaceExtension(file.path, '.js');
    this.push(file);
    return callback();
  });
};