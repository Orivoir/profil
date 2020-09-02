import React, {useState} from 'react';

import Form from './../../components/Form/Form.js';

import Notif from './../../components/Notif/Notif.js';

import DefaultPicture from './../../../images/default.png';

import './Footer.css';

const Footer = ({api}) => {

  const [image, setImage] = useState( null );
  const [notif, setNotif] = useState( null );
  const [isPending, setIsPending] = useState( false );

  return (
    <footer>

      <div>
        <Form

          legend={notif}
          onSubmit={() => {

            setNotif( null );

            api.profilPicture({
              token: sessionStorage.getItem('token'),
              profil: image.file
            })
            .then( data => {

              if( !data.success ) {

                setNotif(
                  <Notif
                    type="error"
                    content={data.details}
                  />
                );

              } else {

                setNotif(
                  <Notif
                    type="sucess"
                    content="profil picture have been changed"
                  />
                );
              }

            } )
            .catch( error => {

              console.error( error );

            } );

          }}

          fields={[
            <div key={0}>
            <label htmlFor="profil-picture">
              <figure style={{cursor: "pointer", display: "inline-block"}}>
                <img
                  src={image?.string64 || "/admin/image"}
                  alt="default"
                  width="128"
                  height="auto"
                  className={`${isPending ? "load": ""}`}
                />
                <figcaption>profil picture</figcaption>
              </figure>
            </label>

            <input
              type="file"
              className="hide"
              name="profil-picture"
              id="profil-picture"
              onChange={e => {

              setIsPending( true );

                const file = e.target.files[0];

                const fr = new FileReader;

                fr.addEventListener( 'load', ({target:{result}}) => {

                  setImage({
                    file,
                    string64: result,
                    mime: file.type,
                    size: file.size
                  });

                  setTimeout(() => {
                    setIsPending( false );
                  }, 250);

                } );

                fr.readAsDataURL( file );
              }}
            />
            </div>
          ]}
        />

      </div>

    </footer>
  );
};

export default Footer;