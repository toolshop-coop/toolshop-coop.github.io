# Toolshop Co-op website
our web site and web log, located at https://toolshop-coop.org

## Getting started
```
yarn start
```
The site will be available at [localhost:8080](localhost:8080).

When you're ready to push, make sure to run 
```
yarn build
```
which will minify TailwindCSS. TODO: move to Github Actions

## Editing site content
### Static Page (e.g. Home, About)
Just create a `md` or `njk` file in `src`, or create a folder in `src` with an `index.md`/`index.njk` inside, useful if you want to group things together, like a `*.11tydata.json` file.

### Written Content (e.g. a blog post, dev log)
- [`essays`](src/essays): high-value, low-frequency "longform" content. Write about our thoughts, big questions, big decisions... [View template](src/essays/_template)
- [`log`](src/logs): high-frequency, low-value "microblog" content. Treat it like a place to just add thoughts, notes, etc. (Maybe we should name as notes instead?) [View template](src/logs/_template)

## Editing the site
We use [Eleventy](https://www.11ty.dev/docs/) to generate the site. It's super extensible, and there's a lot we can add to it. The core configuration of it lives in [`.eleventy.js`](.eleventy.js).

Julius wrote [an intro guide to Eleventy](https://www.notion.so/How-the-heck-do-I-use-Eleventy-The-intro-guide-I-wish-I-had-ef349def783247dca7f65e33b780288e) to help people get oriented.

### Templating
We use [Nunjucks](https://mozilla.github.io/nunjucks/) (`.njk` files) for templating, as a lot of Eleventy is optimized for that. It supports [Front Matter](https://jekyllrb.com/docs/front-matter/) (using [gray-matter](https://github.com/jonschlinkert/gray-matter)) and handlebar/braces syntax like `{{ somevariable }}` or `{% for key in obj %}{% endfor %}`

There are three types of templates:
- page: any static page, like [`index.md`](src/index.md) or `file.njk` can use Nunjucks features, and
- [includes](src/_includes): child components you include, like a nav or footer. Stored in [`_includes`](src/_includes)
- [layouts](src/_includes/layouts): parent templates you wrap around, like a blog post markdown file will refer to a blog layout to wrap the content in. Stored in [`_includes/layouts`](src/_includes/layouts)

### Styles
We use [Tailwind.css](https://tailwindcss.com/docs/), which comes with a set of pre-defined CSS classes, like `mt-4` to represent common CSS concepts (in this case, margin-top level 4).

You can customize the [theme](https://tailwindcss.com/docs/theme) in [`tailwind.config.js`](tailwind.config.js).

### Data
Eleventy lets you grab data from a JSON file locally, or from an API endpoint at build time. Local data can be stored globally in [`_data`](src/_data) or alongside a specific page.

You can see an example of [directory data](https://www.11ty.dev/docs/data-template-dir/) in the [`essays/essays.11tydata.json`](src/essays/essays.11tydata.json). Eleventy will look for a `.json` file with the same name as a folder.

### Feeds, Sitemap
We generate an [XML Atom/RSS feed](src/feeds/feed.njk), a [JSON feed](src/feeds/json.njk), and a [sitemap](src/sitemap.xml.njk) via Nunjucks.