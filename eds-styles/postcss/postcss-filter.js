const postcss = require("postcss");

module.exports = postcss.plugin("postcss-filter", function(predicate) {
  return function(root) {
    return root.walkRules(function(rule) {
      const matchingSelectors = rule.selectors.filter(predicate);
      if (matchingSelectors.length) {
        rule.selectors = matchingSelectors;
      } else {
        rule.remove()
      }
    });
  };
});
