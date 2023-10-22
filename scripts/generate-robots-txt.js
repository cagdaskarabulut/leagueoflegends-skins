const fs = require("fs");
const path = require("path");

// import { readFileSync } from "fs";

function getNowWithISOFormat() {
  const today = new Date();
  return today.toISOString();
}

//- sadece api den gelen hero id leri kullanılarak sayfa path leri tanımlanabilir
function replaceStringForUrlFormat(myString) {
  myString = myString.replace(/ /g, "");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.replace(/\//g, "");
  myString = myString.replace(/&/g, "");
  myString = myString.replace("(", "");
  myString = myString.replace(")", "");
  myString = myString.replace(/ó/g, "o");
  myString = myString.replace(",", "");
  myString = myString.toLowerCase();
  return myString;
}

function getVideoPathByPageUrl(pageUrl){
  const dbDirectory = path.join(process.cwd(), "data", "my_skin_video_db.json");
  const jsonStr = fs.readFileSync(dbDirectory).toString();
  const fileContentsData = JSON.parse(jsonStr);
  const fileContents = Object.values(fileContentsData.data);
  const skinVideoObject = fileContents.find((p) => p.pageUrl.toLowerCase() === pageUrl.toLowerCase());
  let result = "";
  if (skinVideoObject?.videoUrl != undefined && skinVideoObject?.videoUrl.length>0){
    result = skinVideoObject.videoUrl;
  }
  return result;
}


function generateRobotsTxtAndSitemapXml() {
  // const dbDirectory = path.join(process.cwd(), "data", "db.json");
  // const jsonStr = fs.readFileSync(dbDirectory).toString();
  // const championsList = JSON.parse(jsonStr); // as Hero[];

  let rootPath = `https://leagueoflegends-skins.com`;
  // let pagePathsFields = "";
  let mySkinDbFields = "";
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
      //_First Loop
      heroList.map((champion, index) => {

        let heroBasePath = `${replaceStringForUrlFormat(champion.id)}/${replaceStringForUrlFormat(champion.id)}`;
      
        //-generate
        dynamicRobotsTxtFields = `${dynamicRobotsTxtFields}Allow: /${heroBasePath}
`;

              //-generate
        dynamicSitemapFields = `${dynamicSitemapFields}
<url>
<loc>
${rootPath}/${heroBasePath}
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

//               //-generate
// pagePathsFields  = `${pagePathsFields} 
//     { 
//       "hero": "${champion.id}" ,
//       "path": "${heroBasePath}" 
//     },`;

    mySkinDbFields = `${mySkinDbFields}
  {
    "hero": "${replaceStringForUrlFormat(champion.id)}",
    "heroName": "${champion.name}",
    "skin": "${replaceStringForUrlFormat(champion.id)}",
    "skinName": "${champion.name}",
    "pageUrl": "${heroBasePath}",
    "videoUrl": "${getVideoPathByPageUrl(heroBasePath)}"
  },`;
        
        fetch(
          "https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/" +
            champion.id +
            ".json"
        )
          .then((res2) => res2.json())
          .then((data2) => {

            heroDetailsList = Object.values(data2.data);
            
            //_Second Loop
            heroDetailsList.map((heroDetails, index2) => {

              mySkinDbSubFields = "";

            skinList = heroDetails.skins;

            //_Third Loop
            skinList.map((skinObject, index3) => {

            //-generate
            dynamicRobotsTxtFields = `${dynamicRobotsTxtFields}Allow: /${replaceStringForUrlFormat(champion.id
            )}/${replaceStringForUrlFormat(skinObject.name)}
`;

let activePath = `${replaceStringForUrlFormat(champion.id)}/${replaceStringForUrlFormat(skinObject.name)}`;

            //-generate
            dynamicSitemapFields = `${dynamicSitemapFields}
<url>
<loc>
${rootPath}/${activePath}
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

//-generate
  //   mySkinDbFields = `${mySkinDbFields}
  // {
  //   "hero": "${replaceStringForUrlFormat(champion.id)}",
  //   "heroName": "${champion.name}",
  //   "skin": "${replaceStringForUrlFormat(skinObject.name)}",
  //   "skinName": "${skinObject.name}",
  //   "pageUrl": "${activePath}",
  //   "videoUrl": ""
  // },`;

  mySkinDbFields = `${mySkinDbFields}
  {
    "hero": "${replaceStringForUrlFormat(champion.id)}",
    "heroName": "${champion.name}",
    "skin": "${replaceStringForUrlFormat(skinObject.name)}",
    "skinName": "${skinObject.name}",
    "pageUrl": "${activePath}",
    "videoUrl": "${getVideoPathByPageUrl(activePath)}"
  },`;
  });


});



            let robotsTxt = "";
//-generate final
            robotsTxt = 
`# *
User-agent: *
${dynamicRobotsTxtFields}
Disallow: /AdminPanel
Disallow: /AdminPanelLogin
# Sitemaps
Sitemap: https://www.leagueoflegends-skins.com/sitemap.xml`;
          
//-generate final
            let sitemapXml = "";
            sitemapXml = 
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${dynamicSitemapFields}
</urlset>
            `;

let mySkinDb = "";
mySkinDb = 
`{
"data": [ ${mySkinDbFields.slice(0, -1)}
]
}`;

            fs.writeFileSync("public/robots.txt", robotsTxt);
            fs.writeFileSync("public/sitemap.xml", sitemapXml);
            fs.writeFileSync("helper/LATEST_my_skin_video_db.json", mySkinDb);
          });
      });
    });


}

module.exports = generateRobotsTxtAndSitemapXml;
