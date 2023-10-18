import { useState, useEffect } from "react";
import styles from "./SkinPagePanel.module.scss";
import React from "react";
import SkinCardItemList from "../toolComponents/SkinCardItemList";

const SkinPagePanel = ({ heroDetailsObject, skinVideo, activePath}) => {

  return (
    <div className={styles.SkinPagePanelContainerStyle}>
      {skinVideo && (
        <iframe
          width="100%"
          height="400"
          src={skinVideo.videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}

      <div>
        <h1 className={styles.HeaderStyle}>{heroDetailsObject.name}</h1>
        <h2 className={styles.HeaderStyle}>{heroDetailsObject.title + " "}
          (
          {heroDetailsObject.tags
            .filter((item) => {
              return item;
            })
            .join(", ")}
            )
            </h2>
        <h3>Lore: {heroDetailsObject.lore}</h3>
        <h3>Ally tips : {heroDetailsObject.allytips
            .filter((item) => {
              return item;
            })
            .join(" ")}</h3>
             <h3>Enemy tips : {heroDetailsObject.enemytips
            .filter((item) => {
              return item;
            })
            .join(" ")}</h3>
      </div>

      <h2></h2>

      <SkinCardItemList
        skinList={heroDetailsObject.skins}
        heroDetailsObject={heroDetailsObject}
        activeRoute={activePath}
      />
    </div>
  );
};

export default SkinPagePanel;
