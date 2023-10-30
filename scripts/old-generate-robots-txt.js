const fs = require("fs");
const path = require("path");

// import { readFileSync } from "fs";

function getNowWithISOFormat() {
  const today = new Date();
  return today.toISOString();
}

function wait(waitTime) {
  return new Promise( res => setTimeout(res, waitTime) );
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

async function getVideoPathByPageUrl(pageUrl,searchTitle,isAddNewValue){
  
  const dbDirectory = path.join(process.cwd(), "data", "my_skin_video_db.json");
  const jsonStr = fs.readFileSync(dbDirectory).toString();
  const fileContentsData = JSON.parse(jsonStr);
  const fileContents = Object.values(fileContentsData.data);
  const skinVideoObject = fileContents.find((p) => p.pageUrl.toLowerCase() === pageUrl.toLowerCase());
  let result = "";
  //_eskilerini getirmesi için
  if (skinVideoObject?.videoUrl != undefined && skinVideoObject?.videoUrl?.length>0){
    // console.log("getVideoPathByPageUrl if e girdi:"+pageUrl+" / "+searchTitle +" / "+isAddNewValue);
    result = skinVideoObject?.videoUrl;
    // console.log("if çıktısı: " + result);
  } else if(isAddNewValue) {
    
    
    //_yenisini youtube dan bulması için
    if(pageUrl.includes('default')){
      searchTitle = "classic+"+searchTitle;
    }

    // var key =  `AIzaSyAn6Q01ae2HXQjHzmVVenYNzdX1J0T7qks`;//process.env.YOUTUBE_KEY 
    //AIzaSyBXwPN1fHU1et0oESEVBq1YZaatL5at6XI
    //AIzaSyAl1_adv6WvrQHSiZxSjoUVDC0Bpwr9P_c
    //AIzaSyDPmBZQzch4Gny5WdM0QLW0I4zSZ0qL3N4
    let runQuery = `https://www.googleapis.com/youtube/v3/search?maxResults=1&key=AIzaSyB17qMGX2jO40ZNwPnKSYcJULdSiewvV38&q=${searchTitle}`;
    
    await fetch(runQuery).then((response) => {
      console.log("response: ");
      console.log(response);
    return response.json();
  })
  .then((myJson) => {
    console.log("myJson: ");
    console.log(myJson);
    // console.log(JSON.stringify(myJson));
    result = myJson.items[0].id.videoId;
    // console.log("searchTitle / result=> " + searchTitle + " / " +result);
    return result;
  })
  .catch(error => console.error(error)); //If error occurs you will get here

    // console.log("getVideoPathByPageUrl start pageUrl/isAddNewValue/searchTitle/result:   "+pageUrl+isAddNewValue+" / "+searchTitle+" / "+result);
    //TODO get key from env
    
    //todo DEVAM => sorguyu çalıştır ve geriye video id yi döndür
 
    //http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://www.leagueoflegends-skins.com
  } else {
    // console.log("hiçbirine girmedi(pageUrl): " + pageUrl);
    result = "";
  } 
  return result;
  
}

function generateRobotsTxtAndSitemapXml() {
console.log("generateRobotsTxtAndSitemapXml çalıştı");
  // await getVideoPathByPageUrl("Kassadin/Kassadin","Kassadin+Kassadin",false);
  // await getVideoPathByPageUrl("Kassadin/default","default+Kassadin",true);
  // await getVideoPathByPageUrl("Kassadin/ShockbladeKassadin","Shockblade+Kassadin+Kassadin",true);

  
  let rootPath = `https://leagueoflegends-skins.com`;
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
      heroList.map(async (champion, index) => {
        
        //TODO
        if(champion.id =='Kassadin'){

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


    //-generate
  //   mySkinDbFields = `${mySkinDbFields}
  // {
  //   "hero": "${replaceStringForUrlFormat(champion.id)}",
  //   "heroName": "${champion.name}",
  //   "skin": "${replaceStringForUrlFormat(champion.id)}",
  //   "skinName": "${champion.name}",
  //   "pageUrl": "${heroBasePath}",
  //   "videoUrl": "${getVideoPathByPageUrl(heroBasePath,replaceStringForSearchQuery(champion.id),false)}"
  // },`;
  mySkinDbFields = `${mySkinDbFields}
  {
    "hero": "${replaceStringForUrlFormat(champion.id)}",
    "heroName": "${champion.name}",
    "skin": "${replaceStringForUrlFormat(champion.id)}",
    "skinName": "${champion.name}",
    "pageUrl": "${heroBasePath}",
    "videoUrl": ""
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
            skinList.map(async (skinObject, index3) => {

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







 //_yenisini youtube dan bulması için 
 //TODO 
 let searchTitle = replaceStringForSearchQuery(skinObject.name + champion.id);
 if(activePath.includes('default')){
  searchTitle = "classic+"+searchTitle;
}
let runQuery = `https://www.googleapis.com/youtube/v3/search?maxResults=1&key=AIzaSyB17qMGX2jO40ZNwPnKSYcJULdSiewvV38&q=${searchTitle}`;


fetch(
  runQuery
).then((res3) => res3.json())
  .then((data3) => {
    let videoList = Object.values(data3.items);
    // console.log(videoList);
    let myVideoUrl = videoList[0].id.videoId;
    // console.log(myVideoUrl);
    // console.log("searchTitle / result=> " + searchTitle + " / " +myVideoUrl);
    mySkinDbFields = `${mySkinDbFields}
  {
    "hero": "${replaceStringForUrlFormat(champion.id)}",
    "heroName": "${champion.name}",
    "skin": "${replaceStringForUrlFormat(skinObject.name)}",
    "skinName": "${skinObject.name}",
    "pageUrl": "${activePath}",
    "videoUrl": "${myVideoUrl}"
  },`;
  console.log(mySkinDbFields);

  });




  //-generate
  // mySkinDbFields = `${mySkinDbFields}
  // {
  //   "hero": "${replaceStringForUrlFormat(champion.id)}",
  //   "heroName": "${champion.name}",
  //   "skin": "${replaceStringForUrlFormat(skinObject.name)}",
  //   "skinName": "${skinObject.name}",
  //   "pageUrl": "${activePath}",
  //   "videoUrl": "${getVideoPathByPageUrl(activePath,replaceStringForSearchQuery(skinObject.name + champion.id),true)}"
  // },`;
 

  // await wait(300);
  console.log("bekle");
  await wait(3000);
  console.log("devam");
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
     
        }
     
        });
    });


}

module.exports = generateRobotsTxtAndSitemapXml;
