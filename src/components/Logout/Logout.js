import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import * as authService from '../../services/authService';
import { useAuthUserContext } from '../../contexts/AuthContext';

const Logout = () => {
    //const navigate = useNavigate();
    const { logout } = useAuthUserContext();

    useEffect(() => {
        try {
            logout();
        } catch (error) {
          alert(error);  
        }

    }, []);


};

export default Logout;