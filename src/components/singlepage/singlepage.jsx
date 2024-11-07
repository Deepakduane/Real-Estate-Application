import Slider from "../slider/slider";
import "./singlepage.scss";
import { userData} from "../../lib/dummydate.js";
import Map from "../map/map.jsx";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import apiRequest from "../../lib/api_request.js";
import { AuthContext } from "../context/AuthContext.jsx";

function SinglePage () {
   const post = useLoaderData();
   //console.log(post.userId)
   //console.log(post.isSaved)
   const {currentUser} = useContext(AuthContext);
   const navigate = useNavigate();
   const [saved, setSaved] = useState(post.isSaved);
   
   const handleClick = async ()=>{
    if(!currentUser){
        navigate("/login");
     }
     setSaved((prev) => !prev);
     try{
         await apiRequest.post("/chats", {recieverId : post.userId})
         navigate("/profile");
      }catch(err){
         console.log("error"+err);
      }
   }
   const handleSave = async ()=>{
        if(!currentUser){
           navigate("/login");
        }
        setSaved((prev) => !prev);
        try{
            await apiRequest.post("/users/save",{ postId:post.id})

         }catch(err){
            console.log("error"+err);
            setSaved((prev) => !prev);
         }
   }

    return (
        <div className="single-page">
           <div className="details">
            <div className="wrapper">
               <Slider images={post.images} />
               <div className="info">
                <div className="top">
                    <div className="post">
                        <h1>{post.title}</h1>
                        <div className="address">
                            <img src="/pin.png" alt="pin" />
                            <span>{post.address}</span>
                        </div>
                        <div className="price">
                            $ {post.price}
                        </div>
                    </div>
                    <div className="user">
                        <img src={post.user.avatar} alt="user" />
                        <span>{post.user.username}</span>
                    </div>
                </div>
                <div className="bottom" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.postDetail.desc)}}></div>
               </div>
            </div>
           </div>
           <div className="features">
              <div className="wrapper">
                 <p className="title">General</p>
                 <div className="listVertical">
                    <div className="feature">
                        <img src="/utility.png" alt="utility" />
                        <div className="featureSpan">
                            <span>Utilities</span>
                            {
                             post.utilites === "owner" ? <p>Owner is responsible</p> : <p>Tenant is responsible</p>
                            }
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/pet.png" alt="utility" />
                        <div className="featureSpan">
                            <span>Pet Policy</span>
                            {
                             post.postDetail.pet === "allowed" ? <p>Pets allowed</p> : <p>Pets not allowed</p>
                            }
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/fee.png" alt="utility" />
                        <div className="featureSpan">
                            <span>Income policy Fees</span>
                            <p>{post.postDetail.income}</p>
                        </div>
                    </div>
                 </div>
                 <p className="title">Sizes</p>
                 <div className="sizes">
                    <div className="size">
                        <img src="/size.png" alt="size" />
                        <span>{post.postDetail.size} Sq. feet</span>
                    </div>
                    <div className="size">
                        <img src="/bed.png" alt="size" />
                        <span>{post.bedroom} Bedroom</span>
                    </div>
                    <div className="size">
                        <img src="/bath.png" alt="size" />
                        <span>{post.bathroom} Bathroom</span>
                    </div>
                 </div>
                 <p className="title">Nearby Places</p>
                 <div className="listHorizontal">
                     <div className="feature">
                        <img src="/school.png" alt="school" />
                        <div className="featureSpan">
                            <span>School</span>
                            <p>{post.postDetail.school}m away</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/bus.png" alt="utility" />
                        <div className="featureSpan">
                            <span>Bus Stop</span>
                            <p>{post.postDetail.bus}m away</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/restaurant.png" alt="utility" />
                        <div className="featureSpan">
                            <span>Restaurant</span>
                            <p>{post.postDetail.restaurant}m away</p>
                        </div>
                    </div>  
                 </div>
                 {/* <p className="title">Location</p> */}
                 {/* <div className="mapContainer">
                    { <Map items={[post]}/>  }
                 </div> */}
                 <div className="buttons">
                    <button onClick={handleClick}> 
                        <img src="/chat.png" alt="chat" />
                         Send a Message
                    </button>
                    <button  style={{
                            backgroundColor: saved ? "#fece51" : "white",
                          }}
                          onClick={handleSave}>
                        <img src="/save.png" alt="" />
                          {saved ? "Place Saved" : "Save the Place"}
                    </button>
                 </div>
              </div>
           </div>
        </div>
    )
}

export default SinglePage;