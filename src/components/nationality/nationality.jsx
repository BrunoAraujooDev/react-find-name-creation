import React, { useState, useEffect } from 'react';
import getCountries from '../../utils/getCountries';

import './nationality.css';

const Nationality = ({ result }) => {
  const CreateList = () => {
    if (result.length > 1) {
      return (
        <ul className="ul-nationality ">
          {result.map((item, i) => {
            let countryId = item.country[0]?.country_id;

            let resp =
              item.country[0] !== undefined ? getCountries(countryId) : '';

            return (
              <li key={i} className="li-nationality">
                <img
                  src={
                    resp !== ''
                      ? `https://countryflagsapi.com/png/${countryId}`
                      : 'https://medphoton.com.br/wp-content/themes/apexclinic/images/no-image/No-Image-Found-400x264.png'
                  }
                  alt={resp !== '' ? `${countryId} flag` : 'No flag'}
                  className="img-nationality"
                />
                <h1>
                  <span className="span-nationality">Country:</span>{' '}
                  {resp ? resp : 'Not Found'}
                </h1>
                <h3>
                  <span className="span-nationality">Name requested: </span>
                  {item.name.toLowerCase()}
                </h3>
              </li>
            );
          })}
        </ul>
      );
    } else {
      let countryId = (result[0] || result).country[0]?.country_id;

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
              {(result[0] || result).name.toLowerCase()}
            </h3>
          </li>
        </ul>
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
