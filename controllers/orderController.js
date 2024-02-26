const { CartModel } = require("../model/Cart.model");
const { OrderModel } = require("../model/Order.model");



const placeOrder = async (req, res) => {
    try {
        const {userId,productId, quantity} = req.body;
        let cart = await CartModel.findOne({ userId });
        console.log(cart,"ccarrttt",cart.items.length === 0)
        if (!cart || cart.items.length === 0) {
          return res.status(400).send({ err: 'Cart is empty' });
        }
    
        console.log(productId,quantity,"jjjjj")
        if (!productId || !quantity || quantity <= 0) {
          return res.status(400).send({ err: 'Product ID and a valid quantity are required' });
        }
    
        const cartItem = cart.items.find(item => item.productId.toString() === productId);
        console.log(cartItem,"hhhhhh")
    
        if (!cartItem) {
          return res.status(404).send({ err: 'Product not found in the cart' });
        }
    
        const totalPrice = cartItem.price * quantity;
    
        const orderItem = {
          productId: cartItem.productId,
          title:cartItem.title,
          price:cartItem.price,
          quantity,
        };
    
        const order = new OrderModel({
           userId,
          items: [orderItem],
          totalAmount: totalPrice
          
        });
    
        await order.save();
    
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
    
        res.status(200).send({ msg: 'Specific order placed successfully', order });
      } catch (err) {
        res.status(500).send({ err: 'Internal server error' });
      }
  };


  const getOrderHistory = async (req, res) => {
    try {
      const {userId} = req.body;
      console.log(userId)
  
      const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
  
      res.status(200).send({msg:"Fetched order history Successfully", orders });
    } catch (err) {
      res.status(500).send({ err: 'Internal server error' });
    }
  };


  const getOrderById = async (req, res) => {
    try {
      const {userId} = req.body;
      const orderId = req.params.orderId;
  
      
      const order = await OrderModel.findOne({ _id: orderId,  userId });
  
      if (!order) {
        return res.status(404).send({ err: 'Order not found' });
      }
  
      res.status(200).send({msg:"Fetched order history Successfully", order })
    } catch (err) {
        res.status(500).send({ err: 'Internal server error' });
    }
  };


  module.exports={
    placeOrder,
    getOrderHistory,
    getOrderById
  }