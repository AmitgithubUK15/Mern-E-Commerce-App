import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth'
import app from '../firebase';
import axios from 'axios';
import { SignSuccess } from '../redux/user/userSlice';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function OAuth() {
const dispatch = useDispatch();
const navigate = useNavigate();


  const handleGoogleRes = async () =>{
    
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app)
        
        const result = await signInWithPopup(auth,provider)
        

      
        const userDetail = {
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL,
        }
        const res = await axios.post('/api/auth/google',userDetail)

        const user = res.data;
     
        dispatch(SignSuccess(user));
        navigate("/")

    } catch (error) {
        console.log(error.message)
    }
  }
  return (
    <button
     onClick={handleGoogleRes}
     type="submit"
     className="bg-green-700  font-semibold p-3 rounded-lg text-white hover:opacity-80"
     >
    Continue With Google</button>
  )
}
