import jwt from 'jsonwebtoken'
const isAuth = (req, res,next) => {
    try {
        let token = req.cookies?.token
       console.log("cookies:", req.cookies)
        if (!token) {
            return res.status(401).json({message:"User Does not Have Token"})
        }
        let verifyToken =  jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(401).json({message:"User Does not Have Valid Token"})
        }
        req.userId = verifyToken.userId
        next()
    }
    catch (error) {
        res.status(401).json({message:"middleware Error", error: error.message})
        console.log(error)
        
    }
}
export default isAuth