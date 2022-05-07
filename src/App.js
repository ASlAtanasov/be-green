import React from 'react';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthContextProvider } from './contexts/AuthContext'
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';


function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Header />

        <main id="site-content">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />  */
          </Routes>
        </main>

        <footer id="site-footer">
          <p>BE GREEN</p>
        </footer>
      </div>
    </AuthContextProvider>
  );
}

export default App;
