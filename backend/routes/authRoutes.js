import express from 'express'
import upload from '../middlewares/multer.js'
import { signUp,signIn,signOut } from '../controllers/authController.js'
const authRouter = express.Router()
authRouter.post('/signup', upload.single('photoUrl'), signUp)
authRouter.post('/signin',upload.none(), signIn)
authRouter.post('/signout', signOut)

export default authRouter