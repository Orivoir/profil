import React from 'react';

import BuildImage from './../../../images/build.png';

import './Building.css';

const Building = ({message}) => {
  return (
    <section className="building">

      <figure>
        <img
          src={BuildImage}
          alt="build"
          width="256"
          height="256"
        />
        <figcaption>
          {message}
        </figcaption>
      </figure>

    </section>
  );
};

export default Building;