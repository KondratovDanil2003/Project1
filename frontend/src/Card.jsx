import { useState } from 'react'
import './App.css'
import CartApi from "../api.js";

const cartApi = new CartApi("http://localhost:5000");

export function RenderCart( {id, img, name, price,onAddToCart  } ) {

    const [isAdded, setIsAdded] = useState(false);

    const addClickBtn = async () => {
        setIsAdded(!isAdded);
            onAddToCart(id);
    }

    return (
        <>
            <div key={id} className="cardPizza">
                <img className="cardImgPizza" src={img} alt="card"/>
                <p className="cardNamePizza">{name}</p>
                <p className="cardPricePizza">{price} $ <span>500 gr.</span></p>
                <button onClick={() => addClickBtn()} id="byBtn" className="btn">
                    {isAdded ? 'Удалить' : 'Купить'}</button>
            </div></>
    )
}

export function RenderPizza( {id, img, name, price,quantity:initialQuantity } ) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const minusClickBtn = async () => {
        setQuantity(quantity - 1);
    }
    const plusClickBtn = async () => {
        setQuantity(quantity + 1);
    }
    return (
        <>
            <li key={id} className="cart__product-left-li">
                <div className="cart__product-left-img-heading">
                    <img src={img} alt="cart-img" className="cart__product-left-img"/>
                    <p className="cart__product-left-heading">{name} <span
                        className="cart__product-left-ingredients">Ingredients</span></p>
                </div>
                <div className="cart__product-left-buttons">
                    <button  onClick={() => minusClickBtn()} className="cart__product-left-buttons-minus">-</button>
                    <p className="cart__product-left-buttons-quantity">{quantity}</p>
                    <button onClick={() => plusClickBtn()} className="cart__product-left-buttons-plus">+</button>
                </div>
                <p className="cart__product-left-price">{price * quantity} $</p>
            </li>
        </>
    )
}



{/*<div id={`box-${id}`} className="box">*/
}
{/*    <div className="red"></div>*/
}
{/*    <div className="blue"></div>*/
}
{/*</div>*/
}