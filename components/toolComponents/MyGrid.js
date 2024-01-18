import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import styles from "./MyGrid.module.scss";

//- Tek kolon varsa sadece "leftContent" girilir.
//- Kolon tam ekran olacaksa  "isOneFullContent: true" yapılır. Bu seçim yapılmazsa normalde ekranın yarısını kaplarken mobilde tamamını kaplar.
//- 2 kolon olacaksa sadece leftcontent ve rightcontent girilir.
//- ContentPosition default değeri start, örneğin footer da center gönderilir
const MyGrid = ({
  breadcrumbs,
  title,
  leftContent,
  middleContent,
  rightContent,
  isOneFullContent,
  contentPosition,
  forHeader
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
      {title != undefined && (<h2 className={styles.titleStyle}>{title}</h2>)}
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
            <Grid item xs={isMobile ? 12 : 5}>
              {leftContent}
            </Grid>
            <Grid item xs={isMobile ? 12 : 7} >
              {rightContent}
            </Grid>
          </>
        )}
        
        {!isOneFullContent && middleContent && (
          <>
            <Grid item xs={isMobile ? (forHeader ? 2 : 12) : (forHeader ? 5 : 3)}>
              {leftContent}
            </Grid>
            <Grid item xs={isMobile ? (forHeader ? 3 : 12) : (forHeader ? 2 : 6)}>
              {middleContent}
            </Grid>
            <Grid item xs={isMobile ? (forHeader ? 7 : 12) : (forHeader ? 5 : 3)}>
              {rightContent}
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default MyGrid;
