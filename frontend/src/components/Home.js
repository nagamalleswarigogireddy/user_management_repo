import React from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

function Home() {
    const navigate = useNavigate()
    return (
        <div style={{
            backgroundImage: 'url("https://wallpapercave.com/wp/wp12417281.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            height: '100vh'
        }} >

            <Navbar />

            <div style={{ textAlign: 'center', fontFamily: 'cursive' }}>
                <h1 style={{ marginTop: '15%', fontSize: '55px' }}>User Management</h1><br />
                <h4>user Authentication and Profile management</h4><br />

                <button style={{ marginRight: '20px', backgroundColor: 'skyblue' }} type='button' onClick={() => {
                    navigate('/register')
                }}>Signup</button>

                <button type='button' onClick={() => {
                    navigate('/login')
                }}>Login</button>
            </div>

        </div>
    )
}

export default Home