import React from 'react';
import './info.css';

const Info = ({ children }) => {
  return (
    <section className="info-section">
      <div className="container-div">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3300/3300148.png"
          alt="A person thinking"
          className="info-img-thinkig"
        />
        <div className="info-div">
          <h3>
            Have you ever had the curiosity to find out where did your name came
            from?
          </h3>
          <p>Now, it's time to satisfy your curiosity!</p>
          <p>Click on arrow and discover the origin of your name!</p>
          <p>Have fun!</p>
        </div>
      </div>

      {children}
    </section>
  );
};

export default Info;
