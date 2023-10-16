import { useState, useEffect } from "react";
// import ImageViewerManuel from "../components/tools/ImageViewerManuel";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
const SkinPage = () => {
  // const router = useRouter();
  // const [data, setData] = useState(null);
  // const [dataKeys, setDataKeys] = useState(null);
  // const [isLoading, setLoading] = useState(true);
  // // let imageRootPath = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/";
  // let imageRootPath = "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/";

  useEffect(() => {
    // fetch(
    //   "http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion.json"
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data.data);
    //     setDataKeys(Object.values(data.data));
    //     setLoading(false);
    //   });
  }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1> Skin List </h1>
      {/* {dataKeys?.map((hero, index) => {
        let activeHeroId = hero.id;
        let activeHeroName = hero.name;
        // let activeHeroMainImagePath = imageRootPath + activeHeroId + "_" + 0 + ".jpg";
        let activeHeroMainImagePath = imageRootPath + hero.image.full;
        let activeHeroRoute = "/"+ activeHeroId + "/" + activeHeroId;
        console.log(activeHeroId , activeHeroName);
        return (
        <div key={activeHeroId}>
          <p>{activeHeroName}</p>
          <ImageViewerManuel imageName={activeHeroId} imagePath={activeHeroMainImagePath} onClickAction={() => router.push(activeHeroRoute)}/>
          </div>
          );
      })} */}
    </div>
  );
};
export default SkinPage;

// export async function getServerSideProps(ctx) {
//   const name = ctx.params?.name;
//   const skin = ctx.params?.skin;
//   //todo hero adını dinamik al ve prop parametresiyle hero adı, skin, gibi şeyleri gönder
//   const res = await fetch('https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/Aatrox.json')
//   const repo = await res.json()
//   const skinList = repo?.data[0]?.skins;
//   return { props: { skinList } }
// }
 


// import React, { useEffect, useState } from "react";
// import { Hero } from "@/data/Hero";
// import { getHeroByNameAndSkin } from "@/data/getHeroByNameAndSkin";
// import { GetServerSideProps } from "next";
// import { useRouter } from "next/router";
// import ImageViewerCloud from "@/components/tools/ImageViewerCloud";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   StorageReference,
// } from "firebase/storage";
// import { storage } from "../../utils/firebase";
// import {
//   replaceDashToSpace,
//   replaceSpaceToDash,
// } from "../../utils/StringUtils";

// //_en başta nesnenin kendi skin i olacak sonra skin listesi dömdürülüp

// //-Kullanılacak adresler
// //_http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/Aatrox.json
// //_https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_2.jpg
// type SkinPageProps = {
//   hero: Hero;
// };

// const SkinPage = (props: SkinPageProps) => {
//   return (
//     <div>
//       SkinPage
//       <h1>{props.hero?.activeSkin}</h1>
//       <div>
//         <p>{props.hero?.description}</p>
//         {props.hero?.skins?.map((skinObject) => {
//           let skinName = skinObject.skin ? skinObject.skin : props.hero?.name;
//           let activeKey = skinObject.skin
//             ? props.hero?.name + "_" + replaceSpaceToDash(skinObject.skin)
//             : props.hero?.name;
//           return (
//             <div key={"div_" + activeKey}>
//               <p key={"p_" + activeKey}>{skinName}</p>
//               <ImageViewerCloud key={"i_" + activeKey} imageName={skinName} imagePath={skinObject.imageUrl} />
//             </div>
//           );
//         })}
      
//         <iframe
//           width="800"
//           height="400"
//           src={props.hero.activeVideoUrl}
//           title="YouTube video player"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowFullScreen
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default SkinPage;

// export const getServerSideProps: GetServerSideProps<SkinPageProps> = async (
//   ctx
// ) => {
//   const name = ctx.params?.name as string;
//   const skin = ctx.params?.skin as string;
//   const hero = getHeroByNameAndSkin(name, replaceDashToSpace(skin)) ?? null;

//   fetch(
//     "http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion.json"
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       setData(data.data);
//       setDataKeys(Object.values(data.data));
//       setLoading(false);
//     });
    
//   if (!hero) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       hero,
//     },
//   };
// };
