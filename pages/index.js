import MetaPanel from "../components/mainComponents/MetaPanel";
import HomePagePanel from "../components/pageComponents/HomePagePanel";
import PageTemplate from "../components/mainComponents/PageTemplate";

const HomePage = () => {
  return (
    <>
    {/* <title>▷ LoL skin</title>
    <meta name="description" content="LoL skin video - League of Legends Skins &amp; Chromas / League of Legends skin preview videos wildrift - LoL skin">
    <link rel="canonical" href="https://lol-skin.weblog.vc/en-US/LoL-skin/"> */}
      <MetaPanel
          title="League of Legends Heroes | League of Legends Skin & lol skin"
          descriptionContent="lol hero skin video and image - lol skin videos and images - league of legends skin image and video - lol skins and chromas"
          keywordsContent="lol skin, lol skins, league of legends skin, league of legends skins, lol hero skin, lol hero skins, league of legends hero skin, league of legends hero skins, lol skin video,league of legends hero skins, lol skin image, league of legends skin video,league of legends skin image "
          imagePath="/images/lol-skins-icon.ico"
          imageAlt="League of Legends Skins"
        />
        <PageTemplate content={<HomePagePanel />} />
      </>
  );
};
export default HomePage;