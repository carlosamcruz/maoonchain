import React from 'react'

const NotFound = () => {
    return (
        <div style={{ backgroundColor: '#282c34', color: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '3rem', textAlign: 'center' }}>OOOOPS! PAGE NOT FOUND 404</h1>
          <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>The page you are looking for could not be found.</p>
          <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>Please use the navigation to find other pages.</p>
        </div>
      );
}

export default NotFound