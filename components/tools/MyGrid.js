import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import styles from "./MyGrid.module.scss";

//- Tek kolon varsa sadece "leftContent" girilir.
//- Kolon tam ekran olacaksa  "isOneFullContent: true" yapılır. Bu seçim yapılmazsa normalde ekranın yarısını kaplarken mobilde tamamını kaplar.
//- ContentPosition default değeri start, örneğin footer da center gönderilir
const MyGrid = ({
  breadcrumbs,
  title,
  leftContent,
  middleContent,
  rightContent,
  isOneFullContent,
  contentPosition,
}) => {
  //_ MobilePart
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
  }, [innerWidth]);

  contentPosition = contentPosition ? contentPosition : "start";

  return (
    <div>
      {breadcrumbs}
      {title != "" && <h2 className={styles.titleStyle}>{title}</h2>}
      <Grid
        spacing={2}
        container
        direction="row"
        justifyContent={contentPosition}
        alignItems={contentPosition}
        columns={12}
      >
        {isOneFullContent && (
          <Grid item xs={12}>
            {leftContent}
          </Grid>
        )}
        {!isOneFullContent && !middleContent && (
          <>
            <Grid item xs={isMobile ? 12 : 8}>
              {leftContent}
            </Grid>
            <Grid item xs={isMobile ? 12 : 8}>
              {rightContent}
            </Grid>
          </>
        )}
        {!isOneFullContent && middleContent && (
          <>
            <Grid item xs={isMobile ? 12 : 2}>
              {leftContent}
            </Grid>
            <Grid item xs={isMobile ? 12 : 8}>
              {middleContent}
            </Grid>
            <Grid item xs={isMobile ? 12 : 2}>
              {rightContent}
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default MyGrid;
