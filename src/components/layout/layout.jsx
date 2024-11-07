import { Outlet } from "react-router-dom";
import Navbar from "../navbar.jsx";
import "./layout.scss";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

function Layout() {
    return (
        <div className="layout"> 
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}

function RequireAuth() {
    
    const {currentUser} = useContext(AuthContext);
    
    if(!currentUser){
     return <Navigate to="/login" />
    }
    return (
        currentUser && (
                <div className="layout"> 
                    <div className="navbar">
                        <Navbar/>
                    </div>
                    <div className="content">
                        <Outlet/>
                    </div>
                </div>

            )
    )
}
export {Layout, RequireAuth};