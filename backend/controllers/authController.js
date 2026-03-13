import User from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import genToken from '../config/token.js'
import uploadOnCloudinary from '../config/cloudinary.js'
export const signUp = async (req, res) => {
    const { userName, email, password } = req.body
    try {
        let photoUrl
        if (req.file) {
            photoUrl = await uploadOnCloudinary(req.file.path)
        }
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(409).json({ message: "User Already Exists" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password is too short" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = User.create({
            userName,
            email,
            password: hashPassword,
            photoUrl
        })
        const token = genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        })
        return res.status(201).json({ message: "User Created Successfully"})
    }
    catch (error) {
        console.log("User Creation Failed", error)
        return res.status(400).json({ message: "User Creation Failed" })
        
    }
}
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not Found" })
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Incorrect Password" })
        
        }
        const token = genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        })
        return res.status(201).json({ message: "Login Successfully", user })
    }
    catch (error) {
        return res.status(400).json('something went wrong')
    }
    
}
export const signOut = async (req, res) => {
    try {
        await res.clearCookie("token")
        return res.status(201).json({message:"SignOut Successfully"})
    }
    catch (error) {
        return res.status(409).json({message:"SignOut Failed"})
    }
    
}