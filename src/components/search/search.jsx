import React, { useState } from 'react';
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
  const [message, setMessage] = useState([]);

  const getNameAndValidate = () => {
    let name = inputValue.split(' ');
    let resp = validDuplication(name);

    if (resp.length > 10 || resp.length === 0) {
      setValid(true);
      setMessage('The max number of names per request is 10 at once!');
    } else {
      let validationName = validName(resp);

      setValid(validationName.valid);
      setMessage(validationName.message);

      !validationName.valid && requestOrigin(resp);
    }

    message && setResult('');
  };

  const requestOrigin = async (name) => {
    if (name.length > 1) {
      const resp = await getNamesOrigin(name);
      setResult(resp);
    } else {
      await getNameOrigin(name).then((resp) => setResult(resp));
    }
  };

  return (
    <>
      <div id="div-search" className="slideIn">
        <input
          type="text"
          placeholder="Type your name here..."
          id="input-search"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          type="button"
          id="btn-search"
          onClick={() => getNameAndValidate()}
        >
          Search
        </button>
      </div>
      {valid && typeof message !== 'string' ? (
        message.map((item, i) => {
          return (
            <p className="p-search" key={i}>
              {' '}
              {item}{' '}
            </p>
          );
        })
      ) : (
        <p className="p-search"> {message} </p>
      )}
      {result && <Nationality result={result} goto={true} />}
    </>
  );
};

export default Search;
