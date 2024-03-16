import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Account from "./pages/Account"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Cart from "./pages/Cart"
import Liked from "./pages/Liked"
import {  useSelector } from "react-redux"
import UpdateProfile from "./pages/UpdateProfile"
import SignupVendor from "./pages/SignupVendor"
import Vendorlogin from "./pages/Vendorlogin"
import PrivateRoute from "./components/PrivateRoute"
import ProductDetailsPage from "./pages/ProductDetailsPage"





function App() {

//  const {currentUser} = useSelector((state)=>state.user)

 

  return ( <BrowserRouter>
     
     <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/liked" element={<Liked />} />
      <Route path='/updateProfile' element={<UpdateProfile />} />
      <Route path="/signupVendor" element={<SignupVendor />} />
      <Route path="/loginvendor" element={<Vendorlogin />} />
      <Route element={<PrivateRoute />} >
      <Route path="/account" element={<Account />} />
      <Route path="/productDetails/:productid" element={<ProductDetailsPage />} />

      </Route>
   
     </Routes>
  </BrowserRouter>  
  )
}

export default App
