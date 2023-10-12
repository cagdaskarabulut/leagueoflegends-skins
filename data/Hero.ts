export interface Skin {
  skin: string;
  imageUrl: string;
  videoUrl: string;
}

export interface Hero {//type
  name: string;
  description: string;
  activeSkin: string;
  activeImageUrl: string;
  activeVideoUrl: string;
  skins: Array<Skin>;
}
