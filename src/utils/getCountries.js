import nationalities from '../../db.json';

const getCountries = (code) => {
  let data = nationalities.filter((country) => country.code === code);

  return data[0].name;
};

export default getCountries;
