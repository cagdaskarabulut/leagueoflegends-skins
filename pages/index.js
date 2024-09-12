import MetaPanel from "../components/mainComponents/MetaPanel";
import HomePagePanel from "../components/pageComponents/HomePagePanel";
import fsPromises from "fs/promises";
import path from "path";
import ScrollToTop from "../components/reusableComponents/ScrollToTopButton";
import { useState } from "react";

export const dynamicParams = true; // true | false,
export const revalidate = 3600; // 1 hour

export default function HomePage({ allSkinsList }) {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <MetaPanel
        title="League of Legends Skins - League of Legends Champion Skins Showcase: Stunning Skin Images and Skin Videos"
        descriptionContent="League of Legends Skins - Explore the little-known stories of all heroes and breathtaking world of League of Legends champion skins through our extensive collection of images and videos. Immerse yourself in the visual splendor of LoL champions as we showcase their incredible skins in action. From legendary to rare, discover the beauty and power of each skin in our curated galleries and videos."
        keywordsContent="lol skin, lol skins, League of Legends, champion skins, skin images, skin videos, lol skin videos, gaming aesthetics, champion customization, video game visuals, league of legends skin, league of legends skins, little-known stories of all heroes, how many rp, skin prices, skin rp"
        imagePath="/images/lol-skins-icon.ico"
        imageAlt="League of Legends Skins"
      />
      <HomePagePanel allSkinsList={allSkinsList} />
      <ScrollToTop showBelow={250} />

      {/* YouTube Video Popup */}
      {isPopupVisible && (
        <div className="video-popup">
          <div className="popup-content">
            <button className="close-button" onClick={handleClosePopup}>
              &times;
            </button>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/cdvkp-M87qQ?autoplay=1&mute=1&loop=1&playlist=cdvkp-M87qQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        body {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 14px !important;
          background-repeat: no-repeat;
          background-attachment: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100vh;
          background-size: cover;
          background-image: url("https://karabulut-storage.s3.amazonaws.com/leagueoflegends-skins/indexBackground1.jpg") !important;
        }

        .video-popup {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 300px;
          height: auto;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
        }

        .popup-content {
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 5px;
          right: 10px;
          background: transparent;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          z-index: 999;
        }

        .video-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%; /* 16:9 ratio */
          position: relative;
        }

        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        @media (max-width: 768px) {
          .video-popup {
            width: 250px;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const filePath2 = path.join(
    process.cwd(),
    "data",
    "my_skin_video_db_ForSkinsBigImages.json"
  );
  const jsonData2 = await fsPromises.readFile(filePath2);
  const objectDataListAll2 = JSON.parse(jsonData2);
  const allSkinsList = Object.values(objectDataListAll2.data);
  return {
    props: {
      allSkinsList,
    },
  };
}
