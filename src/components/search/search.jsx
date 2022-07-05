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

  const getNameAndValidate = async () => {
    let name = inputValue.split(' ');
    let resp = validDuplication(name);
    let validationName;
    let compareArray = [];

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

      if (names.length > 0) {
        compareArray = findNames(resp, names);
      }

      if (compareArray.length > 0 && !validationName.valid) {
        let data = [];

        for (let i = 0; i < compareArray.length; i++) {
          if (result instanceof Array) {
            result.filter((item) => {
              if (
                compareArray.indexOf(item.name) == -1 &&
                resp.includes(item.name)
              ) {
                data.push(item);
              }
            });
          } else {
            compareArray.indexOf(result.name) == -1 &&
              resp.includes(result.name) &&
              data.push(result);
          }
        }

        let validation = validDuplication(data);

        await requestNewNames(compareArray).then((item) => {
          compareArray.length < 2
            ? setResult([...validation, item])
            : setResult([...validation, ...item]);
        });
        names = resp;
      }

      if (!validationName.valid && compareArray.length == 0) {
        let response = await requestNewNames(resp);
        setResult(response);
        names = resp;
      }
    }

    message.length > 0 && setResult('');
  };

  const requestNewNames = async (name) => {
    if (name.length > 1) {
      try {
        let response = await getNamesOrigin(name);
        return response.data;
      } catch (e) {
        (e) => setMessage(e.error);
      }
    } else {
      try {
        let resolve = await getNameOrigin(name);
        return resolve;
      } catch (e) {
        (e) => setMessage(e.error);
      }
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
