export const isListContainsObjectByChampion = (list, champion) => {
  const item = list.find((element) => element.champion == champion);
  return item ? true : false;
};

export const findObjectByChampion = (list, champion) => {
  if (isListContainsObjectByChampion(list, champion)) {
    return list.find((element) => element.champion == champion);
  } else {
    return "";
  }
};