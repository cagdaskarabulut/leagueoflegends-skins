const fs = require("fs");
const path = require("path");

// import { readFileSync } from "fs";

function getNowWithISOFormat() {
  const today = new Date();
  return today.toISOString();
}

//- sadece api den gelen hero id leri kullanılarak sayfa path leri tanımlanabilir
function replaceStringForUrlFormat(myString) {
  myString = myString.replace(/ /g, "-");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.replace(/\//g, "");
  myString = myString.replace(/&/g, "");
  myString = myString.replace("(", "");
  myString = myString.replace(")", "");
  myString = myString.replace(/ó/g, "o");
  myString = myString.replace(",", "");
  // myString = myString.toLowerCase();
  return myString;
}

function oldReplaceStringForUrlFormat(myString) {
  myString = myString.replace(/ /g, "");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.replace(/\//g, "");
  myString = myString.replace(/&/g, "");
  myString = myString.replace("(", "");
  myString = myString.replace(")", "");
  myString = myString.replace(/ó/g, "o");
  myString = myString.replace(",", "");
  // myString = myString.toLowerCase();
  return myString;
}

function replaceStringForSearchQuery(myString) {
  myString = myString.replace(/ /g, "+");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.replace(/\//g, "");
  myString = myString.replace(/&/g, "");
  myString = myString.replace("(", "");
  myString = myString.replace(")", "");
  myString = myString.replace(/ó/g, "o");
  myString = myString.replace(",", "");
  // myString = myString.toLowerCase();
  return myString;
}

function getExistingVideoPathByPageUrl(pageUrl) {
  const dbDirectory = path.join(process.cwd(), "data", "my_skin_video_db.json");
  const jsonStr = fs.readFileSync(dbDirectory).toString();
  const fileContentsData = JSON.parse(jsonStr);
  const fileContents = Object.values(fileContentsData.data);
  const skinVideoObject = fileContents.find(
    (p) => p.pageUrl.toLowerCase() === pageUrl.toLowerCase()
  );
  let result = "";
  if (
    skinVideoObject?.videoUrl != undefined &&
    skinVideoObject?.videoUrl.length > 0
  ) {
    result = skinVideoObject.videoUrl;
  }
  return result;
}

function returnXXXIfExistingVideoPathByPageUrl(pageUrl) {
  let result = "";
  let videoUrlForActiveSkin = getExistingVideoPathByPageUrl(pageUrl);
  if (videoUrlForActiveSkin == undefined || videoUrlForActiveSkin.length < 1) {
    result = "";
  } else {
    result = "XXX";
  }
  return result;
}

function generateRobotsTxtAndSitemapXml() {
  //- => Sadece skin videoları için kullanılır bu parametre ve console dan manuel alınıp kopyalanır. api kotası yetmezse yenisi alınır
  let isManualyAddingSkinVideos = false;
  let heroIdForManuallyAddingSkinVideos = "";
  let youtubeApiKey = "";
  //- Common fields
  let rootPath = `https://leagueoflegends-skins.com`;
  let subDomainrootPath = `https://www.leagueoflegends-skins.com`;
  let mySkinDbFields = "";
  let mySkinBigImagesDbFields = "";
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
<url>
<loc>
${subDomainrootPath}
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
    "http://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json"
  )
    .then((res) => res.json())
    .then((data) => {
      heroList = Object.values(data.data);
      //_First Loop
      heroList.map((champion, index) => {
        //- => Sadece skin videoları için kullanılır bu parametre ve console dan manuel alınıp kopyalanır. api kotası yetmezse yenisi alınır
        if (
          isManualyAddingSkinVideos == false ||
          (isManualyAddingSkinVideos &&
            champion.id == heroIdForManuallyAddingSkinVideos)
        ) {
          // let heroBasePath = `${replaceStringForUrlFormat(champion.id)}/${replaceStringForUrlFormat(champion.id)}`;
          let heroBasePath = `${replaceStringForUrlFormat(
            champion.name
          )}/${replaceStringForUrlFormat(champion.name)}`;
          let oldHeroBasePath = `${oldReplaceStringForUrlFormat(
            champion.id
          )}/${oldReplaceStringForUrlFormat(champion.id)}`;
          //-generate
          dynamicRobotsTxtFields = `${dynamicRobotsTxtFields}Allow: /${heroBasePath}
`;

          //-generate
          dynamicSitemapFields = `${dynamicSitemapFields}
<url>
<loc>
${subDomainrootPath}/${heroBasePath}
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

          //todo düzeltilecek
          mySkinDbFields = `${mySkinDbFields}
  {
    "hero": "${replaceStringForUrlFormat(champion.id)}",
    "heroName": "${champion.name}",
    "skin": "${replaceStringForUrlFormat(champion.id)}",
    "skinName": "${champion.name}",
    "pageUrl": "${oldHeroBasePath}",
    "videoUrl": "${returnXXXIfExistingVideoPathByPageUrl(heroBasePath)}"
  },`;

          mySkinBigImagesDbFields = `${mySkinBigImagesDbFields}
  {
    "pageUrl": "${oldHeroBasePath}",
    "newPageUrl": "${heroBasePath}",
    "skinName": "${champion.name}",
    "splashNumber": "0",
    "searchField": "${champion.name}"
  },`;

          fetch(
            "https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion/" +
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
                  let activePath = `${replaceStringForUrlFormat(
                    champion.name
                  )}/${replaceStringForUrlFormat(skinObject.name)}`;
                  let oldActivePath = `${oldReplaceStringForUrlFormat(
                    champion.id
                  )}/${oldReplaceStringForUrlFormat(skinObject.name)}`;

                  //-generate
                  // dynamicRobotsTxtFields = `${dynamicRobotsTxtFields}Allow: /${replaceStringForUrlFormat(
                  //   champion.id
                  // )}/${replaceStringForUrlFormat(skinObject.name)}
                  dynamicRobotsTxtFields = `${dynamicRobotsTxtFields}Allow: /${activePath}
`;

                  // let activePath = `${replaceStringForUrlFormat(
                  //   champion.name
                  // )}/${replaceStringForUrlFormat(skinObject.name)}`;
                  // let oldActivePath = `${oldReplaceStringForUrlFormat(
                  //   champion.id
                  // )}/${oldReplaceStringForUrlFormat(skinObject.name)}`;

                  //-generate
                  dynamicSitemapFields = `${dynamicSitemapFields}
<url>
<loc>
${subDomainrootPath}/${activePath}
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

                  let fillVideoUrl =
                    returnXXXIfExistingVideoPathByPageUrl(oldActivePath);
                  if (isManualyAddingSkinVideos) {
                    if (fillVideoUrl == undefined || fillVideoUrl.length < 1) {
                      let searchTitle = replaceStringForSearchQuery(
                        skinObject.name + champion.id
                      );
                      if (activePath.includes("default")) {
                        searchTitle = "classic+" + searchTitle;
                      }
                      let runQuery = `https://www.googleapis.com/youtube/v3/search?maxResults=1&key=${youtubeApiKey}&q=${searchTitle}`;
                      fetch(runQuery)
                        .then((res3) => res3.json())
                        .then((data3) => {
                          let videoList = Object.values(data3.items);
                          let myVideoUrl = videoList[0]?.id?.videoId;
                          mySkinDbFields = `${mySkinDbFields}
      {
        "hero": "${replaceStringForUrlFormat(champion.id)}",
        "heroName": "${champion.name}",
        "skin": "${replaceStringForUrlFormat(skinObject.name)}",
        "skinName": "${skinObject.name}",
        "pageUrl": "${oldActivePath}",
        "videoUrl": "${myVideoUrl}"
      },`;
                        });
                    } else {
                      mySkinDbFields = `${mySkinDbFields}
    {
      "hero": "${replaceStringForUrlFormat(champion.id)}",
      "heroName": "${champion.name}",
      "skin": "${replaceStringForUrlFormat(skinObject.name)}",
      "skinName": "${skinObject.name}",
      "pageUrl": "${oldActivePath}",
      "videoUrl": "${fillVideoUrl}"
    },`;
                    }
                  } else {
                    mySkinDbFields = `${mySkinDbFields}
    {
      "hero": "${replaceStringForUrlFormat(champion.id)}",
      "heroName": "${champion.name}",
      "skin": "${replaceStringForUrlFormat(skinObject.name)}",
      "skinName": "${skinObject.name}",
      "pageUrl": "${oldActivePath}",
      "videoUrl": "${fillVideoUrl}"
    },`;

                    // todo geçici - Hata alması halinde kullanılıyor
                    // mySkinDbFields = `${mySkinDbFields}
                    // {
                    //   "hero": "${replaceStringForUrlFormat(champion.id)}",
                    //   "heroName": "${champion.name}",
                    //   "skin": "${replaceStringForUrlFormat(skinObject.name)}",
                    //   "skinName": "${skinObject.name}",
                    //   "pageUrl": "${activePath}",
                    //   "videoUrl": ""
                    // },`;

                    mySkinBigImagesDbFields = `${mySkinBigImagesDbFields}
    {
      "pageUrl": "${oldActivePath}",
      "newPageUrl": "${activePath}",
      "skinName": "${skinObject.name}",
      "splashNumber": "${skinObject.num}",
      "searchField": "${champion.name} - ${skinObject.name}"
    },`;
                  }
                });
              });

              let robotsTxt = "";
              //-generate final
              robotsTxt = `# *
User-agent: *
${dynamicRobotsTxtFields}
Disallow: /AdminPanel
Disallow: /AdminPanelLogin
# Sitemaps
Sitemap: https://www.leagueoflegends-skins.com/sitemap.xml`;

              //-generate final
              let sitemapXml = "";
              sitemapXml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${dynamicSitemapFields}
</urlset>
            `;

              let mySkinDb = "";
              mySkinDb = `{
"data": [ ${mySkinDbFields.slice(0, -1)}
]
}`;

              let mySkinBigImagesDb = "";
              mySkinBigImagesDb = `{
"data": [ ${mySkinBigImagesDbFields.slice(0, -1)}
]
}`;

              fs.writeFileSync("public/robots.txt", robotsTxt);
              fs.writeFileSync("public/sitemap.xml", sitemapXml);
              fs.writeFileSync("helper/LATEST_my_skin_video_db.json", mySkinDb);
              fs.writeFileSync(
                "helper/LATEST_my_skin_video_db_ForSkinsBigImages.json",
                mySkinBigImagesDb
              );
            });
        }
      });
    });
}

module.exports = generateRobotsTxtAndSitemapXml;
