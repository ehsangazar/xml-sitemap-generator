import { CheerioCrawler } from "crawlee";
import * as fs from "fs";

interface IXMLSiteMapGenerator {
  uri: string;
  whereToSave?: string;
}

const generateXMLSiteMap = (links: string[]) => {
  const XML = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${links.map((link: any) => {
      return `
      <url>
        <loc>${link.url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
      `;
    })}
  </urlset>
  `;

  return XML;
};

const writeXMLSiteMap = (XML: string, whereToSave: string) => {
  console.log("Generating sitemap.xml...");

  fs.writeFile(whereToSave, XML, (err) => {
    if (err) {
      console.error("Error generating sitemap:", err);
    } else {
      console.log("Sitemap generated successfully");
    }
  });
};

const XMLSiteMapGenerator = async ({
  uri,
  whereToSave = "./sitemap.xml",
}: IXMLSiteMapGenerator) => {
  const SITE_MAP_LINKS = [];
  const crawler = new CheerioCrawler({
    async requestHandler({ request, $, enqueueLinks, log }) {
      const title = $("title").text();
      log.info(`Title of ${request.loadedUrl} is '${title}'`);
      SITE_MAP_LINKS.push({ title, url: request.loadedUrl });
      await enqueueLinks();
    },

    // Let's limit our crawls to make our tests shorter and safer.
    maxRequestsPerCrawl: 1000,
  });

  await crawler.run([uri]);
  const xml = await generateXMLSiteMap(SITE_MAP_LINKS);
  await writeXMLSiteMap(xml, whereToSave);
};

export default XMLSiteMapGenerator;
