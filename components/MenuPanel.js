import styles from "./MenuPanel.module.scss";
import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

export default function Menu() {

  const router = useRouter();

  return (
    <Container
      className={styles.menuPanelStyle}
      disableGutters={true}
      maxWidth="xl"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between !important" ,
          marginTop: 2,
          marginBottom: 2,
          marginLeft: 10,
          marginRight: 10,
          width: "100%",
          button: {
            flex: "none",
          },
        }}
      >
        <Button href={"/"} 
        className={(router.pathname == "/" || router.pathname == "/")  ? styles.menuButtonStyleSelected : styles.menuButtonStyle}
        >
          Arabuluculuk
        </Button>
        <Button href={"/Sorular"} 
        className={router.pathname == "/Sorular" ? styles.menuButtonStyleSelected : styles.menuButtonStyle}
        >
          Sık sorulanlar
        </Button>
        <Button href={"/Hizmetler"} 
        className={router.pathname == "/Hizmetler" ? styles.menuButtonStyleSelected : styles.menuButtonStyle}>
          Hizmetlerimiz
        </Button>
        <Button href={"/UcretHesaplama"} 
        className={router.pathname == "/UcretHesaplama" ? styles.menuButtonStyleSelected : styles.menuButtonStyle}>
          Ücret hesaplama
        </Button>
        <Button href={"/Arabulucu"} 
        className={router.pathname == "/Arabulucu" ? styles.menuButtonStyleSelected : styles.menuButtonStyle}>
          Ben kimim
        </Button>
        <Button href={"/iletisim"} 
        className={router.pathname == "/iletisim" ? styles.menuButtonStyleSelected : styles.menuButtonStyle}>
          İletişim
        </Button>
      </Box>
    </Container>
  );
}
