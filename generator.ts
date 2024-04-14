// generateSitemap.js
console.log("Generating sitemap.xml...");
import XMLSiteMapGenerator from "./src/index";

const args = process.argv.slice(2);

if (!args.length) {
  console.error("Please provide a valid URL using the --uri flag.");
  process.exit(1);
}

const uri = args[0].split("=")[1];

if (!uri) {
  console.error("Please provide a valid URL using the --uri flag.");
  process.exit(1);
}

const main = async () => {
  await XMLSiteMapGenerator({
    uri,
    whereToSave: "./sitemap.xml",
  });
};

main();
