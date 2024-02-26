const express=require("express")
const { authenticate } = require("../middleware/authenticat")
const { authorize } = require("../middleware/authorize")
const { placeOrder, getOrderHistory, getOrderById } = require("../controllers/orderController")

const orderRouter=express.Router()

orderRouter.post("/placeOrder",authenticate,authorize(["customer"]),placeOrder)
orderRouter.get("/getOrderHistory",authenticate,authorize(["customer"]),getOrderHistory)
orderRouter.get("/getOrderDetails/:orderId",authenticate,authorize(["customer"]),getOrderById)

module.exports={
    orderRouter
}