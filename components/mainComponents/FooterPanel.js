import styles from "./FooterPanel.module.scss";
import { Grid } from "@mui/material";
import React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import MyGrid from "../toolComponents/MyGrid";

const FooterPanel = () => {
  //_ MobilePart
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
  }, [innerWidth]);

  const LeftContent = () => {
    return (
      <>
        <div className={styles.PanelContainerStyle}>
          <div className={styles.footerContentStyle}>
            © Copyright 2023 leagueoflegends-skins.com
            {isMobile ? " " : <br />}
            Designed by Karabulut Software.
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.footerStyle}>
      <MyGrid leftContent={<LeftContent />} isOneFullContent={true} />
    </div>
  );
};

export default FooterPanel;
