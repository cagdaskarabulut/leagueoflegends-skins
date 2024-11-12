import styles from "./HeroesPanel.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { replaceStringForUrlFormat } from "../../utils/StringUtils";
import CardItem from "../toolComponents/CardItem";
import { Backdrop, CircularProgress } from "@mui/material";
import { wait } from "../../utils/CommonUtils";

const HeroesPanel = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let URL_imageRootPath =
    "https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/";
  let URL_allChampionsListPath =
    "https://ddragon.leagueoflegends.com/cdn/14.22.1/data/en_US/champion.json";
  useEffect(() => {
    fetch(URL_allChampionsListPath)
      .then((res) => res.json())
      .then((resData) => {
        setData(Object.values(resData.data));
      });
  }, []);

  // function wait(waitTime) {
  // return new Promise( res => setTimeout(res, waitTime) );
  // }

  async function cardClickAction(activeHeroRoute) {
    setIsLoading(true);
    // await wait(250);
    router.push(activeHeroRoute);
    // setIsLoading(false);
  }

  return (
    <div className={styles.PanelContainerStyle}>
      {data?.map((hero, index) => {
        let activeHeroId = hero.id;
        let activeHeroName = hero.name;
        let activeHeroMainImagePath = URL_imageRootPath + hero.image.full;
        let blurb = hero.blurb;
        let activeHeroRoute =
          "/" + replaceStringForUrlFormat(activeHeroName) + "/" + "default"; // replaceStringForUrlFormat(activeHeroName);
        return (
          <div key={activeHeroId} className={styles.CardContainerStyle}>
            <CardItem
              title={activeHeroName}
              imageAlt={replaceStringForUrlFormat(activeHeroName)}
              imageUrl={activeHeroMainImagePath}
              onClickAction={() => cardClickAction(activeHeroRoute)}
              likeAction={() => console.log("hero liked ")}
              shareAction={() => console.log("hero shared ")}
              isSmallSize={true}
            />
          </div>
        );
      })}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        {/* <CircularProgress color="inherit" /> */}
        <div className={styles.fullScreenLoader}></div>
      </Backdrop>
    </div>
  );
};

export default HeroesPanel;
