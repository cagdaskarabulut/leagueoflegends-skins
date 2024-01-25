import MetaPanel from "../components/mainComponents/MetaPanel";
import fsPromises from "fs/promises";
import path from "path";
import ScrollToTop from "../components/reusableComponents/ScrollToTopButton";
import AboutPagePanel from "../components/pageComponents/AboutPagePanel";
export default function HomePage({ allSkinsList }) {
  return (
    <>
      <MetaPanel
        title="About League of Legends"
        descriptionContent="League of Legends About - Explore the little-known stories of all heroes and breathtaking world of League of Legends champion."
        keywordsContent="lol about, lol information, lol history, League of Legends about, League of Legends history, League of Legends information"
        imagePath="/images/lol-skins-icon.ico"
        imageAlt="About League of Legends"
      />
      <AboutPagePanel />
      <ScrollToTop showBelow={250}/>
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
