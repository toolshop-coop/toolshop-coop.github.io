// https://www.11ty.dev/docs/config/#transforms

const htmlmin = require("html-minifier");

module.exports = {
  "htmlmin": (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        // minifyCSS: true,
        // minifyJS: true,
      });
      return minified;
    }

    return content;
  },
}