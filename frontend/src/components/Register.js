import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from "../helper";

export default function Register() {
    const navigate = useNavigate();
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
        const response = await fetch(`${BASE_URL}/api/createUser`, {
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
            console.log(json);
            if (!json.success) {
                alert('Enter valid credentials');
            } else {
                navigate("/login");
            }
        } else {
            alert('Server error');
        }
    }
    return (
        <div className="container mt-5">
            <h1>Register</h1>

            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">

                            {/*  Makes POST request to /register route */}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email" >Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={info.email}
                                        id="email"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={info.password}
                                        id="password"
                                        onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-dark">Register</button>
                                <Link to="/login" className="btn m-3 btn-danger">
                                    Already a User
                                </Link>
                            </form>

                        </div>
                    </div>
                </div>

                {/* <div class="col-sm-4">
                    <div class="card social-block">
                        <div class="card-body">
                            <a class="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                                <i class="fab fa-google"></i>
                                Sign Up with Google
                            </a>
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    )
}