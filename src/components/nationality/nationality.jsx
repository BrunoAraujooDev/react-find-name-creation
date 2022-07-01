import React, { useState, useEffect } from 'react';
import getCountries from '../../utils/getCountries';

import './nationality.css';

const Nationality = ({ result, goto = false }) => {
  const [loading, setLoading] = useState(goto);
  const [countries, setCountries] = useState('');

  const CreateList = () => {
    if (result.data) {
      return (
        <ul>
          {result.data.map((item, i) => {
            let resp = getCountries(item.country[0].country_id);

            return (
              <li key={i}>
                <img
                  src={`https://countryflagsapi.com/png/${item.country[0].country_id}`}
                  alt={`${item.country[0].country_id} flag  `}
                  className="img-nationality"
                />
                <h1>Country: {resp}</h1>
                <h3>Name requested: {result.data[i]?.name}</h3>
              </li>
            );
          })}
        </ul>
      );
    } else {
      let country = getCountries(result.country[0].country_id);
      return (
        <li>
          <img
            src={`https://countryflagsapi.com/png/${result.country[0].country_id}`}
            alt={`${result.country[0].country_id} flag  `}
            className="img-nationality"
          />
          <h1>Country: {country}</h1>
          <h3>Name requested: {result.name}</h3>
        </li>
      );
    }
  };

  return (
    <>
      <section id="section-nationality">
        <CreateList />
      </section>
    </>
  );
};

export default Nationality;
