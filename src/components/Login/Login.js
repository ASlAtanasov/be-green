import React from 'react';
import { useNavigate } from 'react-router';
import './Login.css';

import { useAuthUserContext } from '../../contexts/AuthContext';
import { login } from '../../services/authService';

const Login = () => {
    let navigate = useNavigate();
    const { user, setUser } = useAuthUserContext();
    //const { login } = useAuthUserContext();

    // const loginSubmitHandler = async (e) => {
    //     e.preventDefault();

    // let { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    //     try {
    //         const user = await login(email, password);

    //         if (user) {
    //             navigate('/home');
    //         }
    //     } catch (err) {
    //         alert(`Invalid username or password`);
    //     }
    // }


    const loginSubmitHandler = async (e) => {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        try {
            let currentUser = await login(email, password, setUser);
            console.log('currentUser id: ' + currentUser.uid);
            console.log('currentUser email: ' + currentUser.email);
            console.log('currentUser accessToken: ' + currentUser.accessToken);

            if (currentUser) {
                navigate('/home');
            }

        } catch (err) {
            alert(`Invalid username or password`);
        }
    }

    return (
        <section id="login-page" className="login login-section">
            <form id="login-form" className='login-section-form' method="POST" onSubmit={loginSubmitHandler}>
                <fieldset>
                    <legend>Login</legend>
                    <p className="field login-section-form-fieldset-p-email">
                        <label htmlFor="email">Email</label>
                        <span className="input">
                            <input type="text" name="email" id="email" placeholder="Email" />
                        </span>
                    </p>
                    <p className="field login-section-form-fieldset-p-password">
                        <label htmlFor="password">Password</label>
                        <span className="input">
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </span>
                    </p>
                    <input className="button submit login-section-form-fieldset-button" type="submit" value="Login" />
                </fieldset>
            </form>
        </section>
    );
}

export default Login;