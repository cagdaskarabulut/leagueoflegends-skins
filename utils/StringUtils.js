// export const replaceSpaceToDash = (myString) => {
//   myString = myString.replace(/ /g, '-');
//   return myString;
// };

// export const replaceDashToSpace = (myString) => {
//   myString = myString.replace(/-/g, ' ');
//   return myString;
// };

function replaceStringForUrlFormat(myString) {
  myString = myString.replace(/ /g, "");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.toLowerCase();
  return myString;
}
