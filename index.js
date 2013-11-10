#! /usr/bin/env node

var Marked = require('marked')
var highlight = require('./highlight')
var opts = require('optimist').argv
var fs = require('fs')

Marked.setOptions({
    highlight: function (code, lang) {
      if(lang == 'js') {
        return highlight(code)
      }
      return code
    }
})

function html (t) {
  if(!opts.html) return
  console.log(t)
}

var log = console.log

html('<!doctype html>')
html('  <html>')
html('  <head>')
if(opts.css) {
  html('  <style>')
  log(fs.readFileSync(__dirname + '/styles/gh.css', 'utf-8'))
  html('  </style>')
}
html('  </head>')
html('  <body>')
if(opts._.length)
  log(Marked(fs.readFileSync(opts._[0], 'utf-8')))
html('</body>')
html('</html>')
