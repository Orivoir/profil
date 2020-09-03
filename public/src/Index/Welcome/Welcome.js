import React from 'react';

import './Welcome.css';

const Welcome = () => {
  return (
    <section className="welcome">
      <p className="present">
        Développeur web fullstack junior,
        j'apprend grâce au ressources libre du web
        ( <a href="https://developer.mozilla.org/fr/">MDN</a>, <a href="https://www.w3schools.com/">W3Schools</a>, <a href="https://openclassrooms.com/fr/membres/samuelgaborieau3">OCR</a>, ... ),<br />
        je me spécialise Javascript&nbsp;/&nbsp;PHP.<br />
        vous pouvez retrouvé chaque briques de ce profil réalisé en Nodejs Reactjs CSS natif sur mon&emsp;
        <a href="https://github.com/orivoir/profil">
          <i className="fab fa-github"></i>github
        </a>
      </p>

      <div className="i-can-use">
        <div className="wrap-use">
          <h2>
            Je serais me rendre utile tant que:
          </h2>

          <ul>
            <li>
              <p>
                PHP 7.x / Symfony ( 4.x où 5.x )<br />
                ( des connaissances sur les syntaxes experimental de la release de <a href="https://www.php.net/archive/2020.php#2020-08-21-1">PHP 8.0-alpha</a> )
              </p>
            </li>
            <li>
              <p>
                Javascript ( ES6 ) / Jquery / Reactjs ( 16.x où plus )
              </p>
            </li>
            <li>
              <p>
                Nodejs ( 10.x où plus ) / Express ( 4.x ) / Webpack ( 4.x où plus )
              </p>
            </li>
            <li>
              <p>
                CSS 3 / Bootstrap ( 3.7.x où 4.x ) / ( des notions du préprocesseur de SASS )
              </p>
            </li>
            <li>
              <p>
                HTML 5 ( en suivant les specs de la <a href="https://html.spec.whatwg.org/">WHATWG</a> )
              </p>
            </li>
            <li>
              <p>
                Minecraft ( PS4 Edition ) ( 1.6.x où plus )<br />
                ( des connaissances avancé dans les contructutions de <a href="https://minecraft-fr.gamepedia.com/Circuit_de_redstone">circuit Redstone</a> )
              </p>
            </li>
          </ul>
        </div>

        <div className="wrap-use">
          <h2>Je ne serais pas me rendre utile tant que:</h2>

          <div>
            <ul>
              <li>
                <p>
                  Installé des drivers sur une imprimante
                </p>
              </li>
              <li>
                <p>
                  Réparé une machine à café/GPS où autre objet numérique (où pas) du quotidien
                </p>
              </li>
              <li>
                <p>
                  Construire un hélicoptère avec un caillou et un trimbone
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Welcome;