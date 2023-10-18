import React from "react";
import CardItem from "./CardItem";
import { replaceStringForUrlFormat } from "../../utils/StringUtils";
import styles from "./SkinCardItemList.module.scss";
import { useRouter } from "next/navigation";

const SkinCardItemList = ({ skinList, heroDetailsObject, activeRoute }) => {
  const router = useRouter();
  let URL_imageRootPath =
    "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";
  return (
    <div className={styles.CardListContainerStyle}>
      {skinList?.map((skin, index) => {
        let skinNum = skin.num;
        let skinName = skin.name;
        let heroId = heroDetailsObject.id;
        let heroName = heroDetailsObject.name;
        let skinKey = heroId + "_" + skinNum;
        let skinImagePath = URL_imageRootPath + skinKey + ".jpg";
        let activeHeroRoute =
          replaceStringForUrlFormat(heroId) +
          "/" +
          replaceStringForUrlFormat(skinName);
        return (
          <div key={skinKey} className={styles.CardContainerStyle}>
            {console.log("activeHeroRoute , activeRoute : "  + activeHeroRoute +" / " +activeRoute)}
            <CardItem
              title={skinName}
              imageAlt={replaceStringForUrlFormat(skinName)}
              imageUrl={skinImagePath}
              onClickAction={() => router.push("/" + activeHeroRoute)}
              likeAction={() => console.log("skin liked ")}
              shareAction={() => console.log("skin shared ")}
              isSelected={activeHeroRoute == activeRoute}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SkinCardItemList;
