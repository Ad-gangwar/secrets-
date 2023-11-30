import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const { BASE_URL } =require('../helper');
export default function Submit() {
  const [secret, setSecret] = useState("");
  let navigate=useNavigate();
  const handleChange = (e) => {
    setSecret(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/submitSecret`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail'),
        secret: secret
      })
    });

    const data = await response.json();
    if(data.success===true){
      navigate("/secrets");
    }
  }

  return (
    <div className="container">
      <div className="jumbotron centered">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">Secrets</h1>
        <p className="secret-text">Don't keep your secrets, share them anonymously!</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control text-center" name="secret" placeholder="What's your secret?" onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-dark">Submit</button>
        </form>
      </div>
    </div>
  )
}

