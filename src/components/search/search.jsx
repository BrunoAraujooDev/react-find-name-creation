import React, { useState } from 'react';
import './search.css';
import { getNameOrigin } from '../../services/nationality.service.js';
import Nationality from '../nationality/nationality';
import { validName, validDuplication } from '../../utils/validation.js';

const Search = () => {
  const [result, setResult] = useState('');
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState('');

  const getNameAndValidate = () => {
    let name = document.getElementById('input-search').value.split(' ');

    if (name.length > 10) {
      setValid(true);
      setMessage('The max number of names per request is 10 at once!');
    } else {
      setResult(validDuplication(name));

      let validationName = validName(result);

      setValid(validationName.valid);
      setMessage(validationName.message);
    }
  };

  const requestOrigin = async (name) => {
    await getNameOrigin(name.toLowerCase()).then((resp) => setResult(resp));
  };

  return (
    <>
      <div id="div-search">
        <input type="text" placeholder="Type here..." id="input-search" />
        <button
          type="button"
          id="btn-search"
          onClick={() => getNameAndValidate()}
        >
          Search
        </button>
      </div>
      ( valid &&
      <p class="p-search"> {message} </p>
      )
      <Nationality result={result} />
    </>
  );
};

export default Search;
