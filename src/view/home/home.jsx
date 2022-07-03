import React, { useState } from 'react';
import './home.css';
import Search from '../../components/search/search.jsx';
import Info from '../../components/info/info';
import arrow from '../../assets/right-arrow.png';

const Home = () => {
  const [slide, setSlide] = useState(true);

  const changeView = () => {
    setSlide(!slide);
  };

  return (
    <main id="main-home">
      {slide ? (
        <Info slide={slide}>
          <div className="arrow-div-info" onClick={changeView}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/271/271226.png"
              alt="Arrow pointing to the right"
            />
          </div>
        </Info>
      ) : (
        <Search />
      )}
    </main>
  );
};

export default Home;
