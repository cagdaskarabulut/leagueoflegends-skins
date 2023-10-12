import React, { useEffect, useState } from "react";
import { Hero } from "@/data/Hero";
import { getHeroByNameAndSkin } from "@/data/getHeroByNameAndSkin";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ImageViewer from "@/components/tools/ImageViewer";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { storage } from "../../utils/firebase";
import {
  replaceDashToSpace,
  replaceSpaceToDash,
} from "../../utils/StringUtils";

//_en başta nesnenin kendi skin i olacak sonra skin listesi dömdürülüp
type SkinPageProps = {
  hero: Hero;
};

const SkinPage = (props: SkinPageProps) => {
  return (
    <div>
      SkinPage
      <h1>{props.hero?.activeSkin}</h1>
      <div>
        <p>{props.hero?.description}</p>
        {props.hero?.skins?.map((skinObject) => {
          let skinName = skinObject.skin ? skinObject.skin : props.hero?.name;
          let activeKey = skinObject.skin
            ? props.hero?.name + "_" + replaceSpaceToDash(skinObject.skin)
            : props.hero?.name;
          return (
            <div key={"div_" + activeKey}>
              <p key={"p_" + activeKey}>{skinName}</p>
              <ImageViewer key={"i_" + activeKey} imageName={skinName} imagePath={skinObject.imageUrl} />
            </div>
          );
        })}
      
        <iframe
          width="800"
          height="400"
          src={props.hero.activeVideoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default SkinPage;

export const getServerSideProps: GetServerSideProps<SkinPageProps> = async (
  ctx
) => {
  const name = ctx.params?.name as string;
  const skin = ctx.params?.skin as string;
  const hero = getHeroByNameAndSkin(name, replaceDashToSpace(skin)) ?? null;
  if (!hero) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      hero,
    },
  };
};
