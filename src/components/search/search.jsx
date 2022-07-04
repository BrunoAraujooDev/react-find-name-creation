import React, { useState } from 'react';
import './search.css';
import {
  getNameOrigin,
  getNamesOrigin,
} from '../../services/nationality.service.js';
import Nationality from '../nationality/nationality';
import { validName, validDuplication } from '../../utils/validations.js';
import { findNames } from '../../utils/findNames.js';

let names = [];

const Search = () => {
  const [result, setResult] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [valid, setValid] = useState(true);
  const [message, setMessage] = useState([]);

  const getNameAndValidate = () => {
    let name = inputValue.split(' ');
    let resp = validDuplication(name);
    let validationName;
    let compareArray;

    if (resp.length > 10) {
      setValid(true);
      setMessage('The max number of names per request is 10 at once!');
    } else if (resp.length === 0) {
      setValid(true);
      setMessage('Please, write a name!');
    } else {
      validationName = validName(resp);
      setValid(validationName.valid);
      setMessage(validationName.message);

      compareArray = findNames(resp, names);

      if (
        !compareArray &&
        names.length !== resp.length &&
        names.length !== 0 &&
        validationName !== undefined &&
        result !== ''
      ) {
        setResult(() => {
          const data = result.filter((item, i) => item.name === resp[i]);
          return data;
        });
      }

      if (
        !validationName.valid &&
        compareArray &&
        names.length !== resp.length
      ) {
        requestOrigin(resp);
        names = resp;
      }
    }

    message.length > 0 && setResult('');
  };

  const requestOrigin = async (name) => {
    if (name.length > 1) {
      const resp = await getNamesOrigin(name);
      setResult(resp.data);
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
          disabled={inputValue.length < 1}
        >
          Search
        </button>
      </div>
      {valid && typeof message !== 'string' ? (
        message.map((item, i) => {
          return (
            <p className="p-search" key={i}>
              {item}
            </p>
          );
        })
      ) : (
        <p className="p-search"> {message} </p>
      )}
      {result && <Nationality result={result} />}
    </>
  );
};

export default Search;
