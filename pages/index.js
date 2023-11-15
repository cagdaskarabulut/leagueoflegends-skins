import MetaPanel from "../components/mainComponents/MetaPanel";
import HomePagePanel from "../components/pageComponents/HomePagePanel";
import fsPromises from "fs/promises";
import path from "path";
export default function HomePage({ allSkinsList }) {
  return (
    <>
      <MetaPanel
        title="League of Legends Champion Skins Showcase: Stunning Skin Images and Skin Videos"
        descriptionContent="Explore the breathtaking world of League of Legends champion skins through our extensive collection of images and videos. Immerse yourself in the visual splendor of LoL champions as we showcase their incredible skins in action. From legendary to rare, discover the beauty and power of each skin in our curated galleries and videos."
        keywordsContent="lol skin, lol skins, League of Legends, champion skins, skin images, skin videos, lol skin videos, gaming aesthetics, champion customization, video game visuals, league of legends skin, league of legends skins"
        imagePath="/images/lol-skins-icon.ico"
        imageAlt="League of Legends Skins"
      />
      <HomePagePanel allSkinsList={allSkinsList}/>
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
