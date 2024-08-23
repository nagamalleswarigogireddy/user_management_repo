import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'

function UpdateProfile() {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (state) {
            setFormData(state);
        }
    }, [state]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:9090/updateProfile', formData);
            navigate('/myprofile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return <div>
        <nav className='navbar navbar-dark bg-dark'>
            <span class="navbar-brand mb-0 h1">User Management</span>
            <ul style={{ listStyle: 'none', display: 'flex', fontSize: '25px' }}>
                <li><Link to='/login' onClick={() => { localStorage.removeItem('token') }}>Logout</Link></li>
            </ul>
        </nav>

        <div>
            <div style={{ marginLeft: '600px', color: '#603fef' }}>
                <h1 >Update Profile</h1>
            </div>
            <div className='container' style={{
                width: '400px',
                marginTop: '10%',
                borderRadius: ' 30px',
                backgroundColor: 'rgb(127, 165, 192)'
            }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input className='input-text'
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input className='input-text'
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Mobile</label>
                        <input className='input-text'
                            type='text'
                            name='mobile'
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>
                    <button style={{ backgroundColor: 'antiquewhite', border: 'none', marginTop: '25px' }}
                        type='submit'>Update</button>
                </form>
            </div>
        </div>
    </div>
}

export default UpdateProfile;
