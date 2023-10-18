import React from 'react'
import styles from './HeroesPanel.module.scss';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {replaceStringForUrlFormat} from "../../utils/StringUtils";
import CardItem from "../toolComponents/CardItem";

const HeroesPanel = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  let URL_imageRootPath = "https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/";
  let URL_allChampionsListPath = "https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion.json";
  useEffect(() => {
    fetch(URL_allChampionsListPath)
      .then((res) => res.json())
      .then((resData) => {
        setData(Object.values(resData.data));
      });
  }, []);
  
  return (
    <div className={styles.HeroesPanelContainerStyle}>
      {data?.map((hero, index) => {
        let activeHeroId = hero.id;
        let activeHeroName = hero.name;
        let activeHeroMainImagePath = URL_imageRootPath + hero.image.full;
        let activeHeroRoute = "/"+ replaceStringForUrlFormat(activeHeroId) + "/default";
        return (
            <div key={activeHeroId} className={styles.CardContainerStyle}> 
              <CardItem
                title={activeHeroName}
                // description={hero.title}
                imageAlt={replaceStringForUrlFormat(activeHeroName)}
                imageUrl={activeHeroMainImagePath}
                onClickAction={() => router.push(activeHeroRoute)}
                likeAction={() => console.log("hero liked ")}
                shareAction={() => console.log("hero shared ")}
                isSmallSize={true}
                isSelected={false}
              />
            </div>
          );
      })}
    </div>
  )
}

export default HeroesPanel;