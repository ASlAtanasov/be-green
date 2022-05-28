import React from 'react';
import { useNavigate } from 'react-router';
import './Login.css';

import { useAuthUserContext } from '../../contexts/AuthContext';
import { useOrderedProductsContext } from '../../contexts/OrderedProductsContext';
import { login } from '../../services/authService';

const Login = () => {
    let navigate = useNavigate();
    const { setUser } = useAuthUserContext();
    const { orderedProducts } = useOrderedProductsContext();

    const loginSubmitHandler = async (e) => {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        await login(email, password, setUser, orderedProducts, navigate)
    };

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
            <p className='login-form-redirect-p'>If you don't have an account you can sign up <a className='login-view-button-redirect-p-a' type='button' href={'/register'}>here</a>!</p>
        </section>
    );
}

export default Login;