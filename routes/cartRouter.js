const express=require("express")
const { authenticate } = require("../middleware/authenticat")
const { authorize } = require("../middleware/authorize")
const { addToCart, getCart, updateCartItemQuantity, removeCartItem } = require("../controllers/cartController")
const cartRouter=express.Router()

cartRouter.post("/addToCart/",authenticate,authorize(["customer"]),addToCart)
cartRouter.get("/getCart",authenticate,authorize(["customer"]),getCart)
cartRouter.put("/updateCartProductQuantity/:productId",authenticate,authorize(["customer"]),updateCartItemQuantity)
cartRouter.delete("/removeCartItem/:productId",authenticate,authorize(["customer"]),removeCartItem)

module.exports={
    cartRouter
}