import React, {useState} from 'react';

import Header from './Header/Header.js';

import Footer from './Footer/Footer.js';

const App = ({api,mainContents}) => {

  const [mainContent, setMainContent] = useState( mainContents.DEFAULT( {api} ) );

  return (
    <section className="app-anon">

      <Header
        onShowPortfolio={() => (
          setMainContent( mainContents.PORTFOLIO({ api }) )
        )}

        onShowContact={() => (
          setMainContent( mainContents.CONTACT( {api} ) )
        )}

        onShowWelcome={() => (
          setMainContent( mainContents.WELCOME({api}) )
        )}
      />

      {mainContent}

      <Footer api={api} />

    </section>
  );
}

export default App;