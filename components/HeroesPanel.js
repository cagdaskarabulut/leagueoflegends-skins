import styles from "./FooterPanel.module.scss";
import React from "react";
import { useEffect, useState } from "react";
import { getHeroByName } from "../data/getHeroByName";
import ImageViewerCloud from "./tools/ImageViewerCloud";
import { replaceDashToSpace, replaceSpaceToDash } from "@/utils/StringUtils";

const HeroesPanel = ({ heroList }) => {

  return (
    <div>
      {heroList &&
        heroList.lenght > 0 &&
        heroList?.map((heroObject, index) => {
          let key = Object.keys(heroObject)[0];
          return (
            <div>
              <div key={key}>
                <h1>{heroObject[key]}</h1>
                <h1>{key}</h1>
              </div>
              ;
              {/* <p key={"p_" + heroObject.name}>{heroObject.name}</p>
              <ImageViewerCloud imageName={replaceSpaceToDash(heroObject.name)} imagePath={heroObject?.skins[0].imageUrl} /> */}
            </div>
          );
        })}
    </div>
  );
};

export default HeroesPanel;
