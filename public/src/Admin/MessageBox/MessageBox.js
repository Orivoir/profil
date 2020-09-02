import React, {useEffect, useState} from 'react';

import ListItem from './../../components/ListItem/ListItem.js';

import MessageItem from './MessageItem/MessageItem.js';

import './MessageBox.css';
import Notif from '../../components/Notif/Notif.js';

const MessageBox = ({api, onOpenNewMessage}) => {

  const [isPending, setIsPending] = useState( true );
  const [notif, setNotif] = useState( null );
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
        {notif}
        <ListItem
          items={messages.map( message => (
            <MessageItem
              message={message}
              onRemove={message => {

                if( !message.isRead ) {

                  console.log("should ask confirm remove message:", message );
                } else {

                  api.messages.delete( {
                    token: sessionStorage.getItem('token'),
                    id: message.id
                  } ).then( data => {

                    if( data.success ) {

                      setMessages( ms => ms.filter( m => m.id !== message.id ) );

                    } else {

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
                }
              }}
              onOpen={message => {

                if( !message.isRead ) {

                  api.messages.isRead({
                    token: sessionStorage.getItem('token'),
                    id: message.id
                  })
                  .then( data => {

                    if( data.success ) {

                      if( !message.isRead ) {
                        message.isRead = true;
                        onOpenNewMessage( message );
                      } else {
                        console.log("have open not new message:", message );
                      }

                    } else {

                      console.log( data );
                    }
                  } )
                  .catch( error => {

                    console.error( error );

                  } );
                }
              }}
            />
          ) )}

          className="message"
        />

        {messages.length === 0 ? (
          <div className="mb-empty">
            Message box is empty,<br />
            try again later.
          </div>
        ): null}

        </>
      )}
    </section>
  );
};

export default MessageBox;