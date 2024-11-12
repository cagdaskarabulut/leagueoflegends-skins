import MetaPanel from "../../components/mainComponents/MetaPanel";
import fsPromises from "fs/promises";
import path from "path";
import {
  getSkinVideoByOldPageUrl,
  getSkinVideoByPageUrl,
} from "../../data/getSkinVideoByPageUrl";
import { getBigImageUrlByPageUrl } from "../../data/getBigImageUrlByPageUrl";
import SkinPagePanel from "../../components/pageComponents/SkinPagePanel";
import {
  capitalizeFirstChar,
  replaceStringForUrlFormat,
} from "../../utils/StringUtils";
import ScrollToTop from "../../components/reusableComponents/ScrollToTopButton";
import useCommercials from "../../hooks/useCommercials";

export const dynamicParams = true; // true | false,
export const revalidate = 3600; // 1 hour

export default function SkinPage({
  heroDetailsObject,
  skinVideo,
  activePath,
  splashPath,
  skinBigImageObject,
  allSkinsList,
  pageContent,
}) {
  const { commercials, isMobile } = useCommercials();
  let titleText = "";
  let descriptionContent = "";

  if (skinVideo.skinName == skinVideo.heroName) {
    titleText = `${skinVideo.heroName} Skins - ${skinVideo.heroName} All Skin Images and Skin Videos: ${skinVideo.heroName} Cinematic / Trailer, Little-known story of the ${skinVideo.heroName}`;
    descriptionContent = `Explore the little-known story of the ${skinVideo.heroName} and enchanting world of ${skinVideo.heroName} in League of Legends through our captivating collection of skin images and videos. Witness the transformation of this iconic champion with a variety of skins, from classic to legendary. Immerse yourself in the visual delight of ${skinVideo.heroName}'s champion customizations in our comprehensive gallery.`;
  } else if (skinVideo.skinName == "default") {
    titleText = `${skinVideo.heroName} Skin Video: ${skinVideo.heroName} Classic(default) Skin Images and Videos, Little-known story of the ${skinVideo.heroName}'s default skin`;
    descriptionContent = `Explore the little-known story of the default skins of ${skinVideo.heroName} in League of Legends through our captivating collection of skin images and videos.`;
  } else {
    titleText = `${skinVideo.skinName} Skin Video - ${skinVideo.heroName} : ${skinVideo.heroName} Visual Showcase with Skin Images and Videos, Little-known story of the ${skinVideo.heroName}'s ${skinVideo.skinName} skin`;
    descriptionContent = `Explore the little-known story of the ${skinVideo.skinName} and enchanting world of ${skinVideo.heroName} in League of Legends through our captivating collection of skin images and videos.`;
  }

  return (
    <>
      <MetaPanel
        title={titleText}
        descriptionContent={descriptionContent}
        keywordsContent={`${skinVideo.skinName} skin, ${skinVideo.heroName} skin, ${skinVideo.heroName} Skin, ${skinVideo.heroName} skins, ${skinVideo.skinName} skin videos, ${skinVideo.skinName} skin images, ${skinVideo.skinName} cinematic, ${skinVideo.skinName} trailer, ${skinVideo.skinName} skin chromas, ${skinVideo.heroName} Skins, ${skinVideo.heroName} Champion Skins, ${skinVideo.heroName} Skin Images, ${skinVideo.heroName} Skin Videos, League of Legends ${skinVideo.heroName} Skins, Champion Customization, In-Game Cosmetics, Visual Transformations, Gaming Aesthetics, ${skinVideo.heroName} Cosmetics, ${skinVideo.heroName} Skin Showcase, Video Game Visuals, Rare ${skinVideo.heroName} Skins, Legendary ${skinVideo.heroName} Skins, ${skinVideo.heroName} Skin Gallery, ${skinVideo.heroName} Character Skins, Gaming Artistry, LoL Skin Collection, ${skinVideo.heroName}'s Beauty, little-known story of the ${skinVideo.heroName}, little-known story of the ${skinVideo.skinName}, price of ${skinVideo.skinName}, how many rp ${skinVideo.skinName},${skinVideo.skinName} rp, ${skinVideo.skinName} price`}
        imagePath="/images/lol-skins-icon.ico"
        imageAlt="League of Legends Skins"
      />
      <SkinPagePanel
        heroDetailsObject={heroDetailsObject}
        skinVideo={skinVideo}
        activePath={activePath}
        splashFullPath={
          isMobile
            ? "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
              splashPath
            : "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
              splashPath
        }
        skinBigImageObject={skinBigImageObject}
        allSkinsList={allSkinsList}
        pageContent={pageContent}
      />
      <ScrollToTop showBelow={250} />
      <style jsx global>{`
        body {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 14px !important;
          background-repeat: no-repeat;
          background-attachment: fixed;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          background-size: cover;
          background-position: center, center;
          background-image: url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${splashPath}) !important;
        }
        @media only screen and (max-width: 1024px) {
          body {
            background-image: url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${splashPath}) !important;
          }
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
  );
}

export async function getStaticProps(ctx) {
  const name = ctx.params?.name;
  const skin = ctx.params?.skin;
  let activePath = name + "/" + skin;
  let splashPath = "";
  let skinBigImageObject = "";

  const filePath2 = path.join(
    process.cwd(),
    "data",
    "my_skin_video_db_ForSkinsBigImages.json"
  );
  const jsonData2 = await fsPromises.readFile(filePath2);
  const objectDataListAll2 = JSON.parse(jsonData2);
  const allSkinsList = Object.values(objectDataListAll2.data);
  let isPageFound = false;
  let heroId = "";

  allSkinsList?.map((objectData, index) => {
    let path = objectData.newPageUrl;
    if (path.toLowerCase() === activePath.toLowerCase()) {
      isPageFound = true;
      heroId = getSkinVideoByOldPageUrl(objectData.pageUrl).hero;
    }
  });

  if (isPageFound) {
    //_ skin sayfasının contentini getir
    let pageContent = "";
    const filePathContent = path.join(
      process.cwd(),
      "data/pageContent",
      name + ".json"
    );
    const jsonDataContent = await fsPromises.readFile(filePathContent);
    if (
      jsonDataContent !== undefined &&
      jsonDataContent != null &&
      jsonDataContent.length > 0
    ) {
      const objectDataListAllContent = JSON.parse(jsonDataContent);
      const allSelectedHeroContentsList = Object.values(
        objectDataListAllContent.data
      );

      allSelectedHeroContentsList?.map((objectData, index) => {
        let path = objectData.newPageUrl;
        if (path.toLowerCase() === activePath.toLowerCase()) {
          pageContent = objectData.content;
        }
      });
    } else {
      pageContent = "";
    }

    //- sayfaya döndürülecek verileri hazırlayıp, döndür
    try {
      let heroDetailsObject;
      let skinVideo;
      let heroIdWithCapitalizedFirstChar = capitalizeFirstChar(heroId);
      await fetch(
        `https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion/${heroIdWithCapitalizedFirstChar}.json`
      )
        .then((res) => res.json())
        .then((resData) => {
          heroDetailsObject = Object.values(resData.data)[0];
          skinVideo = getSkinVideoByPageUrl(activePath);
          splashPath = `${heroIdWithCapitalizedFirstChar}_${
            getBigImageUrlByPageUrl(activePath).splashNumber
          }.jpg`;
          skinBigImageObject = getBigImageUrlByPageUrl(activePath);
        });
      return {
        props: {
          heroDetailsObject,
          skinVideo,
          activePath,
          splashPath,
          skinBigImageObject,
          allSkinsList,
          pageContent,
        },
        // revalidate: 10, // Next.js will attempt to re-generate the page: // When a request comes in // At most once every 10 seconds
      };
    } catch {
      return {
        notFound: true,
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
}

//-new version
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "my_skin_video_db.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectDataListAll = JSON.parse(jsonData);
  const objectDataList = Object.values(objectDataListAll.data);
  return {
    paths: objectDataList.map((objectData) => {
      return {
        params: {
          name: replaceStringForUrlFormat(objectData.heroName),
          skin: replaceStringForUrlFormat(objectData.skinName),
        },
      };
    }),
    fallback: "blocking",
  };
}
