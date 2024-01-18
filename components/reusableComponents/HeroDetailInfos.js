import { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
} from "@mui/material";
import DialogItem from "../toolComponents/DialogItem";
import styles from "./HeroDetailInfos.module.scss";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";

const HeroDetailInfos = ({ heroDetailsObject, skinBigImageObject, pageContent }) => {
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
  }, [innerWidth]);
  return (
    <div className={styles.HeroDetailInfosContainerStyle}>
      
      {/* <div className={styles.HeaderStyle}>
        {heroDetailsObject?.name != skinBigImageObject?.skinName && (
          <h2>
            {heroDetailsObject.name} - {skinBigImageObject.skinName}
          </h2>
        )}
        {heroDetailsObject?.name === skinBigImageObject?.skinName && (
          <h1>{heroDetailsObject.name}</h1>
        )}
      </div> */}

      {/* <h3 className={styles.HeaderStyle}>
        {heroDetailsObject.title + " "}(
        {heroDetailsObject.tags
          .filter((item) => {
            return item;
          })
          .join(", ")}
        )
      </h3> */}

      
      
      {pageContent && (
          <div dangerouslySetInnerHTML={ {__html: pageContent} } /> 
        )
      }

    {!pageContent && (
      <>
      <h4>About:</h4>
      {heroDetailsObject?.name != skinBigImageObject?.skinName && (
        <>
          <p>
            League of Legends is an exciting online multiplayer battle arena
            (MOBA) game that has captivated millions of players worldwide. The
            fact that each hero has their own page on the website you've
            developed is an impressive detail. On this page, we will focus on
            one of the standout heroes, {skinBigImageObject.skinName} which is a skin of {heroDetailsObject.name}.
          </p>
          <p>
            {heroDetailsObject.name} stands out in the League of Legends universe with unique
            abilities and a formidable presence. Maintaining popularity among
            players due to its strategic importance in the game and impressive
            role in team battles, {heroDetailsObject.name} is a force to be reckoned with. On this
            page, you can gain insights into {heroDetailsObject.name}'s strengths, weaknesses, and
            how to play effectively.
          </p>
          <p>
            However, we won't limit ourselves to just game strategies. Our
            website also delves into the rich stories of each hero. Players can
            discover {heroDetailsObject.name}'s backstory, the challenges faced, and the
            significant role played in the League of Legends universe.
          </p>
          <p>
            Additionally, you'll see how each hero stands out with different
            costumes on our site. {heroDetailsObject.name}'s various costumes not only showcase a
            sense of style on the battlefield but also demonstrate the
            character's evolution and integration with different themes. On the
            hero pages, you'll find visuals for each unique costume and even
            costume videos.
          </p>
          <p>
            Our site, offering rich content for League of Legends enthusiasts,
            allows players to get to know their favorite heroes better and
            deepen their gaming experiences. Filled with information about
            {heroDetailsObject.name} and other heroes, along with unique stories and a variety of
            costume options, this site will further amplify the passion for the
            League of Legends universe.
          </p>
        </>
      )}
      {heroDetailsObject?.name === skinBigImageObject?.skinName && (
        <p>
          Welcome to the {heroDetailsObject.name} skins library page! On this
          page we have organised every single {heroDetailsObject.name} skin for
          your viewing pleasure. To find out more information about a specific{" "}
          {heroDetailsObject.name} skin, simply click the skin image for a
          detailed overview including in related skin images and related skin
          videos. Our skin pages are full of information including the skin
          showcase and skin details. You can also get information about stories and tips about selected hero.
          Brush up on your League of Legends
          knowledge with our detailed {heroDetailsObject.name} skins reviews
          including high definition pictures and spotlight videos.
        </p>
      )}
      <br />
      </>
      )
      }
      
      <br />
      <h4 style={{color: "#d34600"}}>Lore:</h4>
      <p>{heroDetailsObject.lore}</p>
      <br />
      <h4 style={{color: "#d34600"}}>Ally tips:</h4>
      <p>
        {heroDetailsObject.allytips
          .filter((item) => {
            return item;
          })
          .join(" ")}
      </p>
      <br />
      <h4 style={{color: "#d34600"}}>Enemy tips:</h4>
      <p>{heroDetailsObject.enemytips}</p>
      <br />

      {/* {!isMobile && (
        <Grid spacing={2} container direction="row" columns={12}>
          <Grid item xs={3}></Grid>
          <Grid item xs={2} style={{ textAlign: "right" }}>
            <DialogItem
              buttonLabel="Lore"
              title="Lore"
              content={heroDetailsObject.lore}
            />
          </Grid>
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <DialogItem
              buttonLabel="Ally tips"
              title="Ally tips"
              content={heroDetailsObject.allytips
                .filter((item) => {
                  return item;
                })
                .join(" ")}
            />
          </Grid>
          <Grid item xs={2} style={{ textAlign: "left" }}>
            <DialogItem
              buttonLabel="Enemy tips"
              title="Enemy tips"
              content={heroDetailsObject.enemytips
                .filter((item) => {
                  return item;
                })
                .join(" ")}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      )}

      {isMobile && (
        <Grid container direction="row" columns={12}>
          <Grid item xs={4} style={{ textAlign: "right" }}>
            <DialogItem
              buttonLabel="Lore"
              title="Lore"
              content={heroDetailsObject.lore}
            />
          </Grid>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <DialogItem
              buttonLabel="Ally tips"
              title="Ally tips"
              content={heroDetailsObject.allytips
                .filter((item) => {
                  return item;
                })
                .join(" ")}
            />
          </Grid>
          <Grid item xs={4} style={{ textAlign: "left" }}>
            <DialogItem
              buttonLabel="Enemy tips"
              title="Enemy tips"
              content={heroDetailsObject.enemytips
                .filter((item) => {
                  return item;
                })
                .join(" ")}
            />
          </Grid>
        </Grid>
      )} */}
    </div>
  );
};

export default HeroDetailInfos;
