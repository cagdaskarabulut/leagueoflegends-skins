import MetaPanel from "../../components/mainComponents/MetaPanel";
import PageTemplate from "../../components/mainComponents/PageTemplate";
import { useRouter } from "next/router";
import fsPromises from "fs/promises";
import path from "path";
import { getSkinVideoByPageUrl } from "../../data/getSkinVideoByPageUrl";
import SkinPagePanel from "../../components/pageComponents/SkinPagePanel";
import {capitalizeFirstChar} from "../../utils/StringUtils";


export default function SkinPage({ heroDetailsObject, skinVideo, activePath }) {
  return (
    <>
       <MetaPanel
          title={`${skinVideo.skinName} - ${skinVideo.heroName} Skins: Visual Showcase with Skin Images and Videos`}
          descriptionContent={`Explore the enchanting world of ${skinVideo.heroName} in League of Legends through our captivating collection of skin images and videos. Witness the transformation of this iconic champion with a variety of skins, from classic to legendary. Immerse yourself in the visual delight of ${skinVideo.heroName}'s champion customizations in our comprehensive gallery.`}
          keywordsContent={`${skinVideo.skinName} skin, ${skinVideo.heroName} skins, ${skinVideo.skinName} skin videos, ${skinVideo.skinName} skin images, ${skinVideo.skinName} skin chromas, ${skinVideo.heroName} Skins, ${skinVideo.heroName} Champion Skins, ${skinVideo.heroName} Skin Images, ${skinVideo.heroName} Skin Videos, League of Legends ${skinVideo.heroName} Skins, Champion Customization, In-Game Cosmetics, Visual Transformations, Gaming Aesthetics, ${skinVideo.heroName} Cosmetics, ${skinVideo.heroName} Skin Showcase, Video Game Visuals, Rare ${skinVideo.heroName} Skins, Legendary ${skinVideo.heroName} Skins, ${skinVideo.heroName} Skin Gallery, ${skinVideo.heroName} Character Skins, Gaming Artistry, LoL Skin Collection, ${skinVideo.heroName}'s Beauty.`}
          imagePath="/images/lol-skins-icon.ico"
          imageAlt="League of Legends Skins"
        />
        <PageTemplate content={<SkinPagePanel heroDetailsObject={heroDetailsObject} skinVideo={skinVideo} activePath={activePath}/>} />
    </>
  )
}


// export async function getServerSideProps(ctx) {
//   const name = ctx.params?.name;
//   const skin = ctx.params?.skin;
//   let activePath = name + "/" + skin;
//   const filePath = path.join(process.cwd(),"data" ,"my_skin_video_db.json");
//   const jsonData = await fsPromises.readFile(filePath);
//   const objectDataListAll = JSON.parse(jsonData);
//   const objectDataList = Object.values(objectDataListAll.data);
//   let isPageFound = false;
//   let heroId = "";
//   objectDataList?.map((objectData,index) => {
//     let activeHeroId = objectData.hero;
//     let path = objectData.pageUrl;
//     if (path === activePath) {
//       isPageFound = true;
//       heroId = activeHeroId;
//     }
//   });

//   if (isPageFound){
//     let heroDetailsObject;
//     let skinVideo;
//     let heroIdWithCapitalizedFirstChar = capitalizeFirstChar(heroId);
//     await fetch(
//       `https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${heroIdWithCapitalizedFirstChar}.json`
//     )
//       .then((res) => res.json())
//       .then((resData) => {
//         heroDetailsObject = Object.values(resData.data)[0];
        

//         skinVideo = getSkinVideoByPageUrl(activePath)
//       });
//       return {
//         props: {
//           heroDetailsObject,
//           skinVideo,
//           activePath
//         },
//       };
//   } else{
//     return {
//       notFound: true,
//     };
//   }
// }

export async function getStaticProps(ctx) {
  const name = ctx.params?.name;
  const skin = ctx.params?.skin;
  let activePath = name + "/" + skin;
  const filePath = path.join(process.cwd(),"data" ,"my_skin_video_db.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectDataListAll = JSON.parse(jsonData);
  const objectDataList = Object.values(objectDataListAll.data);
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
        });
        return {
          props: {
            heroDetailsObject,
            skinVideo,
            activePath
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
 
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(),"data" ,"my_skin_video_db.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectDataListAll = JSON.parse(jsonData);
  const objectDataList = Object.values(objectDataListAll.data);

  //for test
//   const objectDataList = [
//     {
//       hero: 'akali',
//       skin: 'default'
//     },
//     {
//       hero: 'akali',
//       skin: 'akali'
//     },
// ];

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


  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages //-fallback: 'blocking'
  // on-demand if the path doesn't exist.
  // return { paths,  fallback: 'false'}
}
 