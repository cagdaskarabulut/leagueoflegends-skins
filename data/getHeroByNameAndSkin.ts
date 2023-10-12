import { readFileSync } from "fs";
import path from "path";
import { Hero } from "./Hero";

export function getHeroByNameAndSkin(name: string, skin: string): Hero | undefined {
  const dbDirectory = path.join(process.cwd(), "data", "db.json");
  const jsonStr = readFileSync(dbDirectory).toString();
  const fileContents = JSON.parse(jsonStr) as Hero[];
  // const hero = fileContents.find((p) => {p.name.toLowerCase() === name.toLowerCase()});

  let hero;
  
  fileContents.find((p) => {
    if(p.name.toLowerCase() === name.toLowerCase()){
      p.skins.find(s => {
        if(s.skin === skin){
          p.activeSkin = s.skin
          p.activeImageUrl = s.imageUrl;
          p.activeVideoUrl = s.videoUrl;
          hero = p;
        }
      })
    }
  });

  return hero;
}
