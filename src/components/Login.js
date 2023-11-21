import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();
    const [info, setInfo] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        setInfo((prevInfo) => ({
            ...prevInfo,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch('https://sec-ohbv.onrender.com/api/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: info.email,
                password: info.password
            })
        });

        if (response.status === 200) {
            const json = await response.json();

            if (!json.success) {
                alert('Enter valid credentials');
            }
            else {
                localStorage.setItem("authToken", json.authToken)
                localStorage.setItem("userEmail", info.email)
                navigate("/secrets");
            }


        } else {
            alert('User not found! Please signup.');
        }
    }
    return (
        <div className="container mt-5">
            <h1>Login</h1>

            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">

                            {/* Makes POST request to /login route */}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={info.email}
                                        id='email'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        id='password'
                                        value={info.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark">Login</button>
                                <Link to="/register" className="btn m-3 btn-danger">
                                    New User
                                </Link>
                            </form>

                        </div>
                    </div>
                </div>

                {/* <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <Link className="btn btn-block btn-social btn-google" to="/auth/google" role="button">
                                <i className="fab fa-google"></i>
                                Sign In with Google
                            </Link>
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    )
}
