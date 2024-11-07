import { useState ,useContext} from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import {useNotificationStore} from "../lib/notificationStore.js";

function Navbar() {
    const [open, setOpen] = useState(false);
    const {currentUser} = useContext(AuthContext)
    const fetch = useNotificationStore(state=>state.fetch)
    const number = useNotificationStore(state=>state.number)

    fetch();

    return (
        <div className="nav">
            <div className="left">
                <a href="/" className="logo">
                    <img src="/logo.png" alt="logo" />
                    <span>EstateHaven</span>
                </a>
                <a href="/">Home</a>
                <a href="/">About</a> 
                <a href="/">Contact</a>
                <a href="/">Agents</a>
            </div>
            <div className="right">
                {
                    currentUser ? (
                        <div className="user"> 
                          <img src={currentUser.avatar || "/noavatar.jpeg"} alt="" />
                          <span>{currentUser.username}</span>
                          <Link to="/profile" className="profile">
                            {number>0 && <div className="notification">{number}</div>}
                                <span>Profile</span>
                          </Link>
                        </div>
                    ):(
                        <>
                          <a href="/login">SignIn</a>
                          <a href="/register" className='register'>Sign up</a>
                        </>
                    )
                }
              
                <div className="menuIcon">
                    <img  onClick={()=>setOpen((open)=>!open)} src="/menu.png" alt="menu" />
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <a href="/">Home</a>
                    <a href="/">About</a>
                    <a href="/">Others</a>
                    <a href="/">SignIn</a>
                    <a href="/">Register </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar;