const Prism = require("prismjs");
require("prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js");

const copy = require("copy");
const ejs = require("ejs");
const fs = require("fs");
const glob = require("glob");
const rimraf = require("rimraf");
const util = require("util");
const webpack = require("webpack");
const webpackLibraryConfig = require("./webpack.config.js");

const [
  copyP,
  ejsRenderFileP,
  globP,
  rimrafP,
  webpackP,
  writeFileP,
] = [
  copy,
  ejs.renderFile,
  glob,
  rimraf,
  webpack,
  fs.writeFile,
].map(util.promisify);



const buildLibrary = ({ production }) =>
  rimrafP("dist")
    .then(() => {
      return globP("src/eds-*/index.js")
    })
    .then(paths => {
      return paths.map(path => path.match(/\/([A-Za-z\-]+)\/index\.js$/)[1])
    })
    .then(components => {
      return (production ? ["production"] : []).concat("development").map(webpackLibraryConfig(components))
    })
    .then(configs => {
      return Promise.all(configs.map(config => webpackP(config)))
    });

const buildDocs = () => {
  const importComponentDocs = () =>
    globP("src/**/doc.js")
      .then(docs => docs.map(doc => {
        const tag = doc.match(/\/([A-Za-z\-]+)\/doc\.js$/)[1];
        return {
          ...require(`./${doc}`),
          url: `${tag}.html`,
          js: `dist/${tag}.js`,
        };
      }));

  const buildComponentDocs = docs =>
    Promise.all(["eds-*.html", "doc-lib"].map(f => rimrafP(f)))
      .then(() => copyP("**/*", "../../../doc-lib/eds-styles", { cwd: "node_modules/@experian/eds-styles" }))
      .then(() => copyP("popper.js*", "../../../../../doc-lib", { cwd: "node_modules/@popperjs/core/dist/umd" }))
      .then(() => copyP("prism.css", "../../../doc-lib/prismjs/themes", { cwd: "node_modules/prismjs/themes" }))
      .then(() => Promise.all(
        docs.map(doc =>
          ejsRenderFileP("./src/doc.ejs", { docs, doc, Prism })
            .then(content => ({ ...doc, content })))
      )
      )
      .then(docs => Promise.all(docs.map(({ url, content }) => writeFileP(`./${url}`, content))));

  const buildDocIndex = docs =>
    ejsRenderFileP("./src/index.ejs", { docs })
      .then(content => writeFileP("./index.html", content));

  return importComponentDocs()
    .then(docs => Promise.all([buildComponentDocs, buildDocIndex].map(f => f.call(null, docs))));
};

const main = () =>
  Promise.all([

    buildLibrary({ production: process.argv.includes("--production") })
      .then(stats => {
        console.log('stats', stats)
        return stats.map(stat => stat.toString({ colors: true })).join("\n")
      }),

    // buildDocs()
    //   .then(() => "Documentation compiled successfully."),

  ])
    .then(outputs => {
      console.log('outputs', outputs)
      return outputs.concat("Build completed successfully.").forEach(output => console.log(output))
    })
    .catch(err => console.error(err));

main();
