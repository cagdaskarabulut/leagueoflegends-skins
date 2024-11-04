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

// Utility function to replace spaces with hyphens
export const replaceSpacesWithHyphens = (myString) => {
  myString = myString.replace(/'/g, "");
  return myString.replace(/\s+/g, "-");
};

export const capitalizeFirstChar = (myString) => {
  return myString.charAt(0).toUpperCase() + myString.slice(1);
};
