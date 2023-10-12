import styles from "./PageTemplate.module.scss";
import Header from "./Header";
import MenuPanel from "./MenuPanel";
import { useCallback, useContext, useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import FooterPanel from "@/components/FooterPanel";
import MyGrid from "./tools/MyGrid";
import MyBreadcrumbs from "@/components/tools/MyBreadcrumbs";

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
      <>
        <h3>Google Reklam</h3>
      </>
    );
  };

  const RightField = () => {
    return (
      <>
        <h3>Google Reklam</h3>
      </>
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
    </div>
  );
};

export default PageTemplate;
