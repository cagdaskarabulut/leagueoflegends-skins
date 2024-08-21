import MetaPanel from "../components/mainComponents/MetaPanel";
import HomePagePanel from "../components/pageComponents/HomePagePanel";
import fsPromises from "fs/promises";
import path from "path";
import ScrollToTop from "../components/reusableComponents/ScrollToTopButton";

export const dynamicParams = true; // true | false,
export const revalidate = 3600; // 1 hour

export default function HomePage({ allSkinsList }) {
  return (
    <>
      <MetaPanel
        title="League of Legends Skins - League of Legends Champion Skins Showcase: Stunning Skin Images and Skin Videos"
        descriptionContent="League of Legends Skins - Explore the little-known stories of all heroes and breathtaking world of League of Legends champion skins through our extensive collection of images and videos. Immerse yourself in the visual splendor of LoL champions as we showcase their incredible skins in action. From legendary to rare, discover the beauty and power of each skin in our curated galleries and videos."
        keywordsContent="lol skin, lol skins, League of Legends, champion skins, skin images, skin videos, lol skin videos, gaming aesthetics, champion customization, video game visuals, league of legends skin, league of legends skins, little-known stories of all heroes, how many rp, skin prices, skin rp"
        imagePath="/images/lol-skins-icon.ico"
        imageAlt="League of Legends Skins"
      />
      <HomePagePanel allSkinsList={allSkinsList} />
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
          width: 100%;
          height: 100vh;
          background-size: cover;
          background-image: url("https://karabulut-storage.s3.amazonaws.com/leagueoflegends-skins/indexBackground1.jpg") !important;
          // -ms-animation: animate 5s ease infinite alternate;
          // -webkit-animation: animate 5s ease infinite alternate;
          // -moz-animation: animate 5s ease infinite alternate;
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
        // @keyframes animate {
        //   0%,
        //   100% {
        //     background-image: url("https://karabulut-storage.s3.amazonaws.com/leagueoflegends-skins/indexBackground.jpg") !important;
        //   }

        //   0%{
        //     background-image: url("https://karabulut-storage.s3.amazonaws.com/leagueoflegends-skins/indexBackground.jpg") !important;
        //   }

        //   50% {
        //     background-image: url("https://karabulut-storage.s3.amazonaws.com/leagueoflegends-skins/indexBackground1.jpg") !important;
        //   }

        //   100% {
        //     background-image: url("https://karabulut-storage.s3.amazonaws.com/leagueoflegends-skins/indexBackground2.jpg") !important;
        //   }
        // }
      `}</style>

      {/* <style jsx global>{`
          body {
            margin: 0 !important;
            padding: 0 !important;
            font-size: 14px !important;
            background-repeat: no-repeat;
            background-attachment: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            background-size: cover;
            background-image: url("https://karabulut-storage.s3.amazonaws.com/leagueoflegends-skins/indexBackground1.jpg");
            -ms-animation: animate 30s ease infinite alternate;
            -webkit-animation: animate 30s ease infinite alternate;
            -moz-animation: animate 30s ease infinite alternate;
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
          @-webkit-keyframes animate {
            0% {
              background-image: url("https://karabulut-storage.s3.amazonaws.com/leagueoflegends-skins/indexBackground.jpg") !important;
            }

            50% {
              background-image: url("https://karabulut-storage.s3.amazonaws.com/leagueoflegends-skins/indexBackground1.jpg") !important;
            }

            100% {
              background-image: url("https://karabulut-storage.s3.amazonaws.com/leagueoflegends-skins/indexBackground2.jpg") !important;
            }
          }
        `}</style> */}
    </>
  );
}

export async function getStaticProps() {
  const filePath2 = path.join(
    process.cwd(),
    "data",
    "my_skin_video_db_ForSkinsBigImages.json"
  );
  const jsonData2 = await fsPromises.readFile(filePath2);
  const objectDataListAll2 = JSON.parse(jsonData2);
  const allSkinsList = Object.values(objectDataListAll2.data);
  return {
    props: {
      allSkinsList,
    },
  };
}
