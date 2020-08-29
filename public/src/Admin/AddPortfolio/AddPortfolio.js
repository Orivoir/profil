import React, {useState} from 'react';

import Form from './../../components/Form/Form.js';

const AddPortfolio = ({apiPortfolio, onNewPortfolio}) => {

  const [isPending, setIsPending] = useState( false );

  const fields = [
    {
      name: "title",
    },
    {
      name: "url",
    },
    {
      name: "image",
      type: "file"
    },
  ];

  return (
    <section className="add-portfolio">

      <Form
        fields={fields.map( (field,key) => (
          <div
            key={key}
          >
            <label htmlFor={field.id || field.name}>
              {field.label || field.name}
            </label>
            <input
              type={field.type || 'text'}
              name={field.name}
              id={field.id || field.name}
            />
          </div>
        ) )}

        onSubmit={e => {

          const image = e.state.image[0];

          setIsPending( true );

          apiPortfolio.post({
            image,
            title: e.state.title,
            url: e.state.url,
            token: sessionStorage.getItem('token')
          })
          .then( data => {

            setIsPending( false );

            if( data.success ) {

              onNewPortfolio( data.portfolio );
            } else {

              console.warn( "add portfolio reject with:", data.details );

              console.info( data );

            }

          } )
          .catch( error => {

            console.error( error );

          } );

        }}
      />

    </section>
  );
}

export default AddPortfolio;