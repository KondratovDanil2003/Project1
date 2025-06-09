import { useState,useEffect } from 'react'
import './App.css'
import CartApi from "../api";
import {Pizza, ProductCart} from "./AppWrapper";

const cartApi = new CartApi("http://localhost:5000");

export interface Product {
    pizzaId:Pizza;
    quantity: number;
}

interface RenderCart {
    _id: string;
    img: string;
    name: string;
    price: number;
    onAddToCart: (id: string) => void;
    cart:Product[];
}

interface RenderPizza {
    _id: string;
    img: string;
    name: string;
    price: number;
    quantity: number;
    updateTotal: (id: string) => void;
}

export function FindPizza({_id,name,price,img,ingredient}:Pizza){
    return (
        <>
            <li className={'main-search-list-li'}>
                <img className={'main-search-list-li__img'} src={img} alt="find pizza"/>
                <p className={'main-search-list-li__heading'}>{name}
                <span className={'main-search-list-li__ingredients'}>{ingredient}</span></p>
                <p className={'main-search-list-li__price'}>{price}</p>
            </li>
        </>
    )
}

export function RenderCart( {_id, img, name, price,onAddToCart,cart  }:RenderCart ) {
    const [isAdded, setIsAdded] = useState(false);
    const [clickPoint, setClickPoint] = useState(false);

    // localStorage.clear();
    useEffect(() => {
        const isInCart = cart.some(item => item.pizzaId._id === _id && item.quantity > 0);
        setIsAdded(isInCart);
    }, [cart, _id]);

    const addClickBtn = async () => {
        onAddToCart(_id);
        setIsAdded(true);
        setClickPoint(true); // сбрасываем, чтобы анимация могла повторно сработать
    }

    return (
        <>
            <p className={`pop-up-window${clickPoint ? ' pop-up-window--active' : ''}`}>В корзине
                <img className="pop-up-window-img" src="./public/img/free-icon-check-14090371.png" alt="icon"/>
            </p>
            <div key={_id} className="cardPizza">
                <img className="cardImgPizza" src={img} alt="card"/>
                <p className="cardNamePizza">{name}</p>
                <p className="cardPricePizza">{price} $ <span>500 gr.</span></p>
                <button onClick={() => addClickBtn()} id="byBtn" className={`btn${isAdded ? ' btn--added' : ''}`}>
                    {isAdded ? 'Добавлено' : 'Купить'}</button>
            </div></>
    )
}

export function RenderPizza( {_id, img, name, price,quantity:initialQuantity,updateTotal  }:RenderPizza ) {
    const [quantity, setQuantity] = useState(initialQuantity);
    useEffect(() => {
        updateTotal(_id);
    }, [quantity]);
    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);
    const minusClickBtn = async () => {
        if(quantity === 1){
            setQuantity(quantity - 1);
            updateTotal(_id);
            setTimeout(()=>{
                cartApi.minusPizza("1", _id).then((result:ProductCart) => {
                    // const item = result.allPizzas.find(element => (element.pizzaId).toString() === _id);
                    // if(item) {
                    //     setQuantity(item.quantity);
                    // }
                    updateTotal(_id);
                })
            },600)
        }
        else{
            cartApi.minusPizza("1", _id).then((result:ProductCart) => {
                const item = result.allPizzas.find(element => (element.pizzaId).toString() === _id);
                if(item) {
                    setQuantity(item.quantity);
                }
                updateTotal(_id);
            })
        }
    }
    const plusClickBtn = async () => {
        cartApi.plusPizza("1", _id).then((result:ProductCart) => {
            const item = result.allPizzas.find(element => (element.pizzaId).toString() === _id);
            if (item) {
                if(item.quantity > 0){
                    setQuantity(item.quantity);
                    updateTotal(_id);
                }
            }
        })
    }
    return (
        <>
            <li key={_id} className={`cart__product-left-li added-card${quantity === 0 ? ' delete-card' : ''}`}>
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