import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './Dashboard.css';

function Dashboard() {
    const [data, setData] = useState([])

    useEffect(() => {
        getDetails()
    }, [])

    let getDetails = async () => {
        const result = await axios.get('http://localhost:9090/allUsers', { headers: { 'x-token': localStorage.getItem('token') } })
        setData(result.data.body)
    }

    if (!localStorage.getItem('token')) {
        return <Navigate to='/login' />
    }

    return <div>

        <nav className='navbar navbar-dark bg-dark'>
            <span class="navbar-brand mb-0 h1">User Management</span>
            <ul style={{ listStyle: 'none', display: 'flex', fontSize: '25px' }}>
                <li><Link to='/myprofile'>my profile</Link></li> &nbsp; &nbsp;
                <li><Link to='/login' onClick={() => { localStorage.removeItem('token') }}>Logout</Link></li>
            </ul>
        </nav>

        <div style={{ marginLeft: '380px', color: '#603fef' }}>
            <h1 >User Authentication and Management</h1>
        </div>

        <div style={{ marginLeft: '380px' }}>
            <h4>Here is the information regarding all registered users...</h4>
        </div>

        {data.map((list) => {
            return (
                <>
                    <div className='container'>
                        <img className='round-img' src='https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg' alt='' />  <br />

                        <div style={{ marginTop: '110px', marginLeft: '40px' }}>
                            <h2>{list.name}</h2>
                            <p>{list.email}</p>
                            <p>{list.mobile}</p>
                            <p>India</p>
                        </div>

                    </div>
                </>
            )
        })}


    </div>
}

export default Dashboard
