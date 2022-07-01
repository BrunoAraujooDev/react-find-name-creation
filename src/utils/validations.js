export const validName = (name) => {
  const regex = /[^a-záàâãéèêíïóôõöúçñ]/;
  let isValid;
  let message = '';

  name.map((item) => {
    isValid = item.match(regex) ? false : true;

    if (isValid === false) {
      message = `${item} is not a valid name. Please insert names without digits  or special characters.`;
    }
  });

  return {
    valid: isValid,
    message: message,
  };
};

export const validDuplication = (value) => {
  const data = [...new Set(value)];

  return data;
};
