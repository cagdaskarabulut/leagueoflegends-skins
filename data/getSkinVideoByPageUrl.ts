import { readFileSync } from "fs";
import path from "path";
import { SkinVideo } from "./SkinVideo";
import { SkinBigImage } from "./SkinBigImage";

export function getSkinVideoByOldPageUrl(pageUrl: string): SkinVideo | undefined {
  const dbDirectory = path.join(process.cwd(), "data", "my_skin_video_db.json");
  const jsonStr = readFileSync(dbDirectory).toString();
  const fileContentsData = JSON.parse(jsonStr);
  const fileContents = Object.values(fileContentsData.data) as SkinVideo[];
  const skinVideoObject = fileContents.find((p) => p.pageUrl.toLowerCase() === pageUrl.toLowerCase());
  return skinVideoObject;
}

export function getSkinVideoByPageUrl(newPageUrl: string): SkinVideo | undefined {
  const dbDirectory = path.join(process.cwd(), "data", "my_skin_video_db_ForSkinsBigImages.json");
  const jsonStr = readFileSync(dbDirectory).toString();
  const fileContentsData = JSON.parse(jsonStr);
  const fileContents = Object.values(fileContentsData.data) as SkinBigImage[];
  let skinBigImageObject = fileContents.find((p) => p.newPageUrl.toLowerCase() === newPageUrl.toLowerCase());

  const dbDirectory2 = path.join(process.cwd(), "data", "my_skin_video_db.json");
  const jsonStr2 = readFileSync(dbDirectory2).toString();
  const fileContentsData2 = JSON.parse(jsonStr2);
  const fileContents2 = Object.values(fileContentsData2.data) as SkinVideo[];
  let skinVideoObject = fileContents2.find((p) => p.pageUrl.toLowerCase() === skinBigImageObject?.pageUrl.toLowerCase());

  if(skinVideoObject === undefined){
    skinVideoObject = getSkinVideoByOldPageUrl(newPageUrl);
  }
  return skinVideoObject;
}