import { useState, useEffect } from "react";
import ImageViewerManuel from "../components/tools/ImageViewerManuel";
import { useRouter } from "next/navigation";
import {replaceStringForUrlFormat} from "../utils/StringUtils";

const HomePage = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(true);
  // let imageRootPath = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/";
  let imageRootPath = "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/";

  useEffect(() => {
    fetch(
      "http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion.json"
    )
      .then((res) => res.json())
      .then((resData) => {
        setData(Object.values(resData.data));
        setLoading(false);
      });
  }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1> Champions List </h1>
      {data?.map((hero, index) => {
        let activeHeroId = hero.id;
        let activeHeroName = hero.name;
        // let activeHeroMainImagePath = imageRootPath + activeHeroId + "_" + 0 + ".jpg";
        let activeHeroMainImagePath = imageRootPath + hero.image.full;
        let activeHeroRoute = "/"+ replaceStringForUrlFormat(activeHeroId) + "/default";
        return (
        <div key={activeHeroId}>
          <p>{activeHeroName}</p>
          <ImageViewerManuel imageName={activeHeroId} imagePath={activeHeroMainImagePath} onClickAction={() => router.push(activeHeroRoute)}/>
          </div>
          );
      })}
    </div>
  );
};
export default HomePage;