const autoprefixer = require("autoprefixer");
const copy = require("copy");
const cssnano = require("cssnano");
const ejs = require("ejs");
const fs = require("fs-extra");
const path = require("path");
const postcss = require("postcss");
const postcssCalc = require("postcss-calc");
const postcssImport = require("postcss-import");
const postcssFilter = require("./postcss/postcss-filter.js");
const postcssFocusWithin = require("focus-within/postcss");
const postcssInlineSvg = require("postcss-inline-svg");
const postcssNested = require("postcss-nested");
const postcssNestedAncestors = require("postcss-nested-ancestors");
const postcssRef = require("./postcss/postcss-ref.js");
const postcssScopify = require("postcss-scopify");
const postcssSimpleVars = require("postcss-simple-vars");
const tailwind = require("tailwindcss");
const tailwindConfig = require("./tailwind.config.js");
const TailwindExportConfig = require("tailwindcss-export-config");
const util = require("util");
const { watchTree } = require("watch");

const paths = {
  src: {
    all: "./components/all.css",
    components: "./components/components.css",
    primitives: "./components/primitives.css",
    examples: "./examples",
    siteCSS: "./site/index.css",
    siteMarkup: "./site/index.ejs",
    standaloneExample: "./site/standalone-example.ejs",
  },
  out: {

    dist: "./dist",

    all: "eds-all.css",
    allMap: "eds-all.css.map",
    allMin: "eds-all.min.css",
    allMinMap: "eds-all.min.css.map",

    components: "eds-components.css",
    componentsMap: "eds-components.css.map",
    componentsMin: "eds-components.min.css",
    componentsMinMap: "eds-components.min.css.map",

    primitives: "eds-primitives.css",
    primitivesMap: "eds-primitives.css.map",
    primitivesMin: "eds-primitives.min.css",
    primitivesMinMap: "eds-primitives.min.css.map",

    siteMarkup: "./index.html",
    siteCSS: "./index.css",
    siteCSSMap: "./index.css.map",
  },
};

const copyP = util.promisify(copy);
const readDirP = util.promisify(fs.readdir);
const readTextFileP = filePath => util.promisify(fs.readFile)(filePath, "utf8");
const renderFileEjsP = util.promisify(ejs.renderFile);
const writeTextFileP = fs.outputFile;

function normalizeKeysForExport(obj) {
  return Object
    .keys(obj)
    .map(key =>
      ({
        [key.replace(/,/g, "_")]:
          ["object", "function"].includes(typeof obj[key])
            ? normalizeKeysForExport(obj[key])
            : obj[key],
      })
    )
    .reduce((xs, x) => Object.assign({}, xs, x), {});
}

const buildCSSFile = (name, additionalPlugins = [], production = false) => {
  return Promise.all([
    readTextFileP(paths.src[name])
      .then(css =>
        postcss([
          postcssImport,
          tailwind(tailwindConfig),
          postcssSimpleVars,
          postcssNestedAncestors({ replaceDeclarations: true }),
          postcssNested,
          postcssRef({ atRule: false }),
          postcssCalc,
          postcssInlineSvg,
          postcssFocusWithin,
          autoprefixer,
          ...additionalPlugins,
        ])
          .process(css, {
            from: paths.src[name],
            to: `${paths.out.dist}/${paths.out[name]}`,
            map: { inline: false, annotation: false },
          })
      )
      .then(({ css, map }) => {

        const cssName = production ? `${name}Min` : name;
        const mapName = production ? `${name}MinMap` : `${name}Map`;

        return Promise.all([
          writeTextFileP(`${paths.out.dist}/${paths.out[cssName]}`, css),
          writeTextFileP(`${paths.out.dist}/${paths.out[mapName]}`, map),
        ]);
      }),
    readTextFileP(paths.src[name])
      .then(css =>
        postcss([
          postcssImport,
          tailwind(tailwindConfig),
          postcssSimpleVars,
          postcssNestedAncestors({ replaceDeclarations: true }),
          postcssNested,
          postcssRef({ atRule: false }),
          postcssCalc,
          postcssInlineSvg,
          postcssFocusWithin,
          autoprefixer,
          ...additionalPlugins,
          postcssScopify(".eds3"),
        ])
          .process(css, {
            from: paths.src[name],
            to: `${paths.out.dist}/${paths.out[name].replace(".css", ".scoped.css")}`,
            map: { inline: false, annotation: false },
          })
      )
      .then(({ css, map }) => {

        const cssName = production ? `${name}Min` : name;
        const mapName = production ? `${name}MinMap` : `${name}Map`;

        return Promise.all([
          writeTextFileP(`${paths.out.dist}/${paths.out[cssName].replace(".css", ".scoped.css")}`, css),
          writeTextFileP(`${paths.out.dist}/${paths.out[mapName].replace(".css", ".scoped.css")}`, map),
        ]);
      }),
  ]);
};

const buildComponentFile = (component, additionalPlugins = [], production = false) => {

  const componentOrMix = component.replace(/_\./, "_.eds-");

  const inputComponentFile = `./components/eds-${componentOrMix}.css`;
  const outputFile = `${paths.out.dist}/components/eds-${componentOrMix}.css`;
  const minifiedFile = outputFile.replace(".css", ".min.css");

  return Promise.all([
    readTextFileP(`${paths.out.dist}/eds-components.css`)
      .then(css =>
        postcss([
          postcssImport,
          postcssFilter(selector => new RegExp(`^(\\.eds\\-${componentOrMix.replace(/\./g, "\\\\.")}$|\\.eds\\-${componentOrMix.replace(/\./g, "\\\\.")}[^a-z].*)`).test(selector) || !selector.startsWith(".eds")),
          ...additionalPlugins,
        ])
          .process(css, {
            from: inputComponentFile,
            to: outputFile,
            map: { inline: false, annotation: false },
          })
      )
      .then(({ css, map }) => {

        const cssFile = production ? minifiedFile : outputFile;

        return Promise.all([
          writeTextFileP(`${cssFile}`, css),
          writeTextFileP(`${cssFile}.map`, map),
        ]);
      }),
    readTextFileP(`${paths.out.dist}/eds-components.css`)
      .then(css =>
        postcss([
          postcssImport,
          postcssFilter(selector => new RegExp(`^(\\.eds\\-${componentOrMix.replace(/\./g, "\\\\.")}$|\\.eds\\-${componentOrMix.replace(/\./g, "\\\\.")}[^a-z].*)`).test(selector)),
          ...additionalPlugins,
          postcssScopify(".eds3"),
        ])
          .process(css, {
            from: inputComponentFile,
            to: outputFile.replace(".css", ".scoped.css"),
            map: { inline: false, annotation: false },
          })
      )
      .then(({ css, map }) => {

        const cssFile = production ? minifiedFile : outputFile;

        return Promise.all([
          writeTextFileP(`${cssFile.replace(".css", ".scoped.css")}`, css),
          writeTextFileP(`${cssFile.replace(".css", ".scoped.css")}.map`, map),
        ]);
      }),
  ]);
};

const buildEDS = ({ production, watch }) => {
  if (watch) {
    return buildCSSFile("all", [], false);
  }

  const promises = [
    new TailwindExportConfig({
      config: normalizeKeysForExport(tailwindConfig),
      destination: "dist/eds-primitives",
      format: "scss",
      prefix: "",
      flat: true,
    }).writeToFile(),
  ];

  ["all", "components", "primitives"].forEach(file => {
    promises.push(buildCSSFile(file));
    if (production) {
      const plugins = [cssnano];
      promises.push(buildCSSFile(file, plugins, true));
    }
  });

  return Promise.all(promises).then(() => {
    const promises = [];

    [
      "accordion_.details",
      "alert",
      "avatar",
      "badge",
      "breadcrumbs",
      "button",
      "card",
      "checkbox",
      "control-list",
      "details",
      "field",
      "heading",
      "input",
      "link",
      "menu",
      "modal",
      "popover",
      "primary-header",
      "progress",
      "radio",
      "segmented-control",
      "select",
      "sidebar",
      "step-sequence",
      "switch",
      "tab",
      "tag",
      "table",
      "tabset",
      "token",
      "toolbar",
      "tooltip",
    ].forEach(component => {
      promises.push(buildComponentFile(component));
      if (production) {
        const plugins = [cssnano];
        promises.push(buildComponentFile(component, plugins, true));
      }
    });

    return Promise.all(promises);
  });
};

const parseExampleContent = path => content => {
  const titleClose = content.indexOf("</title>");
  const title = content.substring(0, titleClose).replace("<title>", "").trim();
  const body = content
    .substring(titleClose + 8)
    .replace(/href="#"/g, `href="#${path}"`)
    .trim();
  return { path, title: title || "Untitled", body };
};

const buildExamples = () =>
  readDirP(paths.src.examples)
    .then(filenames => filenames.filter(fn => !fn.startsWith("_") && fn.endsWith(".ejs") || fn.endsWith(".html")))
    .then(filenames => Promise.all(
      filenames.map(p =>
        ( p.endsWith(".ejs")
          ? renderFileEjsP
          : readTextFileP
        )(path.join(paths.src.examples, p)).then(parseExampleContent(p.replace(".ejs", ".html")))
      )
    ));

const liftContent = body => {
  const content = body.substring(body.indexOf("#content") + 10, body.lastIndexOf("</div>"));
  let lines = content.split("\n");
  while (lines[0].trim() === "") {
    lines = lines.slice(1);
  }
  const indent = lines[0].indexOf("<");
  return lines.map(x => x.substring(indent)).join("\n");
};

const buildSiteMarkup = () =>
  buildExamples()
    .then(examples => Promise.all([
      renderFileEjsP(
        path.join(paths.src.siteMarkup),
        { examples },
      ).then(html => writeTextFileP(paths.out.siteMarkup, html)),
    ].concat(
      examples
        .map(({ path, title, body }) => ({
          path,
          title,
          body: liftContent(body),
        }))
        .map(example =>
          renderFileEjsP(
            paths.src.standaloneExample,
            { example }
          ).then(html => writeTextFileP(`./${path.basename(example.path)}`, html))
        )
    )));

const buildSiteCSS = () =>
  readTextFileP(paths.src.siteCSS)
    .then(css =>
      postcss([
        postcssImport,
        tailwind(tailwindConfig),
        autoprefixer,
      ])
        .process(css, {
          from: paths.src.siteCSS,
          to: paths.out.siteCSS,
          map: { inline: false, annotation: false },
        })
    )
    .then(({ css, map }) =>
      Promise.all([
        writeTextFileP(paths.out.siteCSS, css),
        writeTextFileP(paths.out.siteCSSMap, map),
      ])
    );

const copySiteDependencies = () => Promise.all([
  copyP("typeface-roboto/index.css", "../site-lib", { cwd: "node_modules" }),
  copyP("node_modules/typeface-roboto/files/*", "site-lib/typeface-roboto/files"),
  copyP("node_modules/material-design-icons/iconfont/*", "site-lib/material-design-icons/iconfont"),
  copyP("node_modules/ace-builds/src-min/*", "site-lib/ace-builds/src-min"),
  copyP("element-closest/browser.js", "../site-lib", { cwd: "node_modules" }),
  copyP("focus-within/browser.js", "../site-lib", { cwd: "node_modules" }),
]);

const buildSite = opts => Promise.all([ buildSiteCSS, buildSiteMarkup, copySiteDependencies ].map(f => f(opts)));

const build = opts => Promise.all([
  buildEDS,
  buildSite,
].map(f => f(opts)));

const main = args => {
  const opts = { watch: args.includes("--watch"), production: args.includes("--production") };

  if (opts.production) {
    [
      paths.out.allMin,
      paths.out.allMinMap,
      paths.out.componentsMin,
      paths.out.componentsMinMap,
      paths.out.primitivesMin,
      paths.out.primitivesMinMap,
    ].forEach(f => {
      if (fs.existsSync(f)) {
        fs.unlinkSync(f);
      }
    });
  }

  let
    queued = false,
    currentBuild = null,
    lastWatchDebounce = 0;

  if (opts.watch) {
    watchTree("./", { filter: p => ["components", "examples", "site"].includes(p.split("/")[0]) }, () => {
      const now = Date.now();
      if (now - lastWatchDebounce < 1000) return;
      if (queued) return;
      if (currentBuild) {
        queued = true;
        return;
      }
      runBuild();
      lastWatchDebounce = now;
    });
  }
  else {
    runBuild();
  }

  function runBuild() {
    currentBuild = build(opts);

    currentBuild
      .then(() => {
        console.log("Build successful.");
        next();
      })
      .catch(err => {
        console.error(err);
        next();
      });

    function next() {
      currentBuild = null;
      if (queued) {
        queued = false;
        runBuild();
      }
    }
  }
};

main(process.argv);
