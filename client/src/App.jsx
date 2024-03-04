import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Account from "./pages/Account"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

function App() {


  return ( <BrowserRouter>
     
     <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
     </Routes>
  </BrowserRouter>  
  )
}

export default App
