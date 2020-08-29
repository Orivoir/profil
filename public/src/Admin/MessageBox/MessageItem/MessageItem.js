import React, {useState} from 'react';

const MessageItem = ({message, onRemove}) => {

  const [isOpen, setIsOpen] = useState( false );

  return (
    <>
    <section>
      <div className="owner">
        {message.owner}
      </div>

      <div className="object">
        {message.object}
      </div>
      <div className="preview-action">
        <button
          type="button"
          onClick={() => {
            setIsOpen(true )
          }}
        >
          open
        </button>

        <button
          type="button"
          onClick={() => onRemove(message)}
        >
          remove
        </button>
      </div>
    </section>

    {isOpen ? (
      <section
        className="message-open"
      >

        <div className="owner">
          {message.owner}
        </div>

        <div
          className="content"
        >
          {message.contentText}
        </div>

        <div className="message-action">

          <button
            type="button"
            onClick={() => (
              setIsOpen( false )
            )}
          >
            close
          </button>

          <button
            type="button"
            onClick={() => onRemove(message)}
          >
            remove
          </button>
        </div>

      </section>
    ):null}
    </>
  );
};

export default MessageItem;