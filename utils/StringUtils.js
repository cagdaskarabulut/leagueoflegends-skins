export const replaceStringForUrlFormat = (myString) => {
  myString = myString.replace(/ /g, "-");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.replace(/\//g, "");
  myString = myString.replace(/&/g, "");
  myString = myString.replace("(", "");
  myString = myString.replace(")", "");
  myString = myString.replace(/ó/g, "o");
  myString = myString.replace(/,/g, "");
  // myString = myString.toLowerCase();
  return myString;
};

export const oldReplaceStringForUrlFormat = (myString) => {
  myString = myString.replace(/ /g, "");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.replace(/\//g, "");
  myString = myString.replace(/&/g, "");
  myString = myString.replace("(", "");
  myString = myString.replace(")", "");
  myString = myString.replace(/ó/g, "o");
  myString = myString.replace(/,/g, "");
  // myString = myString.toLowerCase();
  return myString;
};

export const capitalizeFirstChar = (myString) => {
  return myString.charAt(0).toUpperCase() + myString.slice(1);
};