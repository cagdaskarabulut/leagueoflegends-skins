import { readFileSync } from "fs";
import path from "path";
import { SkinBigImage } from "./SkinBigImage";

export function getBigImageUrlByPageUrl(pageUrl: string): SkinBigImage | undefined {
  const dbDirectory = path.join(process.cwd(), "data", "my_skin_video_db_ForSkinsBigImages.json");
  const jsonStr = readFileSync(dbDirectory).toString();
  const fileContentsData = JSON.parse(jsonStr);
  const fileContents = Object.values(fileContentsData.data) as SkinBigImage[];
  let skinBigImageObject = fileContents.find((p) => p.newPageUrl.toLowerCase() === pageUrl.toLowerCase());
  if(skinBigImageObject === undefined || skinBigImageObject === null) {
    skinBigImageObject = fileContents.find((p) => p.pageUrl.toLowerCase() === pageUrl.toLowerCase());
  }
  return skinBigImageObject;
}
