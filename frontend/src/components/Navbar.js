import React from 'react'
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate()
  return (
    <div>
      <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1">User Management</span>

        <button class="btn btn-outline-primary" style={{ marginLeft: '58%' }} type="submit" onClick={() => {
          navigate('/login')
        }}>Login</button>

        <button class="btn btn-outline-primary" type="submit" onClick={() => {
          navigate('/register')
        }}>Register</button>
      </nav>
    </div>
  )
}

export default Navbar