import nationalities from '../../db.json';

const getCountries = (code) => {
  let data = {};

  for (let i = 0; i < nationalities.length; i++) {
    if (nationalities[i].code === code) {
      data = nationalities[i];
      break;
    }
  }

  return data.name;
};

export default getCountries;
