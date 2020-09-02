import React, {useEffect, useState, useRef} from 'react';

import Building from './../../components/Building/Building.js';

import ProgressBar from './../../components/ProgressBar/ProgressBar.js';

import './Portfolio.css';

const INTERVAL_SLIDE = 5e3;

const Portfolio = ({api}) => {

  const [isPending, setIsPending] = useState( true );
  const [portfolios, setPortfolios] = useState( [] );
  const [current, setCurrent] = useState( 0 );
  const sliderID = useRef( null );
  const [isPause, setIsPause] = useState( false );

  const onNextSlide = () => {

    setCurrent( c => {

      if( c >= (portfolios.length-1) ) {

        return 0;
      } else {

        return c + 1;
      }

    } );

  };

  const onPreviousSlide = () => {

    setCurrent( c => {

      if( c > 0 ) {

        return c - 1;
      } else {

        return (portfolios.length - 1);
      }

    } );

  };

  useEffect( () => {

    if( !isPending && !sliderID.current ) {

      sliderID.current = setInterval(
        onNextSlide,
        INTERVAL_SLIDE
      );

    }

    if( isPending && !portfolios.length ) {

      api.portfolios()
      .then( data => {

        if( data.success ) {

          setPortfolios( data.portfolios );
        } else {

          console.warn( data );
        }

        setIsPending( false );
      } )
      .catch( error => {

        console.error( error );
      } );

    }

    return () => {
    };

  } );

  return (
    <section className="portfolio">
      {isPending ? (
        <>
          Loading ...
        </>
      ): (
        <>

        {portfolios.length > 0 ? (
          <div className="wrap-slider">
          <div className="wrap-slide">
            <button
              type="button"
              className="primary"
              onClick={() => {

                onPreviousSlide();
                clearInterval( sliderID.current );
                sliderID.current = setInterval(onNextSlide, INTERVAL_SLIDE);
              }}
            >
              <i className="fad fa-chevron-left"></i>
            </button>
          </div>

          <div className="wrap-slider-content">

            <div>
              <ProgressBar
                timeout={INTERVAL_SLIDE * (1 + (Math.random()/1000))}
                isPause={isPause}
                isInfinite={false}
                isReverse={true}
              />

              <ul className="list-portfolios">

              {portfolios.map( (item,key) => (
                <li
                  key={item.id}
                  className={`${key !== current ? "hide": ""}`}
                >
                  <section
                    className="portfolio-content"
                    // onMouseEnter={() => {
                    //   setIsPause( true )
                    // }}
                    // onMouseLeave={() => {
                    //   setIsPause( false )
                    // }}
                  >
                    <figure>
                      <img
                        className="image-portfolio"
                        src={`/portfolio/image/${item.filename}`}
                        alt={`portfolio ${item.title}`}
                      />

                      <figcaption>
                        <a href={item.url} className="link-portfolio btn primary">
                          {item.title}
                        </a>
                      </figcaption>
                    </figure>
                  </section>
                </li>
                ) )}

              </ul>
            </div>

          </div>

          <div className="wrap-slide">
            <button
              type="button"
              className="primary"
              onClick={() => {
                onNextSlide();
                clearInterval( sliderID.current );
                sliderID.current = setInterval(onNextSlide, INTERVAL_SLIDE);
              }}
            >
              <i className="fad fa-chevron-right"></i>
            </button>
          </div>
        </div>
        ): (
          <Building
            message="Portfolio content is in building"
          />
        )}
        </>
      )}
    </section>
  );
};

export default Portfolio;