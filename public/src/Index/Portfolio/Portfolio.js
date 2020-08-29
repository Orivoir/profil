import React, {useEffect, useState} from 'react';

import ListItem from './../../components/ListItem/ListItem.js';

const Portfolio = ({api}) => {

  const [isPending, setIsPending] = useState( true );
  const [portfolios, setPortfolios] = useState( [] );

  useEffect( () => {

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

  } );

  return (
    <section className="portfolio">
      {isPending ? (
        <>
          Loading ...
        </>
      ): (
        <>
          <ListItem
            items={portfolios.map( item => (
              <section
                key={item.id}
              >
                <figure>
                  <img
                    src={`/portfolio/image/${item.filename}`}
                  />

                  <figcaption>
                    <a href={item.url}>
                      {item.title}
                    </a>
                  </figcaption>
                </figure>
              </section>
            ) )}

            className="portfolio"
          />
        </>
      )}
    </section>
  );
}

export default Portfolio;