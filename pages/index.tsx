import React, { useEffect, useState } from "react";
import MetaPanel from "../components/MetaPanel";
import PageTemplate from "../components/PageTemplate";
import MyGrid from "../components/tools/MyGrid";
import MyBreadcrumbs from "../components/tools/MyBreadcrumbs";
import { Hero } from "../data/Hero";
import { getHeroes } from "../data/getHeroes";
import { GetServerSideProps } from "next";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { storage } from "../utils/firebase";
import {
  replaceDashToSpace,
  replaceSpaceToDash,
} from "../utils/StringUtils";
import HeroesPanel from "../components/HeroesPanel";

//_en başta nesnenin kendi skin i olacak sonra skin listesi dömdürülüp
type HomePageProps = {
  heroes: Hero[];
};

const HomePage = (props: HomePageProps) => {
  // return (
  //   <div>
  //     <h1>test</h1>
  //     <h1>{props.heroes[0].name}</h1>
  //     <HeroesPanel heroList={props.heroes}/>
  //   </div>
  // );

  const InnerContent = () => {
    
    return (
      <>
        <HeroesPanel heroList={props.heroes}/>
      </>
    );
  }

  const PageContent = () => {
    return (
      <MyGrid
        breadcrumbs={
          <MyBreadcrumbs
            link1Title="League of Legends Skins"
            link1Href="/"
            activePageNumber="1"
          />
        }
        leftContent={<InnerContent />}
        isOneFullContent
      />
    );
  };

  return (
    <>
      <MetaPanel
        title="League of Legends Skin Database"
        descriptionContent="League of Legends Champions Skin and Costume Database"
        keywordsContent="lol, League of Legends, leagueoflegends, skin, skins, League of Legends skins, League of Legends skins,League of Legends costumes, lol skins, lol skin, lol costumes"
        imagePath="/images/lol-skins_icon.png"
        imageAlt="league-of-legends-skins"
      />
      <PageTemplate content={<PageContent />} />
    </>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  ctx
) => {
  const heroes = getHeroes();
  return {
    props: {
      heroes,
    },
  };
};

