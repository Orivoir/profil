document.addEventListener('DOMContentLoaded', () => {


  document.querySelectorAll('img[data-src]')
  .forEach( img => {

    const source = img.getAttribute('data-src');
    const alt = img.getAttribute('data-alt') || "";

    const image = new Image;

    image.alt = alt;
    image.src = source;

    image.addEventListener('load', () => {

      console.log("have been loaded");

      const parent = img.parentNode;

      parent.removeChild( img );

      parent.appendChild( image );

    }, {
      once: true
    } );

  } );

} );