import React, {useState, useEffect, useRef} from 'react';

const ProgressBar = ({
  timeout,
  isInfinite=false,
  delay=0,
  delayBetween=0,
  isPause=false,
  isReverse=false
}) => {

  const [current, setCurrent] = useState( 0 );
  const progressID = useRef( null );

  const getTimeout = () => (
    (timeout/100 - ( (timeout/1e4) * 30 ) )
  );

  const onNextFrame = () => {
    setCurrent( c => {

      if( c < 100 ) {

        return c + 1;
      }

      return c;

    } );

  };

  useEffect( () => {
    clearInterval(progressID.current);

    if( !isPause ) {
      setCurrent( 0 );
      progressID.current = setInterval( onNextFrame , getTimeout() );
    } else {
    }

   }, [timeout] );

  useEffect( () => {

    // if( isPause ) {

    //   clearInterval( progressID.current );
    // } else {

    //   progressID.current = setTimeout( onNextFrame , getTimeout() );
    // }

  }, [ isPause ] );

  return (
    <div
      className="progress-bar"
      style={{
        transformOrigin: `top ${ !isReverse ? "left":"right" }`,
        transform: `scaleX( ${ current / 100 } )`
      }}
  />
  );
};

export default ProgressBar;