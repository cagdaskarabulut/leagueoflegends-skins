import styles from "./FooterPanel.module.scss";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import MyGrid from "../toolComponents/MyGrid";
import Link from "next/link";
import useCommercials from "../../hooks/useCommercials";
// import useAdClick from "../../hooks/useAdClick";

const FooterPanel = ({ commercialUrl, commercialImage, commercialAlt }) => {
  const { commercials, isMobile } = useCommercials();
  // const handleAdClick = useAdClick();

  const LeftContent = () => {
    return (
      <div className={styles.PanelContainerStyle}>
        <div className={styles.footerContentStyle}>
          © Copyright 2023 leagueoflegends-skins.com
          {isMobile ? " " : <br />}
          Designed by Karabulut Software.
        </div>
      </div>
    );
  };

  return (
    <>
      {isMobile && (
        <Link
          href={commercials[1].link}
          passHref
          target="_blank"
          onClick={handleAdClick}
        >
          <img
            src={commercials[1].mobileImage}
            alt={commercials[1].alt}
            className={styles.fixedImage}
          />
        </Link>
      )}
      <div className={styles.footerStyle}>
        <MyGrid leftContent={<LeftContent />} isOneFullContent={true} />
      </div>
    </>
  );
};

export default FooterPanel;
