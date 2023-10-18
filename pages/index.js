import MetaPanel from "../components/mainComponents/MetaPanel";
import HomePagePanel from "../components/pageComponents/HomePagePanel";
import PageTemplate from "../components/mainComponents/PageTemplate";

const HomePage = () => {
  return (
    <>
      <MetaPanel
          title="Arabuluculuk nedir?"
          descriptionContent="Arabulucu ve Arabuluculuk nedir sorularına detaylı açıklama içermektedir."
          keywordsContent="arabulucu, arabuluculuk, arabulucuyuz, arabulucu, arabulucu nasıl bulurum, iyi bir arabulucu arıyorum, iyi bir avukat arıyorum, arabulucu bul, arabulucu ile anlaş, arabulucu tut"
          imagePath="/images/Arabulucu.jpg"
          imageAlt="Arabulucu"
        />
        <PageTemplate content={<HomePagePanel />} />
      </>
  );
};
export default HomePage;