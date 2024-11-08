import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import {
  Autocomplete,
  Chip,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { wait } from "/utils/CommonUtils";
import { Backdrop, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyGrid from "../toolComponents/MyGrid";
import { Permanent_Marker } from "@next/font/google";
const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Header({ allSkinsList }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
          isOneFullContent
          leftContent={
            <>
              <h1 className={permanentMarker.className}>
                <a className={styles.logoStyle} href="/">
                  LeagueofLegends-Skins
                </a>
              </h1>
            </>
          }
        />
        <MyGrid
          isOneFullContent
          leftContent={
            <div className={styles.SearchBoxStyle}>
              <Autocomplete
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
