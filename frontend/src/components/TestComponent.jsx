import React from 'react';

const TestComponent = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '20px' }}>
        TripMaster Pro
      </h1>
      <p style={{ color: 'white', fontSize: '1.5rem', textAlign: 'center', maxWidth: '600px' }}>
        Your Professional Trip Planner is Working!
      </p>
      <button 
        onClick={() => alert('Button clicked!')}
        style={{
          marginTop: '30px',
          padding: '15px 30px',
          background: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#ff6b6b',
          cursor: 'pointer'
        }}
      >
        Click Me!
      </button>
    </div>
  );
};

export default TestComponent;
