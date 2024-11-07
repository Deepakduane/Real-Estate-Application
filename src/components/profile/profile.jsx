import List from "../list/list";
import "./profile.scss";
import { useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/api_request.js";
import Chat from "../chat/chat";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link, Await } from "react-router-dom";
import { Suspense } from "react";

function Profile() {
    
    const data = useLoaderData();
    
    //console.log(data.chatResponse.data)
    const {updateUser, currentUser} = useContext(AuthContext)
    const navigate = useNavigate();


    const handleLogout= async()=>{
        try{
            await apiRequest.post("/auth/logout");
            updateUser(null)
            navigate("/")
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                        <div className="title">
                            <h1>User information</h1>
                            <Link to="/profile/update">
                                <button>update Profile</button>
                            </Link>
                        </div>
                        <div className="info">
                            <span>Avatar: <img src={currentUser.avatar || "/noavatar.jpeg"} alt="" /></span>
                            <span>username :<b>{currentUser.username}</b></span>
                            <span>email :<b>{currentUser.email}</b></span>
                            <button onClick={handleLogout}>LogOut</button>
                        </div>
                        <div className="title">
                            <h1>My List</h1>
                            <Link to={"/add"}>
                               <button>create new post</button>
                            </Link>
                        </div>
                        <div>
                            <Suspense fallback={<p>Loading...</p>}>
                                <Await
                                resolve={data.postResponse}
                                errorElement={<p>Error loading posts!</p>}
                                >
                                {(postResponse) => <List posts={postResponse.data.userPosts} />}
                                </Await>
                            </Suspense>
                        </div>
                        <div className="title">
                            <h1>Saved List</h1>
                        </div>
                        <Suspense fallback={<p>Loading...</p>}>
                            <Await
                            resolve={data.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                            >
                            {(postResponse) => <List posts={postResponse.data.savedPosts} />}
                            </Await>
                        </Suspense>
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Suspense fallback={<p>Loading...</p>}>
                            <Await
                                resolve={data.chatResponse}
                                errorElement={<p>Error loading chats!</p>}
                            >
                                {(chatResponse) => <Chat chats={chatResponse.data} />}
                            </Await>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Profile;