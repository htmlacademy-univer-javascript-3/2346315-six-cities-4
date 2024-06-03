import React from 'react';
import { useState } from 'react';
import BounceLoader from 'react-spinners/BounceLoader'; 

const LoadingScreen = () => {
  const [loading] = useState(true);
  const [color] = useState('#3498db');

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#ffffff',
  };

  const loaderStyle: React.CSSProperties = {
    borderColor: '#3498db',
  };

  if (!loading) {
    return null;
  }

  return (
    <div style={wrapperStyle}>
      <BounceLoader 
        color={color}
        loading={loading}
        cssOverride={loaderStyle}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingScreen;
