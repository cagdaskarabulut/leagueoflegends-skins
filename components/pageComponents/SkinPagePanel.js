import { useState, useEffect } from "react";
import styles from "./SkinPagePanel.module.scss";
import React from "react";
import SkinCardItemList from "../toolComponents/SkinCardItemList";
import HeroDetailInfos from "../reusableComponents/HeroDetailInfos";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";

const SkinPagePanel = ({ heroDetailsObject, skinVideo, activePath }) => {
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [iframeWidth, setIframeWidth] = useState("400");

  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
      setIframeWidth("400");
    } else {
      let result = innerWidth < MOBILE_SCREEN_SIZE;
      setIsMobile(result);
      setIframeWidth(result ? "200" : "400");
    }

    
  }, [innerWidth]);

  return (
    <div className={styles.SkinPagePanelContainerStyle}>
      {skinVideo != undefined &&  skinVideo.videoUrl.length>0 && (
        <iframe
          width="100%"
          height={iframeWidth}
          src={skinVideo.videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}

{skinVideo == undefined || skinVideo.videoUrl.length<1 && (
  <>
  <br />
  <h3 style={{textAlign:"center"}}>Sorry, there is no uploaded video yet...</h3>
  <br />
  </>
)}

      <HeroDetailInfos heroDetailsObject={heroDetailsObject} />

      <SkinCardItemList
        skinList={heroDetailsObject.skins}
        heroDetailsObject={heroDetailsObject}
        activeRoute={activePath}
      />
    </div>
  );
};

export default SkinPagePanel;
