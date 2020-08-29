import React from 'react';

import Form from './../../components/Form/Form.js';

const Contact = ({api}) => {

  const fields = [
    {
      name: "owner",
    }, {
      name: "object"
    }, {
      name: "contentText"
    }
  ];

  return (
    <section className="contact">
      <Form
        onSubmit={e => {

          api.contact( e.state )
          .then( data => {

            if( data.success ) {

              console.info("send success");
              console.log( data.message );
            } else {

              console.warn("send message reject with status:", data.details );

              console.info( data );
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
            <input
              name={field.name}
              id={field.id || field.name}
              type={field.type || "text"}
            />
          </div>
        ) )}
      />
    </section>
  );
};

export default Contact;