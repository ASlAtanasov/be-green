import React from 'react';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Register from './components/Register/Register';


function App() {
  return (
    <div className="App">
      <Header />
      
      <main id="site-content">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>

      <footer id="site-footer">
        <p>BE GREEN</p>
      </footer>
    </div>
  );
}

export default App;
