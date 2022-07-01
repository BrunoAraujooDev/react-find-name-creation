import React, { useState, useEffect } from 'react';
import getCountries from '../../utils/getCountries';

import './nationality.css';

const Nationality = ({ result, goto = false }) => {
  const [loading, setLoading] = useState(goto);
  const [countries, setCountries] = useState(goto);

  useEffect(() => {
    let resp = getCountries(result.country[0].country_id);
    setCountries(resp);
  }, [loading, countries]);

  return (
    <>
      <section id="section-nationality">
        <img
          src={`https://countryflagsapi.com/png/${result.country[0].country_id}`}
          alt={`${result.country[0].country_id} flag  `}
          className="img-nationality"
        />
        <h1> {countries}</h1>
      </section>
    </>
  );
};

export default Nationality;
