import express from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()
const router = express.Router();

export const register = async (req, res)=>{
    const {username, email, password} = req.body;

    try { 
        const hashedPswd = await bcrypt.hash(password, 10)
        
        const newUser = await prisma.users.create({
        data : {
            username,
            email,
            password : hashedPswd,
        },
        })
        res.send(hashedPswd)
    }catch(err){
        res.status(500).json({message:"failed to create user!!"})
    }
}

export const login  = async (req, res)=>{
   const {username, password} = req.body;
   
   try{
        const user = await prisma.users.findUnique({
            where : {
                username
            }
        })

        if(!user){
            return res.status(401).json({message:"invalid Credentials!!"})
        }
        
        const isPswd = await bcrypt.compare(password, user.password);
        if(!isPswd){
            return res.status(401).json({message:"invalid Credentials!!"})
        }
        
        const age = 1000 * 60 * 60 * 24 * 7 ;
        const token = jwt.sign({
            id: user.id,
            isAdmin: true,
        },process.env.JWT_SECRET_KEY
        );
        
        const {password:userPassword , ...userinfo} = user;

        res.cookie(
            "token",token,
            {
                httpOnly : true,
                maxAge : age
            }
        ).status(
            200).json
                  (userinfo)
   }catch(err){
    res.status(500).json({message:"failed to login!!","err":err})
   }
}

export const logout = (req, res)=>{
    res.clearCookie("token").status(200).json({message : "logout successfull"})
}

export default router;

