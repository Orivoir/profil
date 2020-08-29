import React, {useState} from 'react';
import Header from './Header/Header';

const App = ({api,mainContents}) => {

  const [isLogged, setIsLogged] = useState( false );

  function onLogout() {

    sessionStorage.removeItem('token');
    setIsLogged( false );
    setMainContent( mainContents.LOGIN( {api, onLogged} ) );
  }

  function onLogged() {

    setIsLogged( true );
    setMainContent( mainContents.DASHBOARD( {api, onLogout} ) );
  }

  const [mainContent, setMainContent] = useState( mainContents.DEFAULT( { api, onLogged } ) );

  return (
    <section className="app-admin">

      {isLogged ? (
        <>
        <Header
          onShowMessageBox={() => (
            setMainContent( mainContents.MESSAGEBOX( {api} ) )
          )}

          onShowDashboard={() => (
            setMainContent( mainContents.DASHBOARD( {api} ) )
          )}

          onLogout={() => {
            api.logout( { token: sessionStorage.getItem('token') } )
            .then( data => {

              if( data.success ) {

                onLogout();

              } else {

                console.warn("logout action reject with: ", data.details );
                console.info( data );
              }

            } )
            .catch( error => {

              console.error( error );

            } );
          }}
        />
        </>
      ): null}

      {mainContent}

    </section>
  );
}

export default App;