import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import * as authService from '../../services/authService';
import { useAuthUserContext } from '../../contexts/AuthContext';

const Logout = () => {
    //const navigate = useNavigate();
    const { logout } = useAuthUserContext();

    useEffect(() => {
        // authService.signOutPage()
        //     .then(() => {
        //         localStorage.removeItem('user');
                 logout();
        //         navigate('/');
        //         alert('You signed out successfully');
        //         //return <Navigate to='home' />;
        //     })
        //     .catch((error) => {
        //         alert(error.message)
        //     });
    }, []);

    
};

export default Logout;