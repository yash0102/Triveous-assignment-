const express=require("express")
const { addProducts, getProductsByCategoryId, getproductById } = require("../controllers/productsController")
const { authenticate } = require("../middleware/authenticat")
const { authorize } = require("../middleware/authorize")

const productRouter=express.Router()

productRouter.post("/addProduct",authenticate,authorize(["seller"]),addProducts)
productRouter.get("/getProductsById/:categoryId",authenticate,authorize(["seller","customer"]),getProductsByCategoryId)
productRouter.get("/getProductByProductId/:productId",authenticate,authorize(["seller","customer"]),getproductById)

module.exports={
    productRouter
}