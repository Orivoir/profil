const api = {

  login( {login, password} ) {

    return new Promise( (resolve, reject) => {

      fetch(`/api/admin/login`, {
        method: "POST",
        body: JSON.stringify( {
          login,
          password
        } ),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then( response => response.json() )
      .then( data => resolve( data ) )
      .catch( error => reject( error ) );

    } );
  },

  logout( { token } ) {

    return new Promise( (resolve, reject) => {

      fetch(`/api/admin/logout?token=${token}`, {
        method: "GET"
      })
      .then( response => response.json() )
      .then( data => resolve( data ) )
      .catch( error => reject( error ) );

    } );
  },

  profilPicture( {
    token,
    profil
  } ) {

    const fd = new FormData;

    fd.append('profil', profil );

    return new Promise( (resolve, reject) => {

      fetch(`/api/admin/profil-picture?token=${token}`, {
        method: "PUT",
        body: fd
      })
      .then( response => response.json() )
      .then( data => resolve( data ) )
      .catch( error => reject( error ) );

    } );

  },

  isLogged() {

    return new Promise( (resolve, reject) => {

      fetch(`/api/is-admin`, {
        method: "GET"
      })
      .then( response => response.json() )
      .then( data => resolve( data ) )
      .catch( error => reject( error ) );

    } );
  },

  notifs({token}) {

    return new Promise( (resolve, reject) => {

      fetch(`/api/admin/notifs?token=${token}`, {
        method: "GET"
      })
      .then( response => response.json() )
      .then( data => resolve( data ) )
      .catch( error => reject( error ) );

    } );

  },

  messages: {

    gets({token}) {

      return new Promise( (resolve, reject) => {

        fetch(`/api/admin/messages?token=${token}`, {
          method: "GET"
        })
        .then( response => response.json() )
        .then( data => resolve( data ) )
        .catch( error => reject( error ) );

      } );
    },

    isRead( {token, id} ) {

      return new Promise( (resolve, reject) => {

        fetch(`/api/admin/message/read/${id}?token=${token}`, {
          method: "PUT"
        })
        .then( response => response.json() )
        .then( data => resolve( data ) )
        .catch( error => reject( error ) );

      } );
    },

    delete( {token, id} ) {

      return new Promise( (resolve, reject) => {

        fetch(`/api/admin/messages/${id}?token=${token}`, {
          method: "DELETE"
        })
        .then( response => response.json() )
        .then( data => resolve( data ) )
        .catch( error => reject( error ) );

      } );
    }

  },

  portfolio: {

    post({
      token,
      title,
      url,
      image
    }) {

      const fd = new FormData;

      fd.append('title', title);
      fd.append('url', url);
      fd.append('image', image);

      return new Promise( (resolve, reject) => {

        if( !image ) {

          resolve( { success: false, details: "image field is empty" } );

        } else {

          fetch(`/api/admin/portfolio?token=${token}`, {
            method: "POST",
            body: fd
          })
          .then( response => response.json() )
          .then( data => resolve( data ) )
          .catch( error => reject( error ) );
        }

      } );

    },

    put({
      token,
      id,
      title=null,
      url=null,
      image=null
    }) {

      const fd = new FormData;

      fd.append('title', title);
      fd.append('url', url);
      fd.append('image', image);

      return new Promise( (reject, resolve) => {

        if( !title && !url && !image ) {

          resolve({
            "statusCode": 200,
            "statusText": "Success",
            "success": false,
            "details": "all update fields empty"
          });

        } else {

          fetch(`/api/admin/portfolio/${id}?token=${token}`, {
            method: "PUT",
            body: fd
          })
          .then( response => response.json() )
          .then( data => resolve( data ) )
          .catch( error => reject( error ) );
        }


      } );
    },

    delete({token, id}) {

      return new Promise( (reject, resolve) => {

        fetch(`/api/admin/portfolio/${id}?token=${token}`, {
          method: "DELETE"
        })
        .then( response => response.json() )
        .then( data => resolve( data ) )
        .catch( error => reject( error ) );

      } );
    },
  }


};

export default api;
