import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from "../redux/userSlice";
const Profile = ({showProfile,setShowProfile}) => {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const { userData } = useSelector((state) => state.user)
    const logout = async () => {
        const res = await axios.post('http://localhost:8000/api/auth/signout', {}, { withCredentials: true })
         

        // ✅ redux update
        dispatch(setUserData(null));

        // ✅ navigate
        navigate("/");
        if (res.status === 200) {
            console.log('Logged out Successfully')
        }
    }
    return (
        <>
            <div className={`absolute mt-8 z-50 right-5   bg-gray-600 rounded-lg p-2 ${showProfile ? 'block' : 'hidden'}`}>
                {userData ? <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <img className='size-9 rounded-full' src={userData.photoUrl} alt='user'></img>
                        <div>
                            <h2 className='font-semibold text-lg text-center'>{userData.userName}</h2>
                            <p className='text-sm text-blue-400'>{userData.email}</p>
                            <button className='text-sm cursor-pointer text-red-400'>Create Channel</button>
                        </div>
                    </div>
                    <hr></hr>
                    <button onClick={logout} className='bg-blue-400 cursor-pointer rounded-lg font-semibold'>Logout</button>


                </div>
                    : <div className='flex flex-col gap-2'>
                        <button onClick={()=>navigate('/signin')} className='hover:bg-blue-800 cursor-pointer rounded-lg font-semibold py-1 px-3 bg-blue-700'>Login</button>
                        <button onClick={()=>navigate('/signup')} className='hover:bg-green-500 cursor-pointer rounded-lg font-semibold py-1 px-3 bg-green-400'>SignUp</button>
                    </div>

                }
            </div>
        </>
    )
}
export default Profile