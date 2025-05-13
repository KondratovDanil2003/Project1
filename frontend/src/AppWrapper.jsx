import CartApi from "../api.js";
import {App,Cart} from './App.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
const cartApi = new CartApi("http://localhost:5000");

export function AppWrapper() {
    const [pizzaList, setPizzaList] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        cartApi.findAllPizzas().then(setPizzaList).catch(console.log);
        loadCart();
    }, []);

    const loadCart = () => {
        cartApi.cartPizzas("1")
            .then(data => setCartItems(data.allPizzas))
            .catch(console.log);
    };

    const handleAddToCart = (pizzaId) => {
        cartApi.addPizza("1", pizzaId, 1)
            .then(() => loadCart())
            .catch(console.log);
    };

    return (
        <>
            <div className="cart">
                <div className="wrapper">
                    <h1 className="cart__heading">Cart</h1>
                    <div className="cart__product">
                        <ul className="cart__product-left">
                            <Cart pizza={cartItems} />
                        </ul>
                        <h2 className="cart__product-right-heading">Total <span className="dopClass">:</span> <span
                            className="cart__product-right-price">  $100</span></h2>
                    </div>
                </div>
            </div>
            <div className="storeProducts">
                <div className="wrapper">
                    <div className="root">
                        <App pizza={pizzaList} onAddToCart={handleAddToCart} />
                    </div>
                </div>
            </div>
        </>
    );
}