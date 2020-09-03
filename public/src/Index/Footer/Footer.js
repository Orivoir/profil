import React, {useState, useRef, useEffect} from 'react';

import './Footer.css';

import ReactTooltip from 'react-tooltip';

const Footer = ({api}) => {

  useEffect( () => {

    if( !marginFooterRef.current || !footerRef.current ) return;

    marginFooterRef.current.style.marginBottom = footerRef.current.offsetHeight + "px";

    api.isAdmin()
    .then( data => {

      if( data.isAdmin ) {

        setIsAdmin( true );
      }

    } )
    .catch( error => {

      console.log( error );

    } );

  }, [] );

  const [isOpen, setIsOpen] = useState( false );
  const [isAdmin, setIsAdmin] = useState( false );

  const footerRef = useRef( null );
  const marginFooterRef = useRef( null );

  return (
    <>
    <div ref={marginFooterRef} className="margin-footer"></div>
    <footer ref={footerRef}>

      <div className="menu menu-small-screen">
        <button
          className="menu-btn"
          type="button"
          onClick={() => (
            setIsOpen( io => !io )
          )}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <div
        className={`links ${isOpen ? "open":""}`}
      >
        <a
          href="https://github.com/Orivoir/"
          className="btn info"
          target="_blank"
        >
          <i className="fab fa-github"></i>
          github
        </a>

        <ReactTooltip
          id="down-cv"
          type="dark"
          effect="solid"
          place="top"
        />
        <a href="/assets/pdf/Samuel_Gaborieau_DevFullstackJunior.pdf"
          download
          data-for="down-cv"
          data-tip={`PDF 15,4 Ko`}
          type="button"
          className="btn primary"
        >
          <i className="fas fa-download"></i>&nbsp;
          CV
        </a>

        <a
          href="https://www.npmjs.com/~orivoir21"
          className="btn error btn-npm"
          target="_blank"
        >
          <i className="fab fa-npm"></i>
        </a>

        {isAdmin ? (
        <a href="/admin" className="btn success">
          <i className="fas fa-user-crown"></i>
        </a>
        ): null}
      </div>

    </footer>
    </>
  );
};

export default Footer;