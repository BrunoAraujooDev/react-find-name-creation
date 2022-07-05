import nationalities from '../../db.json';

const getCountries = (code) => {
  let data = {};

  try {
    for (let i = 0; i < nationalities.length; i++) {
      if (nationalities[i].code === code) {
        data = nationalities[i];
        break;
      }
    }

    return data.name;
  } catch (e) {
    console.error(e);
  }
};

export default getCountries;
