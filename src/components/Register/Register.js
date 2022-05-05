import React from 'react';
import { useNavigate } from 'react-router';
import './Register.css';

import { register } from '../../services/authService';

const Register = () => {
    let navigate = useNavigate();

    const registerSubmitHandler = async (e) => {
        e.preventDefault();

        let { email, password, repeatPassword } = Object.fromEntries(new FormData(e.currentTarget));

        if (password === repeatPassword) {
            try {
                await register(email, password);

                navigate('/home');
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode);
                alert(errorMessage);
            }

        }

    }

    return (
        <section id="register-page" className="register register-section">
            <form id="register-form" className='register-section-form' method="POST" onSubmit={registerSubmitHandler}>
                <fieldset>
                    <legend>Register Form</legend>
                    <p className="field register-section-form-fieldset-p-email">
                        <label htmlFor="email">Email</label>
                        <span className="input">
                            <input type="text" name="email" id="email" placeholder="Email" />
                        </span>
                    </p>
                    <p className="field register-section-form-fieldset-p-password">
                        <label htmlFor="password">Password</label>
                        <span className="input">
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </span>
                    </p>
                    <p className="field register-section-form-fieldset-p-repeat-password">
                        <label htmlFor="repeat-pass">Repeat Password</label>
                        <span className="input">
                            <input type="password" name="repeatPassword" id="repeat-pass" placeholder="Repeat Password" />
                        </span>
                    </p>
                    <input className="button submit register-section-form-fieldset-button" type="submit" value="Register" />
                </fieldset>
            </form>
        </section>
    );
}

export default Register;