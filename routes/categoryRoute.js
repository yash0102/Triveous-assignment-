const express=require("express")
const { authenticate } = require("../middleware/authenticat")
const { authorize } = require("../middleware/authorize")
const { getCategory } = require("../controllers/categorController")

const categoryRouter=express.Router()

categoryRouter.get("/getCategory",authenticate,authorize(["customer","seller"]),getCategory)

module.exports={
    categoryRouter
}