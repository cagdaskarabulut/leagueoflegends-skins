const fs = require("fs");
const path = require("path");

function getNowWithISOFormat() {
  const today = new Date();
  return today.toISOString();
}

function replaceStringForUrlFormat(myString) {
  // myString = myString.replace(' ', '-');
  myString = myString.replace(/ /g, "-");
  return myString;
}

function generateRobotsTxtAndSitemapXml() {
  const dbDirectory = path.join(process.cwd(), "data", "db.json");
  const jsonStr = fs.readFileSync(dbDirectory).toString();
  const fileContents = JSON.parse(jsonStr); // as Hero[];

  let rootPath = `https://leagueoflegends-skins.com`;
  let now = getNowWithISOFormat();
  let dynamicRobotsTxtFields = "";
  let dynamicSitemapFields = `<url>
<loc>
${rootPath}
</loc>
<lastmod>
${now}
</lastmod>
<changefreq>
daily
</changefreq>
<priority>
0.7
</priority>
</url>
`;

  fileContents.map((champion) => {
    //     console.log(champion);
    //     dynamicRobotsTxtFields = `${dynamicRobotsTxtFields}Allow: /${replaceStringForUrlFormat(champion.name)}
    // `;
    //     dynamicSitemapFields = `${dynamicSitemapFields}
    // <url>
    // <loc>
    // ${rootPath}/${replaceStringForUrlFormat(champion.name)}
    // </loc>
    // <lastmod>
    // ${now}
    // </lastmod>
    // <changefreq>
    // daily
    // </changefreq>
    // <priority>
    // 0.7
    // </priority>
    // </url>
    // `;

    //_For adding sub pages
    champion.skins.map((skinObject) => {
      // console.log(skinObject);
      dynamicRobotsTxtFields = `${dynamicRobotsTxtFields}Allow: /${replaceStringForUrlFormat(
        champion.name
      )}/${replaceStringForUrlFormat(skinObject.skin)}
`;

      dynamicSitemapFields = `${dynamicSitemapFields}
<url>
<loc>
${rootPath}/${replaceStringForUrlFormat(
        champion.name
      )}/${replaceStringForUrlFormat(skinObject.skin)}
</loc>
<lastmod>
${now}
</lastmod>
<changefreq>
daily
</changefreq>
<priority>
0.7
</priority>
</url>
`;
    });
  });

  let robotsTxt = "";

  robotsTxt = `# *
User-agent: *
Allow: /
${dynamicRobotsTxtFields} 
Disallow: /AdminPanel
Disallow: /AdminPanelLogin
# Sitemaps
Sitemap: https://www.leagueoflegends-skins.com/sitemap.xml`;
  // console.log(robotsTxt);x

  let sitemapXml = "";
  sitemapXml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${dynamicSitemapFields} 
</urlset>`;
  // console.log(sitemapXml);

  fs.writeFileSync("public/robots.txt", robotsTxt);
  fs.writeFileSync("public/sitemap.xml", sitemapXml);
}

module.exports = generateRobotsTxtAndSitemapXml;
