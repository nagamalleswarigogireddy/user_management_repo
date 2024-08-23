const mongoose = require('mongoose')
const express = require('express')
const pool = require('./config/db')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const bcrypt = require('bcrypt');

const middleware = require('./middleware')
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
const port = 9090
const saltRounds = 10;

app.post('/register', async (req, res) => {
    const { name, email, mobile, password } = req.body
    const [rows] = await pool.query('SELECT * FROM user_info WHERE email = ?', [email]);

    if (rows[0]) {
        return res.status(400).send("User already exists");
    }
    if (!email.includes('@') || !email.includes('com')) {
        return res.status(400).send("Invalid email format. It should include '@' and 'com'.");
    }
    if (password.trim().length <= 7) {
        return res.status(400).send("Password must be at least 8 characters long.");
    }
    if (mobile.length !== 10) {
        return res.status(400).send("Mobile number must be 10 digits long.");
    }
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const data = { name, email, mobile, password: hashedPassword };

        const [result] = await pool.query(
            'INSERT INTO user_info (name, email, mobile, password) VALUES (?, ?, ?, ?)',
            [name, email, mobile, hashedPassword]
        );
        res.send("registered the user")
    }
    catch (err) {
        res.status(500).send("Server error");
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const [rows] = await pool.query('SELECT * FROM user_info WHERE email = ?', [email]);
        const isMatch = await bcrypt.compare(password, rows[0].password);

        if (rows[0] && isMatch) {
            console.log('user login successfully')
        }
        else {
            res.send("Invalid credentials")
        }
        //Token generation
        let payload = {
            user: {
                name: rows[0].name
            }
        }
        jwt.sign(payload, 'jwtPassword', { expiresIn: 3600000 },
            (err, token) => {
                if (err) throw err
                return res.json({ token })
            })

    }
    catch (err) {
        console.log("error in catch", err)
        res.send("In catch")
    }
})

app.get('/allUsers', middleware, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user_info');
        console.log("all users are", rows)
        res.json({
            message: "We got all users",
            body: rows
        })
    }
    catch (error) {
        res.send("error in getting all users")
    }
})

app.get('/myProfile', middleware, async (req, res) => {
    try {
        const [profile] = await pool.query('SELECT * FROM user_info WHERE name = ?', [req.user.name])
        console.log("profile is", profile[0])
        res.json({
            message: "I got my profile",
            body: profile[0]
        })
    }
    catch (error) {
        console.log("Error in my profile", error)
        res.send("error in my profile")
    }
})

app.put('/updateProfile', async (req, res) => {
    const { name, email, mobile } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE user_info SET email = ?, mobile = ? WHERE name = ?',
            [email, mobile, name]
        );
        res.status(200).send("Profile updated successfully");
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).send("Server error");
    }
});


app.listen(port, () => {
    console.log(`server running at ${port}`)
})