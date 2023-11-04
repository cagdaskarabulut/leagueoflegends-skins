import { useState, useEffect } from "react";
import styles from "./SearchPanel.module.scss";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";

const SearchPanel = ({ heroDetailsObject }) => {
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
    <div className={styles.SearchPanelContainerStyle}>
      {/* <TextField id="outlined-basic" label="Search in champions and skins" variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
           className={styles.SearchBoxStyle} /> */}
    </div>
  );
};

export default SearchPanel;
