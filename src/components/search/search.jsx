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
const dataNames = [];

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

      if (
        (compareArray.length > 0 || names.length > 1) &&
        !validationName.valid
      ) {
        let data = [];

        dataNames.filter((item) => {
          if (resp.indexOf(item.name) !== -1) {
            data.push(item);
          }
        });

        let validation = validDuplication(data);

        if (compareArray.length > 0) {
          await requestNewNames(compareArray).then((item) => {
            if (compareArray.length < 2) {
              setResult([...validation, item]);
              dataNames.push(item);
            } else {
              setResult([...validation, ...item]);
              dataNames.push(...item);
            }
          });
        } else {
          setResult([...validation]);
        }
        names.push(...resp);
      }

      if (
        !validationName.valid &&
        compareArray.length == 0 &&
        names.length < 1
      ) {
        let response = await requestNewNames(resp);
        response instanceof Array
          ? dataNames.push(...response)
          : dataNames.push(response);
        setResult(response);
        names.push(...resp);
      }
    }
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
