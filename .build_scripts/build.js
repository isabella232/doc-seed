var fs = require('fs');
var yamlFront = require('yaml-front-matter');
var pageBuilder = require('/build-components/index.js');

// boilerplate html that includes code to get css and leaflet javascript files
var top = fs.readFileSync('/app/doc_components/top.html').toString();
var bottom = fs.readFileSync('/app/doc_components/bottom.html').toString();

// parse the md file and its yaml frontmatter
var mdText = fs.readFileSync('/app/report.md').toString();
var yfm = yamlFront.loadFront(mdText);

// get list of 'speudolexicals', or list reporesentaiton of each markdown block
var pseudoLex = mdText.match(/:::.?([\s\S]*?):::/g).map((lex) => {
  return lex.split('\n');
});

// parse markdown
var pageHTML = pageBuilder(pseudoLex, yfm);

// put parsed markdown in header and footer tags
pageHTML = top + pageHTML.join('') + bottom;

// write out the html
fs.writeFile('/output/site.html', pageHTML, function (err) {
  if (err) {
    return console.log(err);
  }
});
