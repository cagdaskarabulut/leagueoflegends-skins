import { useState, useEffect } from "react";
import styles from "./SkinPagePanel.module.scss";
import React from "react";
import SkinCardItemList from "../toolComponents/SkinCardItemList";
import HeroDetailInfos from "../reusableComponents/HeroDetailInfos";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import Link from '@mui/material/Link';
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";

const SkinPagePanel = ({ heroDetailsObject, skinVideo, activePath }) => {
  const router = useRouter();
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
      <div className={styles.SkinPageHeaderStyle}>
      <Grid
        spacing={2}
        container
        direction="row"
        justifyContent="start"
        alignItems="start"
        columns={12}
      >
        <Grid item xs={12}>
          <Button variant="text" startIcon={<ArrowBackIcon />} style={{color:"#02539D"}}
          onClick={() => router.push("/")}>
          Back to champions list
          </Button>
        </Grid>
      </Grid>
      
      


      </div>
      
      {skinVideo != undefined &&  skinVideo.videoUrl.length>0 && (
        <iframe
          width="100%"
          height={iframeWidth}
          // src={skinVideo.videoUrl+"&autoplay=1"}
          src={`https://www.youtube.com/embed/${skinVideo.videoUrl}?autoplay=1`}
          // src={`https://www.youtube.com/embed/${skinVideo.videoUrl}?enablejsapi=1&autoplay=1&origin=http://www.leagueoflegends-skins.com`}
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
