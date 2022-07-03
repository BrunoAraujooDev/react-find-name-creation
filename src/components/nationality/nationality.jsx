import React, { useState, useEffect } from 'react';
import getCountries from '../../utils/getCountries';

import './nationality.css';

const Nationality = ({ result, goto = false }) => {
  const [loading, setLoading] = useState(goto);
  const [countries, setCountries] = useState(goto);

  const CreateList = () => {
    if (result.data) {
      return (
        <ul className="ul-nationality ">
          {result.data.map((item, i) => {
            let countryId = item.country[0]?.country_id;
            let resp =
              item.country[0] !== undefined ? getCountries(countryId) : '';

            return (
              <li key={i} className="li-nationality">
                <img
                  src={
                    resp !== ''
                      ? `https://countryflagsapi.com/png/${countryId}`
                      : 'https://static.wikia.nocookie.net/althistory/images/b/b0/No_flag.svg/revision/latest?cb=20070617053419'
                  }
                  alt={resp !== '' ? `${countryId} flag` : 'No flag'}
                  className="img-nationality"
                />
                <h1>
                  <span className="span-nationality">Country:</span>{' '}
                  {resp !== '' ? resp : 'Not Found'}
                </h1>
                <h3>
                  <span className="span-nationality">Name requested: </span>
                  {result.data[i]?.name}
                </h3>
              </li>
            );
          })}
        </ul>
      );
    } else {
      let countryId = result.country[0]?.country_id;

      let country = countryId !== undefined ? getCountries(countryId) : '';

      return (
        <ul className="ul-nationality">
          <li className="li-nationality">
            <img
              src={
                country !== ''
                  ? `https://countryflagsapi.com/png/${countryId}`
                  : 'https://static.wikia.nocookie.net/althistory/images/b/b0/No_flag.svg/revision/latest?cb=20070617053419'
              }
              alt={country !== '' ? `${countryId} flag` : 'No flag'}
              className="img-nationality"
            />
            <h1>
              <span className="span-nationality">Country:</span>{' '}
              {country !== '' ? country : 'Not Found'}
            </h1>
            <h3>
              <span className="span-nationality">Name requested: </span>
              {result.name}
            </h3>
          </li>
        </ul>
      );
    }
  };

  return (
    <>
      {loading && (
        <section id="section-nationality">
          <CreateList />
        </section>
      )}
    </>
  );
};

export default Nationality;
