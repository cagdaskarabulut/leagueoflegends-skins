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
    {/* <title>▷ LoL skin Wild Card Shaco / League of Legends Skins &amp; Chromas / video Shaco</title>
    <meta name="description" content="LoL skin Wild Card Shaco Skins &amp; Chromas / League of Legends / LoL WildCardShaco skin video en-US - LoL skin forEX US">
    <link rel="canonical" href="https://lol-skin.weblog.vc/en-US/35/7/Wild-Card-Shaco/"></link> */}
        <MetaPanel
          title="Arabuluculuk nedir?"
          descriptionContent="Arabulucu ve Arabuluculuk nedir sorularına detaylı açıklama içermektedir."
          keywordsContent="arabulucu, arabuluculuk, arabulucuyuz, arabulucu, arabulucu nasıl bulurum, iyi bir arabulucu arıyorum, iyi bir avukat arıyorum, arabulucu bul, arabulucu ile anlaş, arabulucu tut"
          imagePath="/images/lol-skins-icon.ico"
          imageAlt="Arabulucu"
        />
        <PageTemplate content={<SkinPagePanel heroDetailsObject={heroDetailsObject} skinVideo={skinVideo} activePath={activePath}/>} />
    </>
  )
}

export async function getServerSideProps(ctx) {
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
    if (path === activePath) {
      isPageFound = true;
      heroId = activeHeroId;
    }
  });

  if (isPageFound){
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
      };
  } else{
    return {
      notFound: true,
    };
  }
}