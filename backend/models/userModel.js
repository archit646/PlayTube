import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    photoUrl: {
        type: String,
        default:''
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    }


}, { timestamps: true })
const User = mongoose.model('User', userSchema)
export default User