export const replaceSpaceToDash = (myString) => {
  myString = myString.replace(/ /g, '-');
  return myString;
};

export const replaceDashToSpace = (myString) => {
  myString = myString.replace(/-/g, ' ');
  return myString;
};