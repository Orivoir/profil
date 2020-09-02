import React, {useRef} from 'react';

import './Form.css';

const Form = ({
  method="GET",
  legend=null,
  action="/",
  className="",
  fields=[],
  onSubmit,
  submit="send"
}) => {

  const formRef = useRef( null );

  return (
    <section className={`form ${className}`}>
      {legend}
      <form
        ref={formRef}
        method={method}
        action={action}
        onSubmit={e => {
          e.preventDefault();

          const state = {};

          [...formRef.current.elements]
          .filter( field => (
            field.nodeName.toLocaleLowerCase() !== "button"
          ) )
          .forEach( field => {

            state[ field.getAttribute( "name" ) ] = ( field.files || field.value || field.checked || null );

            field.value = "";

          } );

          e.state = state;

          onSubmit( e );
        }}
      >
        {fields.map(field => ( field ) )}

        {typeof submit !== "string" ? submit: (
          <button
            type="submit"
            className="primary"
          >
            {submit}
          </button>
        )}
      </form>
    </section>
  );
}

export default Form;