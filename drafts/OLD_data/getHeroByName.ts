import { readFileSync } from "fs";
import path from "path";
import { Hero } from "./Hero";

export function getHeroByName(name: string): Hero | undefined {
  const dbDirectory = path.join(process.cwd(), "data", "my_skin_video_db.json");
  const jsonStr = readFileSync(dbDirectory).toString();
  const fileContents = JSON.parse(jsonStr) as Hero[];
  const hero = fileContents.find((p) => p.name.toLowerCase() === name.toLowerCase());
  return hero;
}
