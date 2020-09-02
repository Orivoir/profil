import React, {useState,useEffect} from 'react';

import Form from './../../components/Form/Form.js';

import DefaultPictureImage from './../../../images/default.png';

import Notif from './../../components/Notif/Notif.js';

import ReactTooltip from 'react-tooltip';

import './AddPortfolio.css';

const AddPortfolio = ({apiPortfolio, onNewPortfolio}) => {

  const [isPending, setIsPending] = useState( false );
  const [image, setImage] = useState( null );
  const [notif, setNotif] = useState( null );
  const [isOpenForm, setIsOpenForm] = useState( false );

  const [isOpenPreview, setIsOpenPreview ] = useState( false );

  useEffect( () => {
    document.title = "Add portfolio";
  }, [] );

  const fields = [
    {
      name: "title",
    },
    {
      name: "url",
    },
    {
      name: "image",
      type: "file",
      label:
        <figure>
          <img
            src={DefaultPictureImage}
            alt="default"
            width="64"
            height="64"
          />
        </figure>
    },
  ];

  return (
    <section className="add-portfolio">

      <ReactTooltip
        type="dark"
        effect="solid"
        place="right"
        id="foobar"
        overridePosition={({left, top}) => {

          return {
            left: left + 25,
            top
          };

        }}
      />
      <div className="wrap-add-portfolio">
        <button
          data-for="foobar"
          data-tip={`${!isOpenForm ? "add": "close form"} portfolio`}
          type="button"
          className="primary"
          onClick={() => (
            setIsOpenForm( iof => !iof )
          )}
        >
          <i className={`${!isOpenForm ? "far fa-plus-octagon": "far fa-minus-octagon"}`}></i>
        </button>
      </div>

      {isOpenForm ? (
        <>
        <Form
          fields={fields.map( (field,key) => (
            <div
              key={key}
            >
              <label htmlFor={field.id || field.name} className={`label-${field.name}`}>
                {field.label || field.name}
              </label>
              <input
                type={field.type || 'text'}
                name={field.name}
                id={field.id || field.name}
                className={`${field.type === "file" ? "hide": ""}`}
                onChange={e => {

                  if( field.type !== "file" ) return;

                  const file = e.target.files[0];

                  if( !(file instanceof File) ) return;

                  const fr = new FileReader;

                  fr.readAsDataURL( file );

                  fr.addEventListener('load', ({target:{result}}) => {

                    setImage( {
                      file,
                      string64: result,
                      size: file.size,
                      name: file.name,
                      mime: file.type
                    } );
                    setIsOpenPreview( true );

                  } );


                }}
              />
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

          onSubmit={e => {

            setIsPending( true );
            setNotif( null );

            apiPortfolio.post({
              image: image?.file,
              title: e.state.title,
              url: e.state.url,
              token: sessionStorage.getItem('token')
            })
            .then( data => {

              setIsPending( false );

              if( data.success ) {

                onNewPortfolio( data.portfolio );
                setNotif(
                  <Notif
                    type="success"
                    content="portfolio have been created with success"
                  />
                );

                setImage( null );
              } else {

                console.warn( "add portfolio reject with:", data.details );

                console.info( data );

                setNotif(
                  <Notif
                    type="error"
                    content={data.details}
                  />
                );

              }

            } )
            .catch( error => {

              console.error( error );

            } );

          }}

          legend={notif}
        />

        {image && isOpenPreview ? (
          <section
            className="image-upload-preview"
          >

            <div className="small-screen-close">
              <button
                className="error-outline"
                onClick={() => (
                  setIsOpenPreview( false )
                )}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <figure>
              <img
                src={image.string64}
                alt="upload"
                width="512"
                height="auto"
              />

              <figcaption>
                <p>{image.name.slice( 0, 30 ) + ( image.name.length > 30 ? "...": "" )}</p>

                <div className="options">
                  <p>{(image.size/1e6).toFixed( 3 )} Mo</p>
                  <p>{image.mime}</p>
                </div>

              </figcaption>
            </figure>


          </section>
        ): null}
        </>
      ): null}

    </section>
  );
}

export default AddPortfolio;