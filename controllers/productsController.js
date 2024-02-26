const { ProductModel } = require("../model/Products.model")


const addProducts=async(req,res)=>{
    const {title,description,price,availability,category,userId}=req.body
    
    try{
        let categoryId;
        if(category=="Clothes"){
            categoryId=1
        }else if(category==="Shoes"){
            categoryId=2
        }else if (category==="Electronics"){
            categoryId=3
        }else{
            categoryId=4
        }
        const products=new ProductModel({title,description,price,availability,category,categoryId:categoryId,userId})
        await products.save()
        return res.status(201).send({msg:"product addedd successfully"})

    }catch(err){
        res.status(500).send({ msg:"something went wrong try again hj"})
    }
}

const getProductsByCategoryId=async(req,res)=>{
    try{
        const categoryId=req.params.categoryId
        console.log(categoryId)
        const products=await ProductModel.find({categoryId})
        if(products.length===0){
          return res.status(200).send({msg:"no products found"})
        }
        console.log(products)
        res.status(200).send({products:products})


    }catch(err){
        res.status(500).send({ msg:"something went wrong try again hj"})
    }
}

const getproductById=async(req,res)=>{
    try{
        const productId= req.params.productId
        const product=await ProductModel.findById(productId)
        console.log(productId,"prooooo")
        res.status(200).send({product:product})

    }catch(err){
        res.status(500).send({ msg:"something went wrong try again hj"})
    }
}

module.exports={
    addProducts,
    getProductsByCategoryId,
    getproductById
}