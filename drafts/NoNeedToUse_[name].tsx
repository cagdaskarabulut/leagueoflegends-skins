import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { getHeroByName } from "../data/getHeroByName";
import { Hero } from "../data/Hero";

type HeroPageProps = {
  hero: Hero;
};

const HeroPage = (props: HeroPageProps) => {
  //- show basic(first) image and video 
  return (
    <div>
      HeroPage
      <h1>{props.hero?.name}</h1>
      <div>
        {props.hero?.skins?.map((skinObject) => {
          return <p key={props.hero?.name+"-"+skinObject.skin}>{skinObject.skin}</p>
        })}
      </div>
    </div>
  );
};

export default HeroPage;

export const getServerSideProps: GetServerSideProps<HeroPageProps> = async (
  ctx
) => {
  const name = ctx.params?.name as string;
  
  const hero = getHeroByName(name) ?? null;
  if (!hero) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      hero,
    },
  };
};
