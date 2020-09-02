import React, {useState} from 'react';

import Form from './../../components/Form/Form.js';

import Notif from './../../components/Notif/Notif.js';

import './Contact.css';

const Contact = ({api}) => {

  const [ isPending, setIsPending ] = useState( false );

  const [ notif, setNotif ] = useState( null );

  const fields = [
    {
      label:
        <>
        auteur&nbsp;
        <i className="fas fa-asterisk"></i>
        </>
      ,
      name: "owner",
    }, {
      label: "sujet",
      name: "object"
    }, {
      label:
        <>
        message&nbsp;
        <i className="fas fa-asterisk"></i>
        </>
      ,
      name: "contentText"
    }
  ];

  return (
    <section className="contact">

      <Form
        legend={notif}

        onSubmit={e => {

          if( isPending ) return;

          setNotif( null );
          setIsPending( true );

          api.contact( e.state )
          .then( data => {

            setIsPending( false );

            if( data.success ) {

              setNotif(
                <Notif
                  type="success"
                  content="message have been send"
                  closeContent={(
                    <i className="fas fa-times"></i>
                  )}
                />
              );

            } else {
              setNotif(
                <Notif
                  type="error"
                  content={data.details}
                  closeContent={(
                    <i className="fas fa-times"></i>
                  )}
                />
              );
            }

          } )
          .catch( error => {

            console.error( error );

          } );

        }}

        fields={fields.map( (field,key) => (
          <div
            key={key}
          >
            <label htmlFor={field.id || field.name}>
              {field.label || field.name}
            </label>
            {field.name === "contentText" ? (
              <textarea
                name={field.name}
                id={field.id || field.name}
                spellCheck="false"
              ></textarea>
            ):(
              <input
              name={field.name}
              id={field.id || field.name}
              type={field.type || "text"}
              autoComplete="off"
            />
            )}

          </div>
        ) )}

        submit={(
          <button
            type="submit"
            className={`primary ${isPending ? "disabled": ""}`}
          >
            {isPending ? (
              <>
              Load...
              </>
            ): (
              <>
              Send
              </>
            )}
          </button>
        )}
      />
    </section>
  );
};

export default Contact;
