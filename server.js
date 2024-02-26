const express=require("express");
const app=express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bodyParser = require('body-parser')
const YAML = require('yamljs')
const dotenv=require('dotenv');
const swaggerDocument=YAML.load("./swagger.yaml")
const { connection } = require("./config/db");
const { userRouter } = require("./routes/authRoutes");
const { productRouter } = require("./routes/productRoute");
const { categoryRouter } = require("./routes/categoryRoute");
const { cartRouter } = require("./routes/cartRouter");
const { orderRouter } = require("./routes/orderRouter");
dotenv.config();


app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Trivous Backend")
})

app.use("/",userRouter)
app.use("/",productRouter)
app.use("/",categoryRouter)
app.use("/",cartRouter)
app.use("/",orderRouter)

const port=process.env.PORT ||8000
app.listen(port,async()=>{
    try{
      await connection
      console.log("connected to mongoDB...")
    }catch(err){
        console.log("something wrong in Mongo Connection", err)
    }
    console.log(`server running on port ${port}`)
})