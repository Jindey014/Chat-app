import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(400).json({ error: "Unauthorized - No Token Provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(400), json({ error: "Unauthorized - Invalid Token" })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(400).json({ error: "User not Found" })
        }
        req.user = user //  WE CAN THEN PASS THIS req.user  TO THE MESSAGE CONTROLLER
        next();
    } catch (error) {

        console.log('Error in protectRoute Middleware:' + error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

export default protectRoute