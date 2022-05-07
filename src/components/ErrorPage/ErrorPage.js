import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div class="container">
      <h1>404</h1>
      <h2>Page not found.</h2>
      <p>The page you're looking for is temporary unavailable.</p>
      <a href="/home">Go back home</a>
    </div>
  );
};

export default ErrorPage;