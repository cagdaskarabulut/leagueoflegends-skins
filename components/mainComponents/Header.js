import styles from "./Header.module.scss";
import { Chip, Container, Grid, InputAdornment, TextField } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from '@mui/icons-material/Search';
// import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Header = ({}) => {

  return (
    <Container className={styles.header}>
      <Grid
        container
        columns={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <h1><a className={styles.logoStyle} href="/">League of Legends - Skins</a></h1>
        </Grid>
        <Grid item xs={6}>
          {/* <TextField id="outlined-basic" label="Search in champions and skins" variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
           className={styles.SearchBoxStyle} /> */}
        </Grid>
        <Grid item xs={3}>

        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
