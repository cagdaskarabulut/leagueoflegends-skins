import React from "react";
import { useState, useEffect } from "react";
import CardItem from "./CardItem";
import { replaceStringForUrlFormat } from "../../utils/StringUtils";
import styles from "./SkinCardItemList.module.scss";
import { useRouter } from "next/navigation";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import { Backdrop, CircularProgress } from "@mui/material";
import { wait } from "../../utils/CommonUtils";

const SkinCardItemList = ({ skinList, heroDetailsObject, activeRoute, isMobile }) => {
  const router = useRouter();
  let URL_imageRootPath =
    "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/";
  const { innerWidth } = useWindowSize();
  // const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (innerWidth === null) {
  //     setIsMobile(false);
  //   } else {
  //     setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
  //   }
  // }, [innerWidth]);

  async function cardClickAction(activeHeroRoute) {
    setIsLoading(true);
    router.push("/" + activeHeroRoute);
    await wait(300);
    setIsLoading(false);
  }

  return (
    <div className={styles.CardListContainerStyle}>
      {skinList?.map((skin, index) => {
        let skinNum = skin.num;
        let skinName = skin.name;
        let heroId = heroDetailsObject.id;
        let skinKey = heroId + "_" + skinNum;
        let skinImagePath = URL_imageRootPath + skinKey + ".jpg";
        let activeHeroRoute =
          replaceStringForUrlFormat(heroDetailsObject.name) +
          "/" +
          replaceStringForUrlFormat(skinName);
        return (
          <div key={skinKey} className={styles.CardContainerStyle}>
            <CardItem
              title={skinName.toLowerCase() == "default" ? "Classic (default)" : skinName}
              imageAlt={replaceStringForUrlFormat(skinName)}
              imageUrl={skinImagePath}
              onClickAction={() => cardClickAction(activeHeroRoute)}
              isSelected={
                activeHeroRoute.toLowerCase() == activeRoute.toLowerCase()
              }
              isSmallSize={isMobile}
            />
          </div>
        );
      })}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default SkinCardItemList;
