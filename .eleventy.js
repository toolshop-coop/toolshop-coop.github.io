// https://www.11ty.dev/docs/config/

const filters = require("./eleventy/filters.js")
const transforms = require("./eleventy/transforms.js")
const collections = require("./eleventy/collections.js")
const plugins = [
  require("@11ty/eleventy-plugin-rss"),
]
const pluginTailwind = require("eleventy-plugin-tailwindcss");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // https://www.11ty.dev/docs/plugins/
  plugins.forEach(p => eleventyConfig.addPlugin(p));
  eleventyConfig.addPlugin(pluginTailwind, {
    dest: "/",
  });

  // https://www.11ty.dev/docs/filters/
  Object.keys(filters).forEach(f => eleventyConfig.addFilter(f, filters[f]));
  // https://www.11ty.dev/docs/config/#transforms
  Object.keys(transforms).forEach(t => eleventyConfig.addTransform(t, transforms[t]));
  // https://www.11ty.dev/docs/collections/#advanced-custom-filtering-and-sorting
  Object.keys(collections).forEach(c => eleventyConfig.addCollection(c, collections[c]));

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // https://www.11ty.dev/docs/copy/
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/css/fonts");

  // Markdown override
  // Add auto-gen anchor links to each heading
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "permalink",
    permalinkSymbol: "#",
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    dir: {
      input: "src"
    },
    // What template types should be transformed
    // What filetypes to bring along
    templateFormats: [
      "md",
      "njk",
      "html",
      "png",
      "jpg",
      "jpeg",
    ],
    // We're using Nunjucks for everything
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  }
}