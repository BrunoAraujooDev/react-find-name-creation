export const validName = (name) => {
  const regex = /[^a-záàâãéèêíïóôõöúçñ]/;
  let isValid = [];
  let message = [];
  let valid;

  for (let i = 0; i < name.length; i++) {
    let validation = name[i].match(regex) !== null ? true : false;
    isValid.push(validation);

    if (isValid[i]) {
      message.push(
        `${name[i]} is not a valid name. Please insert names without digits  or special characters.`
      );
    }
  }

  valid = isValid.some((item) => item === true);

  return {
    valid,
    message: message,
  };
};

export const validDuplication = (value) => {
  let data = [...new Set(value)];
  data = data.filter((item) => item);

  return data;
};
