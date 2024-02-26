const { UserModel } = require("../model/Auth.model");
const { CartModel } = require("../model/Cart.model");
const { ProductModel } = require("../model/Products.model");

const addToCart=async(req,res)=>{
    try {
      const {userId} = req.body;
      console.log(userId,"userrrrr")
    const productId = req.body.productId;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }


    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

  
    let cart = await CartModel.findOne({ userId });
    console.log(cart,"cart")
    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    const existingCartItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingCartItem) {
      existingCartItem.quantity += 1;
      existingCartItem.total = existingCartItem.price * existingCartItem.quantity;
    } else {
      cart.items.push({
        productId,
        quantity: 1,
        title: product.title,
        price: product.price,
        total: product.price,
      });
    }

    
    await cart.save();

    res.status(201).send({ msg: 'Product added to cart successfully' ,cart});
    
      } catch (err) {
        res.status(500).json({ err: 'Internal server error' });
      }
}


const getCart = async (req, res) => {
  try {
    const {userId} = req.body;

    const cart = await CartModel.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).send({ err: 'Cart not found' });
    }

    res.json({ cart });
  } catch (err) {
    res.status(500).send({ err: 'Internal server error' });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {

    const {userId} = req.body;
    const productId = req.params.productId;
    const newQuantity = req.body.quantity;

    if (!productId || !newQuantity || newQuantity <= 0) {
      return res.status(400).send({ err: 'Product ID and a valid quantity are required' });
    }

    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).send({ err: 'Cart not found' });
    }

    const cartItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    console.log(cartItemIndex,"kkkkk")
    if (cartItemIndex === -1) {
      return res.status(404).send({ err: 'Product not found in the cart' });
    }
   
    cart.items[cartItemIndex].quantity  =cart.items[cartItemIndex].quantity+ newQuantity;
    console.log(cart.items[cartItemIndex].quantity,"gtgtgt",newQuantity)
    cart.items[cartItemIndex].total = cart.items[cartItemIndex].price * cart.items[cartItemIndex].quantity;

    await cart.save();

    res.status(200).send({ msg: 'Cart item updated successfully' });

    
  } catch (err) {
    res.status(500).send({ err: 'Internal server error' });
  }
};


const removeCartItem = async (req, res) => {
  try {
    const {userId} = req.body;
    const productId = req.params.productId;

    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (cartItemIndex === -1) {
      return res.status(404).send({ error: 'Product not found in the cart' });
    }

    cart.items.splice(cartItemIndex, 1);

    await cart.save();

    res.status(200).send({ msg: 'Cart item removed successfully' });
  } catch (err) {
    res.status(500).send({ err: 'Internal server error' });
  }
};

module.exports={
    addToCart,
    getCart,
    updateCartItemQuantity,
    removeCartItem
}