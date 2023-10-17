import { useState, useEffect } from "react";
import fsPromises from "fs/promises";
import path from "path";
import ImageViewerManuel from "../../components/tools/ImageViewerManuel";
import { useRouter, usePathname } from "next/navigation";
import {replaceStringForUrlFormat} from "../../utils/StringUtils";
import { getVideoUrlByPageUrl } from "../../data/getVideoUrlByPageUrl";

// import ImageViewerManuel from "../components/tools/ImageViewerManuel";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function SkinPage({ heroDetailsObject, videoUrl }) {
  const router = useRouter();
  const { query } = useRouter();
  let URL_imageRootPath = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";
  const pathname = usePathname();

  // async function getVideoUrlByPageUrl(pageUrl) {
  
  //   const filePath = path.join(process.cwd(), "data","pagePaths.json");
  // const jsonData = await fsPromises.readFile(filePath);

  //   const fileContents = JSON.parse(jsonData);
  //   const skinVideoObject = fileContents.find((p) => p.pageUrl.toLowerCase() === pageUrl.toLowerCase());
  //   return skinVideoObject.videoUrl;
  // }

  return (
    <div>
      <h1> Skin List </h1>
      
      <h3>{heroDetailsObject.name}</h3>
      
      <h4>{pathname.slice(1)}</h4>
      <h5>{videoUrl}</h5>

      {videoUrl && (
        <iframe
          width="400"
          height="200"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}

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
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(ctx) {
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
    let videoUrl;
    await fetch(
      `https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${heroId}.json`
    )
      .then((res) => res.json())
      .then((resData) => {
        heroDetailsObject = Object.values(resData.data)[0];
        videoUrl = getVideoUrlByPageUrl(activePath)
      });
      return {
        props: {
          heroDetailsObject,
          videoUrl
        },
      };
  } else{
    return {
      notFound: true,
    };
  }
}
