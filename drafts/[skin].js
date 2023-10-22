import MetaPanel from "../../components/mainComponents/MetaPanel";
import PageTemplate from "../../components/mainComponents/PageTemplate";
import { useRouter } from "next/router";
import fsPromises from "fs/promises";
import path from "path";
import { getSkinVideoByPageUrl } from "../../data/getSkinVideoByPageUrl";
import SkinPagePanel from "../../components/pageComponents/SkinPagePanel";

export default function SkinPage({ heroDetailsObject, skinVideo, activePath }) {
  return (
    <>
        <MetaPanel
          title={`lol ${skinVideo.skinName} skin & league of legends ${skinVideo.skinName} skins`}
          descriptionContent={`lol ${skinVideo.skinName} skin & league of legends ${skinVideo.skinName} skins & lol ${skinVideo.heroName} skins & ${heroDetailsObject.skinName} skin video & ${heroDetailsObject.heroName} skin videos`}
          keywordsContent={`lol ${skinVideo.skinName} skin & league of legends ${skinVideo.skinName} skins & lol ${skinVideo.heroName} skins & ${heroDetailsObject.skinName} skin video & ${heroDetailsObject.heroName} skin videos`}
          imagePath="/images/lol-skins-icon.ico"
          imageAlt="League of Legends Skins"
        />

        <PageTemplate content={<SkinPagePanel heroDetailsObject={heroDetailsObject} skinVideo={skinVideo} activePath={activePath}/>} />
    </>
  )
}

export async function getServerSideProps(ctx) {
  const name = ctx.params?.name;
  const skin = ctx.params?.skin;
  let activePath = name + "/" + skin;
  const filePath = path.join(process.cwd(), "data", "my_skin_video_db.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectDataListAll = JSON.parse(jsonData);
  const objectDataList = Object.values(objectDataListAll.data);
  let isPageFound = false;
  let activeHero = "";
  let skinVideo;
  objectDataList?.map((objectData,index) => {
    let draftHero = objectData;
    let path = objectData.pageUrl;
    if (path === activePath) {
      isPageFound = true;
      skinVideo = draftHero;
    }
  });

  if (isPageFound){
    let heroDetailsObject;
    
    await fetch(
      `https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${activeHero.hero}.json`
    )
      .then((res) => res.json())
      .then((resData) => {
        heroDetailsObject = Object.values(resData.data)[0];
      });
      return {
        props: {
          heroDetailsObject,
          skinVideo,
          activePath
        },
      };
  } else{
    return {
      notFound: true,
    };
  }
}