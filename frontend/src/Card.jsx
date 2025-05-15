import { useState } from 'react'
import './App.css'
import CartApi from "../api.js";

const cartApi = new CartApi("http://localhost:5000");


export function RenderCart( {id, img, name, price,onAddToCart  } ) {
    const added = JSON.parse(localStorage.getItem("addedPizzas") || "[]");

    const [isAdded, setIsAdded] = useState(added.includes(id));
    const [clickPoint, setClickPoint] = useState(false);


    const addClickBtn = async () => {

        if (!added.includes(id)) {
            onAddToCart(id);
            added.push(id);
            localStorage.setItem('addedPizzas', JSON.stringify(added));
            setIsAdded(true);
            setClickPoint(true);
        }
    }

    return (
        <>
            <p onClick={() => addClickBtn()} className={`pop-up-window${clickPoint ? ' pop-up-window--active' : ''}`}>В корзине
                <img className="pop-up-window-img" src="./public/img/free-icon-check-14090371.png" alt="icon"/>
            </p>
            <div key={id} className="cardPizza">
                <img className="cardImgPizza" src={img} alt="card"/>
                <p className="cardNamePizza">{name}</p>
                <p className="cardPricePizza">{price} $ <span>500 gr.</span></p>
                <button onClick={() => addClickBtn()} id="byBtn" className={`btn${isAdded ? ' btn--added' : ''}`}>
                    {isAdded ? 'Добавлено' : 'Купить'}</button>
            </div></>
    )
}

export function RenderPizza( {id, img, name, price,quantity:initialQuantity,updateTotal  } ) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const minusClickBtn = async () => {
        cartApi.minusPizza("1", id).then((result) => {
            const item = result.allPizzas.find(element => (element.pizzaId).toString() === id);
            if (item.quantity > 0) {
                setQuantity(item.quantity);
                updateTotal(id);
            }
        })
    }
    const plusClickBtn = async () => {
        cartApi.plusPizza("1", id).then((result) => {
            const item = result.allPizzas.find(element => (element.pizzaId).toString() === id);
            if (item) {
                if(item.quantity > 0){
                    setQuantity(item.quantity);
                    updateTotal(id);
                }
            }
        })
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