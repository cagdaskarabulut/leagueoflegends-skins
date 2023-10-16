import { useState, useEffect } from "react";
import fsPromises from "fs/promises";
import path from "path";
import ImageViewerManuel from "../../components/tools/ImageViewerManuel";
import { useRouter } from "next/navigation";
import {replaceStringForUrlFormat} from "../../utils/StringUtils";

// import ImageViewerManuel from "../components/tools/ImageViewerManuel";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function SkinPage({ heroDetailsObject,startSkinKey }) {
  const router = useRouter();
  const { query } = useRouter();
  let URL_imageRootPath = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";

  //TODO onclick yaz

  return (
    <div>
      <h1> Skin List </h1>
      <h3>{heroDetailsObject.name}</h3>

      {heroDetailsObject.skins?.map((skin, index) => {
        let skinNum = skin.num;
        let skinName = skin.name;
        let heroId = heroDetailsObject.id;
        let skinKey = heroId + "_" + skinNum;
        let skinImagePath = URL_imageRootPath + skinKey + ".jpg";
        let activeHeroRoute = "/"+ replaceStringForUrlFormat(heroId) + "/" + replaceStringForUrlFormat(skinName);
        return (
        <div key={skinKey}>
          <p>{skinName}</p>
          <ImageViewerManuel imageName={skinName} imagePath={skinImagePath} onClickAction={() => router.push(activeHeroRoute)  }/>

          {/* <iframe
            width="800"
            height="400"
            src={props.hero.activeVideoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe> */}

          </div>
          );
      })}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  console.log("getServerSideProps called");
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
    let heroDetailsObject;
    await fetch(
      `https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${heroId}.json`
    )
      .then((res) => res.json())
      .then((resData) => {
        heroDetailsObject = Object.values(resData.data)[0];
        
      });
      return {
        props: {
          heroDetailsObject
        },
      };
  } else{
    return {
      notFound: true,
    };
  }
}
