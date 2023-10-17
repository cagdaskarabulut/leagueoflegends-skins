import { readFileSync } from "fs";
import path from "path";
import { SkinVideo } from "./SkinVideo";

export function getVideoUrlByPageUrl(pageUrl: string): string | undefined {
  const dbDirectory = path.join(process.cwd(), "data", "my_skin_video_db.json");
  const jsonStr = readFileSync(dbDirectory).toString();
  const fileContents = JSON.parse(jsonStr) as SkinVideo[];
  const skinVideoObject = fileContents.find((p) => p.pageUrl.toLowerCase() === pageUrl.toLowerCase());
  let result = skinVideoObject?.videoUrl;
  return result;
}
