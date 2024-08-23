import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Myprofile() {
    const [data, setData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getDetails()
    }, [])

    let getDetails = async () => {
        const result = await axios.get('http://localhost:9090/myProfile', { headers: { 'x-token': localStorage.getItem('token') } })
        setData(result.data.body)
    }

    if (!localStorage.getItem('token')) {
        return <Navigate to='/login' />
    }

    const handleUpdateClick = () => {
        navigate('/updateProfile', { state: data });
    };

    return <div >
        <nav className='navbar navbar-dark bg-dark'>
            <span class="navbar-brand mb-0 h1">User Management</span>
            <ul style={{ listStyle: 'none', display: 'flex', fontSize: '25px' }}>
                <li><Link to='/login' onClick={() => { localStorage.removeItem('token') }}>Logout</Link></li>
            </ul>
        </nav>

        <button style={{
            background: 'light', color: 'black', width: '150px', height: '50px', border: "none", marginLeft: '13%', marginTop: '10px'
        }}
            onClick={() => {
                navigate('/dashboard')
            }}
        >Back to Dashboard</button>

        {data &&
            <>
                <div className='container' style={{ height: '700px', width: '100%', background: '#6495ED', borderRadius: '8px' }}>
                    <img className='round-img' style={{ marginLeft: '38%' }} src='https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg' alt='' />  <br />

                    <div style={{ marginTop: '35%', textAlign: 'center', marginLeft: '-25%', color: 'white' }}>
                        <h2>{data.name}</h2>
                        <p>{data.email}</p>
                        <p>{data.mobile}</p>
                        <p>India</p>
                    </div>

                    <button class="btn btn-outline-primary" style={{ marginTop: '50%', textAlign: 'center', width: '150px', height: '50px', marginLeft: '-20%', color: 'white' }}
                        onClick={handleUpdateClick}
                    >Update</button>

                </div>
            </>
        }

    </div>
}

export default Myprofile