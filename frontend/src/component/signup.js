// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Saleshandy-Logo-.png';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validation
        const validationErrors = {};

        if (!firstName) {
            validationErrors.firstName = 'First name is required';
        } else if (!/^[a-zA-Z]+$/.test(firstName)) {
            validationErrors.firstName = 'First name should contain only letters';
        }

        if (!lastName) {
            validationErrors.lastName = 'Last name is required';
        } else if (!/^[a-zA-Z]+$/.test(lastName)) {
            validationErrors.lastName = 'Last name should contain only letters';
        }

        if (!email) {
            validationErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Invalid email address';
        }

        if (!password) {
            validationErrors.password = 'Password is required';
        } else if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            validationErrors.password = 'Password should be at least 8 characters long and contain at least one special character';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            // Check if signup was successful before redirecting
            if (response.status === 201) {
                // Redirect to the login page
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <>
            <section className="bg-home bg-circle-gradiant d-flex align-items-center">
                <div className="bg-overlay bg-overlay-white"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card form-signin p-4 rounded shadow">
                                <form>
                                    <img src={logo} alt="Logo" />
                                    <h5 className="mb-3 text-center">Register your account</h5>

                                    <div className="form-floating mb-2">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                            placeholder="Harry"
                                            value={firstName}
                                            onChange={(e) => {
                                                setFirstName(e.target.value);
                                                setErrors({ ...errors, firstName: '' });
                                            }}
                                        />
                                        <label>First Name</label>
                                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                    </div>

                                    <div className="form-floating mb-2">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                            placeholder="Potter"
                                            value={lastName}
                                            onChange={(e) => {
                                                setLastName(e.target.value);
                                                setErrors({ ...errors, lastName: '' });
                                            }}
                                        />
                                        <label>Last Name</label>
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                    </div>

                                    <div className="form-floating mb-2">
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setErrors({ ...errors, email: '' });
                                            }}
                                        />
                                        <label>Email Address</label>
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setErrors({ ...errors, password: '' });
                                            }}
                                        />
                                        <label>Password</label>
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>

                                    <button className="btn btn-primary w-100" type="submit" onClick={handleSignup}>
                                        Register
                                    </button>

                                    <div className="col-12 text-center mt-3">
                                        <p className="mb-0 mt-3">
                                            <small className="text-dark me-2">Already have an account ?</small>
                                            <Link to="/login" className="text-dark fw-bold btn-none">
                                                Sign in
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;

