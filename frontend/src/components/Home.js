import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already authenticated
        if (localStorage.getItem('authToken')) {
            // Redirect to the "secrets" page
            navigate('/secrets');
        }
    }, [navigate]);

    return (
        <div>
            <div className="jumbotron centered">
                <div className="container">
                    <i className="fas fa-key fa-6x"></i>
                    <h1 className="display-3">Secrets</h1>
                    <p className="lead">Don't keep your secrets, share them anonymously!</p>
                    <Link className="btn btn-light btn-lg" to="/register" role="button">Register</Link>
                    <Link className="btn btn-dark btn-lg" to="/login" role="button">Login</Link>
                </div>
            </div>
        </div>
    );
}
