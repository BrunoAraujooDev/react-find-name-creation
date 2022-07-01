import React, { useState, useEffect } from 'react';
import './search.css';
import {
  getNameOrigin,
  getNamesOrigin,
} from '../../services/nationality.service.js';
import Nationality from '../nationality/nationality';
import { validName, validDuplication } from '../../utils/validations.js';

const Search = () => {
  const [result, setResult] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [valid, setValid] = useState(true);
  const [message, setMessage] = useState('');

  const getNameAndValidate = () => {
    let name = inputValue.split(' ');
    console.log(name);
    console.log(name.length);

    if (name.length > 10) {
      setValid(false);
      setMessage('The max number of names per request is 10 at once!');
    } else {
      let resp = validDuplication(name);

      let validationName = validName(resp);

      setValid(validationName.valid);
      setMessage(validationName.message);

      valid && requestOrigin(name);
    }
  };

  const requestOrigin = async (name) => {
    if (name.length > 1) {
      const resp = await getNamesOrigin(name);
      setResult(resp);
    } else {
      await getNameOrigin(name).then((resp) => setResult(resp));
    }
  };

  useEffect(() => {}, [valid, result]);

  return (
    <>
      <div id="div-search">
        <input
          type="text"
          placeholder="Type here..."
          id="input-search"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          type="button"
          id="btn-search"
          disabled={inputValue.length < 2}
          onClick={() => getNameAndValidate()}
        >
          Search
        </button>
      </div>
      {!valid && <p className="p-search"> {message} </p>}
      {result && valid ? <Nationality result={result} /> : ''}
    </>
  );
};

export default Search;
