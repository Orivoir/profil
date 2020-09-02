import React, {useState} from 'react';

const MessageItem = ({message, onRemove, onOpen}) => {

  const [isOpen, setIsOpen] = useState( false );

  return (
    <section className="message-item-section">
    <section className="message-overview">

      {!message.isRead ? (
        <span className="new-message-overview">
          new message
        </span>
      ): null}
      <div className="owner">
        {message.owner}
      </div>

      <div className="object">
        {message.object}
      </div>
      <div className="preview-action">
        <button
          type="button"
          className="primary"
          onClick={() => {

            onOpen( message );
            setIsOpen(true );
          }}
        >
          open
        </button>

        <button
          type="button"
          className="error"
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

        <div className="message-open-content">

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
              className="primary-outline"
            >
              close
            </button>

            <button
              type="button"
              onClick={() => onRemove(message)}
              className="error-outline"
            >
              remove
            </button>
          </div>
        </div>

      </section>
    ):null}
    </section>
  );
};

export default MessageItem;