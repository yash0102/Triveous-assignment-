const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../model/Auth.model")
require("dotenv").config()



const signUp=async(req,res)=>{
    const {name,email,password,role}=req.body

    try{

        const existingUser= await UserModel.findOne({email})
        console.log(existingUser)
        if(existingUser){
            return res.status(200).send({msg:"user already exists"})
        }
        bcrypt.hash(password,6, async function(err,hash){
            if(err){
                return res.status(400).send({msg:"something went wrong try again"})
            }
            const user=new UserModel({name,email,password:hash,role})
            await user.save()
            return res.status(201).send({msg:"signUp successfull"})

        })
       

    }
    catch(err){
        console.log(err)
        res.status(500).send({ msg:"something went wrong try again"})
    }
}



const logIn=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user =await UserModel.findOne({email})
        console.log(user)
        
        if(!user){
            return res.status(401).send({msg:'user not found'})
        }
        const isMatch=await bcrypt.compare(req.body.password, user.password)
        console.log(isMatch)
        if(!isMatch){
            return res.status(200).send({msg:"invalid credentials"})
        }
        const token=jwt.sign({userId:user._id,name:user.name,email:user.email,role:user.role},process.env.JWT_SECRET, {expiresIn:"1d"})
        res.status(200).send({msg:"login successfull",token:token})
       
        }
        catch(err){
            console.log(err)
            res.status(500).send({ msg:"something went wrong try again"})
        }
}


module.exports={
    signUp,
    logIn
}