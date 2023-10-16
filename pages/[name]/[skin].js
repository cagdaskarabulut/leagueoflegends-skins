import { useState, useEffect } from "react";
import fsPromises from "fs/promises";
import path from "path";
import ImageViewerManuel from "../../components/tools/ImageViewerManuel";

// import ImageViewerManuel from "../components/tools/ImageViewerManuel";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function SkinPage({ heroDetailsObject,startSkinId }) {
  const [activeSkinId, setActiveSkinId] = useState(startSkinId);
  let URL_imageRootPath = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";

  return (
    <div>
      {console.log("active skin id : " + activeSkinId)}
      <h1> Skin List </h1>
      <h3>{heroDetailsObject.name}</h3>

      {heroDetailsObject.skins?.map((skin, index) => {
        let skinId = skin.id;
        let skinNum = skin.num;
        let skinName = skin.name;
        let skinKey = skinName + "_" + skinNum;
        let skinImagePath = URL_imageRootPath + heroDetailsObject.id + "_" + skinNum + ".jpg";
        // console.log("skinpath : " + skinImagePath);
        return (
        <div key={skinKey}>
          <p>{skinName}</p>
          <ImageViewerManuel imageName={skinName} imagePath={skinImagePath} onClickAction={() => setActiveSkinId(skinId)}/>
          </div>
          );
      })}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const name = ctx.params?.name;
  const skin = ctx.params?.skin;
  let activePath = name + "/" + skin;
  const filePath = path.join(process.cwd(), "pagePaths.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectDataListAll = JSON.parse(jsonData);
  const objectDataList = Object.values(objectDataListAll.data);
  let isPageFound = false;
  let heroId = "";
  objectDataList?.map((objectData,index) => {
    let activeHeroId = objectData.hero;
    let path = objectData.path;
    if (path === activePath) {
      isPageFound = true;
      heroId = activeHeroId;
    }
  });

  if (isPageFound){
    console.log("heroId:"+heroId);
    let heroDetailsObject;
    let startSkinId;
    await fetch(
      `https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${heroId}.json`
    )
      .then((res) => res.json())
      .then((resData) => {
        heroDetailsObject = Object.values(resData.data)[0];
        startSkinId = heroDetailsObject.skins[0].id;
        console.log("geldi");
        // console.log(heroDetailsObject);
        
      });
      return {
        props: {
          heroDetailsObject,
          startSkinId,
        },
      };
  } else{
    return {
      notFound: true,
    };
  }
}
