import React, {useEffect, useState} from 'react';

import ListItem from './../../components/ListItem/ListItem.js';

import MessageItem from './MessageItem/MessageItem.js';

const MessageBox = ({api}) => {

  const [isPending, setIsPending] = useState( true );
  const [messages, setMessages] = useState( [] );

  useEffect( () => {

    if( isPending && !messages.length ) {

      api.messages.gets( {
        token: sessionStorage.getItem('token')
      } )
      .then( data => {

        if( data.success ) {

          setMessages( data.messages );

        } else {

          console.warn("get messages reject with:", data.details );
          console.info(data);
        }

        setIsPending( false );

      } )
      .catch( error => {

        console.error( error );
      } );
    }

  }, [] );

  return (
    <section className="message-box">
      {isPending ? (
        <>
        Loading...
        </>
      ): (
        <>

        <ListItem
          items={messages.map( message => (
            <MessageItem
              message={message}
              onRemove={message => {

                console.log("should ask confirm remove message:", message );

              }}
            />
          ) )}
        />

        </>
      )}
    </section>
  );
};

export default MessageBox;