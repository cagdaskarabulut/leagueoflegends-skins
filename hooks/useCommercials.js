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
    "https://fas.st/nNRGb", // Yuplay - ELDEN RING (EMEA)
    "https://fas.st/RUepLT", // Yuplay - God of War Ragnarök
    "https://fas.st/4WPf9X", // Yuplay - Rockstar Games
    "https://fas.st/A5p-Gb", // Yuplay - Frostpunk 2
  ];

  const altCommercialForUs = [
    "Yuplay - ELDEN RING (EMEA)",
    "Yuplay - God of War Ragnarök",
    "Yuplay - Rockstar Games",
    "Yuplay - Frostpunk 2",
  ];

  const imageCommercialForUs = [
    "/images/elden_ring.jpeg",
    "/images/godofwar_ragnarok.jpeg",
    "/images/rockstar.jpeg",
    "/images/frostpunk2.jpeg",
  ];

  const mobileImageCommercialForUs = [
    "/images/elden_ring-horizontal.jpeg",
    "/images/godofwar_ragnarok-horizontal.jpeg",
    "/images/rockstar-horizontal.jpeg",
    "/images/frostpunk2.jpeg",
  ];

  const linkCommercialForRussia = [
    "https://fas.st/PHCVi?erid=LatgC2Zh5",
    "https://fas.st/bH7Xe?erid=LatgC2Zh5",
    "https://fas.st/kJHtFx?erid=LatgC2Zh5",
    "https://fas.st/MlUVH?erid=LatgC2Zh5",
  ];

  const altCommercialForRussia = [
    "GamersBase - RoboCop",
    "GamersBase - Gangs of Sherwood",
    "GamersBase - TT Isle Of Man",
    "GamersBase - Warhammer",
  ];

  const imageCommercialForRussia = [
    "/images/robocop.jpeg",
    "/images/sherwood.jpeg",
    "/images/tt3.jpeg",
    "/images/warhammer.jpeg",
  ];

  const mobileImageCommercialForRussia = [
    "/images/robocop-horizontal.jpeg",
    "/images/sherwood_horizontal.jpeg",
    "/images/tt3_horizontal.jpeg",
    "/images/warhammer.jpeg",
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
