import React, {useState} from 'react';

import './Notif.css';

const NOTIF_TYPES = {

  get SUCCESS(){
    return "success";
  },
  get ERROR(){
    return "error";
  },
  get WARN(){
    return  "warn";
  },
  get INFO(){
    return "info";
  },

  get DEFAULT() {

    return this.INFO;
  },

  isExists( type ) {

    if( typeof type !== 'string' ) {
      return false;
    }

    type = type.toLocaleLowerCase();

    return !![
      this.SUCCESS,
      this.ERROR,
      this.WARN,
      this.INFO
    ].find( existsType => existsType === type );

  }

};

const Notif = ({
  type="info",
  className="",
  content,
  isClosable=true,
  closeContent="close"
}) => {

  const [isOpen, setIsOpen] = useState( true );
  const [isNone, setIsNone] = useState( false );

  if( !NOTIF_TYPES.isExists( type ) ) {

    type = NOTIF_TYPES.DEFAULT;
  }

  return (
    <>
    {!isNone ? (
      <section
        className={`notif notif-${type} ${className} ${!isOpen ? "close":""}`}
      >
        <div className="wrap-content">
          {content}
        </div>

        {isClosable && (
          <button
            type="button"
            className="error"
            onClick={() => {
              setIsOpen( false );

              setTimeout(() => {
                setIsNone( true );
              }, 333);
            }}
          >
            {closeContent}
          </button>
        )}
        </section>
    ): null}
    </>
  );

};

export default Notif;
