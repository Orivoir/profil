import React, {useState, useRef, useEffect} from 'react';

import './Footer.css';

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
          href="https://github.com/Orivoir/profil/"
          className="btn info"
          target="_blank"
        >
          <i className="fab fa-github"></i>
          github
        </a>

        <button
          type="button"
          className="primary"
        >
          <i className="fas fa-download"></i>&nbsp;
          CV
        </button>

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