import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div
      style={{
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h2
        style={{
          fontSize: '30px',
          marginBottom: '20px',
          color: '#555'
        }}
      >
        <span
          style={{
            fontWeight: '500'
          }}
        >
          {' '}
          404
        </span>{' '}
        Page Not Found
      </h2>
      <p style={{ textAlign: 'center' }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
