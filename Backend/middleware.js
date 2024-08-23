const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
        const token = req.header('x-token')
        if (!token) {
            res.send('token not found')
        }
        let decoded = jwt.verify(token, 'jwtPassword')
        req.user = decoded.user
        next();
    } catch (err) {
        console.log("error in authentication", err)
        return res.status(404).send('Authentication error')
    }
}