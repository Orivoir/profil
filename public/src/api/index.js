const api = {

  contact( {
    owner,
    object = "",
    contentText
  } ) {

    return new Promise( (resolve, reject) => {

      fetch(`/api/contact`, {
        method: "POST",
        body: JSON.stringify( {
          owner,
          object,
          contentText
        } ),
        headers: {
          'Content-Type': "application/json"
        }
      })
      .then( response => response.json() )
      .then( data => resolve( data ) )
      .catch( error => reject( error ) );

    } );

  },

  isAdmin() {

    return new Promise( (resolve, reject) => {

      fetch(`/api/is-admin`, {
        method: "GET"
      })
      .then( response => response.json() )
      .then( data => resolve( data ) )
      .catch( error => reject( error ) );

    } );
  },

  portfolios() {

    return new Promise( (resolve, reject) => {

      fetch(`/api/portfolios`, {
        method: "GET"
      })
      .then( response => response.json() )
      .then( data => resolve( data ) )
      .catch( error => reject( error ) );

    } );

  }

};

export default api;