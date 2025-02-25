import express from "express";
import authRoute from "../api/routes/auth.route.js";
import testRoute from "../api/routes/test.route.js";
import cookieParser from "cookie-parser";
import userRoute from "../api/routes/user.route.js";
import postRoute from "../api/routes/post.route.js";
import chatRoute from "../api/routes/chat.route.js";
import messageRoute from "../api/routes/message.route.js";

import cors from "cors";

const app = express()

app.use(cors({origin:process.env.CLIENT_URL, credentials:true}))
app.use(express.json())
app.use(cookieParser());

const port = process.env.port || 3000

app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/auth", authRoute)
app.use("/api/test", testRoute)
app.use("/api/messages", messageRoute)
app.use("/api/chats", chatRoute)



app.listen(port,()=>console.log(`server is listening on port ${port}`))