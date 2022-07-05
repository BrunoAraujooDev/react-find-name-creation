export const findNames = (newNames, formerNames) => {
  let difNames = [];

  difNames = newNames.filter((item) => formerNames.indexOf(item) === -1);

  return difNames;
};
