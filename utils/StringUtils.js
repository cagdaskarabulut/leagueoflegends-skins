export const replaceStringForUrlFormat = (myString) => {
  myString = myString.replace(/ /g, "");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.replace(/\//g, "");
  myString = myString.replace(/&/g, "");
  myString = myString.replace("(", "");
  myString = myString.replace(")", "");
  myString = myString.toLowerCase();
  return myString;
};

export const capitalizeFirstChar = (myString) => {
  return myString.charAt(0).toUpperCase() + myString.slice(1);
};