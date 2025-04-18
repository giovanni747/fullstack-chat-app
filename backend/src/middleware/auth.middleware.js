import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute  = async (req,res,next) => {
    try {
        const token = req.cookies.jwt
        console.log("Cookies:", req.cookies);
        console.log("JWT Token:", token);
        
        if(!token){
            return res.status(401).json({ message: 'Unauthorized - No Token Provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) // getting the id and decoded via NEED secret
        if(!decoded){
            return res.status(401).json({ message: 'Unauthorized - No Token Provided'});
        }

        const user = await User.findById(decoded.userId).select("-password")
        if(!user) {
            return res.status(401).json({ message: 'User not found'});
        }
        req.user = user
        next()

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message)
        return res.status(500).json({ message: 'Internal server error'});
    }
}