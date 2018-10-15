const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
  // Pass through
  eleventyConfig.addPassthroughCopy("assets");

  // Minify
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
      });
      return minified;
    }
    return content;
  });

  // Create and randomise "sites" collection
  eleventyConfig.addCollection("sites", function(collection) {
    console.log(typeof collection.getFilteredByGlob("./sites/*.md"));
    return collection.getFilteredByGlob("./sites/*.md").sort(function() {
      return 0.5 - Math.random();
    });
  });

  eleventyConfig.addPassthroughCopy("favicon.ico");

  // Return config settings
  return {
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};
