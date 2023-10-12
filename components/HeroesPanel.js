import styles from "./FooterPanel.module.scss";
import React from "react";
import {useEffect, useState } from "react";
import { getHeroByName } from "../data/getHeroByName";
import ImageViewer from "./tools/ImageViewer";
import {
  replaceDashToSpace,
  replaceSpaceToDash,
} from "@/utils/StringUtils";

  const HeroesPanel = ({
    heroList,
  }) => {
  
  return (
    <div>
      {heroList?.map((heroObject) => {
          return (
            <div>
              <p key={"p_" + heroObject.name}>{heroObject.name}</p>
              <ImageViewer imageName={replaceSpaceToDash(heroObject.name)} imagePath={heroObject?.skins[0].imageUrl} />
            </div>
          );
        })
      }
    </div>
  );
};

export default HeroesPanel;
