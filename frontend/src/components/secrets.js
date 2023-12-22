import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
// Register.js or any other file
import { BASE_URL } from "../helper";

export default function Secrets() {
    const navigate = useNavigate();
    const [secrets, setSecrets] = useState([]);

    const loadData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/displaySecret`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
            });

            // Extract JSON from the response
            const data = await response.json();
            setSecrets(data.allSecrets);

        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="jumbotron text-center">
            <div className="container">
                <i className="fas fa-key fa-6x mb-3"></i>

                    {secrets.map((secret, index) => (
                        <p className="secret-text" key={index}>{secret}</p>
                    ))}
              
                <button className="btn btn-light btn-lg mx-3" onClick={() => {
                    localStorage.removeItem("authToken");
                    navigate("/login");
                }}> Log Out </button>

                <Link className="btn btn-dark btn-lg" to="/submit" role="button">Submit a Secret</Link>
            </div>
        </div>
    )
}