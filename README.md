# XML Sitemap Generator

A sitemap is like a roadmap for search engines, guiding them through the structure and content of a website. It's essentially a hierarchical list or diagram of all the pages on a website, organized in a way that makes it easy for search engine crawlers to understand and navigate the site's structure.

## Install

```
npm install
```

## How to use

#### Method 1: Clone this repo

```
npm run start -- --uri="https://gazar.dev"
```

#### Method 2: As an NPM

```
npm install --save-dev @ehsangazar/xml-sitemap-generator
```

```
import XMLSiteMapGenerator from "xml-sitemap-generator";

const main = async () => {
  await XMLSiteMapGenerator({
    uri:"https://gazar.dev",
    whereToSave: "./sitemap.xml",
  });
};
main();
```
