import { useState, useEffect } from "react";
import styles from "./SkinPagePanel.module.scss";
import SkinCardItemList from "../toolComponents/SkinCardItemList";
import HeroDetailInfos from "../reusableComponents/HeroDetailInfos";
import useWindowSize from "@rooks/use-window-size";
import { useRouter } from "next/navigation";
import HeaderMobile from "../mainComponents/HeaderMobile";
import {
  MOBILE_SCREEN_SIZE,
  HUGE_SCREEN_SIZE,
} from "../../constants/GeneralConstants";
import FooterPanel from "../mainComponents/FooterPanel";
import MyGrid from "../toolComponents/MyGrid";
import { Analytics } from "@vercel/analytics/react";
import { Permanent_Marker } from "@next/font/google";
import { Button, Grid } from "@mui/material";
import DialogItem from "../toolComponents/DialogItem";
import BackgroundImage from "../reusableComponents/BackgroundImage";
import Image from "next/image";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "@mui/material";
import useCommercials from "../../hooks/useCommercials";
// import useAdClick from "../../hooks/useAdClick";
const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

const SkinPagePanel = ({
  heroDetailsObject,
  skinVideo,
  activePath,
  splashFullPath,
  skinBigImageObject,
  allSkinsList,
  pageContent,
}) => {
  const { commercials, isMobile } = useCommercials();
  const router = useRouter();
  const { innerWidth } = useWindowSize();
  const [iframeWidth, setIframeWidth] = useState("800");
  const [iframeHeight, setIframeHeight] = useState("400");
  // const handleAdClick = useAdClick();

  useEffect(() => {
    if (innerWidth === null) {
      setIframeWidth("800");
      setIframeHeight("400");
    } else {
      let result = innerWidth < MOBILE_SCREEN_SIZE;
      setIframeWidth(result ? "350" : "800");
      setIframeHeight(result ? "200" : "400");
    }
  }, [innerWidth]);

  const LeftField = () => {
    return (
      <div className={styles.PanelContainerStyle}>
        <HeroDetailInfos
          heroDetailsObject={heroDetailsObject}
          skinBigImageObject={skinBigImageObject}
          pageContent={pageContent}
        />
      </div>
    );
  };

  const RightField = () => {
    return (
      <div className={styles.PanelContainerStyle} style={{ marginTop: "0px" }}>
        <SkinCardItemList
          skinList={heroDetailsObject.skins}
          heroDetailsObject={heroDetailsObject}
          activeRoute={activePath}
          isMobile={isMobile}
        />
      </div>
    );
  };

  const LeftCommercials = () => {
    if (!isMobile && commercials.length > 0 && commercials[0]) {
      return (
        <Link
          href={commercials[0].link}
          passHref
          target="_blank"
          onClick={handleAdClick}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                textAlign: "center",
                position: "absolute",
                zIndex: "99",
                color: "#D34500",
                fontSize: "20px",
                lineHeight: "1.5",
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Adds a semi-transparent background
                padding: "10px",
                borderRadius: "8px", // Optional: adds rounded corners to the background
              }}
            >
              WTFast <br />
              Eliminate Lag Faster <br />
              Ping Smoother Gaming
            </p>
            <img
              src={commercials[0].image}
              alt={commercials[0].alt}
              style={{ width: "100%" }}
            />
          </div>
        </Link>
      );
    }
    return null;
  };

  const RightCommercials = () => {
    if (!isMobile && commercials.length > 0 && commercials[1]) {
      return (
        <Link
          href={commercials[1].link}
          passHref
          target="_blank"
          onClick={handleAdClick}
        >
          <img
            src={commercials[1].image}
            alt={commercials[1].alt}
            style={{ width: "100%", height: "100%" }}
          />
        </Link>
      );
    }
    return null;
  };

  const VideoHeaderField = () => {
    return (
      <div>
        <MyGrid
          isOneFullContent
          leftContent={
            <div className={styles.VideoHeaderStyle}>
              {heroDetailsObject?.name != skinBigImageObject?.skinName && (
                <h1 className={permanentMarker.className}>
                  {heroDetailsObject.name} - {skinBigImageObject.skinName}
                </h1>
              )}
              {heroDetailsObject?.name === skinBigImageObject?.skinName && (
                <h1 className={permanentMarker.className}>
                  {heroDetailsObject.name}
                </h1>
              )}
            </div>
          }
        />
      </div>
    );
  };

  return (
    <>
      <BackgroundImage
        height="50vh"
        width="100vw"
        content={
          <>
            <div className={styles.IframeContainer}>
              {skinVideo != undefined && splashFullPath.length > 0 && (
                <Image
                  src={splashFullPath}
                  alt={heroDetailsObject.skinName}
                  key={"img_" + heroDetailsObject.skinName}
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </div>
          </>
        }
      />

      <div className={styles.ContainerPageContainerStyle}>
        <div className={styles.HeaderStyle}>
          {!isMobile && <HeaderMobile allSkinsList={allSkinsList} />}
          {isMobile && (
            <>
              <HeaderMobile
                allSkinsList={allSkinsList}
                middleContent={
                  <Button
                    variant="text"
                    endIcon={<ArticleIcon />}
                    href="#skin-info-section"
                    style={{
                      color: "black",
                      fontSize: "12px",
                      paddingTop: "0px",
                      marginTop: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    Read
                  </Button>
                }
              />
              <Link
                href={commercials[0].link}
                passHref
                target="_blank"
                onClick={handleAdClick}
              >
                <img
                  src={commercials[0].mobileImage}
                  alt={commercials[0].alt}
                  className={styles.fixedImage} // fixed class is applied here
                />
              </Link>
            </>
          )}
        </div>

        {/* VideoField */}
        {isMobile && (
          <MyGrid
            isOneFullContent
            leftContent={
              <div>
                <div
                  className={styles.PanelContainerStyle}
                  style={{ marginTop: "0px" }}
                >
                  <VideoHeaderField />
                  <div className={styles.VideoContainerStyle}>
                    <div className={styles.IframeContainer}>
                      {skinVideo != undefined &&
                        skinVideo.videoUrl.length > 0 && (
                          <iframe
                            width={iframeWidth}
                            height={iframeHeight}
                            src={`https://www.youtube.com/embed/${skinVideo.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${skinVideo.videoUrl}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        )}

                      {skinVideo == undefined ||
                        (skinVideo.videoUrl.length < 1 && (
                          <div>
                            <br />
                            <h3 style={{ textAlign: "center" }}>
                              Sorry, there is no uploaded video yet...
                            </h3>
                            <br />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        )}

        {!isMobile && (
          <MyGrid
            leftContent={<LeftCommercials />}
            rightContent={<RightCommercials />}
            middleContent={
              <div>
                <div
                  className={styles.PanelContainerStyle}
                  style={{ marginTop: "0px" }}
                >
                  <VideoHeaderField />
                  <div className={styles.VideoContainerStyle}>
                    <div className={styles.IframeContainer}>
                      {skinVideo != undefined &&
                        skinVideo.videoUrl.length > 0 && (
                          <iframe
                            width={iframeWidth}
                            height={iframeHeight}
                            src={`https://www.youtube.com/embed/${skinVideo.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${skinVideo.videoUrl}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        )}

                      {skinVideo == undefined ||
                        (skinVideo.videoUrl.length < 1 && (
                          <div>
                            <br />
                            <h3 style={{ textAlign: "center" }}>
                              Sorry, there is no uploaded video yet...
                            </h3>
                            <br />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        )}

        {!isMobile && (
          <MyGrid leftContent={<LeftField />} rightContent={<RightField />} />
        )}
        {isMobile && (
          <MyGrid
            leftContent={<RightField />}
            rightContent={
              <div id="skin-info-section">
                <LeftField />
              </div>
            }
          />
        )}
        <div className={styles.FooterStyle}>
          <FooterPanel />
        </div>
        <Analytics />
      </div>
    </>
  );
};

export default SkinPagePanel;
