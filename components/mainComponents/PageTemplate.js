import styles from "./PageTemplate.module.scss";
import Header from "./Header";
import { useCallback, useContext, useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import FooterPanel from "../mainComponents/FooterPanel";
import MyGrid from "../toolComponents/MyGrid";

//- Açılış sayfası , Hizmetlerimiz sayfası
const PageTemplate = ({ content }) => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  //_ Update when page resolution changes
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE ? true : false);
    }
  }, [innerWidth]);

  const HeaderField = () => {
    if (isMobile) {
      return <Header />;
    } else {
      return <Header />;
    }
  };

  const LeftField = () => {
    return (
      <div className={styles.GoogleAdsPanelStyle}>
        {/* <h3>Google Ads</h3> */}
      </div>
    );
  };

  const RightField = () => {
    return (
      <div className={styles.GoogleAdsPanelStyle}>
        {/* <h3>Google Ads</h3> */}
      </div>
    );
  };

  return (
    <div className={styles.BodyStyle}>
      <div className={styles.HeaderStyle}>
        <HeaderField />
      </div>
      <div className={styles.ContentStyle}>
        <MyGrid
          leftContent={<LeftField />}
          middleContent={content}
          rightContent={<RightField />}
        />
      </div>
      <div className={styles.FooterStyle}>
        <FooterPanel />
      </div>
      <style jsx global>{`
        body {
          margin: 0 !important;
          padding: 0 !important;
          font-family: 'Times New Roman' !important;
          font-size: 14px !important;
        }
      `}</style>
    </div>

    
  );
};

export default PageTemplate;
