import axios from 'axios';
import Navbar from './Navbar';
import './Login.css';
import React, { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom';
import hidePwdImg from '../../src/hide-pwd.svg'
import showPwdImg from '../../src/show-pwd.svg'

function Login() {
  const [auth, setAuth] = useState(false)
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  let changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  let submitHandler = async (e) => {
    e.preventDefault();
    const result = await axios.post('http://localhost:9090/login', { email: data.email, password: data.password })
    const res = localStorage.setItem('token', result.data.token); setAuth(true)
  }
  if (auth) {
    return <Navigate to='/dashboard' />
  }

  return (
    <div>
      <Navbar />
      <div className='container' style={{
        width: '400px',
        marginTop: '10%',
        borderRadius: ' 30px',
        backgroundColor: 'rgb(127, 165, 192)'
      }}>
        <form onSubmit={submitHandler}>
          <br />
          <div>
            <h1>Sign-In</h1>
          </div>

          <div>
            <label>Email</label>
            <input className='input-text' type='email' placeholder='Enter Email' name="email" value={data.email} onChange={changeHandler} />
          </div>

          <div className='pwd-container'>
            <label>Password</label>
            <input className='input-text' type={isRevealPwd ? "text" : "password"} placeholder='Enter password' name="password" value={data.password} onChange={changeHandler} />
            <img
              title={isRevealPwd ? "Hide password" : "Show password"}
              src={isRevealPwd ? hidePwdImg : showPwdImg}
              onClick={() => setIsRevealPwd(prevState => !prevState)}
            />
          </div>

          <div>
            <button style={{ backgroundColor: 'antiquewhite', border: 'none', marginTop: '25px' }} type='button'
              onClick={submitHandler}
            >Login</button>
          </div>

          <div style={{ marginTop: '20%' }}>
            <i>Don't have an account?&nbsp;
              <NavLink to='/register'>Register</NavLink>
            </i>
          </div>


        </form>
      </div>
    </div>
  )
}

export default Login