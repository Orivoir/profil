import React, {useRef} from 'react';

const Form = ({
  method="GET",
  action="/",
  className="",
  fields=[],
  onSubmit,
  submit="send"
}) => {

  const formRef = useRef( null );

  return (
    <section className={`${className}`}>
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

          } );

          e.state = state;

          onSubmit( e );
        }}
      >
        {fields.map(field => ( field ) )}

        {typeof submit !== "string" ? submit: (
          <button
            type="submit"
          >
            {submit}
          </button>
        )}
      </form>
    </section>
  );
}

export default Form;