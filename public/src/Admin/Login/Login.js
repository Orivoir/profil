import React, {useState, useEffect} from 'react';

import Form from './../../components/Form/Form.js';

import Notif from './../../components/Notif/Notif.js';

import './Login.css';

const Login = ({
  api,
  onLogged
}) => {

  const [isPending, setIsPending] = useState( true );

  const [notif, setNotif] = useState( null );

  const fields = [
    {
      name: "login",
      type: "text",
      label:
      <>
      <i className="fas fa-user-ninja"></i>
      </>
      ,
      defaultValue: localStorage.getItem('login') || ""
    }, {
      name: "password",
      type: "password",
      label:
      <>
      <i className="fas fa-user-lock"></i>
      </>
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
          legend={notif}
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

                setNotif(
                  <Notif
                    type="error"
                    content={data.details}
                  />
                )

                setIsPending( false );

              }

            } )
            .catch( error => {

              console.error( error );

            } );
          }}
        />

        <a
          href="/"
          className="back-link btn primary"
        >
          home
        </a>
        </>
      )}
    </section>
  );

};

export default Login;
