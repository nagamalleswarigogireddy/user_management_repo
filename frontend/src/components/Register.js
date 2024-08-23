import React, { useState } from 'react'
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import hidePwdImg from '../../src/hide-pwd.svg'
import showPwdImg from '../../src/show-pwd.svg'

function Register() {
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  })

  let changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  let submitHandler = async (e) => {
    e.preventDefault();
    const result = await axios.post('http://localhost:9090/register', { name: data.name, email: data.email, mobile: data.mobile, password: data.password})
    console.log("registered a user", result)
  }

  return (
    <div>
      <Navbar />
      <div className='container' style={{
        width: '400px',
        height: '630px',
        marginTop: '4%',
        borderRadius: ' 30px',
        backgroundColor: 'rgb(127, 165, 192)'
      }} >

        <form onSubmit={submitHandler}>
          <div style={{marginTop:'10px'}}>
            <h1>Sign Up</h1>
          </div>
          <div>
            <label >Name</label>
            <input className='input-text' name="name" type='text' value={data.name} onChange={changeHandler} placeholder='Enter name' />
          </div>
          <div>
            <label>Email</label>
            <input className='input-text' name="email" type='email' value={data.email} onChange={changeHandler} placeholder='Enter Email' />
          </div>
          <div>
            <label>Mobile</label>
            <input className='input-text' name="mobile" type='number' value={data.mobile} onChange={changeHandler} placeholder='Enter mobile' />
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
              onClick={submitHandler}>
              Register</button>
          </div>

          <div style={{ marginTop: '25%' }}>
            <i>Already have an account?&nbsp;
              <NavLink to='/login'>Signin</NavLink>
            </i>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Register