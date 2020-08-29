import React, {useState, useEffect} from 'react';

import Form from './../../components/Form/Form.js';

const Login = ({
  api,
  onLogged
}) => {

  const [isPending, setIsPending] = useState( true );

  const fields = [
    {
      name: "login",
      defaultValue: localStorage.getItem('login') || ""
    }, {
      name: "password",
      type: "password"
    }
  ]

  useEffect( () => {

    if( isPending ) {

      api.isLogged()
      .then( data => {

        if( data.success && data.isAdmin ) {
          onLogged();
        } else {

          setIsPending( false );
        }

      } )
      .catch( error => {

        console.error( error );

      } );

    }

  }, [] );


  return (
    <section className="login">
      {isPending ? (
        <>
          Loading ...
        </>
      ): (
        <>
        <Form
          fields={fields.map( (field,key) => (
            <div key={key}>
              <label htmlFor={field.id || field.name}>
                {field.label || field.name}
              </label>
              <input
                type={field.type || ""}
                name={field.name}
                id={field.id || field.name}
                placeholder={field.placeholder || ""}
                autoFocus={!!field.autoFocus}
                defaultValue={field.defaultValue || ""}
              />
            </div>
          ) )}

          onSubmit={e => {

            setIsPending( true );

            api.login( e.state )
            .then( data => {

              if( data.success ) {

                const {token} = data;

                sessionStorage.setItem('token', token );
                localStorage.setItem('login', e.state.login );
                onLogged();

              } else {

                console.warn("auth reject with:", data.details );

                console.info( data );

                setIsPending( false );

              }

            } )
            .catch( error => {

              console.error( error );

            } );
          }}
        />

        <a href="/">home</a>
        </>
      )}
    </section>
  );
};

export default Login;
