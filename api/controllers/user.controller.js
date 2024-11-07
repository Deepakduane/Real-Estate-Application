import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt"

export const getUsers = async (req, res)=>{
    try {
       const user  = await prisma.users.findMany();
       res.status(200).json(user)
    }catch(err){
        res.status(500).json({message:"failed to get users!"})
    }
}

export const getUser = async (req, res)=>{
    const id = req.params.id;
    try {
        const user  = await prisma.users.findUnique({
            where : { id : id },
        }
        );
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({message:"failed to get users!"})
    }
}

export const updateUser = async (req, res)=>{
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password, avatar, ...inputs } = req.body;
   
    if(id !== tokenUserId){
        return res.status(403).json({message : "not authorised !!"})
    }
    try {
        let updatedPassword = null;
        let updatedAvatar = null;

        if(password){
             updatedPassword = await bcrypt.hash(password,10);
        }
        
        if(avatar){
            updatedAvatar = avatar;
       }

        const updatedUser  = await prisma.users.update({
            where : { id : id },
            data :{
                ...inputs,
                ...( updatedPassword && { password : updatedPassword }),
                ...( updatedAvatar && { avatar : updatedAvatar }),
            }
        }
        );
        res.status(200).json(updatedUser);
   
    }catch(err){
        res.status(500).json({message:"failed to get users!"})
    }
}

export const deleteUser = async (req, res)=>{
    const id = req.params.id;
    const tokenUserId = req.userId;
   
    if(id !== tokenUserId){
        return res.status(403).json({message : "not authorised !!"})
    }
    try {


        const updatedUser  = await prisma.users.delete({
            where : { id : id }
        }
        );
        res.status(200).json({message : "user Deleted !!"});
    }catch(err){
        res.status(500).json({message:"failed to get users!"})
    }
}

export const savePost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;
  
    try {
      const savedPost = await prisma.savedPost.findUnique({
        where: {
          userId_postId: {
            userId: tokenUserId,
            postId,
          },
        },
      });
  
      if (savedPost) {
        await prisma.savedPost.delete({
          where: {
            id: savedPost.id,
          },
        });
        res.status(200).json({ message: "Post removed from saved list" });
      } else {
        await prisma.savedPost.create({
          data: {
            userId: tokenUserId,
            postId,
          },
        });
        res.status(200).json({ message: "Post saved" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to delete users!" });
    }
  };

export const profilePosts = async (req, res) => {
    const tokenUserId = req.userId;
    try {
      const userPosts = await prisma.post.findMany({
        where: { userId: tokenUserId },
      });
      const saved = await prisma.savedPost.findMany({
        where: { userId: tokenUserId },
        include: {
          post: true,
        },
      });
  
      const savedPosts = saved.map((item) => item.post);

      res.status(200).json({ userPosts, savedPosts });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get profile posts!" });
    }
  };

  export const  getNotificationNumber = async( req, res)=>{
    const tokenUserId = req.userId;
    console.log(tokenUserId);
    try{
       const number = await prisma.chat.count({
        where: {
           userIDs :{
            hasSome : [tokenUserId],
           },
           NOT:{
            seenBy :{
              hasSome :[tokenUserId]
            },
           },
        },
       });

       res.status(200).json(number);
    }catch (err) {
      console.log(err);
      res.status(500).json({ message: "NOt able to fetch notifications!!" });
    }
  }