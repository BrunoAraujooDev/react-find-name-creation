export const findNames = (newNames, formerNames) => {
  let equals = [];

  for (let i = 0; i < newNames.length; i++) {
    for (let j = 0; i < formerNames.length; j++) {
      if (newNames[i] === formerNames[j]) {
        equals.push(true);
        break;
      }
    }
  }

  const isEqual = equals.length === formerNames.length && equals !== [];

  return isEqual;
};
