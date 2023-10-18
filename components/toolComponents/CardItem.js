import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import ImageViewerManuel from "./ImageViewerManuel";
import styles from "./CardItem.module.scss";
import ButtonBase from "@material-ui/core/ButtonBase";

const CardItem = ({
  title,
  description,
  imageAlt,
  imageUrl,
  onClickAction,
  likeAction,
  shareAction,
  isSmallSize,
  isSelected,
}) => {
  isSmallSize = isSmallSize == undefined ? false : isSmallSize;
  isSelected = isSelected == undefined ? false : isSelected;
  let activeWidth = isSmallSize ? 75 : 200;
  let displayMode = isSmallSize ? "none" : "";
  let containerStyle = isSmallSize
    ? (isSelected
      ? styles.CardItemSmallSelectedStyle
      : styles.CardItemSmallStyle)
    : (isSelected
    ? styles.CardItemSelectedStyle
    : styles.CardItemStyle);
  return (
    <div className={containerStyle}>
      {console.log(containerStyle)}
      {console.log(isSmallSize)}
      {console.log(isSelected)}
      <Card sx={{ width: activeWidth }}>
        {/* <Card> */}
        <ButtonBase
          onClick={() => onClickAction()}
          className={styles.ButtonBaseStyle}
        >
          <div className={styles.ImageStyle}>
            <ImageViewerManuel
              imageName={imageAlt}
              imagePath={imageUrl}
              isSmallSize={isSmallSize}
              // isSelected={isSelected}
              width={activeWidth}
            />
          </div>
        </ButtonBase>

        <ButtonBase
          style={{ width: "100%" }}
          onClick={() => onClickAction()}
          className={styles.ButtonBaseStyle}
        >
          <CardContent>
            <h5>{title}</h5>
            <p className={styles.descriptionStyle}>
              {description && <>{description}</>}
            </p>
          </CardContent>
        </ButtonBase>

        <CardActions disableSpacing style={{ display: displayMode }}>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              likeAction();
            }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label="share"
            onClick={() => {
              shareAction();
            }}
          >
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardItem;
