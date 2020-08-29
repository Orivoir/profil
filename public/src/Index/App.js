import React, {useState} from 'react';

import Header from './Header/Header.js';

const App = ({api,mainContents}) => {

  const [mainContent, setMainContent] = useState( mainContents.DEFAULT( {api} ) );

  return (
    <section className="app-anon">

      {/* header */}

      <Header
        onShowPortfolio={() => (
          setMainContent( mainContents.PORTFOLIO({ api }) )
        )}
        onShowContact={() => (
          setMainContent( mainContents.CONTACT( {api} ) )
        )}
      />

      {mainContent}

      {/* footer */}

    </section>
  );
}

export default App;