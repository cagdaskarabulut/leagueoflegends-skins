import styles from "./HeaderMobile.module.scss";
import { useRouter } from "next/navigation";
import {
  Autocomplete,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { wait } from "/utils/CommonUtils";
import { Backdrop, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyGrid from "../toolComponents/MyGrid";
import { Permanent_Marker } from "@next/font/google";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeaderMobile({ allSkinsList, middleContent }) {
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowSearchBox, setIsShowSearchBox] = useState(false);
  const [logoTitle, setLogoTitle] = useState("");
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
      setIsShowSearchBox(true);
      setLogoTitle("");
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
      setIsShowSearchBox(!(innerWidth < MOBILE_SCREEN_SIZE));
      setLogoTitle(
        innerWidth < MOBILE_SCREEN_SIZE ? "LS" : "LeagueofLegends-Skins"
      );
    }
  }, [innerWidth]);

  async function selectAction(event, newValue) {
    setIsLoading(true);
    let selectedSkin = null;
    allSkinsList?.map((option) =>
      option.searchField?.toLowerCase() == newValue?.toLowerCase()
        ? (selectedSkin = option)
        : ""
    );
    if (selectedSkin !== null) {
      router.push("/" + selectedSkin.newPageUrl);
    }
    await wait(200);
    setIsLoading(false);
  }

  return (
    <div className={styles.PanelContainerStyle}>
      <Container className={styles.header} maxWidth={100}>
        <MyGrid
          forHeader={true}
          leftContent={
            <>
              <h1
                className={permanentMarker.className}
                style={{ marginTop: "5px" }}
              >
                <a className={styles.logoStyle} href="/">
                  {logoTitle}
                </a>
              </h1>
            </>
          }
          middleContent={
            <div style={{ height: "35px", marginTop: "15px" }}>
              {middleContent}
            </div>
          }
          rightContent={
            <>
              <div className={styles.SearchBoxStyle}>
                <IconButton
                  aria-label="delete"
                  size="large"
                  style={{
                    fontSize: "24px",
                    marginRight: "9px",
                    // marginTop: "8px",
                    height: "35px",
                    marginTop: "12px",
                    color: "black",
                    display: isShowSearchBox ? "none" : "",
                    float: "right",
                  }}
                >
                  <SearchIcon
                    fontSize="inherit"
                    onClick={() => setIsShowSearchBox(true)}
                  />
                </IconButton>

                <Autocomplete
                  style={{
                    opacity: !isShowSearchBox ? 0 : 1,
                    transition: "opacity .3s ease-in-out",
                    animation: "ease-in-out",
                    display: !isShowSearchBox ? "none" : "",
                    height: "35px",
                    marginTop: "10px",
                  }}
                  id="free-solo-demo"
                  freeSolo
                  onChange={(event, newValue) => selectAction(event, newValue)}
                  multiple={false}
                  fullWidth={true}
                  clearOnBlur={true}
                  options={allSkinsList?.map((option) => option.searchField)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search hero or skin"
                      size="small"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>
            </>
          }
        />

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          {/* <CircularProgress color="inherit" /> */}
          <div className={styles.fullScreenLoader}></div>
        </Backdrop>
      </Container>
    </div>
  );
}
