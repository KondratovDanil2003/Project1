import express from "express";

const router = express.Router();

import {Pizza,Cart} from "./models.js";



router.get("/pizzas",async (req,res)=>{
    try {
        const pizzas = await Pizza.find().lean();
        res.status(200).json(pizzas);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.post("/cart",async (req,res)=>{
    const {userId,pizzaId,quantity} = req.body;
    try {
    const pizza = await Pizza.findById(pizzaId);
    if (!pizza) {
        return res.status(404).json({ message: "Pizza not found!" });
    }
    /** @type {import('./server.js').Cart} */
    let cart = await Cart.findOne({userId});
    if (!cart) {
        cart = new Cart({
            userId,
            allPizzas:[{pizzaId, quantity}],
        });
    }
    else{
        const pizzaInCart = cart.allPizzas.find((item)=> (item.pizzaId).toString() === pizzaId);
        if(pizzaInCart) {
            pizzaInCart.quantity += quantity;
        }
        else{
            cart.allPizzas.push({pizzaId,quantity});
        }
    }
        await cart.save();
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json({ message:err.message });
    }
})

router.get(`/cart/:userId`,async (req, res)=>{
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({userId: String(userId)}).populate('allPizzas.pizzaId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found!" });
        }
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})
export default router;