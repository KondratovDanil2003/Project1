import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    img: {type: String, required: true}
});

const cartSchema = new mongoose.Schema({
    userId : { type: String, required: true },
    allPizzas:[{
        pizzaId: {type: mongoose.Schema.Types.ObjectId,ref: 'Pizza', required: true},
        quantity: {type: Number, required: true},
    }]
});

const Pizza = mongoose.model('Pizza', pizzaSchema, 'pizza');
const Cart = mongoose.model('Cart', cartSchema,'carts');

export  {Pizza,Cart};