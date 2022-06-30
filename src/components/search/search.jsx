import React from 'react';
import './search.css';
import { getNameOrigin } from '../../services/nationality.service.js';

const Search = () => {
  const getName = async () => {
    let name = document.getElementById('input-search').value;
    console.log(name);

    const result = await getNameOrigin(name);

    console.log(result);
  };

  return (
    <div id="div-search">
      <input type="text" placeholder="Type here..." id="input-search" />
      <button type="button" id="btn-search" onClick={(e) => getName()}>
        Search
      </button>
    </div>
  );
};

export default Search;
