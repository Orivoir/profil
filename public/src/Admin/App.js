import React, {useState} from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer.js';

const App = ({api,mainContents}) => {

  const [isLogged, setIsLogged] = useState( false );
  const [newMessages, setNewMessages] = useState( [] );

  function onLogout() {

    sessionStorage.removeItem('token');
    setIsLogged( false );
    setMainContent( mainContents.LOGIN( {api, onLogged} ) );
  }

  function onLogged() {

    setIsLogged( true );
    setMainContent( mainContents.DASHBOARD( {api, onLogout} ) );

    api.notifs( {
      token: sessionStorage.getItem('token')
    } )
    .then( data => {

      if( data.success ) {

        setNewMessages( data[ "new-messages" ] );

      } else {

        console.log( data );
      }

    } )
    .catch( error => {

      console.error( error );

    } );
  }

  function onOpenNewMessage( message ) {

    setNewMessages( nms => nms.filter( nm => (
      nm.id !== message.id
    ) ) );

  }

  const [mainContent, setMainContent] = useState( mainContents.DEFAULT( { api, onLogged } ) );

  return (
    <section className="app-admin">

      {isLogged ? (
        <>
        <Header

          newMessages={newMessages}

          onShowMessageBox={() => (
            setMainContent( mainContents.MESSAGEBOX( {api, onOpenNewMessage} ) )
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

      {isLogged ? (
        <Footer api={api} />
      ): null}

    </section>
  );
}

export default App;