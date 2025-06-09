import CartApi from "../api";
import {App,Cart,Find} from './App'
import { useState } from 'react'
import { useEffect } from 'react'
const cartApi = new CartApi("http://localhost:5000");


export interface Pizza{
    _id: string;
    name: string;
    price: number;
    img: string;
    ingredient: string[];
}

export interface Product {
    pizzaId:Pizza;
    quantity: number;
}

export interface ProductCart {
    _id: string;
    userId: string;
    allPizzas: Product[];
}


export function AppWrapper() {
    const [pizzaList, setPizzaList] = useState<Pizza[]>([]);
    // если дальше мы где-то используем pizzaList, то тогда нужно указать его значение <Pizza[]>
    // Теперь TypeScript знает, что pizzaList — это массив объектов типа Pizza, и ты получаешь:
    //
    //     Автодополнение (TS подскажет .name, .price, .img);
    //
    // Проверку типов (ошибку, если ты случайно напишешь pizza.naem);
    //
    // Безопасность при передаче в другие компоненты.
    const [cartItems, setCartItems] = useState<Product[]>([]);
    // тип нужно указывать, когда:
    // Когда начальное значение null или undefined
    // Когда useState([])
    const [total, setTotal] = useState<number>();
    const [isUpdatingTotal, setIsUpdatingTotal] = useState(false);
    const [findPizza, setFindPizza] = useState<Pizza[]>([]);

    useEffect(() => {
        cartApi.findAllPizzas().then(setPizzaList).catch(console.log);
        loadCart();
    },[] ); // без значения [] цикл будет бесконечный при загрузке страницы

    const loadCart = () => {
        setIsUpdatingTotal(true);
        cartApi.cartPizzas("1")
            .then((data:ProductCart) => {
                setCartItems(data.allPizzas);
            })
            .catch(console.log).finally(() => {
            setTimeout(()=>setIsUpdatingTotal(false),650); // и убираем флаг после завершения
        });
    };
    useEffect(() => {
        const sum = cartItems.reduce((acc, item) => acc + item.pizzaId.price * item.quantity, 0);
        setTotal(sum);
    },[cartItems]);



    const handleAddToCart = (id:string) => {
        cartApi.addPizza("1", id, 1)
            .then(() => loadCart())
            .catch(console.log);
    };

    const filterPizza = (name: string) => {
        setFindPizza(pizzaList.filter((item) => item.name.toLowerCase().includes(name.toLowerCase())));
        console.log(pizzaList.filter((item) => item.name.toLowerCase().includes(name.toLowerCase())));
        // onChange={(e) => filterPizza(e.target.value)}
    }


    return (
        <>
            <div className="cart">
                <div className="wrapper">
                    <div className="search">
                        <input onChange={(e) => filterPizza(e.target.value)} type="text" className="main-search"/>
                        <ul className="main-search-list">
                            <Find pizza={findPizza}/>
                        </ul>
                    </div>
                    <div className="cart__heading">
                        <p className="cart__heading-letter first-letter">C</p>
                        <p className="cart__heading-letter second-letter">A</p>
                        <p className="cart__heading-letter third-letter">R</p>
                        <p className="cart__heading-letter fourth-letter">T</p>
                    </div>
                    <div className="cart__product">
                        <ul className="cart__product-left">
                            <Cart pizza={cartItems} updateTotal={loadCart}/>
                        </ul>
                        <h2 className="cart__product-right-heading">Total <span className="dopClass">:</span> <span
                            className="cart__product-right-price"> {isUpdatingTotal ? 'Updating...' : `$ ${total}`}</span>
                        </h2>
                    </div>
                </div>
            </div>
            <div className="storeProducts">
                <div className="wrapper">
                    <div className="root">
                        <App pizza={pizzaList} onAddToCart={handleAddToCart} cart={cartItems} />
                    </div>
                </div>
            </div>
        </>
    );
}