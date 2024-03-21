import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

const Confettis = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  return (
    <div className='z-70'>
    <Confetti width={dimensions.width} height={dimensions.height} numberOfPieces={1000} recycle={false} />
  </div>
  )
}

export default Confettis