import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../context/AuthContext";
import {format} from "timeago.js";
import apiRequest from "../../lib/api_request";
import { SocketContext } from "../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Chat({chats}){
    //console.log(chats)
    const [chat, setChat] = useState(null);
    const {currentUser} = useContext(AuthContext)
    const {socket} = useContext(SocketContext)

    const decrease = useNotificationStore((state) => state.decrease); 
   
    const messageEndRef = useRef()

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [chat]);

    const handleOpenChat = async (id,reciever)=>{
         try{
            const res = await apiRequest("/chats/"+id);
            if (!res.data.seenBy.includes(currentUser.id)) {
                decrease();
              }
            //console.log(res.data)
            setChat({...res.data, reciever});
         }catch(err){
            console.log(err)
         }
    }
    const handleSubmit = async (e)=>{
       e.preventDefault();

       const formData = new FormData(e.target);
       const text = formData.get("text");

       if(!text) return ;
       try{
        console.log(chat)
           const res = await apiRequest.post("/messages/"+chat.id,{text})
           setChat((prev)=>({...prev, messages : [...prev.messages, res.data]}))
           e.target.reset();
           console.log("data")
           console.log(res)
           socket.emit("sendMessage", {
            recieverId : chat.reciever.id,
                data : res.data,
           });
       }catch(err){
        console.log(err)
       }
    }

    useEffect(()=>{

        const read = async ()=>{
            try{
                await apiRequest.put("/chats/read/"+chat.id);
            }catch(err){
                console.log(err);
            }
        };

       if((chat && socket)){
         socket.on("getMessage", (data)=>{
            if(chat.id === data.chatId){
                setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
                read();
            }
         });
       }

       return () => {
        socket.off("getMessage");
      };
      
    }, [socket, chat])
    return (
        <div className="chat">
          <div className="messages">
            <h1>messages</h1>
            {chats?.map((c) => 
                    <div className="message" key={c.id}
                      style={{backgroundColor : c.seenBy.includes(currentUser.id) || chat?.id===c.id
                        ? "white" : "#fecd514e"}}
                      onClick={()=>{handleOpenChat(c.id, c.reciever)}}
                    >
                        <img src={c.reciever.avatar || "/noavatar.jpeg"} alt="" />
                        <span>{c.reciever.username}</span>
                        <p>{c.lastMessage}</p>
                    </div>
            )}
          </div>
          { 
            chat && <div className="chatBox">
            <div className="top">
                <div className="user">
                    <img src={chat.reciever.avatar || "/noavatar.jpeg"} alt="" />
                    <span>{chat.reciever.username}</span>
                </div>
                <span className="close" onClick={()=>{ setChat(null)}}>X</span>
            </div>
            <div className="center">
               {
                chat.messages.map((message, index) => {
                    return (
                    <div className="chatMessage" key={index}
                    style={{alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                        textAlign: message.userId === currentUser.id ? "right" : "left",
                    }}
                    >
                        <p>
                            {message.text}
                        </p>
                        <span>{format(message.createdAt)}</span>
                    </div>
                    )
                })
               }
               <div ref={messageEndRef}> 
                  
               </div>
            </div> 
            
            <form onSubmit={handleSubmit} className="bottom">
                <textarea name="text"></textarea>
                <button>Send</button>
            </form>
          </div>
         }
        </div>
    )
}

export default Chat;