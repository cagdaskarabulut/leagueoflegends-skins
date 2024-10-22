import React from "react";
import HeroesPanel from "../reusableComponents/HeroesPanel";
import styles from "./HomePagePanel.module.scss";
import HeaderMobile from "../mainComponents/HeaderMobile";
import FooterPanel from "../mainComponents/FooterPanel";
import MyGrid from "../toolComponents/MyGrid";
import { Analytics } from "@vercel/analytics/react";
import { Button, Link } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import useCommercials from "../../hooks/useCommercials";

const HomePagePanel = ({ allSkinsList }) => {
  const { commercials, isMobile } = useCommercials();

  const HeaderField = () => {
    if (isMobile) {
      return (
        <>
          <HeaderMobile
            allSkinsList={allSkinsList}
            middleContent={
              <>
                <Button
                  variant="text"
                  startIcon={<ArticleIcon />}
                  onClick={() => router.push("/about")}
                  style={{
                    color: "black",
                    fontSize: "12px",
                    paddingTop: "0px",
                    marginTop: "0px",
                    paddingLeft: "0px",
                    marginLeft: "10px",
                  }}
                >
                  About
                </Button>
              </>
            }
          />
          <Link href={commercials[0].link} passHref target="_blank">
            <img
              src={commercials[0].mobileImage}
              alt={commercials[0].alt}
              className={styles.fixedImage} // fixed class is applied here
            />
          </Link>
        </>
      );
    } else {
      return <HeaderMobile allSkinsList={allSkinsList} />;
    }
  };

  // const LeftField = () => {
  //   // Google Ads
  //   return (
  //     <>
  //       <div className={styles.PanelContainerStyle}>
  //         <div className={styles.HomePageInfoStyle}>
  //           <h2>
  //             League of Legends: A Deep Dive into the Immersive World of Battle,
  //             Strategy, and Community
  //           </h2>
  //           <p>
  //             Welcome to the extraordinary universe of League of Legends, a
  //             revolutionary online multiplayer battle arena game meticulously
  //             crafted by Riot Games. Since its inaugural release in 2009, this
  //             iconic adventure has undergone continuous evolution, captivating
  //             the hearts and minds of millions of players globally. Transcending
  //             the boundaries of conventional gaming, League of Legends has
  //             ascended to the status of a cultural phenomenon, leaving an
  //             indelible mark on the landscape of competitive gaming.
  //           </p>

  //           <h2>Game Dynamics and Strategic Nuances</h2>
  //           <p>
  //             At the core of League of Legends lies the intricate dance of 5v5
  //             team-based battles, where each player assumes control of a
  //             strategically positioned champion on the battlefield. The game
  //             dynamics are akin to a symphony, incorporating elements such as
  //             map awareness, champion selection, team coordination, and
  //             strategic decision-making. This amalgamation creates a dynamic
  //             learning curve, fostering a sense of competitiveness that
  //             resonates throughout the expansive and passionate gaming
  //             community.
  //           </p>
  //           <p>
  //             Our entry page serves as an immersive guide to the multifaceted
  //             gameplay dynamics of League of Legends. Through comprehensive
  //             discussions on topics ranging from map utilization and team
  //             strategies to the intricacies of champion selection, we aim to
  //             provide newcomers with a profound understanding of the game's
  //             essence and experienced players with nuanced insights to further
  //             elevate their strategic prowess.
  //           </p>

  //           <h2>
  //             League of Legends Universe: A Tapestry of Rich Lore and Character
  //             Narratives
  //           </h2>
  //           <p>
  //             Beyond the enthralling gameplay, League of Legends distinguishes
  //             itself through the profound lore and intricate backstories woven
  //             into its fabric. Each champion in the game possesses a unique
  //             tale, a rich history, and a motivation, contributing to the depth
  //             and complexity of the League of Legends universe. This narrative
  //             richness serves to forge emotional connections between players and
  //             the champions they choose to embody, creating an immersive
  //             experience unlike any other.
  //           </p>
  //           <p>
  //             Our entry page stands as a gateway to the expansive and intricate
  //             League of Legends universe. Characters hailing from diverse
  //             regions, races, and cultures contribute to the narrative tapestry,
  //             ensuring a rich and diverse gaming experience. By delving into the
  //             backstories of these champions, we aim to pull players into the
  //             game on a visceral level, encouraging a more profound and personal
  //             interaction with the characters that populate this captivating
  //             world.
  //           </p>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  const LeftField = () => {
    return (
      <>
        <div
          className={styles.PanelContainerStyle}
          style={{ marginTop: "30px" }}
        >
          <div className={styles.HomePageInfoStyle}>
            {commercials.slice(0, 2).map((commercial, index) => (
              <Link key={index} href={commercial.link} passHref target="_blank">
                <img
                  src={commercial.image}
                  alt={commercial.alt}
                  style={{
                    width: "100%", // Genişlik tamamen dolsun
                    height: "40vh", // Sayfa yüksekliğinin %40'ı
                    objectFit: "cover", // Resmin orantılı şekilde kesilmesini sağlar
                    marginTop: "30px",
                    borderRadius: "10px",
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  };

  const RightField = () => {
    return (
      <>
        <div
          className={styles.PanelContainerStyle}
          style={{ marginTop: "30px" }}
        >
          <div className={styles.HomePageInfoStyle}>
            {commercials.slice(2, 4).map((commercial, index) => (
              <Link key={index} href={commercial.link} passHref target="_blank">
                <img
                  src={commercial.image}
                  alt={commercial.alt}
                  style={{
                    width: "100%", // Genişlik tamamen dolsun
                    height: "40vh", // Sayfa yüksekliğinin %40'ı
                    objectFit: "cover", // Resmin orantılı şekilde kesilmesini sağlar
                    marginTop: "30px",
                    borderRadius: "10px",
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  };

  // const RightField = () => {
  //   // Google Ads
  //   return (
  //     <>
  //       <div className={styles.PanelContainerStyle}>
  //         <div className={styles.HomePageInfoStyle}>
  //           <h2>Champion Skins and the Art of Personalization</h2>
  //           <p>
  //             A hallmark feature of League of Legends is the plethora of skins
  //             available for each champion, providing players with the means to
  //             personalize their in-game avatars. Whether acquired through
  //             in-game achievements or real-world currency, each skin not only
  //             alters a champion's appearance but also serves as a visual
  //             testament to their evolution and transformation throughout the
  //             game.
  //           </p>
  //           <p>
  //             Our entry page embarks on a thorough exploration of the diverse
  //             world of champion skins, shedding light on their aesthetic
  //             contributions to the game. By empowering players to select skins
  //             aligned with their gameplay style and personal preferences, we aim
  //             to enhance the overall gaming experience. Accompanying costume
  //             videos further amplify this customization experience, showcasing
  //             the visual evolution and transformation of champions through their
  //             skins, turning each match into a visually stunning spectacle.
  //           </p>

  //           <h2>
  //             League of Legends Community: A Tapestry of Diversity and
  //             Competition
  //           </h2>
  //           <p>
  //             League of Legends is not merely a game; it is a vibrant global
  //             community where players participate in diverse tournaments,
  //             events, and leagues, elevating the competitive aspect of the
  //             gameplay. This spirit of competition not only fosters camaraderie
  //             among players but also reinforces the social dimension of the
  //             game.
  //           </p>
  //           <p>
  //             Our entry page seeks to illuminate the dynamic nature of the
  //             League of Legends community and the myriad ways in which players
  //             interact with each other. Detailed discussions on league systems,
  //             ranking matches, and tournaments provide insights into the
  //             competitive facets of the game, allowing players to immerse
  //             themselves fully in the excitement of competition. Community
  //             events and sharing platforms are also emphasized, encouraging
  //             players to forge connections beyond the virtual battlefield.
  //           </p>

  //           <h2>The Future of League of Legends: Innovation and Evolution</h2>
  //           <p>
  //             League of Legends is not a static entity; it is a living,
  //             breathing game that continues to evolve through regular updates
  //             and expansions. The developers at Riot Games prioritize player
  //             feedback, ensuring that the game continually improves and adapts
  //             to the ever-changing landscape of the gaming industry. Our entry
  //             page serves as a compass, offering glimpses into the future plans
  //             of the game and the anticipated updates that will keep players
  //             enthralled with the evolving content.
  //           </p>

  //           <h2>In Conclusion: An Invitation to an Unforgettable Journey</h2>
  //           <p>
  //             League of Legends stands as a testament to the power of gaming to
  //             transcend mere entertainment and become a cultural phenomenon.
  //             Through its impact on competitive gaming and the creation of a
  //             vibrant global community, League of Legends invites players into a
  //             world of strategic depth and narrative richness. The entry page on
  //             our website is not merely an introduction; it's an invitation to
  //             embark on an unforgettable journey. By covering every aspect of
  //             the League of Legends experience – from gameplay dynamics to
  //             character stories, customization options, community engagement,
  //             and future updates – we aim to provide a holistic guide for those
  //             seeking to explore the depths of this epic game. Join us on this
  //             unparalleled adventure, and let the magic of League of Legends
  //             unfold before you, turning each game into a chapter in an epic
  //             tale of strategy, competition, and camaraderie!
  //           </p>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <div className={styles.ContainerPageContainerStyle}>
        <div className={styles.HeaderStyle}>
          <HeaderField />
        </div>
        <div className={styles.ContentStyle}>
          {!isMobile && (
            <MyGrid
              leftContent={<LeftField />}
              middleContent={<HeroesPanel />}
              rightContent={<RightField />}
              isSideContentsFixed={true}
            />
          )}
          {isMobile && (
            <div style={{ marginTop: "100px" }}>
              <MyGrid isOneFullContent leftContent={<HeroesPanel />} />
            </div>
          )}
        </div>
        {commercials[1] && (
          <FooterPanel
            commercialUrl={commercials[1]?.link}
            commercialImage={commercials[1]?.image}
            commercialAlt={commercials[1]?.alt}
          />
        )}

        <Analytics />
      </div>
    </>
  );
};

export default HomePagePanel;
