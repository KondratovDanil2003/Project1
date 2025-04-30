import express from "express";

const router = express.Router();

import {Pizza} from "./server.js";

router.get("/pizzas",async (req,res)=>{
    try {
        const pizzas = await Pizza.find().lean()
        res.status(200).json(pizzas);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

export default router;