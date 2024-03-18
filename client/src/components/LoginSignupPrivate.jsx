import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom";

export default function LoginSignupPrivate() {
    const {currentUser} = useSelector((state) => state.user);
    return currentUser ===null ?<Outlet />  :<Navigate to='/' />;
}
