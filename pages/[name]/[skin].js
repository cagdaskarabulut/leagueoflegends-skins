import MetaPanel from "../../components/mainComponents/MetaPanel";
import HomePagePanel from "../../components/pageComponents/HomePagePanel";
import PageTemplate from "../../components/mainComponents/PageTemplate";
import { useState, useEffect } from "react";
import fsPromises from "fs/promises";
import path from "path";
import { useRouter, usePathname } from "next/navigation";
import {replaceStringForUrlFormat} from "../../utils/StringUtils";
import { getSkinVideoByPageUrl } from "../../data/getSkinVideoByPageUrl";
import SkinPagePanel from "../../components/pageComponents/SkinPagePanel";

export default function SkinPage({ heroDetailsObject, skinVideo }) {
  return (
    <>
        <MetaPanel
          title="Arabuluculuk nedir?"
          descriptionContent="Arabulucu ve Arabuluculuk nedir sorularına detaylı açıklama içermektedir."
          keywordsContent="arabulucu, arabuluculuk, arabulucuyuz, arabulucu, arabulucu nasıl bulurum, iyi bir arabulucu arıyorum, iyi bir avukat arıyorum, arabulucu bul, arabulucu ile anlaş, arabulucu tut"
          imagePath="/images/Arabulucu.jpg"
          imageAlt="Arabulucu"
        />
        <PageTemplate content={<SkinPagePanel heroDetailsObject={heroDetailsObject} skinVideo={skinVideo} />} />
    </>
  )
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
    let skinVideo;
    await fetch(
      `https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${heroId}.json`
    )
      .then((res) => res.json())
      .then((resData) => {
        heroDetailsObject = Object.values(resData.data)[0];
        skinVideo = getSkinVideoByPageUrl(activePath)
      });
      return {
        props: {
          heroDetailsObject,
          skinVideo
        },
      };
  } else{
    return {
      notFound: true,
    };
  }
}