import styles from "./PageTemplate.module.scss";
import Header from "./Header";
import { useCallback, useContext, useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE, HUGE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import FooterPanel from "../mainComponents/FooterPanel";
import MyGrid from "../toolComponents/MyGrid";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
// import { Adsense } from "@ctrl/react-adsense";
import { Container, Grid } from "@mui/material";


//- Açılış sayfası , Hizmetlerimiz sayfası
const PageTemplate = ({ content }) => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [isHuge, setIsHuge] = useState(false);
  const [ contentSize, setContentSize] = useState("md");

  //_ Update when page resolution changes
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE ? true : false);
      setIsHuge(innerWidth > HUGE_SCREEN_SIZE ? true : false);
    }

    if(isHuge){
      setContentSize("lg");
      // console.log("lg");
    } else if(isMobile){
      setContentSize("xl");
      // console.log("xl");
    } else {
      setContentSize("md");
      // console.log("md");
    }
    
  }, [innerWidth]);

  useEffect(() => {
    // Google Ads
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);

  const HeaderField = () => {
    if (isMobile) {
      return <Header />;
    } else {
      return <Header />;
    }
  };

  const LeftField = () => {
    // Google Ads
    return (
      <div className={styles.GoogleAdsPanelStyle}>
        {/* <ins
          className="adsbygoogle"
          // style={{ display: 'block' }}
          data-ad-client="ca-pub-8764830534484668"
          data-ad-slot="9578340687"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins> */}
        <div id="yandex_rtb_R-A-3762197-3"></div>
          <script
          dangerouslySetInnerHTML={{
            __html: `
            window.yaContextCb.push(()=>{
              Ya.Context.AdvManager.render({
                "blockId": "R-A-3762197-3",
                "renderTo": "yandex_rtb_R-A-3762197-3"
              })
            })
              `,
          }}
        />
      </div>
    );
  };

  const RightField = () => {
    // Google Ads
    return (
      <div className={styles.GoogleAdsPanelStyle}>
        {/* <Adsense
          client="ca-pub-8764830534484668"
          slot="9840412171"
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
        /> */}
      </div>
    );
  };

  return (
    <div className={styles.BodyStyle}>
      {/* Google Analytics */}
      {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-R8TDC7FSGG" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-R8TDC7FSGG');
        `}
      </Script> */}
      
      

      {/* strategy="afterInteractive" */}

      <div className={styles.HeaderStyle}>
        <HeaderField />
      </div>
      <div className={styles.ContentStyle}>
        <MyGrid
          leftContent={<LeftField />}
          middleContent={content}
          rightContent={<RightField />}
        />
        
      {/* <Container maxWidth={contentSize} disableGutters={true}>
        {content}
      </Container> */}

      </div>
      <div className={styles.FooterStyle}>
        <FooterPanel />
      </div>
      <Analytics />
      <style jsx global>{`
        body {
          margin: 0 !important;
          padding: 0 !important;
          font-family: "Times New Roman" !important;
          font-size: 14px !important;
        }
      `}</style>

      
    </div>
  );
};

export default PageTemplate;
