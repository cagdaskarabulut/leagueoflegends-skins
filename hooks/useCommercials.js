import { useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";

// Commercial class for creating the commercial objects
class Commercial {
  constructor(image, mobileImage, link, alt) {
    this.image = image;
    this.mobileImage = mobileImage;
    this.link = link;
    this.alt = alt;
  }
}

const useCommercials = () => {
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [commercials, setCommercials] = useState([]);

  const linkCommercialForUs = [
    "https://lsuix.com/g/nzstwno2sa1e72dd2de0b0de1ddd64/?erid=LatgC2Zh5", // Gamersbase
    "https://fas.st/8Bk4x", // Yuplay
    "https://fas.st/nNRGb", // Yuplay - ELDEN RING (EMEA)
    "https://fas.st/RUepLT", // Yuplay - God of War Ragnarök
  ];

  const altCommercialForUs = [
    "GamersBase - Steam, Origin, and Uplay Games",
    "Yuplay - Buy Games With Best Prices",
    "Yuplay - ELDEN RING (EMEA)",
    "Yuplay - God of War Ragnarök",
  ];

  const imageCommercialForUs = [
    "/images/gamersbase.jpeg",
    "/images/yuplay.jpg",
    "/images/elden_ring.jpeg",
    "/images/godofwar_ragnarok.jpeg",
  ];

  const mobileImageCommercialForUs = [
    "/images/gamersbase-horizontal.jpeg",
    "/images/yuplay-horizontal.jpeg",
    "/images/elden_ring-horizontal.jpeg",
    "/images/godofwar_ragnarok-horizontal.jpeg",
    // "/images/rockstar-horizontal.jpeg",
    // "/images/frostpunk2.jpeg",
  ];

  const linkCommercialForRussia = [
    "https://lsuix.com/g/nzstwno2sa1e72dd2de0b0de1ddd64/?erid=LatgC2Zh5", //gamersbase.store
    "https://fas.st/a-di-?erid=LatgC2Zh5", //gamersbase
    "https://fas.st/PHCVi?erid=LatgC2Zh5",
    "https://fas.st/bH7Xe?erid=LatgC2Zh5",
  ];

  const altCommercialForRussia = [
    "GamersBase",
    "GamersBase",
    "GamersBase - Warhammer",
    "GamersBase - Gangs of Sherwood",
  ];

  const imageCommercialForRussia = [
    "/images/gamersbase.jpeg",
    "/images/gamersbase.jpeg",
    "/images/warhammer.jpeg",
    "/images/sherwood.jpeg",
  ];

  const mobileImageCommercialForRussia = [
    "/images/gamersbase-horizontal.jpeg",
    "/images/gamersbase-horizontal.jpeg",
    "/images/warhammer.jpeg",
    "/images/sherwood_horizontal.jpeg",
  ];

  // Handle screen size changes
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
  }, [innerWidth]);

  // Handle language and commercials data
  useEffect(() => {
    const userLanguage = navigator.language || navigator.userLanguage;

    let commercialsList = [];

    if (userLanguage.includes("ru")) {
      commercialsList = [
        new Commercial(
          imageCommercialForRussia[0],
          mobileImageCommercialForRussia[0],
          linkCommercialForRussia[0],
          altCommercialForRussia[0]
        ),
        new Commercial(
          imageCommercialForRussia[1],
          mobileImageCommercialForRussia[1],
          linkCommercialForRussia[1],
          altCommercialForRussia[1]
        ),
        new Commercial(
          imageCommercialForRussia[2],
          mobileImageCommercialForRussia[2],
          linkCommercialForRussia[2],
          altCommercialForRussia[2]
        ),
        new Commercial(
          imageCommercialForRussia[3],
          mobileImageCommercialForRussia[3],
          linkCommercialForRussia[3],
          altCommercialForRussia[3]
        ),
      ];
    } else {
      commercialsList = [
        new Commercial(
          imageCommercialForUs[0],
          mobileImageCommercialForUs[0],
          linkCommercialForUs[0],
          altCommercialForUs[0]
        ),
        new Commercial(
          imageCommercialForUs[1],
          mobileImageCommercialForUs[1],
          linkCommercialForUs[1],
          altCommercialForUs[1]
        ),
        new Commercial(
          imageCommercialForUs[2],
          mobileImageCommercialForUs[2],
          linkCommercialForUs[2],
          altCommercialForUs[2]
        ),
        new Commercial(
          imageCommercialForUs[3],
          mobileImageCommercialForUs[3],
          linkCommercialForUs[3],
          altCommercialForUs[3]
        ),
      ];
    }

    setCommercials(commercialsList);
  }, []);

  return { commercials, isMobile };
};

export default useCommercials;
