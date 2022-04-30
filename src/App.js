import { Routes, Route } from 'react-router-dom';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';


function App() {
  return (
    <div className="App">
      <Header />
      
      <main id="site-content">
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>

      <footer id="site-footer">
        <p>BE GREEN</p>
      </footer>
    </div>
  );
}

export default App;
