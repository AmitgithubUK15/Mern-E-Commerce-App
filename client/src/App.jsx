import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Account from "./pages/Account"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Cart from "./pages/Cart"
import Liked from "./pages/Liked"
import UpdateProfile from "./pages/UpdateProfile"
import SignupVendor from "./pages/SignupVendor"
import Vendorlogin from "./pages/Vendorlogin"
import PrivateRoute from "./components/PrivateRoute"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import LoginSignupPrivate from "./components/LoginSignupPrivate"
import UpdateProduct from "./pages/UpdateProduct"
import ProductListing from "./pages/ProductListing"
import Footer from "./components/Footer"
import ItemDetailsUser from "./pages/ItemDetailsUser"
import CheckOutBuying from "./pages/CheckOutBuying"
import SearchResult from "./pages/SearchResult"





function App() {


  return ( <BrowserRouter>
     
     <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
       <Route element={<LoginSignupPrivate />} >
       <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signupVendor" element={<SignupVendor />} />
      <Route path="/loginvendor" element={<Vendorlogin />} />
       </Route>

      <Route path="/cart" element={<Cart />} />
      <Route path="/liked" element={<Liked />} />
      <Route path="/itemDetails/:productId" element={<ItemDetailsUser />} />
      <Route path="/search" element={<SearchResult />} />

      <Route element={<PrivateRoute />} >
      <Route path="/account" element={<Account />} />
      <Route path="/productDetails/:productid" element={<ProductDetailsPage />} />
      <Route path='/updateProfile' element={<UpdateProfile />} />
      <Route path="/productupdate/:productid" element={<UpdateProduct />} />
      <Route path="/checkout/:productId/:sizeValues" element={<CheckOutBuying />} />
      {/* <Route path="/productlisting" element={<ProductListing />} /> */}
      </Route>
   
     </Routes>
  
  </BrowserRouter>  
  )
}

export default App
