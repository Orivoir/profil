import React from 'react';

import './Title.css';

const Title = ({onShowWelcome}) => {
  return (
    <section className="title">
      <figure>
          <h1>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();

                onShowWelcome();
              }}
            >
              <img
                src="/admin/image"
                alt="Samuel GABORIEAU"
                width="256"
              />
            </a>
          </h1>
      </figure>

      <aside>
        <strong>Samuel</strong>&nbsp;
        <strong>GABORIEAU</strong>
      </aside>
    </section>
  );
}

export default Title;