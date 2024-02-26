const { ProductModel } = require("../model/Products.model")


const getCategory=async(req,res)=>{
    try{
         const product=await ProductModel.find()
        //  const category=product.category
        let obj={}
         for(let i=0;i<product.length;i++){
            if(product[i].category==="Clothes"){
                obj[product[i].category]="categoryId => 1"
            }else if(product[i].category==="Shoes"){
                obj[product[i].category]="categoryId => 2"
            }else if(product[i].category==="Electronics"){
                obj[product[i].category]="categoryId => 3"
            }else{
                obj[product[i].category]="categoryId => 4"
            }
           
        }
         res.status(200).send({categories:obj})
    }catch(err){
        res.status(500).send({ msg:"something went wrong try again hj"})
    }
}

module.exports={
    getCategory
}