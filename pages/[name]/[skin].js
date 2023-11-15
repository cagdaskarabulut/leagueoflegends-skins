import MetaPanel from "../../components/mainComponents/MetaPanel";
import { useRouter } from "next/router";
import fsPromises from "fs/promises";
import path from "path";
import { getSkinVideoByPageUrl } from "../../data/getSkinVideoByPageUrl";
import { getBigImageUrlByPageUrl } from "../../data/getBigImageUrlByPageUrl";
import SkinPagePanel from "../../components/pageComponents/SkinPagePanel";
import {capitalizeFirstChar} from "../../utils/StringUtils";


export default function SkinPage({ heroDetailsObject, skinVideo, activePath, splashPath, skinBigImageObject, allSkinsList }) {
  let titleText = "";
  
  if(skinVideo.skinName == skinVideo.heroName){
    titleText = `${skinVideo.heroName} Skins - ${skinVideo.heroName} All Skin Images and Skin Videos: ${skinVideo.heroName} Cinematic / Trailer`;
  } else if(skinVideo.skinName == 'default'){
    titleText = `${skinVideo.heroName} Skin Video: ${skinVideo.heroName} Classic(default) Skin Images and Videos`;
  } else {
    titleText = `${skinVideo.skinName} Skin Video - ${skinVideo.heroName} : ${skinVideo.heroName} Visual Showcase with Skin Images and Videos`;
  }
  
  return (
    <>
       <MetaPanel
          title={titleText}
          descriptionContent={`Explore the enchanting world of ${skinVideo.heroName} in League of Legends through our captivating collection of skin images and videos. Witness the transformation of this iconic champion with a variety of skins, from classic to legendary. Immerse yourself in the visual delight of ${skinVideo.heroName}'s champion customizations in our comprehensive gallery.`}
          keywordsContent={`${skinVideo.skinName} skin, ${skinVideo.heroName} skins, ${skinVideo.skinName} skin videos, ${skinVideo.skinName} skin images, ${skinVideo.skinName} cinematic, ${skinVideo.skinName} trailer, ${skinVideo.skinName} skin chromas, ${skinVideo.heroName} Skins, ${skinVideo.heroName} Champion Skins, ${skinVideo.heroName} Skin Images, ${skinVideo.heroName} Skin Videos, League of Legends ${skinVideo.heroName} Skins, Champion Customization, In-Game Cosmetics, Visual Transformations, Gaming Aesthetics, ${skinVideo.heroName} Cosmetics, ${skinVideo.heroName} Skin Showcase, Video Game Visuals, Rare ${skinVideo.heroName} Skins, Legendary ${skinVideo.heroName} Skins, ${skinVideo.heroName} Skin Gallery, ${skinVideo.heroName} Character Skins, Gaming Artistry, LoL Skin Collection, ${skinVideo.heroName}'s Beauty.`}
          imagePath="/images/lol-skins-icon.ico"
          imageAlt="League of Legends Skins"
        />
        <SkinPagePanel heroDetailsObject={heroDetailsObject} skinVideo={skinVideo} activePath={activePath} splashPath={splashPath} skinBigImageObject={skinBigImageObject} allSkinsList={allSkinsList}/>
        <style jsx global>{`
          body {
            margin: 0 !important;
            padding: 0 !important;
            font-size: 14px !important;
            background-repeat: no-repeat;
            background-attachment: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            background-size: cover;
            background-image: url(${splashPath}) !important;
          }
          // body::after {
          //   content: "";
          //   background-repeat: no-repeat;
          //   background-attachment: fixed;
          //   left: 0;
          //   top: 0;
          //   width: 100%;
          //   height: 100vh;
          //   background-size: cover;
          //   background-color: black !important;
          //   opacity: 0.5 !important;
          //   position: fixed !important;
          //   z-index: -1;
          // }
        `}</style>
    </>
  )
}


export async function getStaticProps(ctx) {
  const name = ctx.params?.name;
  const skin = ctx.params?.skin;
  let activePath = name + "/" + skin;
  let splashPath = "";
  let skinBigImageObject = "";

  const filePath = path.join(process.cwd(),"data" ,"my_skin_video_db.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectDataListAll = JSON.parse(jsonData);
  const objectDataList = Object.values(objectDataListAll.data);

  const filePath2 = path.join(process.cwd(),"data" ,"my_skin_video_db_ForSkinsBigImages.json");
  const jsonData2 = await fsPromises.readFile(filePath2);
  const objectDataListAll2 = JSON.parse(jsonData2);
  const allSkinsList = Object.values(objectDataListAll2.data);
  

  let isPageFound = false;
  let heroId = "";
  objectDataList?.map((objectData,index) => {
    let activeHeroId = objectData.hero;
    let path = objectData.pageUrl;
    // if (path === activePath) {
    if (path.toLowerCase() === activePath.toLowerCase()) {
      isPageFound = true;
      heroId = activeHeroId;
    }
  });

  if (isPageFound){
    try{
      let heroDetailsObject;
      let skinVideo;
      let heroIdWithCapitalizedFirstChar = capitalizeFirstChar(heroId);
      await fetch(
        `https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${heroIdWithCapitalizedFirstChar}.json`
      )
        .then((res) => res.json())
        .then((resData) => {
          heroDetailsObject = Object.values(resData.data)[0];
          skinVideo = getSkinVideoByPageUrl(activePath)
          splashPath =  `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${heroIdWithCapitalizedFirstChar}_${getBigImageUrlByPageUrl(activePath).splashNumber}.jpg` 
          skinBigImageObject = getBigImageUrlByPageUrl(activePath);
        });
        return {
          props: {
            heroDetailsObject,
            skinVideo,
            activePath,
            splashPath,
            skinBigImageObject,
            allSkinsList
          },
          // revalidate: 10, // Next.js will attempt to re-generate the page: // When a request comes in // At most once every 10 seconds
        };
    } catch {
      return {
        notFound: true,
      };
    }
    
  } else{
    return {
      notFound: true,
    };
  }
}
 
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(),"data" ,"my_skin_video_db.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectDataListAll = JSON.parse(jsonData);
  const objectDataList = Object.values(objectDataListAll.data);
  return {
    paths: objectDataList.map((objectData) => {
        return {
            params: {
              name: objectData.hero,
              skin: objectData.skin,
            },
        };
    }),
    fallback: 'blocking',
};
}
 