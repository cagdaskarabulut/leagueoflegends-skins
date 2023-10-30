import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import DialogItem from "../toolComponents/DialogItem";
import styles from "./HeroDetailInfos.module.scss";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";

const HeroDetailInfos = ({ heroDetailsObject }) => {
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
      <h1 className={styles.HeaderStyle}>{heroDetailsObject.name}</h1>
      <h2 className={styles.HeaderStyle}>
        {heroDetailsObject.title + " "}(
        {heroDetailsObject.tags
          .filter((item) => {
            return item;
          })
          .join(", ")}
        )
      </h2>

      {!isMobile && (
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
      )}

    </div>
  );
};

export default HeroDetailInfos;
