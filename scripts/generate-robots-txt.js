const fs = require("fs");
const path = require("path");

function getNowWithISOFormat() {
  const today = new Date();
  return today.toISOString();
}

//- sadece api den gelen hero id leri kullanılarak sayfa path leri tanımlanabilir
function replaceStringForUrlFormat(myString) {
  myString = myString.replace(/ /g, "");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.toLowerCase();
  return myString;
}

function generateRobotsTxtAndSitemapXml() {
  // const dbDirectory = path.join(process.cwd(), "data", "db.json");
  // const jsonStr = fs.readFileSync(dbDirectory).toString();
  // const championsList = JSON.parse(jsonStr); // as Hero[];

  let rootPath = `https://leagueoflegends-skins.com`;
  let now = getNowWithISOFormat();
  let dynamicRobotsTxtFields = "";
  let dynamicSitemapFields = `
<url>
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

  let heroList;
  let heroDetailsList;
  let skinList;
  fetch(
    "http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion.json"
  )
    .then((res) => res.json())
    .then((data) => {
      heroList = Object.values(data.data);
      heroList.map((champion, index) => {

        fetch(
          "https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/" +
            champion.id +
            ".json"
        )
          .then((res2) => res2.json())
          .then((data2) => {

            heroDetailsList = Object.values(data2.data);
            
            heroDetailsList.map((heroDetails, index2) => {

            skinList = heroDetails.skins;

            skinList.map((skinObject, index3) => {


              dynamicRobotsTxtFields = `${dynamicRobotsTxtFields}Allow: /${replaceStringForUrlFormat(champion.id
            )}/${replaceStringForUrlFormat(skinObject.name)}
`;

              dynamicSitemapFields = `${dynamicSitemapFields}
<url>
<loc>
${rootPath}/${replaceStringForUrlFormat(champion.id)}/${replaceStringForUrlFormat(skinObject.name)}
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

            robotsTxt = 
`# *
User-agent: *
Allow: /
${dynamicRobotsTxtFields}
Disallow: /AdminPanel
Disallow: /AdminPanelLogin
# Sitemaps
Sitemap: https://www.leagueoflegends-skins.com/sitemap.xml`;
          
            let sitemapXml = "";
            sitemapXml = 
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${dynamicSitemapFields}
</urlset>
            `;
          
            fs.writeFileSync("public/robots.txt", robotsTxt);
            fs.writeFileSync("public/sitemap.xml", sitemapXml);

          });
      });
    });


}

module.exports = generateRobotsTxtAndSitemapXml;
