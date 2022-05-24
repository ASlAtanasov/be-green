import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import * as authService from '../../services/authService';
import { useAuthUserContext } from '../../contexts/AuthContext';
import { logout } from '../../services/authService';

const initialState = null;


const Logout = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuthUserContext();

    useEffect(() => {
        try {
            console.log('logout in Logout useEffect: ' + user);
            logout(setUser, navigate, initialState);
        } catch (error) {
          alert(error);  
        }

    }, []);


};

export default Logout;