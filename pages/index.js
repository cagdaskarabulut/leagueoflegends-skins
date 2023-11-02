import MetaPanel from "../components/mainComponents/MetaPanel";
import HomePagePanel from "../components/pageComponents/HomePagePanel";
import PageTemplate from "../components/mainComponents/PageTemplate";

const HomePage = () => {
  return (
    <>
      <MetaPanel
          title="League of Legends Champion Skins Showcase: Stunning Skin Images and Skin Videos"
          descriptionContent="Explore the breathtaking world of League of Legends champion skins through our extensive collection of images and videos. Immerse yourself in the visual splendor of LoL champions as we showcase their incredible skins in action. From legendary to rare, discover the beauty and power of each skin in our curated galleries and videos."
          keywordsContent="League of Legends, champion skins, LoL skins, skin images, skin videos, lol skin videos, gaming aesthetics, champion customization, video game visuals, lol skin, lol skins, league of legends skin, league of legends skins"
          imagePath="/images/lol-skins-icon.ico"
          imageAlt="League of Legends Skins"
        />
        <PageTemplate content={<HomePagePanel />}/>
      </>
  );
};
export default HomePage;