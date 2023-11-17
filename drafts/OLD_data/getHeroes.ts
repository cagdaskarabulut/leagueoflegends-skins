import { readFileSync } from "fs";
import path from "path";
import { Hero } from "./Hero";

export function getHeroes(): Hero[] | undefined {
  const dbDirectory = path.join(process.cwd(), "data", "db.json");
  const jsonStr = readFileSync(dbDirectory).toString();
  const fileContents = JSON.parse(jsonStr) as Hero[];
  return fileContents;
}

