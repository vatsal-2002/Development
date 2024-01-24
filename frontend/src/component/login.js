// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Saleshandy-Logo-.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[\w!@#$%^&*(),.?":{}|<>]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validation
        const validationErrors = {};

        if (!validateEmail(email)) {
            validationErrors.email = 'Invalid email address';
        }

        if (!validatePassword(password)) {
            validationErrors.password =
                'Password should be at least 8 characters long and contain at least one special character';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                // Store the JWT token in sessionStorage
                sessionStorage.setItem('authToken', data.token);
    
                // Redirect to the setting page or perform other actions as needed
                navigate('/setting');
            } else {
                // Set login error state
                setErrors({ login: 'Email or password is incorrect' });
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="Login">
            <section className="bg-home bg-circle-gradiant d-flex align-items-center">
                <div className="bg-overlay bg-overlay-white"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card form-signin p-4 rounded shadow">
                                <form>
                                    <img src={logo} alt="Logo" />
                                    <h5 className="mb-3 text-center">Please sign in</h5>

                                    <div className="form-floating mb-2">
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label>Email address</label>
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            id="floatingPassword"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label>Password</label>
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>

                                    <button className="btn btn-primary w-100" type="submit" onClick={handleLogin}>
                                        Sign in
                                    </button>


                                    {loginSuccess && (
                                        <div className="alert alert-success mt-3" role="alert">
                                            Login successful!
                                        </div>
                                    )}
                                    {errors.login && (
                                        <div className="alert alert-danger mt-3" role="alert">
                                            {errors.login}
                                        </div>
                                    )}

                                    <div className="col-12 text-center mt-3">
                                        <p className="mb-0 mt-3">
                                            <small className="text-dark me-2">Don't have an account ?</small>{' '}
                                            <Link to="/signup" className="text-dark fw-bold btn-none">
                                                Sign Up
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
