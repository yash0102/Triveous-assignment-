const express=require("express")
const { signUp, logIn } = require("../controllers/authController")

const userRouter=express.Router()



userRouter.post("/signUp",signUp)
userRouter.post("/login",logIn)

module.exports={
    userRouter
}